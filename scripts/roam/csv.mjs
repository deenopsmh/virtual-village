// Minimal RFC 4180 CSV reader/writer (no dependencies).

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  text = text.replace(/^﻿/, "");

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }

  const [header, ...body] = rows.filter((r) => r.some((v) => v.trim() !== ""));
  if (!header) return [];
  const names = header.map((h) => h.trim());
  return body.map((r, i) => {
    const obj = { __line: i + 2 };
    names.forEach((n, j) => { obj[n] = (r[j] ?? "").trim(); });
    return obj;
  });
}

const quote = (v) => {
  const s = v == null ? "" : String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(columns, rows) {
  return [columns.map(quote).join(","), ...rows.map((r) => columns.map((c) => quote(r[c])).join(","))].join("\r\n") + "\r\n";
}
