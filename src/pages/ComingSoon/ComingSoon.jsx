import { Link } from "react-router-dom";
import styles from "./ComingSoon.module.css";

// Placeholder for sections that are planned but not built yet (Topics, Maps, History,
// Resources), and the "page not found" screen. Always offers a way onward.
export default function ComingSoon({ title, description, notFound = false }) {
  return (
    <main className={styles.page}>
      <span className={styles.overline}>{notFound ? "Page not found" : "Coming soon"}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{description}</p>

      <div className={styles.actions}>
        <Link to="/roam" className={`${styles.btn} ${styles.primary}`}>Roam the village</Link>
        <Link to="/contexts" className={styles.btn}>Read the Contexts</Link>
        <Link to="/" className={styles.btn}>Home</Link>
      </div>
    </main>
  );
}
