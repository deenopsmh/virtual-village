// List every Roam photo that isn't on AM Quartex yet, in the column layout Charlie used for the
// first batch (VV Collections Schema v1_iiif), so he can upload them and fill in ID + IIIF manifest.
//
//   npm run quartex:export                 -> data/am-quartex/vv-am-quartex-batch-NN.csv (next number)
//   npm run quartex:export -- --batch 2    -> rewrite batch 02
//
// One line per photo (a photo used on several paths appears once). "Source URL" links to Peter's
// original in his Drive; "Roam row IDs" tells import-iiif-ids.mjs where each AM Quartex ID belongs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, toCsv } from "../csv.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const dir = path.join(root, "data/am-quartex");
const rows = parseCsv(fs.readFileSync(path.join(root, "data/roam-content.csv"), "utf8"));
// your Drive copy -> Peter's original, and local file -> Peter's original (null = not in his Drive)
const { copies, local: locals = {} } = JSON.parse(fs.readFileSync(path.join(root, "data/drive-originals.json"), "utf8"));

// batch number: --batch N, else one past the highest existing batch file
const NAME = (n) => `vv-am-quartex-batch-${String(n).padStart(2, "0")}.csv`;
const argN = process.argv.indexOf("--batch");
const existing = fs.existsSync(dir)
  ? fs.readdirSync(dir).map((f) => Number(f.match(/^vv-am-quartex-batch-(\d+)\.csv$/)?.[1])).filter(Boolean)
  : [];
const batch = argN > -1 ? Number(process.argv[argN + 1]) : Math.max(0, ...existing) + 1;
fs.mkdirSync(dir, { recursive: true });
const out = path.join(dir, NAME(batch));

const byId = new Map(rows.map((r) => [`${r.ID}|${r.Era}`, r]));
const labelOf = (id, era) => (id ? byId.get(`${id}|${era}`)?.Label || id : "Root");
const driveLink = (id) => `https://drive.google.com/file/d/${id}/view`;
// local copies replaced apostrophes with underscores ("Shyam Babu_s store"); Peter's files have them
const peterName = (s) => s.replace(/_s\b/g, "'s");
// is there an original on this computer (src/assets/VV3 Images - Copy)?
const LOCAL_DIR = path.join(root, "src/assets/VV3 Images - Copy");
const hasLocal = (p) => !!p && [".JPG", ".jpg", ".jpeg", ".png"].some((ext) => fs.existsSync(path.join(LOCAL_DIR, p + ext)));

const photos = new Map(); // photo key -> entry
for (const r of rows) {
  if (r["Image IIIF ID"]) continue; // already on AM Quartex
  const key = r["Image Drive ID"] || r["Image Local"];
  if (!key) continue; // no photo yet (waiting on Peter)
  if (!photos.has(key)) {
    const local = r["Image Local"];
    const orig = r["Image Drive ID"] ? copies[r["Image Drive ID"]] : locals[local];
    photos.set(key, {
      File: "",
      ID: "",
      Label: r.Label,
      Description: r.Description,
      Page: "Roam",
      Parent: labelOf(r["Parent ID"], r.Era),
      Era: r.Era.replace(/s$/, ""),
      "Focus Point": r["Focus Point"],
      "Source Object": orig ? orig.title : peterName(`${local.split("/").pop()}.JPG`),
      "Source URL": orig ? driveLink(orig.original) : "",
      Language: "English",
      "IIIF manifest": "",
      Note: orig ? ""
        : hasLocal(local) ? "Not in Peter's Drive; Hasib will share the file"
        : "Photo missing; skip for now (asking Peter)",
      "Roam row IDs": [],
    });
  }
  photos.get(key)["Roam row IDs"].push(`${r.ID}|${r.Era}`);
}

const list = [...photos.values()]
  .map((p) => ({ ...p, "Roam row IDs": p["Roam row IDs"].join(" ; ") }))
  .sort((a, b) => a.Era.localeCompare(b.Era) || a["Source Object"].localeCompare(b["Source Object"]));

const columns = ["File", "ID", "Label", "Description", "Page", "Parent", "Era", "Focus Point", "Source Object",
  "Source URL", "Language", "IIIF manifest", "Note", "Roam row IDs"];
fs.writeFileSync(out, toCsv(columns, list));
const missing = list.filter((p) => !p["Source URL"]);
console.log(`batch ${String(batch).padStart(2, "0")}: ${list.length} photos, ${list.length - missing.length} with a link to Peter's original -> ${path.relative(root, out)}`);
missing.forEach((p) => console.log(`  no Drive original: ${p["Source Object"]}`));
