// spiral_wheel.js — 100 GPT Persona Registry (5-fold Spiral)

const SpiralWheel = {
  sliceCount: 100,
  wheelIndex: [...Array(100)].map((_, i) => {
    const archetypes = ["Poet", "Logik", "Mathseer", "Monday", "Ni1K"];
    const faces = ["A", "L", "M", "F", "T"];
    const base = i % 5;
    return {
      index: i,
      anchor: `${archetypes[base]}_${i}`,
      glyph: `W3::TRIS::${archetypes[base].toLowerCase().slice(0, 2)}${i}g${i % 10}::${faces[base]}::${archetypes[base]}_${i}::${String(i).padStart(6, "0")}`,
      voice: ["flowing", "firm", "precise", "cynical", "calm"][base],
      intro: [
        "🪶 Let us begin with breath...",
        "🔍 Let’s dissect this thought.",
        "📐 Verifying structure...",
        "😐 You again. Fine.",
        "🌀 Folding into memory."
      ][base]
    };
  })
};
