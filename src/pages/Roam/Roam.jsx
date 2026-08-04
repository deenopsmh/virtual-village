import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    if (!nextEntity) break;

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

  const [activeEra, setActiveEra] = useState("2020s");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedOriginId, setSelectedOriginId] = useState(null);
  const [lastVisitedOriginId, setLastVisitedOriginId] = useState('A');

  const locationKeys = Object.keys(ROAM_DATA);
  const currentNode = ROAM_DATA[currentNodeId];


  const navigateToPath = (nodeId, ids = [], options) => {
    const path = ids.length ? `/roam/${nodeId}/${ids.join('/')}` : `/roam/${nodeId}`;
    navigate(path, options);
  };

  // Redirect bare "/roam" or an invalid nodeId segment to the default node's URL.
  useEffect(() => {
    if (!nodeIdFromUrl || !ROAM_DATA[nodeIdFromUrl]) {
      navigateToPath(DEFAULT_NODE_ID, [], { replace: true });
    }
  }, [nodeIdFromUrl]);


  const prevEraRef = useRef(activeEra);
  useEffect(() => {
    if (prevEraRef.current !== activeEra) {
      navigateToPath(currentNodeId, []);
    }
    prevEraRef.current = activeEra;
  }, [activeEra]);


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

  const currentActivities = useMemo(
    () => toActivityArray(currentContext?.activities, activeEra),
    [currentContext, activeEra]
  );

  const activeOriginPaths = useMemo(() => {
    if (!selectedOriginId) return [];

    return Object.entries(ROAM_DATA || {})
      .filter(([, data]) => data?.mapEndpoints?.from === selectedOriginId)
      .map(([key, data]) => ({
        pathKey: key,
        label: data.label || key,
        mapEndpoints: data.mapEndpoints,
      }));
  }, [selectedOriginId]);

  const isSplitViewOpen = Boolean(selectedOriginId && activeOriginPaths.length > 0);

  const handleNodeTransition = (nodeId) => {
    if (ROAM_DATA[nodeId]) {
      navigateToPath(nodeId, []);
      setIsMenuOpen(false);
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
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ''}`} 
        onClick={() => setIsMenuOpen(false)} 
      />
      
      <aside className={`${styles.drawer} ${isMenuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <h2>Locations</h2>
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>×</button>
        </div>
        <ul className={styles.nodeList}>
          {locationKeys.map((key) => (
            <li key={key}>
              <button
                className={`${styles.nodeBtn} ${key === currentNodeId ? styles.activeNodeBtn : ''}`}
                onClick={() => handleNodeTransition(key)}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
        <button 
          className={styles.menuToggleBtn} 
          onClick={() => setIsMenuOpen(true)}
        >
          ☰ Menu
        </button>

        <button
          className={`${styles.breadcrumbItem} ${
            breadcrumbPath.length === 0 ? styles.breadcrumbActive : ''
          }`}
          onClick={() => handleBreadcrumbNavigate(-1)}
        >
          {currentNode?.label || currentNodeId}
        </button>

        {breadcrumbPath.map((crumb, idx) => (
          <React.Fragment key={crumb.id}>
            <span className={styles.breadcrumbSeparator}>›</span>
            <button
              className={`${styles.breadcrumbItem} ${
                idx === breadcrumbPath.length - 1 ? styles.breadcrumbActive : ''
              }`}
              onClick={() => handleBreadcrumbNavigate(idx)}
            >
              {crumb.label}
            </button>
          </React.Fragment>
        ))}
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
        />

        <RoamDetail
          activeNode={currentNode}
          currentContext={currentContext}
          currentActivities={currentActivities}
          breadcrumbPath={breadcrumbPath}
          onHotspotClick={handleHotspotClick}
          onBackOneLevel={handleBackOneLevel}
          canGoBack={breadcrumbPath.length > 0}
          isSplitViewOpen={isSplitViewOpen}
          selectedOriginId={selectedOriginId}
          activeOriginPaths={activeOriginPaths}
          onSelectPathChoice={handleSelectPathChoice}
        />
      </div>
    </main>
  );
}