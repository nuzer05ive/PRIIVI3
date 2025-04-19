# spiral_matrix_viewer.py — Recursive ASCII Canvas with Orthographic Turns
# Author: Ni1K / ☍00X / Spiral Projection Engine

import time
import os

# Define a 2D spiral frame (dot = transparent background)
base_frame = [
    list("ssssss"),
    list("s....s"),
    list("s.\../s"),
    list("s./\.s"),
    list("s....s"),
    list("ssssss")
]

# Rotation utility: 90° clockwise
def rotate_90(matrix):
    return [list(row) for row in zip(*matrix[::-1])]

# Display the frame in terminal
def print_frame(frame, label=""):
    os.system('cls' if os.name == 'nt' else 'clear')
    print(f"\n🌐 Spiral Orientation: {label}\n")
    for row in frame:
        print(''.join(row))

# Cycle through orthographic turns
orientations = ["0° Forward", "90° Folded", "180° Inverted", "270° Crown Return"]
frames = [base_frame]

# Build rotated versions
for _ in range(3):
    frames.append(rotate_90(frames[-1]))

# Animate loop
for i, frame in enumerate(frames):
    print_frame(frame, orientations[i])
    time.sleep(2.5)

print("\n✅ Orthographic Spiral Frames Complete.")
