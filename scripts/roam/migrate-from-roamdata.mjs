// ONE-OFF migration: splits the hard-coded ROAM_DATA into
//   src/pages/Roam/roamNetwork.js  (structure: map endpoints + arrows — stays in code)
//   data/roam-content.csv          (content: labels, descriptions, images — goes to the sheet)
// and optionally enriches images with AM Quartex / Drive IDs from Charlie's IIIF CSV.
//
// Usage: node scripts/roam/migrate-from-roamdata.mjs <RoamData.mjs> [iiif.csv]
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { COLUMNS, formatPoint } from "./schema.mjs";
import { parseCsv, toCsv } from "./csv.mjs";

const [, , roamDataPath, iiifCsvPath] = process.argv;
if (!roamDataPath) {
  console.error("Usage: node scripts/roam/migrate-from-roamdata.mjs <RoamData.mjs> [iiif.csv]");
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { ROAM_DATA } = await import(pathToFileURL(path.resolve(roamDataPath)).href);

// --- optional enrichment lookup: filename (no extension, lower-case) -> ids ---
const enrich = new Map();
if (iiifCsvPath) {
  for (const r of parseCsv(fs.readFileSync(iiifCsvPath, "utf8"))) {
    const file = (r["Source Object"] || "").replace(/\.[^.]+$/, "").toLowerCase();
    const drive = (r["Source URL"] || "").match(/\/d\/([^/]+)/)?.[1] || "";
    const iiif = (r["IIIF manifest"] || "").match(/\/iiif\/([^/]+)\/manifest/)?.[1] || r.ID || "";
    if (file) enrich.set(file, { iiif, drive });
  }
}

const splitSrc = (src) => {
  if (!src) return {};
  const m = src.match(/\/iiif\/([^/]+)\/manifest/);
  if (m) return { iiif: m[1] };
  return { local: src.replace(/^VV3 Images - Copy\//, "") };
};

const rows = [];
let enriched = 0;

function pushRows({ id, parentId, pathId, type, order, eras, label, hotspot }) {
  for (const [era, d] of Object.entries(eras || {})) {
    const img = (d.images || [])[0] || {};
    const src = splitSrc(img.src);
    const hit = src.local && enrich.get(src.local.split("/").pop().toLowerCase());
    if (hit) enriched++;
    rows.push({
      ID: id,
      "Parent ID": parentId || "",
      Path: pathId,
      Type: type,
      Order: order ?? "",
      Era: era,
      Label: label ?? d.label ?? "",
      Description: d.description || "",
      "Image IIIF ID": src.iiif || hit?.iiif || "",
      "Image Drive ID": hit?.drive || "",
      "Image Local": src.local || "",
      "Image Title": img.title || "",
      "Focus Point": formatPoint(img.focus_point),
      Hotspot: formatPoint(hotspot),
      Notes: "",
    });
    if ((d.images || []).length > 1) console.warn(`! ${id} ${era}: only the first of ${d.images.length} images was migrated`);
  }
}

function walk(acts, parentId, pathId) {
  Object.entries(acts || {}).forEach(([key, a], i) => {
    const id = `${parentId}/${key}`;
    pushRows({ id, parentId, pathId, type: a.type, order: i + 1, eras: a.eras, hotspot: a.hotspotPosition });
    walk(a.activities, id, pathId);
  });
}

const network = {};
for (const [id, n] of Object.entries(ROAM_DATA)) {
  network[id] = { mapEndpoints: n.mapEndpoints, paths: n.paths };
  pushRows({ id, pathId: id, type: "path", eras: n.eras, label: n.label });
  walk(n.activities, id, id);
}

fs.writeFileSync(path.join(ROOT, "data/roam-content.csv"), toCsv(COLUMNS, rows));
fs.writeFileSync(
  path.join(ROOT, "src/pages/Roam/roamNetwork.js"),
  `// Roam waypoint network: which path each arrow leads to, and where each path sits on the map.\n` +
  `// Content (labels, descriptions, images) lives in the sheet — see data/roam-content.csv.\n` +
  `export const ROAM_NETWORK = ${JSON.stringify(network, null, 2)};\n`
);

console.log(`Wrote ${rows.length} rows for ${Object.keys(network).length} paths (${enriched} images matched to AM Quartex/Drive).`);
