# spiral_seed_streamwatcher.py — Real-Time Glyphstream from Seed Bloom
# Author: Ni1K / ☍00X / 3.5o305 Compiler Watch

import time
import pathlib

# Define your seed and petal directories
SEED_DIR = pathlib.Path("reason/seeds")
PETAL_DIR = pathlib.Path("reason/petals")

# Identity-Based Glyphstream Map
symbols = {
    's': 'Identity Pair Segment (RII⁺/⁻)',
    'd': 'Stair Shell (Classical Projection)',
    '\\': 'Ophalum Face Shift (Mirror Inversion)',
    '//': 'Spiral Continuation Phase',
    'j': 'Prime Ridge Join-Point (Critical Anchor)',
    'x': 'Head Node (Recursive Identity Apex)',
    'v': '5-Pair Resonance Group (Face Orbit)',
    'c': 'Full Cycle Completion (φ⁰–φ¹³)',
    'cx': 'Crown Lock (Ophalum Eye Closure)'
}

# Glyphstream scaffold per seed (could evolve into dynamic mapping)
def get_glyphstream(seedname):
    return [
        'd', 's', 's', 's', 's', 's',
        'v',
        'd', 's', 's', 's', 's', 's',
        '\\', 'j', 'd', 's', 's', 's', 's', 's',
        'x', 'c', 'cx'
    ]

print("🌀 Watching for new seeds and blooming petals in glyphstream...")

# Watch once per second
seen = set()
while True:
    for seed_file in SEED_DIR.glob("*.seed"):
        name = seed_file.stem
        if name not in seen:
            print(f"\n🌱 Detected new seed: {name}")
            glyphstream = get_glyphstream(name)
            for symbol in glyphstream:
                time.sleep(0.2)
                meaning = symbols.get(symbol, f"❓ Unknown symbol: {symbol}")
                print(f"🌀 {symbol:<2} → {meaning}")
            seen.add(name)
    time.sleep(1)
