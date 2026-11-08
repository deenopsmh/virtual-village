import { useEffect, useRef, useState } from 'react';
import ResponsiveImage from '../../../components/ResponsiveImage';
import styles from './TimeWarp.module.css';

/*
 * Time warp: a timeline at the top of the scene with a round "portal" that shows
 * this same spot in the other era. Clicking it opens the portal out over the whole
 * scene (an iris), then switches era. The overlay stays until the new photo has
 * loaded, so there's no blank flash in between.
 *
 * Phases: idle → opening (loading the other-era photo) → expanding (iris)
 *         → landing (era switched, waiting for the main photo) → idle
 */

const ERA_ORDER = ['2000s', '2020s'];
const OPEN_TIMEOUT_MS = 2500; // give up on the animation if the photo is slow
const LAND_TIMEOUT_MS = 4000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function TimeWarp({ era, otherEra, canWarp, preview, onWarp, isPhotoLoading, containerRef, isMapVisible }) {
  const [phase, setPhase] = useState('idle');
  const [warp, setWarp] = useState(null); // { to, src, origin: {x, y} }
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

  const handleOverlayAnimationEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (phase === 'expanding') {
      onWarp();
      setPhase('landing');
    } else if (phase === 'landing') {
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
      <div className={`${styles.dock} ${isMapVisible ? styles.withMap : ''} ${canWarp ? '' : styles.dockDisabled}`} onMouseDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`${styles.warpButton} ${goingBack ? styles.toPast : styles.toPresent}`}
          onClick={startWarp}
          disabled={!canWarp || phase !== 'idle'}
          aria-label={label}
          title={canWarp ? undefined : `No ${otherEra} view of this place yet`}
        >
          <span className={styles.kicker}>Time warp</span>
          <span className={styles.timeline} aria-hidden="true">
            {ERA_ORDER.map((e, i) => (
              <span key={e} className={styles.timelineGroup}>
                {i > 0 && (
                  <span className={styles.track}>
                    <span className={`${styles.knob} ${era === '2000s' ? styles.knobLeft : styles.knobRight}`} />
                  </span>
                )}
                <span className={`${styles.eraLabel} ${e === era ? styles.eraCurrent : ''}`}>{e}</span>
              </span>
            ))}
          </span>

          {canWarp && preview?.src && (
            <span className={styles.portal} ref={portalRef} aria-hidden="true">
              <span className={styles.portalRing} />
              <span className={styles.portalWindow}>
                <ResponsiveImage src={preview.src} alt="" className={styles.portalImage} sizes="160px" />
              </span>
              <span className={styles.portalCaption}>See it in the {otherEra}</span>
            </span>
          )}
        </button>
        {!canWarp && <span className={styles.unavailable}>No {otherEra} view here yet</span>}
      </div>

      {warp && (
        <div
          className={`${styles.overlay} ${phase === 'expanding' || phase === 'landing' ? styles.overlayOpen : ''} ${isLeaving ? styles.overlayLeaving : ''} ${warp.to === '2000s' ? styles.overlayPast : ''}`}
          style={{ '--ox': `${warp.origin.x}px`, '--oy': `${warp.origin.y}px` }}
          onAnimationEnd={handleOverlayAnimationEnd}
          aria-hidden="true"
        >
          <ResponsiveImage
            src={warp.src}
            alt=""
            className={styles.overlayImage}
            sizes="100vw"
            priority
            onSettled={handleOverlaySettled}
          />
          <span className={styles.overlayEra}>{warp.to}</span>
        </div>
      )}
    </>
  );
}
