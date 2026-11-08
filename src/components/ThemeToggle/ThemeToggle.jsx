import styles from "./ThemeToggle.module.css";

// Quiet icon button: shows the mode you'd switch TO (sun in dark mode, moon in light mode).
export default function ThemeToggle({ darkMode, setDarkMode, className = "" }) {
  const label = darkMode ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${className}`}
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label={label}
      title={label}
    >
      <svg
        key={darkMode ? "sun" : "moon"}
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {darkMode ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  );
}
