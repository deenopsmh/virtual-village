import React from 'react';
import styles from './NavigationPortals.module.css';
import PortalCard from "./PortalCard";
import ResponsiveImage from '../../../components/ResponsiveImage';


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
          image="VV3 Images - Copy\G to K EDIT.JPG"
          icon="🧭"
          title="Roam"
          tint="rgba(97, 35, 2, 0.57)"

          description="A first-person, immersive walk through the streets of Chainpur allowing alternating views between the 2000s and the 2020s."
        />

        <PortalCard
          image="VV3 Images - Copy\VV3 map 11Jl26 CROP.JPG"
          icon="🗺️"
          title="Interactive Maps"
          tint="rgba(8, 20, 73, 0.5)"

          description="Discover important locations, landmarks, and how the village has evolved geographically."
        />

        <PortalCard
          image="VV3 Images - Copy\AA to D Shyam Babu_s store\AA to D Shyam Babu_s store gesticulations.JPG"
          icon="📑"
          title="Thematic Topics"
          tint="rgba(70,50,20,.45)"

          description="Explore by religion, caste, agriculture, infrastructure, education, and daily life."
        />

        <PortalCard
          image="VV3 Images - Copy\Sayyid family masjid structure from courtyard.JPG"
          icon="📚"
          tint="rgba(36, 90, 15, 0.5)"

          title="Scholarly Histories & Archive"
          description="Historical materials from more than two centuries of village life and a professional historian's account."
        />

        <PortalCard
          image="VV3 Images - Copy\prem in action.JPG"
          icon="🎙️"
          title="Oral Histories"
          description="Personal testimonies and life stories from the heart of the village."
        />
      </div>
    </section>
  );
}