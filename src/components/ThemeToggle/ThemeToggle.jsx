import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({ darkMode, setDarkMode, className = "" }) {
  return (
    <button
      className={`${styles.themeToggle} ${className}`}
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}