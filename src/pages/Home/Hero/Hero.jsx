import React from 'react';
import styles from './Hero.module.css';

import img1 from '/src/assets/C to V.JPG';
import img2 from '/src/assets/D to AA.JPG';
import img3 from '/src/assets/D to G.JPG';
import img4 from '/src/assets/D to Sherpur.JPG';
import img5 from '/src/assets/EE east 1.JPG';
import img6 from '/src/assets/EE east 2.JPG';
import img7 from '/src/assets/EE east detail 1.JPG';
import img8 from '/src/assets/EE east detail 2.JPG';
import img9 from '/src/assets/EE east enter.JPG';
import img10 from '/src/assets/G to D.JPG';
import img11 from '/src/assets/G to K.JPG';
import img12 from '/src/assets/G to UH.JPG';

// const STATIC_GRID = [
//   { id: 1, span: 'span 3', img: img1 },
//   { id: 2, span: 'span 4', img: img2 },
//   { id: 3, span: 'span 3', img: img3 },
//   { id: 4, span: 'span 5', img: img4 },
//   { id: 5, span: 'span 4', img: img5 },
//   { id: 6, span: 'span 3', img: img6 },
//   { id: 7, span: 'span 5', img: img7 },
//   { id: 8, span: 'span 4', img: img8 },
//   { id: 9, span: 'span 3', img: img9 },
//   { id: 10, span: 'span 4', img: img10 },
//   { id: 11, span: 'span 3', img: img11 },
//   { id: 12, span: 'span 5', img: img12 },
// ];

// const MASONRY_ITEMS = [...STATIC_GRID, ...STATIC_GRID, ...STATIC_GRID];
const MASONRY_ITEMS = [];

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
    <div className={styles.masonryGrid}>
      {MASONRY_ITEMS.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className={styles.masonryItem}
          style={{ gridRowEnd: item.span }}
        >
          <img
            src={item.img}
            alt=""
            className={styles.masonryImage}
          />
        </div>
      ))}
    </div>

      <div className={styles.overlay} />

      <div className={styles.contentContainer}>
        <span className={styles.smallHeader}>An immersion into the living history of Bihar</span>
        <h1 className={styles.mainHeader}>A Virtual Village</h1>
        
        <div className={styles.ctaGroup}>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Start Roaming</button>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>Learn About the Project</button>
        </div>
      </div>
    </section>
  );
}