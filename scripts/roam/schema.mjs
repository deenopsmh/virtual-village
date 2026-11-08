// Column layout of the Roam content sheet. One row = one view in one era.
// Rows with the same ID but different Era are the 2000s/2020s twins
// that "time warp" switches between.

export const COLUMNS = [
  "ID",            // unique, stable. Paths: "A-to-B". Things to do: "A-to-B/fruit-shop/bananas"
  "Parent ID",     // ID of the view this item is listed under (blank for paths)
  "Path",          // the path this belongs to (for filtering in the sheet)
  "Type",          // path | street-view | side-view
  "Order",         // position in the parent's "Things to do here" list
  "Era",           // 2000s | 2020s
  "Label",         // callout shown in "Things to do here" (sentence case)
  "Description",
  "Image IIIF ID", // AM Quartex ID (preferred image source)
  "Image Drive ID",// Google Drive file ID (used if no IIIF ID)
  "Image Local",   // legacy local file under src/assets/VV3 Images - Copy (fallback)
  "Image Title",
  "Focus Point",   // "top, left" in % — where the image auto-zooms
  "Hotspot",       // "top, left" in % — clickable marker on the parent image
  "Notes",         // free text, ignored by the site
];

export const TYPES = ["path", "street-view", "side-view"];
export const ERAS = ["2000s", "2020s"];

export const formatPoint = (p) => (p && typeof p === "object" ? `${p.top}, ${p.left}` : "");

export function parsePoint(value) {
  if (!value) return null;
  const m = value.match(/(-?\d+(?:\.\d+)?)\D+(-?\d+(?:\.\d+)?)/);
  return m ? { top: Number(m[1]), left: Number(m[2]) } : undefined; // undefined = invalid
}
