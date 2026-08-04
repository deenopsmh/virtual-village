import styles from './RoamViewer.module.css';
import { useState, useEffect, useRef, useMemo } from 'react';
import mapLight from '/src/assets/waypoint-map-light.png';
import mapDark from '/src/assets/waypoint-map-dark.png';
import ResponsiveImage from '../../../components/ResponsiveImage';
import { HOTSPOT_TYPE_ICONS, DEFAULT_HOTSPOT_ICON } from '../RoamData';
import { ROAM_DATA } from '../RoamData';

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
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(true);

  const [scale, setScale] = useState(1);
  const [maxPan, setMaxPan] = useState({ x: 0, y: 0 });
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
  const transformLayerRef = useRef(null);
  const miniMapContainerRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const mapDragStart = useRef({ x: 0, y: 0 });
  const mouseDownPos = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const revealTimeoutRef = useRef(null);
  const loadedSrcRef = useRef(null);

  const currentImages = currentContext?.images || [];
  const currentImage = currentImages[activeImageIndex]?.src;

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

  const pointLookup = (mapPoints || []).reduce((acc, point) => {
    acc[point.id] = point;
    return acc;
  }, {});

  const uniqueFromKeys = Array.from(
    new Set(
      Object.values(ROAM_DATA)
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
      const era2020Images = data?.eras?.['2020s']?.images;
      let imagePath = Array.isArray(era2020Images) && era2020Images.length > 0
        ? era2020Images[0].src
        : (data?.image || currentImage);

      if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        imagePath = `/${imagePath}`;
      }

      return { ...item, image: imagePath };
    });
  }, [activeOriginPaths, currentImage]);

  const activeMinimapPaths = useMemo(() => {
    if (selectedOriginId) {
      return (activeOriginPaths || []).map((item) => ({
        ...item,
        isCurrentSegment: false,
      }));
    }

    const choicePaths = [];
    const choiceEndpointPairs = new Set();

    if (activeNode?.paths && Object.keys(activeNode.paths).length > 0) {
      Object.entries(activeNode.paths).forEach(([, id]) => {
        const nextKey = typeof id === 'string' ? id : id?.id;
        if (!nextKey || nextKey === activeNodeId) return;

        choicePaths.push({
          pathKey: nextKey,
          isCurrentSegment: false,
        });

        const targetEndpoints = ROAM_DATA[nextKey]?.mapEndpoints;
        if (targetEndpoints?.from && targetEndpoints?.to) {
          choiceEndpointPairs.add(`${targetEndpoints.from}-${targetEndpoints.to}`);
          choiceEndpointPairs.add(`${targetEndpoints.to}-${targetEndpoints.from}`);
        }
      });
    }

    const currentEndpoints = activeNode?.mapEndpoints || ROAM_DATA[activeNodeId]?.mapEndpoints;
    const currentPairKey = currentEndpoints ? `${currentEndpoints.from}-${currentEndpoints.to}` : null;
    const hasOpposingChoice = currentPairKey && choiceEndpointPairs.has(currentPairKey);

    const pathsList = [];
    if (currentEndpoints?.from && currentEndpoints?.to && !hasOpposingChoice) {
      pathsList.push({
        pathKey: activeNodeId,
        isCurrentSegment: true,
      });
    }

    return [...pathsList, ...choicePaths];
  }, [selectedOriginId, activeOriginPaths, activeNode, activeNodeId]);

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

    const ZOOM_PAD = 1.03;
    const scaleX = (renderedW / containerW) * ZOOM_PAD;
    const scaleY = (renderedH / containerH) * ZOOM_PAD;
    const targetScale = Math.max(scaleX, scaleY);

    const limitX = Math.max(0, (renderedW * ZOOM_PAD - containerW) / 2);
    const limitY = Math.max(0, (renderedH * ZOOM_PAD - containerH) / 2);

    setMaxPan({ x: limitX, y: limitY });
    setPan({ x: 0, y: 0 });
    setScale(1);
    setIsRevealing(false);

    // NEW: compute pan offset needed to bring focus_point to center
    const focusPoint = currentImages[activeImageIndex]?.focus_point;
    let targetPanX = 0;
    let targetPanY = 0;

    if (focusPoint) {
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
        className={`${styles.canvasContainer} ${isDragging ? styles.grabbing : styles.grab}`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleContainerMouseUp}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div className={styles.backgroundImage}>
          <ResponsiveImage
            src={currentImage}
            alt=""
            className={styles.backgroundImg}
            sizes="100vw"
            draggable="false"
          />
        </div>

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
              transition: isDragging
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
              onDoubleClick={handleImageDoubleClick}
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

                  const isSolid = item.isCurrentSegment;
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
                        className={isSolid ? styles.solidArrowPath : styles.movingArrowPath}
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

        {!isSplitViewOpen && (
          <div className={styles.bottomControlHudZone} onMouseDown={(e) => e.stopPropagation()}>
            <div className={styles.navigationDock}>
              <button
                className={styles.navArrow}
                disabled={!activeNode?.paths?.left}
                onClick={() => activeNode?.paths?.left && onNavigate(activeNode.paths.left)}
                onMouseDown={(e) => e.stopPropagation()}
                title="Go Left"
              >
                ←
              </button>

              <div className={styles.verticalAxisGroup}>
                <button
                  className={styles.navCenterUp}
                  disabled={!activeNode?.paths?.up}
                  onClick={() => activeNode?.paths?.up && onNavigate(activeNode.paths.up)}
                  onMouseDown={(e) => e.stopPropagation()}
                  title="Go Forward"
                >
                  ↑
                </button>
                <button
                  className={styles.navCenterDown}
                  disabled={!activeNode?.paths?.down}
                  onClick={() => activeNode?.paths?.down && onNavigate(activeNode.paths.down)}
                  onMouseDown={(e) => e.stopPropagation()}
                  title="Go Backward"
                >
                  ↓
                </button>
              </div>

              <button
                className={styles.navArrow}
                disabled={!activeNode?.paths?.right}
                onClick={() => activeNode?.paths?.right && onNavigate(activeNode.paths.right)}
                onMouseDown={(e) => e.stopPropagation()}
                title="Go Right"
              >
                →
              </button>
            </div>

            <button
              className={`${styles.mapToggleButton} ${isMapVisible ? styles.mapToggleActive : styles.mapToggleMuted}`}
              onClick={() => setIsMapVisible(!isMapVisible)}
              onMouseDown={(e) => e.stopPropagation()}
              title={isMapVisible ? 'Hide Map Overlay' : 'Show Map Overlay'}
            >
              🗺️
            </button>
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