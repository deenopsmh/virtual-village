import { useMemo, useState } from "react";

/*
 * ResponsiveImage — renders an image from whichever source is available.
 *
 * `src` may be:
 *   - a string (legacy):  local path ("VV3 Images - Copy/A to B"), a IIIF
 *     manifest/image URL, or any other absolute URL
 *   - an object:          { iiif, drive, local }  — tried in that order
 *       iiif:  AM Quartex item ID (UUID) or manifest URL
 *       drive: Google Drive file ID (file must be shared "Anyone with the link")
 *       local: path under src/assets/VV3 Images - Copy (temporary fallback)
 *
 * If a source fails to load, the next one is tried. If all fail, `fallback`
 * (or nothing) is rendered.
 */

const SIZES = [400, 800, 1200, 1600, 1920];
const IIIF_ROOT = "https://iiif.quartexcollections.com/wesleyan/iiif";

const isRemoteUrl = (s) => /^https?:\/\//i.test(s);

// AM Quartex manifest IDs match the image-service IDs, so a manifest URL can be
// turned straight into an Image API base without fetching the manifest first.
function iiifBase(value) {
  if (!value) return null;
  if (!isRemoteUrl(value)) return `${IIIF_ROOT}/${value}`;
  return value.replace(/\/manifest\/?$/, "").replace(/\/full\/.*$/, "");
}

function localBase(src) {
  const clean = src
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^(src\/assets\/|assets\/|VV3 Images - Copy\/)/, "")
    .replace(/\.[^/.]+$/, "");
  return `/images/optimized/${clean.split("/").map(encodeURIComponent).join("/")}`;
}

// Each candidate: { src, srcSet, sources? } ready to hand to <img>/<picture>.
function buildCandidates(src) {
  if (!src) return [];
  const spec =
    typeof src === "string"
      ? isRemoteUrl(src)
        ? /\/iiif\/|\/manifest/.test(src) ? { iiif: src } : { url: src }
        : { local: src }
      : src;

  const out = [];

  if (spec.iiif) {
    const base = iiifBase(spec.iiif);
    out.push({
      kind: "iiif",
      src: `${base}/full/800,/0/default.jpg`,
      srcSet: SIZES.map((w) => `${base}/full/${w},/0/default.jpg ${w}w`).join(", "),
    });
  }

  if (spec.drive) {
    const u = (w) => `https://drive.google.com/thumbnail?id=${encodeURIComponent(spec.drive)}&sz=w${w}`;
    out.push({
      kind: "drive",
      src: u(1200),
      srcSet: SIZES.map((w) => `${u(w)} ${w}w`).join(", "),
    });
  }

  if (spec.url) out.push({ kind: "url", src: spec.url });

  if (spec.local) {
    const base = localBase(spec.local);
    out.push({
      kind: "local",
      src: `${base}/800.webp`,
      srcSet: SIZES.map((w) => `${base}/${w}.webp ${w}w`).join(", "),
      avif: SIZES.map((w) => `${base}/${w}.avif ${w}w`).join(", "),
    });
  }

  return out;
}

export default function ResponsiveImage({
  src,
  alt = "",
  className = "",
  width,
  height,
  sizes = "100vw",
  loading = "lazy",
  priority = false,
  style = {},
  fallback = null,
  onError,
  ...props
}) {
  const key = typeof src === "string" ? src : JSON.stringify(src || {});
  const candidates = useMemo(() => buildCandidates(src), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  // Which candidate we're on; resets automatically when `src` changes.
  const [attempt, setAttempt] = useState({ key, index: 0 });
  const index = attempt.key === key ? attempt.index : 0;

  const current = candidates[index];
  if (!current) return fallback;

  const handleError = (e) => {
    setAttempt({ key, index: index + 1 });
    onError?.(e);
  };

  const imgProps = {
    src: current.src,
    srcSet: current.srcSet,
    sizes: current.srcSet ? sizes : undefined,
    alt,
    className,
    width,
    height,
    loading: priority ? "eager" : loading,
    fetchPriority: priority ? "high" : "auto",
    decoding: priority ? "sync" : "async",
    referrerPolicy: current.kind === "drive" ? "no-referrer" : undefined,
    onError: handleError,
    style: { contentVisibility: priority ? "visible" : "auto", ...style },
    ...props,
  };

  if (current.kind === "local") {
    return (
      <picture key={current.src}>
        <source type="image/avif" srcSet={current.avif} sizes={sizes} />
        <source type="image/webp" srcSet={current.srcSet} sizes={sizes} />
        <img {...imgProps} />
      </picture>
    );
  }

  return <img key={current.src} {...imgProps} />;
}
