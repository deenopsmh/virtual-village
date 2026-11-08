// Turns sheet rows + the waypoint network into the ROAM_DATA shape the viewer uses.
// Returns { data, errors, warnings } — callers decide whether errors are fatal.
import { TYPES, ERAS, parsePoint } from "./schema.mjs";

function imageFrom(row) {
  const src = {};
  if (row["Image IIIF ID"]) src.iiif = row["Image IIIF ID"];
  if (row["Image Drive ID"]) src.drive = row["Image Drive ID"];
  if (row["Image Local"]) src.local = row["Image Local"];
  if (!Object.keys(src).length) return [];
  const focus = parsePoint(row["Focus Point"]);
  return [{ src, title: row["Image Title"] || "", focus_point: focus || "" }];
}

export function assemble(rows, network) {
  const errors = [];
  const warnings = [];
  const where = (r) => `line ${r.__line} (${r.ID || "no ID"}, ${r.Era || "no era"})`;

  // --- validate rows -------------------------------------------------------
  const seen = new Set();
  const byId = new Map(); // ID -> { rows: [], children: [] }
  for (const r of rows) {
    if (!r.ID) { errors.push(`${where(r)}: missing ID`); continue; }
    if (!ERAS.includes(r.Era)) errors.push(`${where(r)}: Era must be one of ${ERAS.join(", ")}`);
    if (!TYPES.includes(r.Type)) errors.push(`${where(r)}: Type must be one of ${TYPES.join(", ")}`);
    const k = `${r.ID}|${r.Era}`;
    if (seen.has(k)) errors.push(`${where(r)}: duplicate ID + Era`);
    seen.add(k);
    if (r["Focus Point"] && parsePoint(r["Focus Point"]) === undefined) errors.push(`${where(r)}: Focus Point should look like "38.7, 47.9"`);
    if (r.Hotspot && parsePoint(r.Hotspot) === undefined) errors.push(`${where(r)}: Hotspot should look like "38.7, 47.9"`);
    if (!byId.has(r.ID)) byId.set(r.ID, { rows: [], children: [] });
    byId.get(r.ID).rows.push(r);
  }

  for (const [id, entry] of byId) {
    const first = entry.rows[0];
    const types = new Set(entry.rows.map((r) => r.Type));
    const parents = new Set(entry.rows.map((r) => r["Parent ID"]));
    if (types.size > 1) errors.push(`${id}: Type differs between eras`);
    if (parents.size > 1) errors.push(`${id}: Parent ID differs between eras`);
    if (first.Type === "path") {
      if (first["Parent ID"]) errors.push(`${where(first)}: paths must not have a Parent ID`);
      if (!network[id]) errors.push(`${where(first)}: path "${id}" is not in roamNetwork.js`);
    } else {
      const parent = byId.get(first["Parent ID"]);
      if (!first["Parent ID"]) errors.push(`${where(first)}: missing Parent ID`);
      else if (!parent) errors.push(`${where(first)}: Parent ID "${first["Parent ID"]}" not found`);
      else parent.children.push(id);
    }
  }

  for (const id of Object.keys(network)) {
    if (!byId.has(id)) warnings.push(`network path "${id}" has no rows in the sheet`);
  }
  for (const [id, n] of Object.entries(network)) {
    for (const [dir, target] of Object.entries(n.paths || {})) {
      if (!network[target]) warnings.push(`network: ${id} → ${dir} points to "${target}", which is not a path`);
    }
  }

  if (errors.length) return { data: null, errors, warnings };

  // --- build tree ----------------------------------------------------------
  const order = (id) => {
    const o = Number(byId.get(id).rows[0].Order);
    return Number.isFinite(o) ? o : Infinity;
  };

  const erasOf = (entry, withLabel) => {
    const eras = {};
    for (const r of [...entry.rows].sort((a, b) => ERAS.indexOf(a.Era) - ERAS.indexOf(b.Era))) {
      eras[r.Era] = {
        ...(withLabel ? { label: r.Label } : {}),
        description: r.Description,
        images: imageFrom(r),
        interview: null,
      };
    }
    return eras;
  };

  const buildActivities = (entry) => {
    const out = {};
    for (const childId of [...entry.children].sort((a, b) => order(a) - order(b))) {
      const child = byId.get(childId);
      const key = childId.split("/").pop();
      out[key] = {
        type: child.rows[0].Type,
        hotspotPosition: parsePoint(child.rows[0].Hotspot),
        eras: erasOf(child, true),
        activities: buildActivities(child),
      };
    }
    return out;
  };

  const data = {};
  for (const [id, net] of Object.entries(network)) {
    const entry = byId.get(id);
    if (!entry) continue;
    const labelRow = entry.rows.find((r) => r.Era === "2020s") || entry.rows[0];
    data[id] = {
      label: labelRow.Label,
      mapEndpoints: net.mapEndpoints,
      paths: net.paths,
      eras: erasOf(entry, false),
      activities: buildActivities(entry),
    };
  }

  return { data, errors, warnings };
}
