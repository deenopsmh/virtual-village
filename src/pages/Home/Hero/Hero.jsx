import React from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

import ResponsiveImage from "../../../components/ResponsiveImage";

export default function Hero() {
    return (
        <section className={styles.heroContainer}>
            <ResponsiveImage
                src="VV3 Images - Copy/Collage behind title.jpg"
                alt=""
                priority
                className={styles.heroBackground}
                sizes="100vw"
            />

            <div className={styles.overlay} />
            
            <div className={styles.contentContainer}>
                <span className={styles.smallHeader}>
                    An immersion into the living history of Bihar
                </span>

                <h1 className={styles.mainHeader}>
                    A Virtual Village
                </h1>

                <div className={styles.ctaGroup}>
                    <Link to="/roam" className={`${styles.btn} ${styles.btnPrimary}`}>
                        Start Roaming
                    </Link>

                    <button className={`${styles.btn} ${styles.btnSecondary}`}>
                        Learn About the Project
                    </button>
                </div>
            </div>

        </section>
    );
}