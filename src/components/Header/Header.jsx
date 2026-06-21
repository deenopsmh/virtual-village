import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const location = useLocation();

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/roam", label: "Roam" },
    { to: "/maps", label: "Maps" },
    { to: "/topics", label: "Topics" },
    { to: "/my-life", label: "My Life" },
    { to: "/resources", label: "Resources" },
  ];

  /* close menu on route change */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* lock scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  /* theme toggle */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className={styles.header}>

      {/* LOGO */}
      <Link to="/">
        <div className={styles["logo-container"]}>
          <img src={logo} className={styles.logo} alt="logo" />
          <div className={styles["logo-text"]}>
            <span>A Virtual Village</span>
            <h1>Chainpur, Bihar</h1>
          </div>
        </div>
      </Link>

      {/* DESKTOP NAV */}
      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* THEME TOGGLE */}
      <button
        onClick={() => setDarkMode((p) => !p)}
        style={{
          marginLeft: "1rem",
          background: "none",
          border: "1px solid var(--border-color)",
          color: "var(--text-main)",
          padding: "6px 10px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* BURGER */}
      <button
        className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* OVERLAY */}
      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlayActive : ""
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`${styles.mobileMenu} ${
          isOpen ? styles.open : ""
        }`}
      >
        <div className={styles["nav-text-container"]}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

    </header>
  );
}