"""Turn Peter's 'Roam labels 2000s VV3 29Oct26.docx' (pre-extracted with formatting)
into Roam content rows for Era=2000s. Usage:
  python -I parse2000s.py 2000s.json drive2000_all.json roam-content.csv network.json out_dir
"""
import json, sys, re, csv, difflib, unicodedata
from collections import OrderedDict, defaultdict

doc, drive_map, content_csv, network_json, out_dir = sys.argv[1:6]
paras = json.load(open(doc, encoding='utf-8'))
drive = json.load(open(drive_map, encoding='utf-8'))          # id -> title
existing = list(csv.DictReader(open(content_csv, encoding='utf-8')))
network = json.load(open(network_json, encoding='utf-8'))      # path id -> {...}

BULLETS = '•·▪●'
SEP = re.compile(r'\s+[–—-]\s+|\s*–\s*')       # " – " / " - " / "–"
ERA = re.compile(r'^(?:19|20)\d0s$|^(?:19|20)\d\d$')
PATH_RE = re.compile(r'^(?:\+\+\+.*?\+\+\+\s*)?([A-Z]{1,2})\s+to\s+([A-Za-z]+)\b')
POINT_RE = re.compile(r'^([A-Z]{1,2})\s+(?:(?:19|20)\d0s|(?:19|20)\d\d)\b')
CANON = {'Bhabhua': 'Bhabua'}

def norm(s):
    s = unicodedata.normalize('NFKC', s).lower()
    s = re.sub(r'\[.*?\]', ' ', s)
    s = re.sub(r'\.(jpe?g|png|tif)$', '', s.strip())
    s = re.sub(r"[’'_?()\[\],.]", ' ', s)
    return re.sub(r'\s+', ' ', s).strip()

def slug(s):
    s = re.sub(r'[“”"’\']', '', s.lower())
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')[:48] or 'item'

drive_norm = {}
for fid, title in drive.items():
    drive_norm.setdefault(norm(title), fid)

FILLER = re.compile(r'\b(?:improv|temp|edit|best|crop|need replacement|(?:19|20)\d0s|(?:19|20)\d\d)\b|\+')
def stem(s): return re.sub(r'\s+', ' ', FILLER.sub(' ', norm(s))).strip()
OVERRIDES = {'gg to aa mocchi shoe repairman': 'gg to aa leather worker',
             'g to m left detail vertical': 'g to m left dua', 'm to l detail': 'm to l'}
drive_stem = {}
for fid, title in drive.items():
    drive_stem.setdefault(stem(title), fid)

NO_PHOTO = {'d to g yunani doctor sign'}
def find_photo(label):
    n = norm(label)
    if stem(label) in NO_PHOTO: return None, None
    st = OVERRIDES.get(stem(label), stem(label))
    if st in drive_stem and n not in drive_norm: return drive_stem[st], 'exact'

    if n in drive_norm: return drive_norm[n], 'exact'
    m = difflib.get_close_matches(n, drive_norm.keys(), n=1, cutoff=0.88)
    if m: return drive_norm[m[0]], 'close'
    return None, None

def split_fields(text):
    parts = [p.strip() for p in SEP.split(text) if p.strip()]
    link = any(p.upper() == 'LINK' for p in parts)
    parts = [p for p in parts if p.upper() != 'LINK']
    era_i = next((i for i, p in enumerate(parts) if ERA.match(p)), None)
    return parts, era_i, link

# existing 2020s rows by path for twin matching: (path, normalized label) -> ID
twin, twin_stem, parent_of = {}, {}, {}
existing_ids = {r['ID'] for r in existing}
for r in existing:
    if r['Era'] == '2020s' and r['Type'] != 'path':
        twin[(r['Path'], norm(r['Label']))] = r['ID']
        parent_of[r['ID']] = r['Parent ID']
        if r['Image Local']:
            twin_stem[(r['Path'], stem(r['Image Local'].split('/')[-1]))] = r['ID']

paths = OrderedDict()        # path id -> {'row':..., 'items':[...], 'repeat_from':[...]}
current = None
last_item = None
issues = []

for p in paras:
    text = p['text'].strip().replace(' ', ' ')
    if not text or text.startswith(('Roam ', 'LINK indicates', 'NOTE ON', '2000s VV2')) or p['color'] == '00B050':
        continue
    is_bullet = text[0] in BULLETS
    body = text.lstrip(BULLETS + ' \t')
    if body.startswith('[') and 'Repeat all listings from' in body:
        if current:
            m = re.search(r'from\s+(?:“|")?(.+?)(?:”|")?,?\s+please', body)
            src = m.group(1) if m else ''
            paths[current]['repeat_from'].append(body)
        continue
    if body.startswith(('[NOTE', 'NOTE')) or body.startswith('•'):
        continue
    if not is_bullet:
        pm = PATH_RE.match(body) or POINT_RE.match(body)
        _parts, _ei, _ = split_fields(body)
        looks_item = _ei is not None and len(_parts) >= _ei + 3 and current is not None and (p['i'] or not pm)
        if looks_item: pm = None; is_bullet = True
    if not is_bullet:
        if pm:
            a = pm.group(1)
            pid = a if pm.re is POINT_RE else f"{a}-to-{CANON.get(pm.group(2), pm.group(2))}"
            parts, ei, link = split_fields(body)
            desc = ' '.join(parts[ei + 1:]) if ei is not None else ' '.join(parts[1:])
            year = parts[ei] if ei is not None else ''
            label_file = parts[0]
            fid, how = find_photo(label_file)
            if pid in paths:
                issues.append(f'path {pid} appears twice in the doc (kept the first; second: "{body[:60]}")')
                current = pid; last_item = None
                continue
            paths[pid] = {'row': {'file': label_file, 'desc': desc, 'year': year, 'drive': fid, 'how': how,
                                  'flag': '+++NEED REPLACEMENT' in body or 'TEMP' in label_file or 'improv' in label_file},
                          'items': [], 'repeat_from': []}
            current = pid; last_item = None
            continue
        # continuation of the previous item's description (e.g. quoted sign text)
        if last_item is not None:
            last_item['desc'] = (last_item['desc'] + ' ' + body).strip()
        continue
    if current is None:
        issues.append(f'bullet before any path: "{body[:60]}"'); continue
    parts, ei, link = split_fields(body)
    if ei is None or len(parts) < ei + 2:
        issues.append(f'{current}: could not split "{body[:70]}"'); continue
    label_file = parts[0]
    callout = parts[ei + 1]
    desc = ' '.join(parts[ei + 2:])
    depth = 2 if (p['color'] == '0070C0' and last_item is not None) else 1
    fid, how = find_photo(label_file)
    item = {'file': label_file, 'year': parts[ei], 'callout': callout, 'desc': desc, 'depth': depth,
            'drive': fid, 'how': how, 'link': link, 'children': []}
    items = paths[current]['items']
    if depth == 2:
        parent = next((it for it in reversed(items) if it['depth'] == 1), None)
        if parent is None: item['depth'] = 1; items.append(item)
        else: parent['children'].append(item)
    else:
        items.append(item)
    last_item = item

# resolve "repeat all listings from X" by copying X's items into this path
for pid, pth in paths.items():
    for note in pth['repeat_from']:
        m = re.search(r'from\s+(.+?),?\s+please', note)
        src = (m.group(1) if m else '').strip('“”" ')
        sm = PATH_RE.match(src)
        if 'NOTE DIFFERENCE' in note:
            donor = paths.get('G-to-K', {}).get('items', [])
            pth['items'] += [dict(it) for it in donor if norm(it['file']).startswith(('g to k and g to m', 'g to m left'))]
        elif sm:
            sid = f"{sm.group(1)}-to-{CANON.get(sm.group(2), sm.group(2))}"
            if sid in paths: pth['items'] += [dict(it) for it in paths[sid]['items']]
            else: issues.append(f'{pid}: repeat source {sid} not found')

# --- emit rows ---------------------------------------------------------------
rows, pending, unmatched, used_ids = [], [], [], set()
def emit(row, target):
    target.append(row)

for pid, pth in paths.items():
    in_net = pid in network
    target = rows if in_net else pending
    r = pth['row']
    if not r['drive']: unmatched.append((pid, r['file']))
    note = []
    if r['year'] and r['year'] != '2000s': note.append(f"photo from {r['year']}")
    if r['flag']: note.append('Peter: needs replacement / temporary image')
    if r['how'] == 'close': note.append(f"photo matched approximately: {r['file']}")
    emit({'ID': pid, 'Parent ID': '', 'Path': pid, 'Type': 'path', 'Order': '', 'Era': '2000s',
          'Label': next((x['Label'] for x in existing if x['ID'] == pid), pid.replace('-', ' ')),
          'Description': r['desc'], 'Image IIIF ID': '', 'Image Drive ID': r['drive'] or '', 'Image Local': '',
          'Image Title': '', 'Focus Point': '', 'Hotspot': '', 'Notes': '; '.join(note)}, target)

    def walk(items, parent_id, depth):
        for n, it in enumerate(items, 1):
            key = twin.get((pid, norm(it['callout']))) or twin_stem.get((pid, stem(it['file'])))
            if key and (parent_of.get(key) != parent_id or key in used_ids): key = None
            iid = key or f"{parent_id}/{slug(it['callout'])}"
            if not key and iid in existing_ids: iid += '-2000s'
            base = iid; k = 2
            while iid in used_ids: iid = f'{base}-{k}'; k += 1
            used_ids.add(iid)
            note = []
            if it['year'] not in ('2000s', '2000'): note.append(f"photo from {it['year']}")
            if it['how'] == 'close': note.append(f"photo matched approximately: {it['file']}")
            if key: note.append('time-warp twin of the 2020s item')
            if not it['drive']: unmatched.append((pid, it['file']))
            emit({'ID': iid, 'Parent ID': parent_id, 'Path': pid, 'Type': 'side-view' if depth > 1 else 'street-view',
                  'Order': n, 'Era': '2000s', 'Label': it['callout'], 'Description': it['desc'],
                  'Image IIIF ID': '', 'Image Drive ID': it['drive'] or '', 'Image Local': '', 'Image Title': '',
                  'Focus Point': '', 'Hotspot': '', 'Notes': '; '.join(note)}, target)
            walk(it['children'], iid, depth + 1)
    walk(pth['items'], pid, 1)

cols = list(existing[0].keys())
for name, data in (('roam-2000s-import.csv', rows), ('roam-2000s-pending.csv', pending)):
    with open(f'{out_dir}/{name}', 'w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=cols); w.writeheader(); w.writerows(data)

photos = sorted({r['Image Drive ID'] for r in rows + pending if r['Image Drive ID']})
json.dump({'photos': photos, 'titles': {i: drive[i] for i in photos}}, open(f'{out_dir}/photos2000s.json', 'w', encoding='utf-8'), ensure_ascii=False)
print(f"paths: {len(paths)} ({sum(p in network for p in paths)} on the map, new: {[p for p in paths if p not in network]})")
print(f"rows ready: {len(rows)} | rows for paths not on the map yet: {len(pending)}")
print(f"twins with 2020s: {sum('twin' in r['Notes'] for r in rows + pending)} | approx photo matches: {sum('approximately' in r['Notes'] for r in rows + pending)}")
print(f"distinct photos to copy: {len(photos)} of {len(drive)} in folder")
print(f"lines with no photo found ({len(unmatched)}):"); [print('   ', p, '|', f) for p, f in unmatched]
print('issues:'); [print('   ', i) for i in issues]
