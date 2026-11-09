import styles from './RoamViewer.module.css';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import mapLight from '/src/assets/waypoint-map-light.png';
import mapDark from '/src/assets/waypoint-map-dark.png';
import ResponsiveImage from '../../../components/ResponsiveImage';
import TimeWarp from './TimeWarp';
import { HOTSPOT_TYPE_ICONS, DEFAULT_HOTSPOT_ICON, ROAM_DATA, POINT_DATA } from '../RoamData';
import { createNavigator } from '../roamNavigation';

// One navigator per era: arrows and map lines only lead to views that exist in that era
// (e.g. DD-to-N is 2000s-only).
const dataForEra = (era) =>
  Object.fromEntries(Object.entries(ROAM_DATA).filter(([, d]) => d?.eras?.[era]));
const NAVIGATORS = {
  '2020s': createNavigator(dataForEra('2020s'), POINT_DATA),
  '2000s': createNavigator(dataForEra('2000s'), POINT_DATA),
};

// Icons for the navigation pad (VV2 layout: arrows around a turn-around button)
const NavIcon = ({ type }) => {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (type) {
    case 'forward': return <svg {...common}><path d="M12 20V5M6 11l6-6 6 6" /></svg>;
    case 'back': return <svg {...common}><path d="M12 4v15M6 13l6 6 6-6" /></svg>;
    case 'left': return <svg {...common}><path d="M18 20v-7a4 4 0 0 0-4-4H5M9 5L5 9l4 4" /></svg>;
    case 'right': return <svg {...common}><path d="M6 20v-7a4 4 0 0 1 4-4h9M15 5l4 4-4 4" /></svg>;
    case 'around': return <svg {...common}><path d="M19 12a7 7 0 1 1-2.05-4.95M19 4v4h-4" /></svg>;
    default: return null;
  }
};

// Remembered per visitor (try/catch: storage can be blocked, the page must still work)
const MAP_OPEN_KEY = 'vv.mapOpen';
// first-visit hints, shown one after another, each once per visitor
const HINT_KEYS = { warp: 'vv.timeWarpHintSeen', pad: 'vv.padHintSeen', map: 'vv.mapHintSeen' };
// how long each hint stays (the arrow pad has more to read)
const HINT_MS = { warp: 5000, pad: 7000, map: 5000 };
const readStore = (key) => {
  try { return window.localStorage.getItem(key); } catch { return null; }
};
const writeStore = (key, value) => {
  try { window.localStorage.setItem(key, value); } catch { /* storage blocked: fine */ }
};

const NAV_BUTTONS = [
  { move: 'forward', verb: 'Walk forward', area: 'up' },
  { move: 'left', verb: 'Turn left', area: 'left' },
  { move: 'around', verb: 'Turn around', area: 'center' },
  { move: 'right', verb: 'Turn right', area: 'right' },
  { move: 'back', verb: 'Step back', area: 'down' },
];

export default function RoamViewer({
  activeNode,
  activeNodeId,
  era,
  currentContext,
  currentActivities = [],
  onNavigate,
  onHotspotClick,
  onBackOneLevel,
  canGoBack,
  mapPoints,
  selectedOriginId,
  setSelectedOriginId,
  lastVisitedOriginId,
  setLastVisitedOriginId,
  activeOriginPaths = [],
  isSplitViewOpen,
  onSelectPathChoice,
  otherEra,
  canTimeWarp,
  onTimeWarp,
  timeWarpPreview,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  // The map starts hidden so the photo is the first thing people see; someone who left it
  // open last time gets it open again.
  const [isMapVisible, setIsMapVisible] = useState(() => readStore(MAP_OPEN_KEY) === '1');

  // First visit: three short hints in turn (time warp 5 s, arrow pad 7 s, map 5 s), each once.
  // Using a control dismisses its hint early; the map hint is skipped if the map is already open.
  const [hintQueue, setHintQueue] = useState(() =>
    ['warp', 'pad', 'map'].filter((h) => readStore(HINT_KEYS[h]) !== '1' && !(h === 'map' && readStore(MAP_OPEN_KEY) === '1'))
  );
  // no time warp on this view: skip that hint for now (not marked seen, so it can show later)
  const activeHint = hintQueue.find((h) => h !== 'warp' || canTimeWarp) || null;
  const dismissHint = (h) => {
    writeStore(HINT_KEYS[h], '1');
    setHintQueue((q) => q.filter((x) => x !== h));
  };
  useEffect(() => {
    if (!activeHint) return undefined;
    const t = setTimeout(() => dismissHint(activeHint), HINT_MS[activeHint]);
    return () => clearTimeout(t);
  }, [activeHint]);

  // First visit only (arrow-pad or map hint still unseen): the photo is dimmed and can't be
  // touched while the hints play, then "Start Roaming" spreads out and the dimming lifts.
  const [introOn] = useState(() => readStore(HINT_KEYS.pad) !== '1' || readStore(HINT_KEYS.map) !== '1');
  const [introDone, setIntroDone] = useState(false);
  const introDim = introOn && !introDone;
  const introOutro = introDim && !activeHint;
  useEffect(() => {
    if (!introOutro) return undefined;
    const t = setTimeout(() => setIntroDone(true), 3800); // safety net if animation events don't arrive
    return () => clearTimeout(t);
  }, [introOutro]);
  const skipIntro = () => {
    hintQueue.forEach((h) => writeStore(HINT_KEYS[h], '1'));
    setHintQueue([]);
  };

  const toggleMap = () => {
    const next = !isMapVisible;
    setIsMapVisible(next);
    writeStore(MAP_OPEN_KEY, next ? '1' : '0');
    if (next) dismissHint('map');
  };

  const [scale, setScale] = useState(1);
  const [maxPan, setMaxPan] = useState({ x: 0, y: 0 });
  const [isPortrait, setIsPortrait] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const [mapZoom, setMapZoom] = useState(1);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [isMapDragging, setIsMapDragging] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document === 'undefined') return false;
    if (document.documentElement.classList.contains('dark')) return true;
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const root = document.documentElement;
    const updateTheme = () => setIsDarkMode(root.classList.contains('dark'));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const customMapDrawing = isDarkMode ? mapDark : mapLight;

  const containerRef = useRef(null);
  // The scene element as state too, so the time-warp overlay can render into it.
  const [canvasEl, setCanvasEl] = useState(null);
  const setCanvasRef = useCallback((el) => {
    containerRef.current = el;
    setCanvasEl(el);
  }, []);
  const transformLayerRef = useRef(null);
  const miniMapContainerRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const mapDragStart = useRef({ x: 0, y: 0 });
  const mouseDownPos = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const revealTimeoutRef = useRef(null);
  // After a time warp the overlay already showed the full photo, so the new photo
  // lands straight at its final framing instead of replaying the intro zoom.
  const skipRevealRef = useRef(false);
  const [isInstantFrame, setIsInstantFrame] = useState(false);
  const handleTimeWarp = () => {
    skipRevealRef.current = true;
    setTimeout(() => { skipRevealRef.current = false; }, 6000); // in case no new photo loads
    onTimeWarp();
  };
  const loadedSrcRef = useRef(null);

  const currentImages = currentContext?.images || [];
  const currentImage = currentImages[activeImageIndex]?.src;
  // Spinner while the main photo loads (Drive photos can take a few seconds the first time).
  const imageKey = currentImage ? JSON.stringify(currentImage) : null;
  const [settledImageKey, setSettledImageKey] = useState(null);
  const isPhotoLoading = Boolean(imageKey) && settledImageKey !== imageKey;

  const isSinglePoint = (id) => Boolean(id && !id.includes('-to-'));

  const getSegmentOrigin = (nodeId, nodeObj) => {
    const endpoints = nodeObj?.mapEndpoints || ROAM_DATA[nodeId]?.mapEndpoints;
    if (endpoints?.from) return endpoints.from;
    if (nodeId && nodeId.includes('-to-')) return nodeId.split('-to-')[0];
    return null;
  };

  const handleSelectPath = (pathKey) => {
    const currentOrigin = selectedOriginId || getSegmentOrigin(activeNodeId, activeNode);
    if (currentOrigin) {
      setLastVisitedOriginId(currentOrigin);
    }
    onSelectPathChoice(pathKey);
  };

  const handleSelectPointHotspot = (pointId) => {
    if (isSinglePoint(pointId) && ROAM_DATA[pointId]) {
      setSelectedOriginId(null);
      setLastVisitedOriginId(selectedOriginId || getSegmentOrigin(activeNodeId, activeNode));
      onNavigate(pointId);
      return;
    }
    setSelectedOriginId(pointId);
  };

const handleBack = () => {
  if (isSplitViewOpen) {
    setSelectedOriginId(null);
    return;
  }

  if (canGoBack) {
    onBackOneLevel();
    return;
  }

  const currentSegmentOrigin = getSegmentOrigin(activeNodeId, activeNode);
  if (currentSegmentOrigin) {
    setSelectedOriginId(currentSegmentOrigin);
  }
};

  const getMoves = NAVIGATORS[era] || NAVIGATORS['2020s'];

  const pointLookup = (mapPoints || []).reduce((acc, point) => {
    acc[point.id] = point;
    return acc;
  }, {});

  const uniqueFromKeys = Array.from(
    new Set(
      Object.values(ROAM_DATA)
        .filter((data) => data?.eras?.[era])
        .map((data) => data?.mapEndpoints?.from)
        .filter(Boolean)
    )
  );

  const originPoints = uniqueFromKeys
    .map((key) => ({
      id: key,
      position: pointLookup[key]?.mapPosition,
      isViewPoint: isSinglePoint(key) && Boolean(ROAM_DATA[key]),
    }))
    .filter((point) => point.position);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeNodeId, era]);

  const originPathsWithImages = useMemo(() => {
    return (activeOriginPaths || []).map((item) => {
      const data = ROAM_DATA[item.pathKey];
      const eraImages = data?.eras?.[era]?.images;
      let imagePath = Array.isArray(eraImages) && eraImages.length > 0
        ? eraImages[0].src
        : (data?.image || currentImage);

      if (typeof imagePath === 'string' && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        imagePath = `/${imagePath}`;
      }

      return { ...item, image: imagePath };
    });
  }, [activeOriginPaths, currentImage, era]);

  const activeMinimapPaths = useMemo(() => {
    if (selectedOriginId) {
      return (activeOriginPaths || []).map((item) => ({
        ...item,
        isCurrentSegment: false,
      }));
    }

    // Current view = animated line; every view the nav pad can reach = solid line.
    const reachable = [...new Set(Object.values(getMoves(activeNodeId)).filter(Boolean))]
      .filter((id) => id !== activeNodeId)
      .map((pathKey) => ({ pathKey, isCurrentSegment: false }));

    const currentEndpoints = activeNode?.mapEndpoints || ROAM_DATA[activeNodeId]?.mapEndpoints;
    const current = currentEndpoints?.from && currentEndpoints?.to
      ? [{ pathKey: activeNodeId, isCurrentSegment: true }]
      : [];

    return [...reachable, ...current]; // current drawn last so it sits on top
  }, [selectedOriginId, activeOriginPaths, activeNode, activeNodeId, getMoves]);

  const moves = useMemo(() => getMoves(activeNodeId), [activeNodeId, getMoves]);

  useEffect(() => {
    loadedSrcRef.current = null;
    setScale(1);
    setPan({ x: 0, y: 0 });
    setMaxPan({ x: 0, y: 0 });
  }, [currentImage]);

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

  const handleImageLoad = (e) => {
    const img = e.target;
    const container = containerRef.current;
    if (!container || !img.naturalWidth) return;

    if (loadedSrcRef.current === currentImage) return;
    loadedSrcRef.current = currentImage;

    const containerW = container.clientWidth;
    const containerH = container.clientHeight;
    const containerRatio = containerW / containerH;
    const imageRatio = img.naturalWidth / img.naturalHeight;

    let renderedW = containerW;
    let renderedH = containerH;

    if (imageRatio > containerRatio) {
      renderedW = containerH * imageRatio;
    } else {
      renderedH = containerW / imageRatio;
    }

    // Portrait photos are shown whole (contain) over a blurred backdrop: zooming them to
    // fill a wide frame would crop most of the picture. Landscape photos fill the frame
    // (cover) and can be dragged.
    const isPortraitPhoto = imageRatio < 1;
    setIsPortrait(isPortraitPhoto);

    const ZOOM_PAD = 1.03;
    const scaleX = (renderedW / containerW) * ZOOM_PAD;
    const scaleY = (renderedH / containerH) * ZOOM_PAD;
    const targetScale = isPortraitPhoto ? 1 : Math.max(scaleX, scaleY);

    const limitX = isPortraitPhoto ? 0 : Math.max(0, (renderedW * ZOOM_PAD - containerW) / 2);
    const limitY = isPortraitPhoto ? 0 : Math.max(0, (renderedH * ZOOM_PAD - containerH) / 2);

    setMaxPan({ x: limitX, y: limitY });
    setPan({ x: 0, y: 0 });
    setScale(1);
    setIsRevealing(false);

    // NEW: compute pan offset needed to bring focus_point to center
    const focusPoint = currentImages[activeImageIndex]?.focus_point;
    let targetPanX = 0;
    let targetPanY = 0;

    if (focusPoint && !isPortraitPhoto) {
      const focusPxX = (focusPoint.left / 100) * containerW;
      const focusPxY = (focusPoint.top / 100) * containerH;

      // moving this point to center means panning by -scale * offset-from-center
      targetPanX = -targetScale * (focusPxX - containerW / 2);
      targetPanY = -targetScale * (focusPxY - containerH / 2);

      targetPanX = Math.min(limitX, Math.max(-limitX, targetPanX));
      targetPanY = Math.min(limitY, Math.max(-limitY, targetPanY));
    }

    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
    }

    if (isPortraitPhoto) return; // already framed: whole photo, nothing to zoom or drag

    if (skipRevealRef.current) {
      skipRevealRef.current = false;
      // Next tick: a cached photo can load before the "new photo → reset zoom" effect runs,
      // which would undo this framing.
      revealTimeoutRef.current = setTimeout(() => {
        setIsInstantFrame(true);
        setScale(targetScale);
        setPan({ x: targetPanX, y: targetPanY });
        revealTimeoutRef.current = setTimeout(() => setIsInstantFrame(false), 80); // animated zoom again
      }, 0);
      return;
    }

    revealTimeoutRef.current = setTimeout(() => {
      setIsRevealing(true);
      setScale(targetScale);
      setPan({ x: targetPanX, y: targetPanY }); // NEW: pan toward focus point

      revealTimeoutRef.current = setTimeout(() => {
        setIsRevealing(false);
      }, 500);
    }, 1000);
    console.log('focusPoint:', focusPoint, 'targetScale:', targetScale, 'limits:', limitX, limitY);
  };

  const handleMouseDown = (e) => {
    if (
      e.target.closest(`.${styles.hotspot}`) ||
      e.target.closest(`.${styles.hotspotPopover}`) ||
      e.target.closest(`.${styles.miniMapWrapper}`) ||
      e.target.closest(`.${styles.bottomControlHudZone}`)
    ) return;

    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    setIsRevealing(false);

    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const targetX = e.clientX - dragStart.current.x;
    const targetY = e.clientY - dragStart.current.y;

    const clampedX = Math.min(maxPan.x, Math.max(-maxPan.x, targetX));
    const clampedY = Math.min(maxPan.y, Math.max(-maxPan.y, targetY));

    setPan({ x: clampedX, y: clampedY });
  };

  const handleImageDoubleClick = (e) => {
    if (!transformLayerRef.current) return;
    const rect = transformLayerRef.current.getBoundingClientRect();
    const left = ((e.clientX - rect.left) / rect.width) * 100;
    const top = ((e.clientY - rect.top) / rect.height) * 100;
    console.log(`hotspotPosition: { top: ${top.toFixed(1)}, left: ${left.toFixed(1)} },`);
  };

  const handleMiniMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const left = ((e.clientX - rect.left) / rect.width) * 100;
    const top = ((e.clientY - rect.top) / rect.height) * 100;
    console.log(`mapPosition: { top: ${top.toFixed(1)}, left: ${left.toFixed(1)} },`);
  };

  const diamondPoints = (cx, cy, r) => `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;

  const MAP_ZOOM_MIN = 1;
  const MAP_ZOOM_MAX = 5;
  const MAP_ZOOM_STEP = 0.5;

  const clampMapPan = (candidatePan, zoom) => {
    const el = miniMapContainerRef.current;
    if (!el || zoom <= 1) return { x: 0, y: 0 };
    const maxX = (el.clientWidth * (zoom - 1)) / 2;
    const maxY = (el.clientHeight * (zoom - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, candidatePan.x)),
      y: Math.min(maxY, Math.max(-maxY, candidatePan.y)),
    };
  };

  const handleMapZoomIn = () => {
    const nextZoom = Math.min(MAP_ZOOM_MAX, +(mapZoom + MAP_ZOOM_STEP).toFixed(2));
    setMapZoom(nextZoom);
    setMapPan((p) => clampMapPan(p, nextZoom));
  };

  const handleMapZoomOut = () => {
    const nextZoom = Math.max(MAP_ZOOM_MIN, +(mapZoom - MAP_ZOOM_STEP).toFixed(2));
    setMapZoom(nextZoom);
    setMapPan((p) => (nextZoom === MAP_ZOOM_MIN ? { x: 0, y: 0 } : clampMapPan(p, nextZoom)));
  };

  const handleMapZoomReset = () => {
    setMapZoom(1);
    setMapPan({ x: 0, y: 0 });
  };

  const handleMapMouseDown = (e) => {
    if (mapZoom <= 1) return;
    e.stopPropagation();
    setIsMapDragging(true);
    mapDragStart.current = { x: e.clientX - mapPan.x, y: e.clientY - mapPan.y };
  };

  const handleMapMouseMove = (e) => {
    if (!isMapDragging) return;
    const targetX = e.clientX - mapDragStart.current.x;
    const targetY = e.clientY - mapDragStart.current.y;
    setMapPan(clampMapPan({ x: targetX, y: targetY }, mapZoom));
  };

const handleContainerMouseUp = (e) => {
  const wasClick = isDragging && !hasDraggedRef.current;
  setIsDragging(false);

  if (wasClick && transformLayerRef.current && !isSplitViewOpen) {
    const rect = transformLayerRef.current.getBoundingClientRect();
    const left = ((e.clientX - rect.left) / rect.width) * 100;
    const top = ((e.clientY - rect.top) / rect.height) * 100;
    console.log(`focus_point: { top: ${top.toFixed(1)}, left: ${left.toFixed(1)} },`);
  }
};

  const handleMapMouseUp = () => setIsMapDragging(false);

  const availableActivities = currentActivities.filter(
    (item) => item.isAvailableInEra !== false
  );

  const showBackButton = Boolean(
    isSplitViewOpen ||
    canGoBack ||
    getSegmentOrigin(activeNodeId, activeNode)
  );

  return (
    <div className={styles.viewerWrapper}>
      <div
        className={`${styles.canvasContainer} ${isPortrait ? styles.noDrag : isDragging ? styles.grabbing : styles.grab}`}
        ref={setCanvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleContainerMouseUp}
        onMouseLeave={() => setIsDragging(false)}
        // touch: drag sideways to look around a photo (vertical swipes still scroll the page)
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) handleMouseDown({ target: e.target, clientX: t.clientX, clientY: t.clientY });
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) handleMouseMove({ clientX: t.clientX, clientY: t.clientY });
        }}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div className={`${styles.backgroundImage} ${isPortrait ? styles.backgroundPortrait : ''}`}>
          <ResponsiveImage
            src={currentImage}
            alt=""
            className={styles.backgroundImg}
            sizes="100vw"
            draggable="false"
          />
        </div>

        {!currentImage && !isSplitViewOpen && (
          <div className={styles.noPhotoNotice} role="status">
            No {era} photo for this view yet
          </div>
        )}

        {isPhotoLoading && !isSplitViewOpen && (
          <div className={styles.photoLoading} role="status" aria-live="polite">
            <span className={styles.photoLoadingSpinner} aria-hidden="true" />
            <span>Loading photo…</span>
          </div>
        )}

        {isSplitViewOpen ? (
          <div className={styles.splitChoiceContainer} onMouseDown={(e) => e.stopPropagation()}>
            <div className={styles.splitHeaderBar}>
              <h2>Point {selectedOriginId}: Select Your Route</h2>
            </div>

            <div className={styles.columnsFlexWrapper}>
              {originPathsWithImages.map((item) => (
                <div
                  key={item.pathKey}
                  className={styles.pathColumn}
                  onClick={() => handleSelectPath(item.pathKey)}
                >
                  <div className={styles.columnBgImageWrapper}>
                    <ResponsiveImage
                      src={item.image}
                      alt={item.label}
                      className={styles.columnBgImage}
                      sizes="50vw"
                      priority
                    />
                  </div>

                  <div className={styles.darkDimOverlay} />

                  <div className={styles.columnCardContent}>
                    <span className={styles.pathSubTag}>Destination</span>
                    <h3 className={styles.pathTitle}>{item.label}</h3>
                    <button className={styles.proceedBtn}>Take Route →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={transformLayerRef}
            className={styles.transformLayer}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transition: isDragging || isInstantFrame
                ? 'none'
                : isRevealing
                ? 'transform 2s ease-in-out'
                : 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <ResponsiveImage
              src={currentImage}
              alt={currentImages[activeImageIndex]?.title || activeNode?.label || activeNodeId}
              className={styles.panImage}
              sizes="100vw"
              priority={activeImageIndex === 0}
              draggable="false"
              onLoad={handleImageLoad}
              onSettled={() => setSettledImageKey(imageKey)}
              onDoubleClick={handleImageDoubleClick}
              fallback={
                <div className={styles.noPhotoNotice} role="status">
                  This {era} photo can't be shown yet
                </div>
              }
            />

            {availableActivities.map((item) => {
              if (!item.hotspotPosition) return null;
              const icon = item.icon || HOTSPOT_TYPE_ICONS[item.type] || DEFAULT_HOTSPOT_ICON;
              return (
                <button
                  key={item.id}
                  className={`${styles.hotspot} ${styles[`hotspot--${item.type}`] || ''}`}
                  style={{ top: `${item.hotspotPosition.top}%`, left: `${item.hotspotPosition.left}%` }}
                  onClick={() => onHotspotClick(item)}
                  onMouseDown={(e) => e.stopPropagation()}
                  title={item.label}
                >
                  <span className={styles.hotspotPulseRing} />
                  <span className={styles.hotspotIcon}>{icon}</span>
                </button>
              );
            })}
          </div>
        )}

        {showBackButton && !isSplitViewOpen && (
          <button
            className={styles.hotspotBackButton}
            onClick={handleBack}
            onMouseDown={(e) => e.stopPropagation()}
            title="Back"
          >
            ← Back
          </button>
        )}

        {!isSplitViewOpen && (
          <div
            className={`${styles.miniMapWrapper} ${isMapVisible ? '' : styles.miniMapHidden}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              ref={miniMapContainerRef}
              className={`${styles.miniMapContent} ${mapZoom > 1 ? (isMapDragging ? styles.grabbing : styles.grab) : ''}`}
              style={{
                transform: `translate(${mapPan.x}px, ${mapPan.y}px) scale(${mapZoom})`,
                transition: isMapDragging ? 'none' : 'transform 0.2s ease',
              }}
              onMouseDown={handleMapMouseDown}
              onMouseMove={handleMapMouseMove}
              onMouseUp={handleMapMouseUp}
              onMouseLeave={handleMapMouseUp}
            >
              <img
                src={customMapDrawing}
                alt="Village Map Layout Sketch"
                className={styles.miniMapGraphic}
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
                onClick={handleMiniMapClick}
              />

              <svg className={styles.miniMapSvgLayer} viewBox="0 0 100 100" preserveAspectRatio="none">
                {activeMinimapPaths.map((item) => {
                  const targetNodeObj = ROAM_DATA[item.pathKey] || activeNode;

                  const endpoints = item.isCurrentSegment
                    ? (activeNode?.mapEndpoints || ROAM_DATA[activeNodeId]?.mapEndpoints)
                    : (targetNodeObj?.mapEndpoints || activeNode?.mapEndpoints);

                  if (!endpoints?.from || !endpoints?.to) return null;

                  const fromPoint = pointLookup[endpoints.from]?.mapPosition;
                  const toPoint = pointLookup[endpoints.to]?.mapPosition;

                  if (!fromPoint || !toPoint) return null;

                  const isCurrent = item.isCurrentSegment;
                  const toIsViewPoint = isSinglePoint(endpoints.to) && Boolean(ROAM_DATA[endpoints.to]);
                  const targetGap = toIsViewPoint ? 2.1 : 1.3;

                  const dx = toPoint.left - fromPoint.left;
                  const dy = toPoint.top - fromPoint.top;
                  const dist = Math.hypot(dx, dy) || 1;
                  const unitX = dx / dist;
                  const unitY = dy / dist;

                  const tipX = toPoint.left - unitX * targetGap;
                  const tipY = toPoint.top - unitY * targetGap;

                  const path = `M ${fromPoint.left} ${fromPoint.top} L ${tipX} ${tipY}`;

                  return (
                    <g
                      key={`arrow-${item.pathKey}`}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={() => handleSelectPath(item.pathKey)}
                      className={styles.interactivePath}
                    >
                      <path d={path} className={styles.arrowHitArea} />
                      <path
                        d={path}
                        className={isCurrent ? styles.currentViewPath : styles.availablePath}
                      />
                    </g>
                  );
                })}

                {originPoints.map(({ id, position, isViewPoint }) => (
                  <g
                    key={`origin-${id}`}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPointHotspot(id);
                    }}
                    className={`${styles.interactiveOriginSpot} ${isViewPoint ? styles.viewOriginSpot : ''} ${selectedOriginId === id ? styles.selectedOriginSpot : ''}`}
                  >
                    <circle
                      cx={`${position.left}%`}
                      cy={`${position.top}%`}
                      r={isViewPoint ? '1.9' : '1'}
                      className={styles.waypointHitArea}
                    />
                    {isViewPoint ? (
                      <>
                        <polygon
                          points={diamondPoints(position.left, position.top, 1.9)}
                          className={styles.viewWaypointRing}
                        />
                        <polygon
                          points={diamondPoints(position.left, position.top, 1.3)}
                          className={styles.viewWaypointDot}
                        />
                        <polygon
                          points={diamondPoints(position.left, position.top, 0.6)}
                          className={styles.viewWaypointCore}
                        />
                      </>
                    ) : (
                      <>
                        <circle
                          cx={`${position.left}%`}
                          cy={`${position.top}%`}
                          r="1"
                          className={styles.waypointRing}
                        />
                        <circle
                          cx={`${position.left}%`}
                          cy={`${position.top}%`}
                          r="0.65"
                          className={styles.waypointDot}
                        />
                      </>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            <div className={styles.miniMapZoomControls} onMouseDown={(e) => e.stopPropagation()}>
              <button
                className={styles.mapZoomBtn}
                onClick={handleMapZoomIn}
                disabled={mapZoom >= MAP_ZOOM_MAX}
                title="Zoom in"
              >
                +
              </button>
              <button
                className={styles.mapZoomBtn}
                onClick={handleMapZoomOut}
                disabled={mapZoom <= MAP_ZOOM_MIN}
                title="Zoom out"
              >
                −
              </button>
              <button
                className={styles.mapZoomResetBtn}
                onClick={handleMapZoomReset}
                disabled={mapZoom === MAP_ZOOM_MIN && mapPan.x === 0 && mapPan.y === 0}
                title="Reset zoom"
              >
                ⤾
              </button>
            </div>
          </div>
        )}


        {introDim && !isSplitViewOpen && (
          <div
            className={`${styles.introOverlay} ${introOutro ? styles.introOutro : ''}`}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget && (e.animationName || '').includes('introOut')) setIntroDone(true);
            }}
          >
            {introOutro ? (
              <span className={styles.introTitle}>Start Roaming</span>
            ) : (
              <button type="button" className={styles.skipIntro} onClick={skipIntro}>
                Skip intro
              </button>
            )}
          </div>
        )}

        {!isSplitViewOpen && (
          <div className={styles.bottomControlHudZone} onMouseDown={(e) => e.stopPropagation()}>
            <TimeWarp
              era={era}
              otherEra={otherEra}
              canWarp={canTimeWarp}
              preview={timeWarpPreview}
              onWarp={handleTimeWarp}
              isPhotoLoading={isPhotoLoading}
              containerRef={containerRef}
              portalTarget={canvasEl}
              showHint={activeHint === 'warp'}
              hintMs={HINT_MS.warp}
              onHintDismiss={() => dismissHint('warp')}
            />

            <span className={styles.padWrap}>
            <nav className={styles.navigationPad} aria-label="Move through Chainpur">
              {NAV_BUTTONS.map(({ move, verb, area }) => {
                const target = moves[move];
                const label = target ? `${verb}: ${ROAM_DATA[target]?.label || target}` : `${verb} (not available here)`;
                return (
                  <button
                    key={move}
                    className={`${styles.padButton} ${move === 'around' ? styles.padAround : ''}`}
                    style={{ gridArea: area }}
                    disabled={!target}
                    onClick={() => { if (target) { dismissHint('pad'); onNavigate(target); } }}
                    onMouseDown={(e) => e.stopPropagation()}
                    title={label}
                    aria-label={label}
                  >
                    <NavIcon type={move} />
                  </button>
                );
              })}
            </nav>
            {activeHint === 'pad' && (
              <span className={`${styles.hudHint} ${styles.padHint}`} role="note" style={{ '--hint-ms': `${HINT_MS.pad}ms` }}>
                <span className={styles.hintTitle}>Walk around with the arrows</span>
                <span className={styles.hintRow}><strong>↑</strong> walk forward</span>
                <span className={styles.hintRow}><strong>↓</strong> step back</span>
                <span className={styles.hintRow}><strong>← →</strong> turn left or right</span>
                <span className={styles.hintRow}><strong>⟳</strong> turn around (middle)</span>
              </span>
            )}
            </span>


            <span className={styles.mapToggleWrap}>
            <button
              className={`${styles.mapToggleButton} ${isMapVisible ? styles.mapToggleActive : styles.mapToggleMuted}`}
              onClick={toggleMap}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z" />
                <path d="M9 4v13M15 6.5v13" />
              </svg>
              {isMapVisible ? 'Hide map' : 'Show map'}
            </button>
            {activeHint === 'map' && !isMapVisible && (
              <span className={styles.hudHint} role="note" style={{ '--hint-ms': `${HINT_MS.map}ms` }}>
                See where you are: click <strong>Show map</strong> for the full village map.
              </span>
            )}
            </span>
          </div>
        )}
      </div>

      {currentImages.length > 1 && (
        <div className={styles.thumbnailStripContainer}>
          <span className={styles.stripLabel}>Available Perspectives</span>
          <div className={styles.stripScrollbox}>
            {currentImages.map((img, idx) => (
              <button
                key={idx}
                className={`${styles.thumbCard} ${activeImageIndex === idx ? styles.activeThumb : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <ResponsiveImage
                  src={img.src}
                  alt={img.title}
                  className={styles.thumbImage}
                  sizes="150px"
                />
                <div className={styles.thumbMiniScrim}>
                  <span>{img.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}