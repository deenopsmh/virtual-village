"""Make the AM Quartex batch spreadsheet as a formatted .xlsx (upload it to Drive; it opens as a Google Sheet).

  python scripts/roam/quartex/make-xlsx.py 2      -> data/am-quartex/vv-am-quartex-batch-02.xlsx

Rows: every Roam photo. Photos already on AM Quartex are green with ID + IIIF manifest filled in;
photos still to upload come from the batch CSV (npm run quartex:export) with ID + IIIF manifest
shaded yellow for Charlie. Bold headers = columns Peter can change.
Needs openpyxl (pip install openpyxl).
"""
import csv, os, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
batch = int(sys.argv[1]) if len(sys.argv) > 1 else 2
name = f'vv-am-quartex-batch-{batch:02d}'
todo_csv = os.path.join(ROOT, 'data', 'am-quartex', name + '.csv')
out = os.path.join(ROOT, 'data', 'am-quartex', name + '.xlsx')

COLUMNS = ['File', 'ID', 'Label', 'Description', 'Page', 'Parent', 'Era', 'Focus Point', 'Source Object',
           'Source URL', 'Language', 'IIIF manifest', 'Note', 'Roam row IDs']
PETER_EDITS = {'Label', 'Description', 'Focus Point'}         # bold headers
CHARLIE_FILLS = {'ID', 'IIIF manifest'}                       # yellow while empty
WIDTH = {'File': 6, 'ID': 38, 'Label': 32, 'Description': 60, 'Page': 8, 'Parent': 26, 'Era': 7,
         'Focus Point': 12, 'Source Object': 42, 'Source URL': 44, 'Language': 10, 'IIIF manifest': 44,
         'Note': 34, 'Roam row IDs': 50}

MANIFEST = 'https://iiif.quartexcollections.com/wesleyan/iiif/{}/manifest'
DRIVE = 'https://drive.google.com/file/d/{}/view'

def read(path):
    with open(path, encoding='utf-8-sig') as f:
        return list(csv.DictReader(f))

content = read(os.path.join(ROOT, 'data', 'roam-content.csv'))
with open(os.path.join(ROOT, 'data', 'drive-originals.json'), encoding='utf-8') as f:
    by_iiif = __import__('json').load(f).get('iiif', {})
todo = read(todo_csv)
label_of = {(r['ID'], r['Era']): r['Label'] for r in content}

# photos already on AM Quartex: one line per IIIF ID
done = {}
for r in content:
    iiif = r['Image IIIF ID']
    if not iiif:
        continue
    if iiif not in done:
        local = r['Image Local']
        done[iiif] = {
            'File': '', 'ID': iiif, 'Label': r['Label'], 'Description': r['Description'], 'Page': 'Roam',
            'Parent': label_of.get((r['Parent ID'], r['Era']), r['Parent ID']) if r['Parent ID'] else 'Root',
            'Era': r['Era'].rstrip('s'), 'Focus Point': r['Focus Point'],
            'Source Object': (local.split('/')[-1] + '.JPG').replace('_s ', "'s ") if local
                             else by_iiif.get(iiif, {}).get('title', ''),
            'Source URL': DRIVE.format(r['Image Drive ID']) if r['Image Drive ID']
                          else DRIVE.format(by_iiif[iiif]['original']) if iiif in by_iiif else '',
            'Language': 'English', 'IIIF manifest': MANIFEST.format(iiif),
            'Note': 'Already on AM Quartex', 'Roam row IDs': [],
        }
    done[iiif]['Roam row IDs'].append(f"{r['ID']}|{r['Era']}")
for d in done.values():
    d['Roam row IDs'] = ' ; '.join(d['Roam row IDs'])

rows = [dict(d, _done=True) for d in done.values()] + [dict(t, _done=False) for t in todo]
# already-uploaded (green) rows first, then the photos to upload; each group by era and file name
rows.sort(key=lambda d: (not d['_done'], d['Era'], d['Source Object'].lower()))

# ---- workbook ----
FONT = 'Arial'
green = PatternFill('solid', fgColor='D9EAD3')
yellow = PatternFill('solid', fgColor='FFF2CC')
header_fill = PatternFill('solid', fgColor='EFEFEF')
thin = Side(style='thin', color='D0D0D0')
border = Border(bottom=thin)

wb = Workbook()
ws = wb.active
ws.title = 'Photos'
ws.append(COLUMNS)
for c, col in enumerate(COLUMNS, 1):
    cell = ws.cell(row=1, column=c)
    cell.font = Font(name=FONT, bold=col in PETER_EDITS, size=10)
    cell.fill = header_fill
    cell.alignment = Alignment(vertical='center', wrap_text=True)
    cell.border = Border(bottom=Side(style='medium', color='999999'))
    ws.column_dimensions[cell.column_letter].width = WIDTH[col]
ws.row_dimensions[1].height = 22

for d in rows:
    ws.append([d.get(col, '') for col in COLUMNS])
    r = ws.max_row
    for c, col in enumerate(COLUMNS, 1):
        cell = ws.cell(row=r, column=c)
        cell.font = Font(name=FONT, size=10)
        cell.alignment = Alignment(vertical='top', wrap_text=col in ('Description', 'Note', 'Roam row IDs'))
        cell.border = border
        if d['_done']:
            cell.fill = green
        elif col in CHARLIE_FILLS and not cell.value:
            cell.fill = yellow
    for col in ('Source URL', 'IIIF manifest'):
        cell = ws.cell(row=r, column=COLUMNS.index(col) + 1)
        if cell.value:
            cell.hyperlink = cell.value
            cell.font = Font(name=FONT, size=10, color='1155CC', underline='single')

ws.freeze_panes = 'D2'
ws.auto_filter.ref = ws.dimensions

# ---- legend ----
lg = wb.create_sheet('How to use')
lines = [
    ('How to use this sheet', None),
    ('', None),
    ('Green rows', green, 'Already on AM Quartex. ID and IIIF manifest are filled in; nothing to do.'),
    ('Yellow cells', yellow, 'Charlie: upload the photo from its Source URL, then paste its ID (or IIIF manifest link) here.'),
    ('Bold headers', None, 'Label, Description, Focus Point: text Peter can change.'),
    ('Note column', None, '"Photo missing; skip for now" = Hasib is checking with Peter. Skip these lines.'),
    ('Roam row IDs', None, 'Please leave as is: it is how the IDs are matched back to the website.'),
    ('', None),
    ('Example (a green row)', None, 'ID = 5c90b035-db9d-4ea3-a0aa-a012cc49a9d3 · IIIF manifest = ' + MANIFEST.format('5c90b035-db9d-4ea3-a0aa-a012cc49a9d3')),
    ('', None),
    ('Counts', None, f'{len(done)} photos already on AM Quartex · {len(todo)} to upload in this batch'),
]
for i, line in enumerate(lines, 1):
    title, fill, *text = line + (None,) if len(line) == 2 else line
    a = lg.cell(row=i, column=1, value=title)
    a.font = Font(name=FONT, bold=True, size=12 if i == 1 else 10)
    if fill is not None:
        a.fill = fill
    if text and text[0]:
        b = lg.cell(row=i, column=2, value=text[0])
        b.font = Font(name=FONT, size=10)
        b.alignment = Alignment(wrap_text=True, vertical='top')
lg.column_dimensions['A'].width = 24
lg.column_dimensions['B'].width = 100

wb.save(out)
print(f'{name}.xlsx: {len(done)} already on AM Quartex (green) + {len(todo)} to upload = {len(rows)} rows -> {os.path.relpath(out, ROOT)}')
