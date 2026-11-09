import { Link } from "react-router-dom";
import styles from "./PortalCard.module.css";
import ResponsiveImage from "../../../components/ResponsiveImage";

// A whole-card link: photo, a big title, one line of what's inside, and an "Explore" cue.
export default function PortalCard({
  title,
  description,
  image,
  to,
  cta = "Explore",
  span = 1,
  tint,
}) {
  return (
    <Link
      to={to}
      className={`${styles.portalCard} ${span === 2 ? styles.span2 : ""}`}
    >
      <ResponsiveImage
        src={image}
        alt=""
        className={styles.cardBg}
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* a light touch of the card's colour, plus a fade at the bottom so the text reads */}
      <div className={styles.tint} style={{ backgroundColor: tint || "transparent" }} />
      <div className={styles.overlay} />

      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <p className={styles.cardDescription}>{description}</p>
        <span className={styles.cta}>
          {cta} <span className={styles.arrow} aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
