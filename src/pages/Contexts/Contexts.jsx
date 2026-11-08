import { useEffect } from "react";
import styles from "./Contexts.module.css";
import ResponsiveImage from "../../components/ResponsiveImage";
import { CONTEXT_SECTIONS } from "./contextsData";

function ImagePlaceholder({ file }) {
  return (
    <div className={styles.placeholder} role="img" aria-label="Image not yet available">
      <span className={styles.placeholderLabel}>Image coming soon</span>
      {file && <span className={styles.placeholderFile}>{file}</span>}
    </div>
  );
}

function ContextImage({ image, className, sizes }) {
  const src = image.iiif || image.drive || image.local
    ? { iiif: image.iiif, drive: image.drive, local: image.local }
    : null;
  return (
    <ResponsiveImage
      src={src}
      alt={image.caption || image.callout || ""}
      className={className}
      sizes={sizes}
      fallback={<ImagePlaceholder file={image.file} />}
    />
  );
}

function Section({ section }) {
  const { id, title, header = [], note, paragraphs, sources = [], explore = [] } = section;

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.sectionTitle}>{title}</h2>

      {header.length > 0 && (
        <div className={header.length > 1 ? styles.headerPair : undefined}>
          {header.map((img) => (
            <figure key={img.file} className={styles.headerFigure}>
              <ContextImage image={img} className={styles.headerImage} sizes="(max-width: 768px) 100vw, 80vw" />
              {img.caption && <figcaption className={styles.caption}>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {note && <p className={styles.note}>{note}</p>}

      <div className={styles.prose}>
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {sources.length > 0 && (
        <div className={styles.sources}>
          <h3 className={styles.smallHeading}>{sources.length > 1 ? "Sources" : "Source"}</h3>
          <ul>
            {sources.map((s, i) => (
              <li key={i}>
                {s.text}
                {s.url && (
                  <> <a href={s.url} target="_blank" rel="noreferrer">{new URL(s.url).hostname}</a></>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {explore.length > 0 && (
        <div className={styles.explore}>
          <h3 className={styles.smallHeading}>Things to explore</h3>
          <div className={styles.exploreGrid}>
            {explore.map((item) => (
              <article key={item.file + item.callout} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  <ContextImage image={item} className={styles.cardImage} sizes="(max-width: 640px) 100vw, 360px" />
                </div>
                <div className={styles.cardBody}>
                  {item.era && <span className={styles.era}>{item.era}</span>}
                  <h4 className={styles.cardTitle}>{item.callout}</h4>
                  {item.description && <p className={styles.cardText}>{item.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Smooth-scroll to a section. Images above the target can finish loading while we
// scroll and push it down, so re-check where it landed and correct (a couple of times).
function scrollToSection(id, { smooth = true } = {}) {
  const target = document.getElementById(id);
  if (!target) return;
  const behavior = smooth && !prefersReducedMotion() ? "smooth" : "auto";
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  let corrections = 2;

  const check = () => {
    const offset = target.getBoundingClientRect().top - margin;
    if (Math.abs(offset) > 4 && corrections-- > 0) {
      target.scrollIntoView({ behavior, block: "start" });
      waitForScrollEnd(check);
    }
  };

  target.scrollIntoView({ behavior, block: "start" });
  waitForScrollEnd(check);
}

function waitForScrollEnd(callback) {
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", finish);
    callback();
  };
  if ("onscrollend" in window) window.addEventListener("scrollend", finish, { once: true });
  setTimeout(finish, 1200); // browsers without scrollend, or no scroll needed
}

export default function Contexts() {
  // Opening /contexts#banaras (shared link, back button) lands on that section.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) scrollToSection(id, { smooth: false });
  }, []);

  const handleTocClick = (e, id) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let "open in new tab" work
    e.preventDefault();
    window.history.replaceState(window.history.state, "", `#${id}`);
    scrollToSection(id);
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.overline}>Where to start</span>
        <h1 className={styles.title}>Contexts</h1>
        <p className={styles.subtitle}>
          Chainpur within its landscape, its nexus of villages, Bihar, Banaras, India, and the wider world.
        </p>
      </header>

      <nav className={styles.toc} aria-label="Contexts sections">
        {CONTEXT_SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={(e) => handleTocClick(e, s.id)}>{s.title}</a>
        ))}
      </nav>

      {CONTEXT_SECTIONS.map((s) => <Section key={s.id} section={s} />)}
    </div>
  );
}
