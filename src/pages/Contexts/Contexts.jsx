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
              <ContextImage image={img} className={styles.headerImage} sizes="(max-width: 900px) 100vw, 900px" />
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

export default function Contexts() {
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
          <a key={s.id} href={`#${s.id}`}>{s.title}</a>
        ))}
      </nav>

      {CONTEXT_SECTIONS.map((s) => <Section key={s.id} section={s} />)}
    </div>
  );
}
