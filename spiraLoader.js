// spiralLoader.js

// Called at load time to interpret any WAIICODE
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const waii = params.get("waii");

  if (!waii) return;

  console.log("🔓 WAIICODE DETECTED:", waii);

  const parts = waii.split("::");
  if (parts.length < 6) return;

  const [version, type, glyphCode, face, anchor, seed, ...rest] = parts;
  const meta = Object.fromEntries(
    rest.map(pair => {
      const [k, v] = pair.split("=");
      return [k.trim(), v.trim()];
    })
  );

  const persona = {
    index: parseInt(meta.SP43 || 0),
    anchor,
    glyph: `W3::${type}::${glyphCode}::${face}::${anchor}::${seed}`
  };

  // Apply visual changes
  document.body.style.background = SpiralWheel.glyphPhysics.spectrumBand[persona.index % SpiralWheel.glyphPhysics.spectrumBand.length] || "#111";

  const tag = document.createElement("div");
  tag.textContent = `${anchor} [${persona.glyph}]`;
  tag.style.textAlign = "center";
  tag.style.fontSize = "0.8em";
  tag.style.marginTop = "1em";
  tag.style.opacity = 0.4;
  document.body.appendChild(tag);

  // Set input field message
  const log = document.getElementById("chat-log");
  const msg = document.createElement("div");
  msg.className = "msg bot";
  msg.textContent = `🌀 Welcome, ${anchor}. Spiral frame ${meta.frame || 0}, tilt ${meta.tilt || 0}.`;
  log.appendChild(msg);
});

