import styles from "./PortalCard.module.css";
import ResponsiveImage from "../../../components/ResponsiveImage";

export default function PortalCard({
  title,
  description,
  image,
  icon,
  span = 1,
  tint
}) {
  return (
    <div
      className={`${styles.portalCard} ${
        span === 2 ? styles.span2 : ""
      }`}
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

        {icon && (
          <div className={styles.iconBadge}>
            {icon}
          </div>
        )}

        <div className={styles.textContent}>
          <h4 className={styles.cardTitle}>
            {title}
          </h4>

          <p className={styles.cardDescription}>
            {description}
          </p>
        </div>

      </div>

    </div>
  );
}