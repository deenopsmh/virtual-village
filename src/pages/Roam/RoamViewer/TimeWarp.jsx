import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ResponsiveImage from '../../../components/ResponsiveImage';
import styles from './TimeWarp.module.css';

/*
 * Time warp: a compact chip in the scene's bottom controls with a small round "portal"
 * showing this same spot in the other era (hover for a bigger peek). Clicking it opens the portal out over the whole
 * scene (an iris), then switches era. The overlay stays until the new photo has
 * loaded, so there's no blank flash in between.
 *
 * Phases: idle → opening (loading the other-era photo) → expanding (iris)
 *         → landing (era switched, waiting for the main photo) → idle
 */

const ERA_ORDER = ['2000s', '2020s']; // oldest first
const OPEN_TIMEOUT_MS = 2500; // give up on the animation if the photo is slow
const LAND_TIMEOUT_MS = 4000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function TimeWarp({ era, otherEra, canWarp, preview, onWarp, isPhotoLoading, containerRef, portalTarget }) {
  const [phase, setPhase] = useState('idle');
  const [warp, setWarp] = useState(null); // { to, src, origin: {x, y}, portrait }
  const portalRef = useRef(null);

  const finish = () => {
    setPhase('idle');
    setWarp(null);
  };

  // Safety nets: never leave the overlay stuck if an image is slow or fails.
  useEffect(() => {
    if (phase === 'opening') {
      const t = setTimeout(() => { onWarp(); finish(); }, OPEN_TIMEOUT_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'expanding') {
      // the year finishes at ~3.2s; switch anyway if animation events never arrive
      const t = setTimeout(() => { onWarp(); setPhase('landing'); }, 4500);
      return () => clearTimeout(t);
    }
    if (phase === 'landing') {
      const t = setTimeout(finish, LAND_TIMEOUT_MS);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const startWarp = () => {
    if (!canWarp || phase !== 'idle') return;
    if (!preview?.src || prefersReducedMotion()) {
      onWarp();
      return;
    }
    const box = containerRef.current?.getBoundingClientRect();
    const p = portalRef.current?.getBoundingClientRect();
    const origin = box && p
      ? { x: p.left + p.width / 2 - box.left, y: p.top + p.height / 2 - box.top }
      : { x: (box?.width || 0) / 2, y: 60 };
    setWarp({ to: otherEra, src: preview.src, origin });
    setPhase('opening');
  };

  const handleOverlaySettled = (status) => {
    if (phase !== 'opening') return;
    if (status === 'loaded') setPhase('expanding');
    else { onWarp(); finish(); }
  };

  // The iris opens, the year holds over a dimmed scene, and only once the year
  // has faded do we switch era. Then the overlay fades when the new photo is in.
  const handleOverlayAnimationEnd = (e) => {
    const name = e.animationName || '';
    if (phase === 'expanding' && name.includes('warpEraTitle')) {
      onWarp();
      setPhase('landing');
    } else if (phase === 'landing' && name.includes('warpLeave') && e.target === e.currentTarget) {
      finish();
    }
  };

  // Once the era has switched and the main photo is in, fade the overlay away.
  const isLeaving = phase === 'landing' && warp && era === warp.to && !isPhotoLoading;

  const goingBack = ERA_ORDER.indexOf(otherEra) < ERA_ORDER.indexOf(era);
  const label = canWarp
    ? `Time warp to the ${otherEra}${preview?.label ? `: ${preview.label}` : ''}`
    : `Time warp unavailable: no ${otherEra} view of this place yet`;

  return (
    <>
      <div className={styles.chipWrap}>
        <button
          type="button"
          className={`${styles.chip} ${goingBack ? styles.toPast : styles.toPresent}`}
          onClick={startWarp}
          disabled={!canWarp || phase !== 'idle'}
          aria-label={label}
          title={canWarp ? undefined : `No ${otherEra} view of this place yet`}
        >
          <span className={styles.portal} ref={portalRef} aria-hidden="true">
            <span className={styles.portalRing} />
            <span className={styles.portalWindow}>
              {canWarp && preview?.src
                ? <ResponsiveImage src={preview.src} alt="" className={styles.portalImage} sizes="160px" />
                : <span className={styles.portalEmpty}>⌛</span>}
            </span>
          </span>
          <span className={styles.chipText}>
            <span className={styles.kicker}>Time warp</span>
            <span className={styles.chipEra}>{canWarp ? `to the ${otherEra}` : `no ${otherEra} yet`}</span>
          </span>
        </button>

        {/* Peek: a larger look at this spot in the other era, only while hovering */}
        {canWarp && preview?.src && (
          <span className={styles.peek} aria-hidden="true">
            <span className={styles.peekWindow}>
              <ResponsiveImage src={preview.src} alt="" className={styles.peekImage} sizes="240px" />
            </span>
            <span className={styles.peekCaption}>
              <span className={styles.peekEras}>{era} → {otherEra}</span>
              Click to see it in the {otherEra}
            </span>
          </span>
        )}
      </div>

      {warp && portalTarget && createPortal(
        <div
          className={`${styles.overlay} ${phase === 'expanding' || phase === 'landing' ? styles.overlayOpen : ''} ${isLeaving ? styles.overlayLeaving : ''} ${warp.to === '2000s' ? styles.overlayPast : ''}`}
          style={{ '--ox': `${warp.origin.x}px`, '--oy': `${warp.origin.y}px` }}
          onAnimationEnd={handleOverlayAnimationEnd}
          aria-hidden="true"
        >
          {/* framed like the viewer: portrait photos whole over a blurred copy, landscape fills */}
          {warp.portrait && (
            <ResponsiveImage src={warp.src} alt="" className={styles.overlayBackdrop} sizes="200px" />
          )}
          <ResponsiveImage
            src={warp.src}
            alt=""
            className={`${styles.overlayImage} ${warp.portrait ? styles.overlayImagePortrait : ''}`}
            sizes="100vw"
            priority
            onLoad={(e) => {
              const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
              if (w && h && h > w) setWarp((cur) => (cur ? { ...cur, portrait: true } : cur));
            }}
            onSettled={handleOverlaySettled}
          />
          <span className={styles.overlayDim} />
          <span className={styles.overlayEra}>{warp.to}</span>
        </div>,
        portalTarget,
      )}
    </>
  );
}
