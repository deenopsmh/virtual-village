import React, { useState, useRef, useEffect } from 'react';
import styles from './RoamViewer.module.css';

// Import your custom map drawing graphic asset here
import customMapDrawing from '/src/assets/map-drawing.png'; 

export default function RoamViewer({ activeNode, allNodes, onNavigate }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(true); 
  
  const containerRef = useRef(null);
  const transformLayerRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });

  const centerImagePos = () => {
    if (!containerRef.current || !transformLayerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const layerRect = transformLayerRef.current.getBoundingClientRect();
    const initialCenterX = (containerRect.width - layerRect.width) / 2;
    const initialCenterY = (containerRect.height - layerRect.height) / 2;
    setPan({ x: initialCenterX, y: initialCenterY });
  };

  useEffect(() => {
    setActiveImageIndex(0); 
    const timer = setTimeout(() => { centerImagePos(); }, 150);
    return () => clearTimeout(timer);
  }, [activeNode.id]);

  useEffect(() => {
    window.addEventListener('resize', centerImagePos);
    return () => window.removeEventListener('resize', centerImagePos);
  }, []);

  const handleMouseDown = (e) => {
    if (
      e.target.closest(`.${styles.hotspot}`) || 
      e.target.closest(`.${styles.miniMapWrapper}`) || 
      e.target.closest(`.${styles.bottomControlHudZone}`)
    ) return;
    
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current || !transformLayerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const layerRect = transformLayerRef.current.getBoundingClientRect();
    let targetX = e.clientX - dragStart.current.x;
    let targetY = e.clientY - dragStart.current.y;
    const minX = containerRect.width - layerRect.width;
    const minY = containerRect.height - layerRect.height;
    const clampedX = Math.min(0, Math.max(minX, targetX));
    const clampedY = Math.min(0, Math.max(minY, targetY));
    setPan({ x: clampedX, y: clampedY });
  };

  const currentImage = activeNode.images[activeImageIndex]?.src;

  return (
    <div className={styles.viewerWrapper}>
      
      <div 
        className={`${styles.canvasContainer} ${isDragging ? styles.grabbing : styles.grab}`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div 
          ref={transformLayerRef}
          className={styles.transformLayer}
          style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
        >
          <img src={currentImage} alt={activeNode.name} className={styles.panImage} draggable="false" />
        </div>

        {/* MINI-MAP LAYOUT WRAPPER */}
        <div 
          className={`${styles.miniMapWrapper} ${isMapVisible ? '' : styles.miniMapHidden}`} 
          onMouseDown={(e) => e.stopPropagation()}
        >
          <img src={customMapDrawing} 
          alt="Village Map Layout Sketch" 
          className={styles.miniMapGraphic}
          onMouseDown={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const left = ((e.clientX - rect.left) / rect.width) * 100;
      const top = ((e.clientY - rect.top) / rect.height) * 100;
      
      console.log(`📍 MINI-MAP PIN DATA:`);
      console.log(`mapCoords: { top: ${top.toFixed(1)}, left: ${left.toFixed(1)} },`);
    }}
          />
          
          {allNodes.map((node) => {
            const isActive = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                className={`${styles.mapPin} ${isActive ? styles.mapPinActive : ''}`}
                style={{ top: `${node.mapCoords.top}%`, left: `${node.mapCoords.left}%` }}
                onClick={() => onNavigate(node.id)}
                onMouseDown={(e) => e.stopPropagation()} 
                title={node.name}
              >
                {isActive && <span className={styles.pulseRadarRing} />}
              </button>
            );
          })}
        </div>

        {/* BOTTOM FLOATING CONTROLS PLATFORM HOUSING HUD */}
        <div className={styles.bottomControlHudZone} onMouseDown={(e) => e.stopPropagation()}>
          
          {/* UPDATED: D-PAD STRUCTURAL SYSTEM ARCHITECTURE */}
          <div className={styles.navigationDock}>
            <button 
              className={styles.navArrow}
              disabled={!activeNode.paths?.left} 
              onClick={() => activeNode.paths?.left && onNavigate(activeNode.paths.left)}
              onMouseDown={(e) => e.stopPropagation()}
              title="Go Left"
            >
              ←
            </button>
            
            {/* Split container stacking up and down in the middle column */}
            <div className={styles.verticalAxisGroup}>
              <button 
                className={styles.navCenterUp}
                disabled={!activeNode.paths?.up} 
                onClick={() => activeNode.paths?.up && onNavigate(activeNode.paths.up)}
                onMouseDown={(e) => e.stopPropagation()}
                title="Go Forward"
              >
                ↑
              </button>
              <button 
                className={styles.navCenterDown}
                disabled={!activeNode.paths?.down} 
                onClick={() => activeNode.paths?.down && onNavigate(activeNode.paths.down)}
                onMouseDown={(e) => e.stopPropagation()}
                title="Go Backward"
              >
                ↓
              </button>
            </div>
            
            <button 
              className={styles.navArrow}
              disabled={!activeNode.paths?.right} 
              onClick={() => activeNode.paths?.right && onNavigate(activeNode.paths.right)}
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
            title={isMapVisible ? "Hide Map Overlay" : "Show Map Overlay"}
          >
            🗺️
          </button>
        </div>

        <div className={styles.topControlOverlay}>
          <span className={styles.metaChip}>Fieldwork · 2024</span>
          <span className={styles.metaChip}>{activeNode.name}</span>
        </div>
      </div>

      {activeNode.images?.length > 1 && (
        <div className={styles.thumbnailStripContainer}>
          <span className={styles.stripLabel}>Available Perspectives</span>
          <div className={styles.stripScrollbox}>
            {activeNode.images.map((img, idx) => (
              <button
                key={img.id}
                className={`${styles.thumbCard} ${activeImageIndex === idx ? styles.activeThumb : ''}`}
                onClick={() => setActiveImageIndex(idx)}
                style={{ backgroundImage: `url(${img.src})` }}
              >
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