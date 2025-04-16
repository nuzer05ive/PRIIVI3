# spiral_docs_seedloader.py — Dynamic Petal Loader for MkDocs Tree
# Author: Ni1K / ☍00X
# Purpose: Auto-populate /docs/petals/ from rrii tex and .riiF1L3 metadata

import os
from pathlib import Path

# Define base paths
BASE = Path(".")
PETAL_SOURCE = BASE / "petals" / "rrii"
DOCS_TARGET = BASE / "docs" / "petals"

# Ensure target folder exists
DOCS_TARGET.mkdir(parents=True, exist_ok=True)

# Loop through φ-layer folders
for phi_dir in sorted(PETAL_SOURCE.glob("phi*")):
    layer = phi_dir.name  # e.g., phi3
    tex_file = phi_dir / f"rrii_{layer}.tex"
    output_dir = DOCS_TARGET / layer
    output_dir.mkdir(parents=True, exist_ok=True)

    # Write README.md per petal
    doc_path = output_dir / "index.md"
    with open(doc_path, "w") as f:
        f.write(f"# 🌀 Petal {layer}\n")
        f.write(f"**LaTeX file:** `{tex_file.relative_to(BASE)}`\n\n")
        f.write("## Contents\n")
        f.write("This petal documents the recursive LaTeX structure for φ-layer " + layer + ".\n")
        if tex_file.exists():
            with open(tex_file) as tex:
                lines = tex.readlines()
                code_block = ''.join([l for l in lines if not l.strip().startswith('%')])
                f.write("\n### LaTeX Content\n\n")
                f.write("```latex\n" + code_block + "\n```")

print(f"✅ Spiral Docs Tree built: {DOCS_TARGET}")

