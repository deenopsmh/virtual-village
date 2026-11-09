// Put the AM Quartex IDs Charlie sends back into the Roam content.
//
//   1. Download Charlie's filled-in sheet as CSV (File -> Download -> .csv).
//   2. node scripts/roam/quartex/import-iiif-ids.mjs path/to/charlie.csv
//   3. Import data/roam-content.csv into the Roam Sheet with "Replace current sheet".
//
// Each line's "ID" (or the ID inside "IIIF manifest") goes into "Image IIIF ID" on every row listed in
// "Roam row IDs". The Drive / local columns stay as a fallback.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, toCsv } from "../csv.mjs";
import { COLUMNS } from "../schema.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const inFile = process.argv[2];
if (!inFile) {
  console.error("Usage: node scripts/roam/quartex/import-iiif-ids.mjs <charlie's sheet as .csv>");
  process.exit(1);
}

const contentPath = path.join(root, "data/roam-content.csv");
const rows = parseCsv(fs.readFileSync(contentPath, "utf8"));
const byKey = new Map(rows.map((r) => [`${r.ID}|${r.Era}`, r]));
const returned = parseCsv(fs.readFileSync(inFile, "utf8"));

const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
let photos = 0, updated = 0;
const problems = [];
for (const line of returned) {
  const id = (line.ID.match(UUID) || (line["IIIF manifest"] || "").match(UUID) || [])[0];
  if (!id) continue; // not uploaded yet
  photos++;
  for (const key of (line["Roam row IDs"] || "").split(";").map((s) => s.trim()).filter(Boolean)) {
    const r = byKey.get(key);
    if (!r) { problems.push(`${line["Source Object"]}: row ${key} no longer exists`); continue; }
    if (r["Image IIIF ID"] !== id) { r["Image IIIF ID"] = id; updated++; }
  }
}

fs.writeFileSync(contentPath, toCsv(COLUMNS, rows));
console.log(`${photos} photos with an AM Quartex ID -> ${updated} rows updated in data/roam-content.csv`);
problems.forEach((p) => console.warn(`  warning: ${p}`));
console.log('Next: import data/roam-content.csv into the Roam Sheet with "Replace current sheet".');
