import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Start each page at the top. Moving within one section (e.g. Roam's paths and views)
// keeps your scroll position, and links to a #section are left to that page.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const section = pathname.split("/")[1] || "";
  const prev = useRef(section);

  useEffect(() => {
    if (prev.current !== section && !hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    prev.current = section;
  }, [section, hash]);

  return null;
}
