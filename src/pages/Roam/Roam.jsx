import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import RoamViewer from './RoamViewer/RoamViewer';
import RoamDetail from './RoamDetail/RoamDetail';
import { ROAM_DATA, POINT_DATA } from './RoamData';
import styles from './Roam.module.css';

const DEFAULT_NODE_ID = 'A-to-Bhabua';

function toActivityArray(activitiesObj, activeEra) {
  if (!activitiesObj) return [];

  return Object.entries(activitiesObj).map(([id, entity]) => {
    const eraDetails = entity.eras?.[activeEra] || {};
    return {
      id,
      type: entity.type,
      hotspotPosition: entity.hotspotPosition,
      activities: entity.activities,
      label: eraDetails.label || id,
      description: eraDetails.description || '',
      images: eraDetails.images || [],
      interview: eraDetails.interview || null,
      isAvailableInEra: Boolean(entity.eras?.[activeEra])
    };
  });
}


function computeBreadcrumbPath(currentNode, breadcrumbIds, activeEra) {
  const path = [];
  let currentEntity = currentNode;

  for (const id of breadcrumbIds) {
    const nextEntity = currentEntity?.activities?.[id];
    // stop at the deepest view that exists in this era (time warp keeps you as close as possible)
    if (!nextEntity || !nextEntity.eras?.[activeEra]) break;

    const eraDetails = nextEntity.eras?.[activeEra] || {};
    path.push({ id, label: eraDetails.label || id });
    currentEntity = nextEntity;


  }

  return path;
}


export default function Roam() {
  const params = useParams();
  const navigate = useNavigate();

  // params['*'] is everything after "/roam/", e.g. "A-to-Bhabua/waterPump/interview1"
  const segments = (params['*'] || '').split('/').filter(Boolean);
  const nodeIdFromUrl = segments[0];
  const breadcrumbIds = segments.slice(1);

  const currentNodeId = ROAM_DATA[nodeIdFromUrl] ? nodeIdFromUrl : DEFAULT_NODE_ID;

  // Era lives in the URL (?era=2000s) so a time-warped view can be shared or reloaded.
  const [searchParams] = useSearchParams();
  const activeEra = searchParams.get('era') === '2000s' ? '2000s' : '2020s';

  const [selectedOriginId, setSelectedOriginId] = useState(null);
  const [lastVisitedOriginId, setLastVisitedOriginId] = useState('A');

  const currentNode = ROAM_DATA[currentNodeId];


  const navigateToPath = (nodeId, ids = [], options, era = activeEra) => {
    const path = ids.length ? `/roam/${nodeId}/${ids.join('/')}` : `/roam/${nodeId}`;
    navigate(era === '2000s' ? `${path}?era=2000s` : path, options);
  };

  // Time warp: same place, other era. Stays on the twin view if there is one;
  // the breadcrumb check below trims to the deepest view that exists in that era.
  const otherEra = activeEra === '2020s' ? '2000s' : '2020s';
  const canTimeWarp = Boolean(currentNode?.eras?.[otherEra]);
  const breadcrumbKey = breadcrumbIds.join('/');
  // Peek into the other era: the photo of the deepest view along the current breadcrumb
  // that exists there (the same place time warp will land on).
  const timeWarpPreview = useMemo(() => {
    if (!canTimeWarp) return null;
    let entity = currentNode;
    let pick = currentNode.eras?.[otherEra];
    for (const id of breadcrumbIds) {
      entity = entity?.activities?.[id];
      if (!entity?.eras?.[otherEra]) break;
      pick = entity.eras[otherEra];
    }
    return { src: pick?.images?.[0]?.src || null, label: pick?.label || currentNode?.label || currentNodeId };
  }, [canTimeWarp, currentNode, currentNodeId, otherEra, breadcrumbKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTimeWarp = () => {
    if (!canTimeWarp) return;
    navigateToPath(currentNodeId, breadcrumbIds, undefined, otherEra);
  };

  // A view that only exists in the other era (e.g. a 2000s-only path) opens in that era.
  useEffect(() => {
    if (currentNode && !currentNode.eras?.[activeEra] && currentNode.eras?.[otherEra]) {
      navigateToPath(currentNodeId, breadcrumbIds, { replace: true }, otherEra);
    }
  }, [currentNodeId, activeEra]);

  // Redirect bare "/roam" or an invalid nodeId segment to the default node's URL.
  useEffect(() => {
    if (!nodeIdFromUrl || !ROAM_DATA[nodeIdFromUrl]) {
      navigateToPath(DEFAULT_NODE_ID, [], { replace: true });
    }
  }, [nodeIdFromUrl]);




  const breadcrumbPath = useMemo(
    () => computeBreadcrumbPath(currentNode, breadcrumbIds, activeEra),
    [currentNode, breadcrumbIds.join('/'), activeEra]
  );
  console.log('nodeIdFromUrl:', nodeIdFromUrl, 'breadcrumbIds:', breadcrumbIds, 'breadcrumbPath:', breadcrumbPath);


  useEffect(() => {
    if (breadcrumbPath.length !== breadcrumbIds.length) {
      navigateToPath(currentNodeId, breadcrumbPath.map((c) => c.id), { replace: true });
    }
  }, [breadcrumbPath, breadcrumbIds.join('/'), currentNodeId]);

  const currentContext = useMemo(() => {
    if (!currentNode) return null;

    let currentEntity = currentNode;

    for (const crumb of breadcrumbPath) {
      currentEntity = currentEntity?.activities?.[crumb.id];
    }

    if (!currentEntity) return null;

    const eraDetails = currentEntity.eras?.[activeEra] || {};

    return {
      ...eraDetails,
      type: currentEntity.type,
      hotspotPosition: currentEntity.hotspotPosition,
      activities: currentEntity.activities
    };
  }, [currentNode, breadcrumbPath, activeEra]);

  // Neighbouring views: the other things to do at the parent of the current view,
  // so you can hop sideways without "Return to…" first (Peter's request).
  const siblingActivities = useMemo(() => {
    if (breadcrumbPath.length === 0) return [];
    let parent = currentNode;
    for (const crumb of breadcrumbPath.slice(0, -1)) parent = parent?.activities?.[crumb.id];
    return toActivityArray(parent?.activities, activeEra).filter((a) => a.isAvailableInEra);
  }, [currentNode, breadcrumbPath, activeEra]);

  const currentActivities = useMemo(
    () => toActivityArray(currentContext?.activities, activeEra),
    [currentContext, activeEra]
  );

  const activeOriginPaths = useMemo(() => {
    if (!selectedOriginId) return [];

    return Object.entries(ROAM_DATA || {})
      .filter(([, data]) => data?.mapEndpoints?.from === selectedOriginId && data?.eras?.[activeEra])
      .map(([key, data]) => ({
        pathKey: key,
        label: data.label || key,
        mapEndpoints: data.mapEndpoints,
      }));
  }, [selectedOriginId, activeEra]);

  const isSplitViewOpen = Boolean(selectedOriginId && activeOriginPaths.length > 0);

  const handleNodeTransition = (nodeId) => {
    if (ROAM_DATA[nodeId]) {
      navigateToPath(nodeId, []);
    } else {
      console.error(`Route failed: Node ID "${nodeId}" does not exist in ROAM_DATA.`);
    }
  };

  const handleSelectPathChoice = (pathKey) => {
    if (selectedOriginId) {
      setLastVisitedOriginId(selectedOriginId);
    } else if (currentNodeId) {
      setLastVisitedOriginId(currentNodeId);
    }

    setSelectedOriginId(null);
    handleNodeTransition(pathKey);
  };

  const handleHotspotClick = (activity) => {
    navigateToPath(currentNodeId, [...breadcrumbIds, activity.id]);
  };

  const handleSiblingClick = (activity) => {
    navigateToPath(currentNodeId, [...breadcrumbIds.slice(0, -1), activity.id]);
  };

  const handleBackOneLevel = () => {
    navigateToPath(currentNodeId, breadcrumbIds.slice(0, -1));
  };

  const handleBreadcrumbNavigate = (index) => {
    navigateToPath(currentNodeId, breadcrumbIds.slice(0, index + 1));
  };

  const currentEndpoints = currentNode?.mapEndpoints;
  const mapPoints = useMemo(
    () =>
      Object.entries(POINT_DATA).map(([id, data]) => ({
        id,
        label: data.label || id,
        mapPosition: data.mapPosition,
        isActive: id === currentEndpoints?.from || id === currentEndpoints?.to,
      })),
    [currentEndpoints]
  );

  return (
    <main className={styles.pageContainer}>
      <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
        <ol className={styles.trail}>
          <li className={styles.crumbItem}>
            <button
              className={`${styles.crumb} ${styles.crumbRoot} ${breadcrumbPath.length === 0 ? styles.crumbCurrent : ''}`}
              onClick={() => handleBreadcrumbNavigate(-1)}
              aria-current={breadcrumbPath.length === 0 ? 'location' : undefined}
              title={currentNode?.label || currentNodeId}
            >
              <svg className={styles.routeIcon} viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="6" cy="18" r="2.5" />
                <circle cx="18" cy="6" r="2.5" />
                <path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" />
              </svg>
              <span className={styles.crumbText}>{currentNode?.label || currentNodeId}</span>
            </button>
          </li>

          {breadcrumbPath.map((crumb, idx) => {
            const isCurrent = idx === breadcrumbPath.length - 1;
            return (
              <li key={crumb.id} className={styles.crumbItem}>
                <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
                <button
                  className={`${styles.crumb} ${isCurrent ? styles.crumbCurrent : ''}`}
                  onClick={() => !isCurrent && handleBreadcrumbNavigate(idx)}
                  aria-current={isCurrent ? 'location' : undefined}
                  title={crumb.label}
                >
                  <span className={styles.crumbText}>{crumb.label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <span className={`${styles.eraTag} ${activeEra === '2000s' ? styles.eraTagPast : ''}`}>
          {activeEra}
        </span>
      </nav>

      <div className={styles.splitGrid}>
        <RoamViewer
          activeNode={currentNode}
          activeNodeId={currentNodeId}
          era={activeEra}
          currentContext={currentContext}
          currentActivities={currentActivities}
          onNavigate={handleNodeTransition}
          onHotspotClick={handleHotspotClick}
          onBackOneLevel={handleBackOneLevel}
          canGoBack={breadcrumbPath.length > 0}
          mapPoints={mapPoints}
          selectedOriginId={selectedOriginId}
          setSelectedOriginId={setSelectedOriginId}
          lastVisitedOriginId={lastVisitedOriginId}
          setLastVisitedOriginId={setLastVisitedOriginId}
          activeOriginPaths={activeOriginPaths}
          isSplitViewOpen={isSplitViewOpen}
          onSelectPathChoice={handleSelectPathChoice}
          otherEra={otherEra}
          canTimeWarp={canTimeWarp}
          onTimeWarp={handleTimeWarp}
          timeWarpPreview={timeWarpPreview}
        />

        {/* Same height as the scene on wide screens; the details scroll inside */}
        <div className={styles.detailCell}>
        <RoamDetail
          activeNode={currentNode}
          currentContext={currentContext}
          currentActivities={currentActivities}
          breadcrumbPath={breadcrumbPath}
          siblingActivities={siblingActivities}
          currentActivityId={breadcrumbPath[breadcrumbPath.length - 1]?.id}
          onSiblingClick={handleSiblingClick}
          onHotspotClick={handleHotspotClick}
          onBackOneLevel={handleBackOneLevel}
          canGoBack={breadcrumbPath.length > 0}
          isSplitViewOpen={isSplitViewOpen}
          selectedOriginId={selectedOriginId}
          activeOriginPaths={activeOriginPaths}
          onSelectPathChoice={handleSelectPathChoice}
        />
        </div>
      </div>
    </main>
  );
}