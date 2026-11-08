import sys, zipfile, xml.etree.ElementTree as ET, json
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
z=zipfile.ZipFile(sys.argv[1]); root=ET.fromstring(z.read('word/document.xml'))
out=[]
for p in root.iter(W+'p'):
    runs=[]
    for r in p.iter(W+'r'):
        t=''.join(x.text or '' for x in r.iter(W+'t'))
        if not t: continue
        rp=r.find(W+'rPr')
        b=rp is not None and rp.find(W+'b') is not None and rp.find(W+'b').get(W+'val') not in ('0','false')
        i=rp is not None and rp.find(W+'i') is not None and rp.find(W+'i').get(W+'val') not in ('0','false')
        c=rp.find(W+'color').get(W+'val') if rp is not None and rp.find(W+'color') is not None else ''
        h=rp.find(W+'highlight').get(W+'val') if rp is not None and rp.find(W+'highlight') is not None else ''
        runs.append((t,b,i,c,h))
    text=''.join(r[0] for r in runs)
    if not text.strip(): continue
    lvl=p.find(f'{W}pPr/{W}numPr/{W}ilvl')
    # style of the label part = runs before the first ' – '
    label_runs=[]; acc=''
    for r in runs:
        label_runs.append(r); acc+=r[0]
        if ' – ' in acc or ' - ' in acc: break
    def maj(k): 
        vals=[r[k] for r in label_runs if r[0].strip()]
        return max(set(vals), key=vals.count) if vals else None
    out.append({'text':text,'bullet':lvl is not None,'lvl':int(lvl.get(W+'val')) if lvl is not None else None,'b':maj(1),'i':maj(2),'color':maj(3),'hl':maj(4)})
json.dump(out,open(sys.argv[2],'w',encoding='utf-8'),ensure_ascii=False,indent=0)
print(len(out))
