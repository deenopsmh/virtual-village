import React from 'react';
import styles from './ArchiveIntro.module.css';

export default function ArchiveIntro() {
  return (
    <section className={styles.sectionContainer}>
      {/* LEFT COLUMN: INVESTIGATORS */}
      <div className={styles.investigatorsCol}>
        {/* Responsive Header */}
        <h2 className={styles.sectionHeader}>Principal Investigators</h2>
        
        {/* Cards wrapper handling the responsive column structures */}
        <div className={styles.cardsWrapper}>
          {/* Peter Gottschalk - Wesleyan Red */}
          <div className={`${styles.investigatorCard} ${styles.wesleyan}`}>
            <h4 className={styles.investigatorName}>Peter Gottschalk</h4>
            <span className={styles.institution}>Wesleyan University</span>
          </div>

          {/* Mathew Schmalz - Holy Cross Purple */}
          <div className={`${styles.investigatorCard} ${styles.holyCross}`}>
            <h4 className={styles.investigatorName}>Mathew Schmalz</h4>
            <span className={styles.institution}>College of the Holy Cross</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: MAIN DESCRIPTION */}
      <div className={styles.contentCol}>
        <h3 className={styles.mainHeading}>The Archive Project</h3>
        <hr className={styles.divider} />
        
        <div className={styles.textGroup}>
          <p>
            The Chainpur Archive is a multi-dimensional digital humanities project that 
            documents the social, religious, and spatial landscape of a village in rural 
            Bihar. Since 2004, this ongoing longitudinal study has tracked the subtle and 
            seismic shifts in community life.
          </p>
          <p>
            By integrating oral histories, high-resolution GIS mapping, and granular 
            field photography, we offer a scholarly window into the complexities of North 
            Indian village life. This virtual space invites you to navigate the intersecting 
            narratives of caste, faith, and progress.
          </p>
        </div>
        
        <div className={styles.linkWrapper}>
          <a href="#" className={styles.methodologyLink}>
            Read the Full Methodology <span className={styles.arrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}