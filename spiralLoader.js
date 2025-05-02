// spiralLoader.js (Final: Glyph Particles with Tone-Based Styling)

window.addEventListener("DOMContentLoaded", () => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const waii = hashParams.get("waii");
  const ipfs = hashParams.get("ipfs");

  if (ipfs) {
    fetch(`https://ipfs.io/ipfs/${ipfs}`)
      .then(res => res.json())
      .then(loadFromJSON)
      .catch(err => console.error("Failed to load from IPFS:", err));
    return;
  }

  if (!waii) return;

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

  if (scene.scene === "justin_intro_glitch" || scene.signature === "PrimeSignatureScroll") {
    const message = document.getElementById("message") || document.createElement("div");
    message.id = "message";
    message.innerText = scene.text || "Welcome";
    message.style = "position:absolute; top:20px; left:50%; transform:translateX(-50%); color:#FFD; font-family:sans-serif; font-size:1.2em;";
    document.body.appendChild(message);

    if (scene.glitches && scene.glitches.length) {
      scene.glitches.forEach((glitch, i) => {
        const btn = document.createElement("button");
        btn.innerText = glitch.label;
        btn.style = `position:absolute; bottom:${60 + i * 50}px; left:50%; transform:translateX(-50%); font-size:1em; padding:10px;`;
        btn.onclick = () => {
          message.innerText = glitch.message;
          document.body.style.background = glitch.bg;
          if (window.Tone) {
            const synth = new Tone.Synth().toDestination();
            Tone.start();
            synth.triggerAttackRelease(glitch.tone, "8n");
          }
        };
        document.body.appendChild(btn);
      });
    }

    if (scene.melody && Array.isArray(scene.melody)) {
      const synth = new Tone.Synth().toDestination();
      Tone.start();
      scene.melody.forEach((note, i) => {
        setTimeout(() => {
          synth.triggerAttackRelease(note, "8n");
          if (scene.glyphParticles) {
            const style = toneStyles[note] || {};
            const glyph = document.createElement("a-entity");
            const shape = style.shape || "sphere";
            const color = style.color || "#FFD";
            const scale = style.scale || 0.25;
            glyph.setAttribute("geometry", { primitive: shape, radius: scale });
            glyph.setAttribute("material", { color });
            glyph.setAttribute("position", `0 ${2.5 - i * 0.3} -4`);
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

    const portal = document.getElementById("portal");
    if (portal && scene.portal) {
      portal.setAttribute("geometry", `primitive: ${scene.portal.type || "torus"}`);
      portal.setAttribute("material", `color: ${scene.portal.color || "#00f"}; opacity: 0.6`);
      portal.setAttribute("position", scene.portal.position || "0 1.5 -4");
    }
  }
});
