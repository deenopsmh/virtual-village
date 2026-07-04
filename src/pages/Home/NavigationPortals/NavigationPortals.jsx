import React from 'react';
import styles from './NavigationPortals.module.css';
import PortalCard from "./PortalCard";

// Importing your selected assets
import img1 from '/src/assets/C to V.JPG';
import img2 from '/src/assets/D to AA.JPG';
import img3 from '/src/assets/D to G.JPG';
import img4 from '/src/assets/D to Sherpur.JPG';
import img5 from '/src/assets/D to Sherpur.JPG';

export default function NavigationPortals() {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <span className={styles.subTitle}>
          Explore the Archive
        </span>

        <h3 className={styles.mainTitle}>
          Navigation Portals
        </h3>
      </div>

      <div className={styles.portalGrid}>
        <PortalCard
          span={2}
          image={img1}
          icon="🧭"
          title="Roam"
          tint="rgba(97, 35, 2, 0.57)"

          description="A first-person, immersive walk through the streets of Chainpur allowing alternating views between the 2000s and the 2020s."
        />

        <PortalCard
          image={img2}
          icon="🗺️"
          title="Interactive Maps"
          tint="rgba(8, 20, 73, 0.5)"

          description="Discover important locations, landmarks, and how the village has evolved geographically."
        />

        <PortalCard
          image={img3}
          icon="📑"
          title="Thematic Topics"
          tint="rgba(70,50,20,.45)"

          description="Explore by religion, caste, agriculture, infrastructure, education, and daily life."
        />

        <PortalCard
          image={img1}
          icon="📚"
          tint="rgba(36, 90, 15, 0.5)"

          title="Scholarly Histories & Archive"
          description="Research papers, archival records, census documents, historical references, and academic resources."
        />

        <PortalCard
          image={img4}
          icon="🎙️"
          title="Oral Histories"
          description="Personal testimonies and life stories from the heart of the village."
        />
      </div>
    </section>
  );
}