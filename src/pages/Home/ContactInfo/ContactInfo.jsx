import React from 'react';
import styles from './ContactInfo.module.css';
export default function ContactInfo() {
  return (
    <section className={styles.sectionContainer}>

      <div className={styles.footer_column}>
        <h3 className={styles.mainTitle}>Contact & Inquiry</h3>

        <div className={styles.contactMethods}>
          <div className={styles.methodGroup}>
            <a href="mailto:pgottschalk@wesleyan.edu" className={styles.methodLink}>
              pgottschalk@wesleyan.edu
            </a>

            <a href="mailto:mschmalz@holycross.edu" className={styles.methodLink}>
              mschmalz@holycross.edu
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footer_column}>
        <h3 className={styles.mainTitle}>Institutional Anchors</h3>

        <div className={styles.detailsGrid}>
          <address className={styles.addressText}>
            <strong>College of the Holy Cross</strong><br />
            Global South Asian Studies Program  <br/>
            Department of Religious Studies<br />
            Worcester, MA 01610
          </address>

          <address className={`${styles.addressText} ${styles.topSpacing}`}>
            <strong>Wesleyan University</strong><br />
            Department of Religion<br />
            Middletown, CT 06459
          </address>
        </div>
      </div>

      <div className={styles.footer_column}>
        <h3 className={styles.mainTitle}>Project Attribution</h3>

        <div className={styles.footerBranding}>
          
          <p>© 2026 The Chainpur Archive Project. All rights reserved.</p>

          <p>
            Supported in part by grants from partner academic institutions.
          </p>
        </div>
      </div>

    </section>
  );
}