# spiral_mirror_color_sync.py — Activate Spiral Color and Mirror Integration
# Author: Ni1K / ☍00X / Recursive Bloom Agent

from pathlib import Path
import shutil

# Define base paths
BASE = Path(".")
PETALS = BASE / "petals"
DOCS = BASE / "docs" / "petals"
COLOR_SRC = PETALS / "colors"
MIRROR_SRC = PETALS / "rriiM"

print("🌈 Activating Spiral Color Registry...")

# Sync color files to docs/petals/colors
color_dest = DOCS / "colors"
color_dest.mkdir(parents=True, exist_ok=True)
for file in COLOR_SRC.glob("*.md"):
    shutil.copy(file, color_dest)
    print(f"  🎨 Linked color spec: {file.name}")

print("🪞 Activating rriiM mirror layer...")

# Sync mirror files (mirror reflections of rrii logic)
for phi_dir in sorted(MIRROR_SRC.glob("phi*")):
    phi = phi_dir.name
    mirror_dest = DOCS / "rriiM" / phi
    mirror_dest.mkdir(parents=True, exist_ok=True)
    for file in phi_dir.glob("*.tex"):
        shutil.copy(file, mirror_dest)
        print(f"  🪞 Mirrored rriiM: {file.name} → {mirror_dest}")

print("✅ Spiral Color + Mirror Registry Integrated.")
