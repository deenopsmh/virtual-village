import React from 'react';
import styles from './ContactInfo.module.css';

export default function ContactInfo() {
  return (
    <section className={styles.sectionContainer}>
      {/* LEFT COLUMN: PRIMARY CONTACT CHANNELS */}
      <div className={styles.contactMetaCol}>
        <span className={styles.sectionHeader}>Get In Touch</span>
        <h3 className={styles.mainTitle}>Contact & Inquiry</h3>
        
        <div className={styles.contactMethods}>
          {/* Email Channel */}
          <div className={styles.methodGroup}>
            <span className={styles.methodLabel}>General Inquiries</span>
            <a href="mailto:archive@holycross.edu" className={styles.methodLink}>
              archive@holycross.edu
            </a>
          </div>

          {/* Alternative Institutional/Research Channel */}
          <div className={styles.methodGroup}>
            <span className={styles.methodLabel}>Media & Permissions</span>
            <a href="mailto:pgottschalk@wesleyan.edu" className={styles.methodLink}>
              pgottschalk@wesleyan.edu
            </a>
          </div>

          {/* Central Phone Line */}
          <div className={styles.methodGroup}>
            <span className={styles.methodLabel}>Research Office</span>
            <span className={styles.staticDetail}>+1 (508) 793-2449</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: INSTITUTIONAL DETAILS & METADATA */}
      <div className={styles.detailsCol}>
        <div className={styles.detailsGrid}>
          
          {/* Institutional Locations */}
          <div className={styles.infoBlock}>
            <h4 className={styles.blockTitle}>Institutional Anchors</h4>
            <address className={styles.addressText}>
              <strong>College of the Holy Cross</strong><br />
              Department of Religious Studies<br />
              Worcester, MA 01610
            </address>
            <address className={`${styles.addressText} ${styles.topSpacing}`}>
              <strong>Wesleyan University</strong><br />
              Department of Religion<br />
              Middletown, CT 06459
            </address>
          </div>

          {/* Project Parameters / Hours */}
          <div className={styles.infoBlock}>
            <h4 className={styles.blockTitle}>Archive Access Hours</h4>
            <p className={styles.blockText}>
              The digital processing queue and physical manuscript access are managed 
              cooperatively during standard academic terms:
            </p>
            <ul className={styles.hoursList}>
              <li><span>Monday – Friday:</span> 9:00 AM – 4:00 PM EST</li>
              <li><span>Saturday – Sunday:</span> Closed to external review</li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Note */}
        <div className={styles.footerBranding}>
          <p>© 2026 The Chainpur Archive Project. All rights reserved.</p>
          <p className={styles.fundingNote}>
            Supported in part by grants from the [] and partner academic institutions.
          </p>
        </div>
      </div>
    </section>
  );
}