// Relative Roam navigation (Peter, Nov 1 2026): arrows act relative to the way
// you are facing, not compass directions.
//
// A view "X-to-Y" means: standing at waypoint X, looking toward Y. Its heading
// comes from the two waypoints' map positions.
//
//   left / right  turn ~90° while standing at X        -> another view from X
//   turn around   face the opposite way at X           -> another view from X
//   forward (up)  walk to Y, keep facing most-straight -> a view from Y
//   back (down)   step back one waypoint, same facing  -> a view that ends at X
//
// Single-point views (e.g. "E") have no heading; they keep the hand-set `paths`
// from roamNetwork.js.

const TURN_WINDOW = [30, 150]; // |angle| range that counts as a left/right turn
const AROUND_MIN = 150;        // |angle| at least this counts as turning around
const STRAIGHT_MAX = 85;       // forward/back may bend at most this much
const JUNCTION_MAX = 135;      // at a T-junction, forward may turn up to this much

const norm = (deg) => {
  let d = ((deg + 180) % 360 + 360) % 360 - 180;
  if (d === -180) d = 180;
  return d;
};

export function createNavigator(data, points) {
  const pos = (id) => points[id]?.mapPosition;

  const heading = (id) => {
    const ep = data[id]?.mapEndpoints;
    const a = pos(ep?.from);
    const b = pos(ep?.to);
    if (!a || !b) return null;
    // screen coords (y down): +90 = turning right, -90 = turning left
    return (Math.atan2(b.top - a.top, b.left - a.left) * 180) / Math.PI;
  };

  const isPointView = (id) => Boolean(data[id] && heading(id) === null);

  const viewsFrom = (pointId) =>
    Object.keys(data).filter((id) => data[id]?.mapEndpoints?.from === pointId && heading(id) !== null);
  const viewsTo = (pointId) =>
    Object.keys(data).filter((id) => data[id]?.mapEndpoints?.to === pointId && heading(id) !== null);

  const best = (candidates, base, test, target) => {
    let pick = null;
    let score = Infinity;
    for (const id of candidates) {
      const delta = norm(heading(id) - base);
      if (!test(delta)) continue;
      const s = Math.abs(delta - target);
      if (s < score) { score = s; pick = id; }
    }
    return pick;
  };

  return function getMoves(id) {
    const node = data[id];
    const h = heading(id);
    if (!node || h === null) {
      // single-point view: hand-set arrows, mapped onto the relative controls
      const p = node?.paths || {};
      return { forward: p.up || null, back: p.down || null, left: p.left || null, right: p.right || null, around: null };
    }

    const { from, to } = node.mapEndpoints;
    const here = viewsFrom(from).filter((v) => v !== id);

    const left = best(here, h, (d) => d <= -TURN_WINDOW[0] && d >= -TURN_WINDOW[1], -90);
    const right = best(here, h, (d) => d >= TURN_WINDOW[0] && d <= TURN_WINDOW[1], 90);
    let around = best(here, h, (d) => Math.abs(d) >= AROUND_MIN, 180);
    if (!around && isPointView(from)) around = from; // e.g. E-to-D: turn around to face E

    const ahead = viewsFrom(to).filter((v) => data[v].mapEndpoints.to !== from);
    let forward = best(ahead, h, (d) => Math.abs(d) <= STRAIGHT_MAX, 0);
    if (!forward && isPointView(to)) forward = to; // arrive at a single-point view (e.g. D-to-E -> E)
    if (!forward) forward = best(ahead, h, (d) => Math.abs(d) <= JUNCTION_MAX, 0); // T-junction: take the gentler turn

    const behind = viewsTo(from).filter((v) => data[v].mapEndpoints.from !== to);
    const back = best(behind, h, (d) => Math.abs(d) <= STRAIGHT_MAX, 0);

    return { forward, back, left, right, around };
  };
}
