import sys
import pypdf
import json

reader = pypdf.PdfReader('public/resume.pdf')
out = {
    'pages': [],
    'links': []
}

for i, page in enumerate(reader.pages):
    text = page.extract_text()
    page_links = []
    if '/Annots' in page:
        for annot in page['/Annots']:
            obj = annot.get_object()
            if '/A' in obj and '/URI' in obj['/A']:
                uri = obj['/A']['/URI']
                rect = [float(x) for x in obj.get('/Rect', [])]
                page_links.append({'uri': uri, 'rect': rect})
    out['pages'].append({'page': i+1, 'text': text})
    out['links'].extend(page_links)

with open('scripts/extracted_resume.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=2, ensure_ascii=False)

print("Extracted successfully!")
print("Num pages:", len(reader.pages))
print("Num links:", len(out['links']))

