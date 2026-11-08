"""Compare Peter's full 2020s list ('Roam labels 2020s VV3 30Oct26.docx', pre-extracted with
docx_fmt.py) against the 2020s rows of the Roam content sheet.

  python -I diff2020s.py labels2020.json roam-content.csv out.json

Matches each doc entry to an existing row by photo name (the doc's JPG label vs the row's
Image Local file name), then by callout text. Writes out.json with:
  updates  - existing rows whose Label / Description differ from the doc
  new      - doc entries with no existing row (need a photo + a new row)
  missing  - existing rows the doc no longer lists
"""
import json, sys, re, csv, unicodedata
from collections import OrderedDict

doc_path, content_csv, out_path = sys.argv[1:4]
paras = json.load(open(doc_path, encoding='utf-8'))
rows = list(csv.DictReader(open(content_csv, encoding='utf-8')))
rows20 = [r for r in rows if r['Era'] == '2020s']

BULLETS = '•·▪●'
SEP = re.compile(r'\s+[–—-]\s+|\s*–\s*')
ERA = re.compile(r'^(?:19|20)\d0s$')
PATH_RE = re.compile(r'^([A-Z]{1,2})\s+to\s+([A-Za-z]+)\b')
CANON = {'Bhabhua': 'Bhabua'}
NOTE_RE = re.compile(r'\[(?:FOUND IN FILE|FIND IMAGES? IN FILE|MISSING)[^\]]*\]', re.I)

def clean(s):
    s = unicodedata.normalize('NFKC', s).replace(' ', ' ')
    return re.sub(r'\s+', ' ', s).strip()

def norm(s):
    s = clean(s).lower()
    s = re.sub(r'\[.*?\]', ' ', s)
    s = re.sub(r'\.(jpe?g|png|tif)$', '', s.strip())
    s = re.sub(r"[’'_?()\[\],.“”\"]", ' ', s)
    return re.sub(r'\s+', ' ', s).strip()

FILLER = re.compile(r'\b(?:best|crop|edit|tweak|better|improv|close|oblong|horizontal|vertical|extra|actual|(?:19|20)\d0s)\b')
def stem(s):
    return re.sub(r'\s+', ' ', FILLER.sub(' ', norm(s))).strip()

def split_fields(text):
    parts = [p.strip() for p in SEP.split(text) if p.strip()]
    era_i = next((i for i, p in enumerate(parts) if ERA.match(p)), None)
    return parts, era_i

# ---- parse the doc into paths -> items (depth 1 / 2) -------------------------------
paths = OrderedDict()
current, last1 = None, None
repeat = []
for p in paras:
    raw = clean(p['text'])
    if not raw or raw.startswith(('Roam ', 'NOTE ON', '[NOTE: no view')):
        continue
    body = raw.lstrip(BULLETS + ' \t')
    # Peter types "•" by hand, so a leading bullet character marks an item, not a path
    is_item = raw[:1] in BULLETS or p['bullet']
    if body.startswith('[') and 'Repeat all listings' in body:
        if current: repeat.append((current, body))
        continue
    if not is_item:
        text = NOTE_RE.sub('', body).strip()
        m = PATH_RE.match(text)
        pid = None if not m else f"{m.group(1)}-to-{CANON.get(m.group(2), m.group(2))}"
        # "M to N family masjid exterior …" under the M to N heading is an item of that path
        if pid and pid in paths:
            m = None
        if m or re.match(r'^E\s+[–-]', text):
            pid = pid or 'E'
            parts, ei = split_fields(text)
            desc = ' '.join(parts[ei + 1:]) if ei is not None else ' '.join(parts[1:])
            paths.setdefault(pid, {'desc': desc, 'file': parts[0], 'items': []})
            current, last1 = pid, None
            continue
        # a path-level line that is really an item (e.g. "M to N family masjid ...")
        if current is None:
            continue
    if current is None:
        continue
    note = ' '.join(NOTE_RE.findall(body))
    text = NOTE_RE.sub('', body).strip()
    parts, ei = split_fields(text)
    if ei is not None:
        label, callout, desc = parts[0], (parts[ei + 1] if len(parts) > ei + 1 else ''), ' '.join(parts[ei + 2:])
    elif len(parts) >= 3:
        label, callout, desc = parts[0], parts[1], ' '.join(parts[2:])
    else:
        # continuation of the previous description (e.g. sign text lines)
        if last1 is not None:
            tgt = paths[current]['items'][-1]
            tgt = tgt['children'][-1] if tgt['children'] else tgt
            tgt['desc'] = (tgt['desc'] + ' ' + text).strip()
        continue
    era = parts[ei] if ei is not None else '2020s'
    blue = p['color'] in ('0070C0', '215E99')
    item = {'file': label, 'callout': callout, 'desc': desc, 'era': era, 'note': note, 'children': []}
    if blue and last1 is not None:
        last1['children'].append(item)
    else:
        paths[current]['items'].append(item)
        last1 = item

# "Repeat all listings from X" -> the reverse path shows X's items too
for pid, note in repeat:
    m = re.search(r'from\s+(.+?),?\s+please', note)
    src = (m.group(1) if m else '').strip('“”" ')
    sm = PATH_RE.match(src)
    if 'NOTE DIFFERENCE' in note:
        donor = paths.get('G-to-K', {}).get('items', [])
        paths[pid]['items'] += [it for it in donor if stem(it['file']).startswith(('g to k and g to m', 'g to m left detail 2'))]
    elif sm:
        sid = f"{sm.group(1)}-to-{CANON.get(sm.group(2), sm.group(2))}"
        if sid in paths:
            paths[pid]['items'] += paths[sid]['items']

# ---- match against existing 2020s rows ---------------------------------------------
by_path = {}
for r in rows20:
    by_path.setdefault(r['Path'], []).append(r)

def row_stem(r):
    s = stem(r['Image Local'].split('/')[-1]) if r['Image Local'] else ''
    return ALIASES.get(s, s)

# photo names that differ between Peter's doc and the files the rows were built from
# (row file stem -> doc stem), checked by hand
ALIASES = {
    'a to b tank ghat detail': 'a tank',
    'a to chand traffic assortment': 'a to chand detail assortment',
    'a to chand detail truck': 'a to chand traffic truck',
    'a to b sprite stand': 'b to a sprite stand',
    'c to gg east ramesh tripathi basket with prasad': 'c to gg east ramesh tiwari basket with prasad',
    'k to g pappu and dhamendra s chai shop': "g to k pappu s chai dukhan",
}

used = set()
updates, new, matched_ids = [], [], set()
order_of = {}          # existing row ID -> its position in Peter's list
all_ids = {r['ID'] for r in rows}
ids20 = {r['ID'] for r in rows20}
twin_ids = {r['ID'] for r in rows if r['Era'] == '2000s'}

def slug(s):
    s = re.sub(r'[“”"’\']', '', clean(s).lower())
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')[:48] or 'item'

def match(pid, item, parent_id):
    cands = [r for r in by_path.get(pid, []) if r['Type'] != 'path' and r['ID'] not in used]
    fs = stem(item['file'])
    for key in (lambda r: row_stem(r) == fs,
                lambda r: norm(r['Label']) == norm(item['callout']),
                lambda r: fs and row_stem(r) and (fs in row_stem(r) or row_stem(r) in fs)):
        hit = [r for r in cands if key(r)]
        if hit:
            # prefer the one under the expected parent
            hit.sort(key=lambda r: r['Parent ID'] != parent_id)
            return hit[0]
    return None

def walk(pid, items, parent_id, depth):
    for n, it in enumerate(items, 1):
        r = match(pid, it, parent_id)
        if r:
            used.add(r['ID']); matched_ids.add(r['ID'])
            order_of[r['ID']] = n
            ch = {}
            if it['callout'] and clean(r['Label']) != clean(it['callout']):
                ch['Label'] = it['callout']
            if it['desc'] and clean(r['Description']) != clean(it['desc']):
                ch['Description'] = it['desc']
            if ch:
                updates.append({'ID': r['ID'], 'Path': pid, 'old': {k: r[k] for k in ch}, 'new': ch})
            walk(pid, it['children'], r['ID'], depth + 1)
        else:
            # same ID as a 2000s row at the same spot -> time-warp twin; else a fresh ID
            iid = f"{parent_id}/{slug(it['callout'])}"
            if iid in ids20 or iid in used:
                k = 2
                while f"{iid}-{k}" in all_ids or f"{iid}-{k}" in used: k += 1
                iid = f"{iid}-{k}"
            used.add(iid)
            new.append({'ID': iid, 'Path': pid, 'parent': parent_id, 'depth': depth, 'order': n,
                        'twin': iid in twin_ids, **{k: it[k] for k in ('file', 'callout', 'desc', 'era', 'note')}})
            walk(pid, it['children'], iid, depth + 1)

path_updates, new_paths = [], []
for pid, pth in paths.items():
    pr = next((r for r in by_path.get(pid, []) if r['Type'] == 'path'), None)
    if pr:
        matched_ids.add(pr['ID'])
        if pth['desc'] and clean(pr['Description']) != clean(pth['desc']):
            path_updates.append({'ID': pid, 'old': pr['Description'], 'new': pth['desc']})
    else:
        new_paths.append({'ID': pid, 'desc': pth['desc'], 'file': pth['file']})
    walk(pid, pth['items'], pid, 1)

missing = [{'ID': r['ID'], 'Label': r['Label'], 'file': r['Image Local'].split('/')[-1]} for r in rows20 if r['ID'] not in matched_ids]
json.dump({'path_updates': path_updates, 'updates': updates, 'new_paths': new_paths, 'new': new, 'missing': missing},
          open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f"doc paths: {len(paths)} | path text changes: {len(path_updates)} | new paths: {[p['ID'] for p in new_paths]}")
print(f"item text changes: {len(updates)} (labels {sum('Label' in u['new'] for u in updates)}, descriptions {sum('Description' in u['new'] for u in updates)})")
print(f"new items: {len(new)} ({sum(n['twin'] for n in new)} time-warp twins) | existing rows not in the doc: {len(missing)}")

# ---- apply: write the updated content CSV -------------------------------------------
# python -I diff2020s.py labels.json roam-content.csv out.json photos.json updated.csv
# photos.json = {"items": {doc photo name: Drive ID}, "paths": {path ID: Drive ID}, "path_labels": {path ID: label}}
if len(sys.argv) > 5:
    photos = json.load(open(sys.argv[4], encoding='utf-8'))
    photo_of = {stem(k): v for k, v in photos.get('items', {}).items()}
    path_photo = photos.get('paths', {})
    by_id = {r['ID']: r for r in rows20}
    for u in updates:
        by_id[u['ID']].update(u['new'])
    for u in path_updates:
        by_id[u['ID']]['Description'] = u['new']
    for rid, n in order_of.items():
        by_id[rid]['Order'] = str(n)
    for r in rows20:
        if r['Type'] == 'path':
            r['Label'] = r['Label'].replace('Bhabua', 'Bhabhua')
            if r['ID'] in path_photo:
                r['Image Drive ID'] = path_photo[r['ID']]
    for pid, lab in photos.get('path_labels', {}).items():
        if pid in by_id: by_id[pid]['Label'] = lab
    cols = list(rows[0].keys())
    blank = {c: '' for c in cols}
    added = []
    label_2000 = {r['ID']: r['Label'] for r in rows if r['Era'] == '2000s' and r['Type'] == 'path'}
    for np_ in new_paths:
        pid = np_['ID']
        added.append({**blank, 'ID': pid, 'Path': pid, 'Type': 'path', 'Era': '2020s',
                      'Label': label_2000.get(pid, pid.replace('-', ' ')), 'Description': np_['desc'],
                      'Image Drive ID': path_photo.get(pid, ''),
                      'Notes': '' if pid in path_photo else 'no 2020s photo yet'})
    # a photo already used for the same file on another path (repeated listings)
    any_photo = {}
    for r in rows20:
        k = row_stem(r)
        if k and k not in any_photo: any_photo[k] = r
    for n in new:
        fs = stem(n['file'])
        src = any_photo.get(fs)
        img = {k: (src[k] if src else '') for k in ('Image IIIF ID', 'Image Drive ID', 'Image Local')}
        if fs in photo_of:
            img = {'Image IIIF ID': '', 'Image Drive ID': photo_of[fs], 'Image Local': ''}
        notes = []
        if n['era'] != '2020s': notes.append(f"photo from the {n['era']}")
        if not any(img.values()): notes.append('no photo yet')
        if n['twin']: notes.append('time-warp twin of the 2000s item')
        added.append({**blank, 'ID': n['ID'], 'Parent ID': n['parent'], 'Path': n['Path'],
                      'Type': 'street-view' if n['depth'] == 1 else 'side-view', 'Order': str(n['order']),
                      'Era': '2020s', 'Label': n['callout'], 'Description': n['desc'], **img,
                      'Notes': '; '.join(notes)})
    # items Peter gave no callout for: a short label, flagged for him to confirm
    for n, row in zip(new, added[len(new_paths):]):
        fix = photos.get('item_labels', {}).get(n['file'])
        if fix:
            row['Description'] = (n['callout'] + ' ' + n['desc']).strip()
            row['Label'] = fix
            row['ID'] = f"{n['parent']}/{slug(fix)}"
            row['Notes'] = '; '.join(x for x in (row['Notes'], 'label to confirm with Peter') if x)
    out_rows = rows + added
    with open(sys.argv[5], 'w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=cols); w.writeheader(); w.writerows(out_rows)
    print(f"wrote {len(out_rows)} rows ({len(added)} added) -> {sys.argv[5]}")
