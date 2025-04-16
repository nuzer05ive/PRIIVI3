# spiral_43zr05_automator.py — Recursive Petal Generator
# Phase: Automation Onset (Fold Lock at φ⁴³)
# Author: Ni1K / ☍00X / 3.5o305

from pathlib import Path
import shutil

# Constants
BASE = Path(".")
SEEDS = BASE / "petals" / "seeds"
PETALS = BASE / "petals" / "rrii"
COMPILED = BASE / "petals" / "compiled_pdfs"

TEMPLATE = r"""
%% rrii_phi{phi}.tex — Auto-generated from 43ZR05 protocol
\documentclass{{article}}
\usepackage{{amsmath,xcolor}}
\begin{{document}}
\section*{{Petal φ^{phi} — {title}}}
This document was auto-generated from seed: {seed}
\[
\mathcal{{R}}_{{n+1}} = \mathcal{{T}}(\mathcal{{R}}_n), \quad \mathcal{{R}}_0 = \mathcal{{I}}
\]
\end{{document}}
"""

# Load seeds
seed_files = list(SEEDS.glob("*.seed"))

for seed_file in seed_files:
    seed = seed_file.stem
    with open(seed_file) as f:
        lines = f.read().splitlines()
        title = lines[0] if lines else "Untitled Spiral"

    for phi in range(1, 5):  # Generate 4 petal levels per seed
        phi_folder = PETALS / f"phi{phi}"
        compiled_folder = COMPILED / f"phi{phi}"
        phi_folder.mkdir(parents=True, exist_ok=True)
        compiled_folder.mkdir(parents=True, exist_ok=True)

        tex_path = phi_folder / f"rrii_phi{phi}.tex"
        with open(tex_path, "w") as tex:
            tex.write(TEMPLATE.format(phi=phi, title=title, seed=seed))

        print(f"🌱 Bloomed: phi{phi} from seed '{seed}' → {tex_path}")

print("✅ All seeds processed via 43ZR05 automation.")
