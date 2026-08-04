import React from 'react';
import styles from './About.module.css';
import ResponsiveImage from '../../components/ResponsiveImage';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.heroSection}>
        <span className={styles.overlineHeader}>Project Overview</span>
        <h1 className={styles.mainTitle}>About A Virtual Village</h1>
        <p className={styles.subtitle}>
          Resuscitating and expanding a unique digital humanities platform exploring the 
          material, environmental, and cultural realities of rural North India.
        </p>
      </section>

      <section className={styles.splitContentSection}>
        <div className={styles.textContent}>
          <h2>The Evolution of the Project</h2>
          <p>
            First launched in 2000 using standard HTML-code and evolved in 2004 using Flash technology, 
            <strong> A Virtual Village</strong> serves as a critical pedagogical resource for college-level 
            studies of rural India. While most academic works narrow their lens to urban hubs or 
            isolated facets of village life (such as solely economics or history), this platform emphasizes 
            broad cultural contexts that cannot be separated from material and environmental realities.
          </p>
          <p>
            Developed by Peter Gottschalk (Wesleyan University) and Mathew Schmalz (College of the Holy Cross), 
            the platform is built entirely upon over twenty-five years of research in 
            <strong> Chainpur</strong>—a village located in the state of Bihar, India.
          </p>
          <h3>Transitioning to Version 3.0</h3>
          <p>
            While the second iteration of this site utilized the pseudonym "Arampur," Version 3.0 restores 
            the actual name of the village, Chainpur The most compelling feature of this newly updated 
            platform is the ability to seamlessly toggle between the images, descriptions, and oral histories 
            of 2004 and the modern day, allowing researchers to evaluate two decades of environmental and 
            societal transformations
          </p>
        </div>

        <div className={styles.imageWrapper}>

            <ResponsiveImage 
            src="VV3 Images - Copy/A to B.jpg" 
            alt="Historical landscape of Chainpur, Bihar" 
            className={styles.aboutImage}
          />
          <br/>
          <ResponsiveImage 
            src="VV3 Images - Copy/AA to BB.jpg" 
            alt="Historical landscape of Chainpur, Bihar" 
            className={styles.aboutImage}
/>

        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2>Interactive Platforms & Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h4>🗺️ Roam & Navigate</h4>
            <p>Virtually travel through Chainpur’s streets, enter local shops, homes, or Sufi temples, and interview residents in English, Hindi, Urdu, or Bhojpuri.</p>
          </div>
          <div className={styles.featureCard}>
            <h4>📸 My Life Project</h4>
            <p>Disposable cameras given directly to five Chainpur residents capture self-curated photographic journals of day-to-day life and localized perspectives.</p>
          </div>
          <div className={styles.featureCard}>
            <h4>📜 Thematic Deep Dives</h4>
            <p>Comprehensive pages dedicated to the deep histories of gender roles, regional dialects, agricultural economies, and architectural heritage.</p>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* ACKNOWLEDGEMENTS SECTION */}
      <section className={styles.acknowledgementsSection}>
        <h3>Project Credits & Acknowledgments</h3>
        <div className={styles.creditsMeta}>
          <p><strong>Dr. Peter Gottschalk</strong> — Project Director & Professor of Religion, Wesleyan University</p>
          <p><strong>Dr. Mathew Schmalz</strong> — Co-Collaborator & Professor of Religious Studies, College of the Holy Cross </p>
        </div>
        <p className={styles.acknowledgementsText}>
          This multi-year endeavor was made possible through the generous support of our funding agencies, institutional partners, and the enduring hospitality of the residents of Chainpur. We would like to extend our deepest gratitude to [Rachel, Charlie, Francesca, Mohammad] and the entire digital humanities development framework team whose expertise in system resuscitation brought this archive back to the open web.
        </p>
      </section>
    </div>
  );
}