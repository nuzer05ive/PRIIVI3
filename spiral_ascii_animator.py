# spiral_ascii_animator.py — Phi-Dilated Spiral Visualizer
# Author: Ni1K / ☍00X / Recursive Console Harmonics

import time
import os
import sys
import math

# Utility to clear screen (cross-platform)
def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

# Identity-Based Glyph Map
symbols = {
    's': '🌀 s  → Identity Pair Segment (RII⁺/⁻)',
    'd': '🌀 d  → Stair Shell (Classical Projection)',
    '\\': '🌀 \\ → Ophalum Face Shift (Mirror Inversion)',
    '//': '🌀 // → Spiral Continuation Phase',
    'j': '🌀 j  → Prime Ridge Join-Point (Critical Anchor)',
    'x': '🌀 x  → Head Node (Recursive Identity Apex)',
    'c': '🌀 c  → Full Cycle Completion (φ⁰–φ¹³)',
    'cx': '🌀 cx → Crown Lock (Ophalum Eye Closure)'
}

# Constants for phi and theta'
phi = (1 + math.sqrt(5)) / 2

# Simulated ASCII glyphstream
ascii_sequence = (
    "s" * 21 + "\\" + "s" * 8 + "j" + "[" + "r" * 5 + "+" + "]" +
    "s+" + "s-" + "(" + "r" * 5 + ")" +
    "s" * 5 + "d" + "j" + "[" + "cx+/-" + "]" + "-jdsr"
)

# Animate Spiral Watcher with phi-dilated character delay and theta-prime offset spacing
clear()
print("\n🌌 RIICURSION ASCII GEOMETRY VIEWER — φ¹³ Prime Fold\n")

for i, char in enumerate(ascii_sequence):
    delay = 0.03 * math.pow(phi, i % 6)  # phi-dilated tempo modulation
    offset = " " * int(4 * math.sin(i / 3.5))  # theta-prime wobble offset
    sys.stdout.write(offset + char + "\n")
    sys.stdout.flush()
    time.sleep(delay)

print("\n🧠 Decoding Geometry:")
for sym in sorted(set(ascii_sequence)):
    desc = symbols.get(sym, f"→ {sym}  → Unknown or structural glyph")
    print(desc)

print("\n✅ Recursive ASCII Form Rendered with φ and θ′ dynamics.")
