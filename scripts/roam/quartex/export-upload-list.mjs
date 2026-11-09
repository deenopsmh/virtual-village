// List every Roam photo that isn't on AM Quartex yet, in the column layout Charlie used for the
// first batch (VV Collections Schema v1_iiif), so he can upload them and fill in ID + IIIF manifest.
//
//   node scripts/roam/quartex/export-upload-list.mjs            -> data/am-quartex-batch2.csv
//
// One line per photo (a photo used on several paths appears once). "Roam row IDs" tells
// import-iiif-ids.mjs where to put the AM Quartex ID when Charlie sends the sheet back.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, toCsv } from "../csv.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const rows = parseCsv(fs.readFileSync(path.join(root, "data/roam-content.csv"), "utf8"));
const { copies } = JSON.parse(fs.readFileSync(path.join(root, "data/drive-originals.json"), "utf8"));
const out = path.join(root, process.argv[2] || "data/am-quartex-batch2.csv");

const byId = new Map(rows.map((r) => [`${r.ID}|${r.Era}`, r]));
const labelOf = (id, era) => (id ? byId.get(`${id}|${era}`)?.Label || id : "Root");
const driveLink = (id) => `https://drive.google.com/file/d/${id}/view`;
// local copies replaced apostrophes with underscores ("Shyam Babu_s store"); Peter's files have them
const peterName = (s) => s.replace(/_s\b/g, "'s");

const photos = new Map(); // photo key -> entry
for (const r of rows) {
  if (r["Image IIIF ID"]) continue; // already on AM Quartex
  const key = r["Image Drive ID"] || r["Image Local"];
  if (!key) continue; // no photo yet (waiting on Peter)
  if (!photos.has(key)) {
    const orig = r["Image Drive ID"] ? copies[r["Image Drive ID"]] : null;
    const local = r["Image Local"];
    photos.set(key, {
      File: "",
      ID: "",
      Label: r.Label,
      Description: r.Description,
      Page: "Roam",
      Parent: labelOf(r["Parent ID"], r.Era),
      Era: r.Era.replace(/s$/, ""),
      "Focus Point": r["Focus Point"],
      // Peter's original file: name + link (Drive copies) or name + folder (older 2020s photos)
      "Source Object": orig ? orig.title : peterName(`${local.split("/").pop()}.JPG`),
      "Source URL": orig ? driveLink(orig.original) : "",
      "Folder in Peter's Drive": orig ? "" : local.includes("/") ? peterName(local.split("/").slice(0, -1).join("/")) : "(top level of the 2020s folder)",
      Language: "English",
      "IIIF manifest": "",
      "Roam row IDs": [],
    });
  }
  photos.get(key)["Roam row IDs"].push(`${r.ID}|${r.Era}`);
}

const list = [...photos.values()]
  .map((p) => ({ ...p, "Roam row IDs": p["Roam row IDs"].join(" ; ") }))
  .sort((a, b) => a.Era.localeCompare(b.Era) || a["Source Object"].localeCompare(b["Source Object"]));

const columns = ["File", "ID", "Label", "Description", "Page", "Parent", "Era", "Focus Point", "Source Object",
  "Source URL", "Folder in Peter's Drive", "Language", "IIIF manifest", "Roam row IDs"];
fs.writeFileSync(out, toCsv(columns, list));
const withLink = list.filter((p) => p["Source URL"]).length;
console.log(`${list.length} photos to upload (${withLink} with a link to Peter's original, ${list.length - withLink} by file name and folder) -> ${path.relative(root, out)}`);
