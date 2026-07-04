import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    true
    //   () => {
  //   return localStorage.getItem("theme") === "dark";
  // }
);

  const location = useLocation();

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/roam", label: "Roam" },
    { to: "/topics", label: "Topics" },
    { to: "/maps", label: "Maps" },
    { to: "/history", label: "History" },
    { to: "/resources", label: "Resources" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Locks the scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // Triggers dark/light mode on click
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

      <Link to="/">
        <div className={styles["logo-container"]}>
          {/* <img src={logo} className={styles.logo} alt="A Virtual Village Logo" /> */}
          <div className={styles["logo-text"]}>
            <span>A Virtual Village</span>
            <h1>Chainpur, Bihar</h1>
          </div>
        </div>
      </Link>

      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.desktopToggle}>
        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>

      <button
        className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlayActive : ""
        }`}
        onClick={() => setIsOpen(false)}
      />

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
            
        <div className={styles.mobileToggle}>
          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>

        </div>
      </div>

    </header>
  );
}