import React, { useState } from 'react';
import RoamViewer from './RoamViewer/RoamViewer';
import RoamDetail from './RoamDetail/RoamDetail';
import { ROAM_DATA } from './RoamData';
import styles from './Roam.module.css';

export default function Roam() {
  const [currentNodeId, setCurrentNodeId] = useState("point-D");
  const currentNode = ROAM_DATA[currentNodeId];

const handleNodeTransition = (nodeId) => {
  if (ROAM_DATA[nodeId]) {
    setCurrentNodeId(nodeId);
  } else {
    console.error(`Route failed: Node ID "${nodeId}" does not exist in ROAM_DATA.`);
  }
};

  return (
    <main className={styles.pageContainer}>
      <div className={styles.splitGrid}>
        
          <RoamViewer 
            activeNode={currentNode} 
            allNodes={Object.values(ROAM_DATA)}
            onNavigate={handleNodeTransition} 
          />

          <RoamDetail 
            activeNode={currentNode} 
          />

      </div>
    </main>
  );
}