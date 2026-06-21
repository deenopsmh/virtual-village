import React from 'react';
import styles from './NavigationPortals.module.css';

// Importing your selected assets
import img1 from '/src/assets/C to V.JPG';
import img2 from '/src/assets/D to AA.JPG';
import img3 from '/src/assets/D to G.JPG';
import img4 from '/src/assets/D to Sherpur.JPG';

export default function NavigationPortals() {
  return (
    <section className={styles.sectionContainer}>
      {/* SECTION TITLE */}
      <div className={styles.sectionHeader}>
        <span className={styles.subTitle}>Explore the Archive</span>
        <h3 className={styles.mainTitle}>Navigation Portals</h3>
      </div>

      {/* DYNAMIC IMAGE GRID CANVAS */}
      <div className={styles.portalGrid}>
        
        {/* CARD 1: ROAM */}
        <div className={`${styles.portalCard} ${styles.colSpan2} ${styles.h64}`}>
          <div 
            className={styles.cardBg} 
            style={{ backgroundImage: `url(${img1})` }} 
          />
          <div className={styles.gradientOverlay} />
          
          <div className={styles.cardContent}>
            <div className={styles.iconBadge}>🧭</div>
            <div className={styles.textWrapper}>
              <h4 className={styles.cardTitle}>Roam</h4>
              <p className={styles.cardDescription}>
                A first-person immersive walk through the streets of Chainpur as recorded in 2004.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 2: INTERACTIVE MAPS */}
        <div className={`${styles.portalCard} ${styles.colSpan1} ${styles.h64} ${styles.tealTheme}`}>
          <div 
            className={styles.cardBg} 
            style={{ backgroundImage: `url(${img2})` }} 
          />
          <div className={styles.tintOverlay} />
          <div className={styles.watermark}>#</div>
          
          <div className={`${styles.cardContent} ${styles.flexBetween}`}>
            <div>
              <div className={styles.emojiIcon}>🗺️</div>
              <h4 className={styles.cardTitle}>Interactive Maps</h4>
            </div>
            <div>
              <span className={styles.metaBadgeTeal}>GIS / Spatial Data</span>
            </div>
          </div>
        </div>

        {/* CARD 3: THEMATIC TOPICS */}
        <div className={`${styles.portalCard} ${styles.colSpan1} ${styles.h72} ${styles.stoneTheme}`}>
          <div 
            className={styles.cardBg} 
            style={{ backgroundImage: `url(${img3})` }} 
          />
          <div className={styles.lightTintOverlay} />
          
          <div className={`${styles.cardContent} ${styles.flexBetween}`}>
            <div className={styles.emojiIcon}>⏃ ⚄</div>
            <div className={styles.bottomTextWrapper}>
              <h4 className={styles.cardTitle}>Thematic Topics</h4>
              <p className={styles.cardDescription}>
                Explore by religion, caste, agriculture, and infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 4: ORAL HISTORIES */}
        <div className={`${styles.portalCard} ${styles.colSpan2} ${styles.h72} ${styles.terracottaTheme}`}>
          <div 
            className={styles.cardBg} 
            style={{ backgroundImage: `url(${img4})` }} 
          />
          <div className={styles.vignetteOverlay} />
          
          <div className={`${styles.cardContent} ${styles.flexBetween} ${styles.alignEnd}`}>
            <div className={styles.iconBadge}>🎙️</div>
            <div className={`${styles.textWrapper} ${styles.textRight}`}>
              <h4 className={styles.cardTitle}>Oral Histories</h4>
              <p className={styles.cardDescription}>
                Personal testimonies and life stories from the heart of the village.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}