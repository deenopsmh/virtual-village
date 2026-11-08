# Virtual Village 3 — Master Checklist

Built 2026-11-08 from all client emails (Jul 4 – Nov 3, 2026) and Peter's docs in `client-notes/`.
Legend: `[x]` done · `[~]` partly done · `[ ]` not started · **(Peter)** = waiting on Peter · **(Charlie)** = waiting on Charlie

Decisions locked in (Nov 8):
- Roam navigation follows Peter's suggestions (relative arrows, turn-around, red/yellow active dashes, solid blue others).
- Spreadsheet = content (Google Sheet Peter edits); code = waypoint network.
- Sheet → JSON at **build time**, redeploy to publish edits.
- AM Quartex (IIIF) is home for images; local files are a temporary fallback.
- Order: commit → quick fixes → spreadsheet pipeline → navigation rework → 2000s level.

---

## 0. Housekeeping
- [x] Commit uncommitted local work (branch `vv3-client-updates`)
- [ ] Push branch / deploy so Peter can see the Sep 13 fixes (told him Oct 12 it'd go up "1–2 days before we meet")
- [ ] Reply to Peter — his Nov 1 & Nov 3 emails; book the meeting he asked for (you offered 3–4:30 pm EST)
- [ ] Remove dead header links until pages exist (Contexts, Topics, Maps, History, Resources all 404 today)

## 1. Quick fixes (Sep 13 feedback + later)
- [x] Home hero: "…living history of **rural** Bihar"
- [x] About: delete "entirely", "twenty-five" → "thirty"
- [x] About: period after "…the actual name of the village, Chainpur." (also removed stray periods from heading "Version 3.0." and "Version 3.0. restores")
- [x] About: "most compelling feature…" sentence rewrite
- [x] About: remove "Co-Collaborator" for Mat
- [x] About: new acknowledgements paragraph
- [x] Institutional Anchors: Wesleyan first, Global South Asian Studies moved under Wes Religion — *verify on page*
- [x] Header: add Contexts link (Peter Sep 15: call it "Contexts", not "Start")
- [x] Roam: map button text → "Map" / "Hide map"
- [ ] "Things to do" labels in sentence case, per Peter's label list (Aug 8) — e.g. "Hindu deities on the facade" — *will come for free from the sheet migration (§2)*
- [x] "Farm tractor with grain" — superseded by Nov 1 callout "Watch out! Tractor!"; also fixed "trailors" → "trailers"
- [ ] Time switch button labelled "time warp" (two lines: time / warp) — agreed Nov 3

## 2. Spreadsheet → site pipeline (replace hard-coded `RoamData.jsx` content)
- [ ] Finalise sheet columns: add **Path/waypoint key** (e.g. `A-to-Bhabua`), **Type** (street / side / view-in-side / detail), **Order**, **Callout** (the "Things to do" text), **Link** (2000s↔2020s pair); change **Parent** to use parent's **ID**, not label
- [ ] Move sheet to Google Sheets; give Peter edit access
- [ ] Build script: download sheet as CSV → validate (missing IDs, broken parents, duplicate keys) → write JSON; fail the build on errors
- [ ] `ResponsiveImage`: build IIIF URL straight from ID (skip the manifest fetch — saves a round trip + grey flash)
- [ ] Preload images for neighbouring waypoints while user is at a point
- [ ] Store image width/height in sheet (prevents layout jump; AM Quartex blocks server-side fetches)
- [ ] Local-file fallback for rows with no IIIF ID yet
- [ ] Vercel deploy hook so Peter (or you) can publish sheet edits with one click
- [ ] **(Charlie)** Upload remaining ~200 images to AM Quartex (42 of ~240 done); send back IDs/manifest URLs
- [ ] Once everything is on AM Quartex: delete `src/assets/VV3 Images - Copy` (6.1 GB) and `public/images/optimized` (202 MB) + the optimize step in `npm run build`

## 3. 2020s content updates (Peter's Nov 1 docs)
Source: `Roam labels 2020s VV3 30Oct26.docx` + `Changes to Roam 2020s labels 30Oc26.docx`
- [ ] ~45 corrected labels/descriptions (spelling "Bhabua" → "Bhabhua", callouts, names) — Peter offered to make text-only edits himself in the sheet
- [ ] ~30 added items (new images in the 2020s Drive folder) — you do these
- [ ] New paths: A→Jagariya, E→south, K→Naughara, L→M, N→M, N→DD, DD→N (+ "repeat listings" for reverse paths)
- [ ] Delete: BB→AA description, BB→M (use M→Marai instead)
- [ ] **(Peter)** Images marked "FIND IMAGE IN FILE": Sitaram & Raju Paswan, Shyam Babu's store, D to E Sufi tomb, G to M Sufi mazar
- [ ] Check whether the 9 image questions from your Aug 5 email are answered by the new docs (A tank, D-to-E, D-to-E shop items ×3, G-to-K mosque/Elephant Well/medicine/Pappu's chai)

## 4. Roam navigation & map rework
- [ ] Arrows **relative** to current view direction (left = turn 90° left), not fixed compass (Nov 1)
- [ ] Up = forward, down = back (double-check current behaviour; you saw it right, Peter saw it reversed)
- [ ] Add turn-around / reverse button into the four-arrow design (see `client-notes/sample Roam page with navigation panel 2004.png`)
- [ ] Mini-map: current direction = moving dashes in **yellow or red**; other available directions = **solid blue**
- [ ] Default Roam map = cropped map (cut off above FF); switch to the large map for waypoints A & B
- [ ] Use Peter's new master maps (Oct 24, unused waypoints removed, names fixed) and re-plot waypoint positions
- [ ] **(Peter)** "to bus stand master map 24Oc26.jpg" is actually a Photoshop .psd renamed to .jpg — ask him to re-export as JPG
- [ ] Fix: E waypoint off the bottom of the map (can't get E → D)
- [ ] Fix: D → E shows no image

## 5. 2000s level
Source: `Roam labels 2000s VV3 29Oct26.docx` (images in Drive: "Labelled VV3 new images 2000s level")
- [ ] Load 2000s images + text for ~38 paths (none in the site yet)
- [ ] Support 4 nesting levels (street view → side view → view within side view → detail); Peter will flatten the 4th if too complex
- [ ] "LINK" items: connect each 2000s page to its 2020s twin so "time warp" jumps between them
- [ ] Build the time warp / compare-era feature (era is hard-coded to 2020s today, no switch in UI)
- [ ] **(Peter)** "+++NEED REPLACEMENT+++" images (e.g. AA to GG) and ones awaiting scans of original slides
- [ ] **(Charlie)** Upload 2000s images to AM Quartex

## 6. New pages
- [ ] **Contexts** page: Introduction, natural context, village nexus, bus stand, national, global sections — text + header images from `VV3 Contexts texts and images.docx`
- [ ] **Resources** landing page + "Resources for teaching A Virtual Village" + "Primary and secondary sources about Chainpur" — ideally editable by Peter (sheet or Markdown)
- [ ] Topics / Maps / History pages — not specified yet; ask Peter

## 7. Nice-to-have / later (Peter's VV2 notes, Jul 4)
- [ ] Home page "changes" theme
- [ ] VV1 / VV2 homepage screenshots on About to show the site's history
- [ ] Glossary (rebuild from VV2 text files)
- [ ] Interviews / oral histories (data has `interview` field, unused)

## Open questions for Peter
1. Re-export the bus stand master map as JPG (it's a PSD).
2. Missing images listed in §3 and §5.
3. What should Topics, Maps, History contain — or hide them for now?
4. Is the 4th nesting level (details within views within side views) essential?
