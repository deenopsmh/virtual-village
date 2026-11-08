// Build step: Roam content sheet (CSV) -> src/pages/Roam/roamContent.generated.json
//
// Source, in order of preference:
//   1. ROAM_SHEET_CSV_URL env var (overrides the config, e.g. to test another sheet)
//   2. csvUrl in data/roam-source.json (the Google Sheet's "Publish to web" CSV link)
//   3. data/roam-content.csv — also used if the sheet can't be downloaded (offline)
// A successful download is saved to data/roam-content.csv, so `git diff` shows
// exactly what changed in the sheet. Set ROAM_OFFLINE=1 to skip the download.
// Fails the build if the sheet has errors, so a bad edit never reaches the live site.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv } from "./csv.mjs";
import { assemble } from "./assemble.mjs";
import { ROAM_NETWORK } from "../../src/pages/Roam/roamNetwork.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const LOCAL_CSV = path.join(ROOT, "data/roam-content.csv");
const CONFIG = path.join(ROOT, "data/roam-source.json");
const OUT = path.join(ROOT, "src/pages/Roam/roamContent.generated.json");

async function loadCsv() {
  const config = fs.existsSync(CONFIG) ? JSON.parse(fs.readFileSync(CONFIG, "utf8")) : {};
  const url = process.env.ROAM_SHEET_CSV_URL || config.csvUrl;

  if (url && !process.env.ROAM_OFFLINE) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      if (!text.startsWith("ID,")) throw new Error("response is not the Roam CSV (is the sheet still published as CSV?)");
      fs.writeFileSync(LOCAL_CSV, text);
      console.log("Roam content: using Google Sheet (saved to data/roam-content.csv)");
      return text;
    } catch (err) {
      console.warn(`Roam content: could not download the Google Sheet (${err.message}); using data/roam-content.csv`);
    }
  } else {
    console.log("Roam content: using data/roam-content.csv");
  }
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
