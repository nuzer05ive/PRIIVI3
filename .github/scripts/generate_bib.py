import os
import re
import sys
from pathlib import Path

# ALS PRL-compatible entries for known sources
CITE_LOOKUP = {
    "riemann1859": {
        "type": "article",
        "author": "Riemann, Bernhard",
        "title": "Über die Anzahl der Primzahlen unter einer gegebenen Größe",
        "journal": "Monatsberichte der Berliner Akademie",
        "year": "1859"
    },
    "penrose2004": {
        "type": "book",
        "author": "Penrose, Roger",
        "title": "The Road to Reality: A Complete Guide to the Laws of the Universe",
        "publisher": "Jonathan Cape",
        "year": "2004"
    },
    "roodChatGPT2025": {
        "type": "misc",
        "author": "Rood, Nicholas and ChatGPT (4oo3, o3-mini-high)",
        "title": "Tri-Petal Pyramid Ring and the Recursive S-Structure",
        "year": "2025",
        "note": "PRIIVI3 RIICURSION Research Memo",
        "howpublished": "\\url{https://priivi3.com/docs/TriPetalPyramidRing.pdf}"
    }
}

def extract_cite_keys(tex_path):
    with open(tex_path, 'r', encoding='utf-8') as f:
        content = f.read()
    cite_tags = re.findall(r'\\cite\{([^}]+)\}', content)
    keys = set()
    for tag in cite_tags:
        for key in tag.split(','):
            keys.add(key.strip())
    return sorted(keys)

def format_bib_entry(key, entry):
    bibtype = entry.get("type", "misc")
    fields = "\n".join([f"  {k} = {{{v}}}," for k, v in entry.items() if k != "type"])
    return f"@{bibtype}{{{key},\n{fields}\n}}"

def generate_entry(key):
    if key in CITE_LOOKUP:
        return format_bib_entry(key, CITE_LOOKUP[key])
    else:
        return f"""@misc{{{key},
  author = {{Unknown Author}},
  title = {{Placeholder for citekey '{key}'}},
  year = {{n.d.}},
  note = {{Auto-generated fallback}}
}}"""

def main():
    if len(sys.argv) < 2:
        print("Usage: generate_bib.py <foldername>")
        sys.exit(1)

    folder = sys.argv[1]
    tex_path = Path(f"docs/{folder}/{folder}.tex")
    bib_path = Path(f"docs/{folder}/{folder}.bib")

    if not tex_path.exists():
        print(f"[ERROR] {tex_path} not found.")
        sys.exit(1)

    cite_keys = extract_cite_keys(tex_path)

    if not cite_keys:
        print("[INFO] No \\cite{} tags found.")
        return

    entries = [generate_entry(key) for key in cite_keys]

    with open(bib_path, 'w', encoding='utf-8') as f:
        f.write("% Auto-generated BibTeX File (ALS PRL Style)\n\n")
        for entry in entries:
            f.write(entry + "\n\n")

    print(f"[SUCCESS] Saved {len(entries)} .bib entries to {bib_path}")

if __name__ == "__main__":
    main()
