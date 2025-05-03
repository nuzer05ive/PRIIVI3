// spiralLoader.js — Reload-Safe WAIICODE Scene Loader with Melody + Glyph Support

function parseSpiralScene() {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const waii = hashParams.get("waii") || localStorage.getItem("lastWaii");
  const ipfs = hashParams.get("ipfs");

  if (ipfs) {
    fetch(`https://ipfs.io/ipfs/${ipfs}`)
      .then(res => res.json())
      .then(loadFromJSON)
      .catch(err => console.error("Failed to load from IPFS:", err));
    return;
  }

  if (!waii) return;
  localStorage.setItem("lastWaii", waii);

  let scene = null;
  try {
    const decoded = atob(waii);
    scene = JSON.parse(decoded);
    console.log("✅ Loaded WAIICODE scene:", scene);
  } catch (err) {
    console.warn("WAIICODE decode failed:", err);
    return;
  }

  const toneStyles = {
    "C4": { color: "#FFD700", shape: "circle", scale: 0.2 },
    "E4": { color: "#00FFFF", shape: "ring", scale: 0.25 },
    "G4": { color: "#FF69B4", shape: "box", scale: 0.3 },
    "A4": { color: "#FF4500", shape: "cone", scale: 0.22 },
    "F3": { color: "#8A2BE2", shape: "cylinder", scale: 0.28 },
    "C5": { color: "#7FFF00", shape: "dodecahedron", scale: 0.35 },
    "G3": { color: "#1E90FF", shape: "torus", scale: 0.3 }
  };

  const message = document.getElementById("message");
  if (message && scene.text) message.setAttribute("value", scene.text);

  if (scene.melody && Array.isArray(scene.melody)) {
    const synth = new Tone.Synth().toDestination();
    Tone.start();
    scene.melody.forEach((note, i) => {
      setTimeout(() => {
        synth.triggerAttackRelease(note, "8n");
        if (scene.glyphParticles) {
          const style = toneStyles[note] || {};
          const glyph = document.createElement("a-entity");
          glyph.setAttribute("geometry", { primitive: style.shape || "sphere", radius: style.scale || 0.2 });
          glyph.setAttribute("material", { color: style.color || "#FFD" });
          glyph.setAttribute("position", `0 ${2.4 - i * 0.25} -3`);
          glyph.setAttribute("animation", {
            property: "scale",
            to: "1.5 1.5 1.5",
            dur: 400,
            dir: "alternate",
            easing: "easeInOutQuad"
          });
          document.querySelector("a-scene").appendChild(glyph);
        }
      }, i * 500);
    });
  }
}

window.addEventListener("DOMContentLoaded", parseSpiralScene);
window.addEventListener("load", parseSpiralScene);
