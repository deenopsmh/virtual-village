// Build step: Roam content sheet (CSV) -> src/pages/Roam/roamContent.generated.json
//
// Source, in order of preference:
//   1. ROAM_SHEET_CSV_URL env var (Google Sheet "Publish to web" CSV link)
//   2. data/roam-content.csv
// Fails the build if the sheet has errors, so a bad edit never reaches the live site.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "./csv.mjs";
import { assemble } from "./assemble.mjs";
import { ROAM_NETWORK } from "../../src/pages/Roam/roamNetwork.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const LOCAL_CSV = path.join(ROOT, "data/roam-content.csv");
const OUT = path.join(ROOT, "src/pages/Roam/roamContent.generated.json");

async function loadCsv() {
  const url = process.env.ROAM_SHEET_CSV_URL;
  if (url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not download sheet (${res.status}) from ROAM_SHEET_CSV_URL`);
    console.log("Roam content: using Google Sheet");
    return res.text();
  }
  console.log("Roam content: using data/roam-content.csv");
  return fs.readFileSync(LOCAL_CSV, "utf8");
}

const rows = parseCsv(await loadCsv());
const { data, errors, warnings } = assemble(rows, ROAM_NETWORK);

warnings.forEach((w) => console.warn(`  warning: ${w}`));
if (errors.length) {
  console.error(`\nRoam content has ${errors.length} error(s) — fix the sheet and rebuild:`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

fs.writeFileSync(OUT, JSON.stringify(data));
console.log(`Roam content: ${rows.length} rows -> ${Object.keys(data).length} paths written.`);
