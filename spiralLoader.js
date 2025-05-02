// spiralLoader.js (patched with base64 decode + scene routing)

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

  // Route scene
  if (scene.scene === "justin_intro_glitch") {
    document.body.style.background = "#101010";
    const message = document.getElementById("message") || document.createElement("div");
    message.id = "message";
    message.innerText = scene.text || "Welcome";
    message.style = "position:absolute; top:20px; left:50%; transform:translateX(-50%); color:#FFD; font-family:sans-serif; font-size:1.2em;";
    document.body.appendChild(message);

    // Setup glitch buttons
    if (scene.glitches && scene.glitches.length) {
      scene.glitches.forEach((glitch, i) => {
        const btn = document.createElement("button");
        btn.innerText = glitch.label;
        btn.style = `position:absolute; bottom:${60 + i * 50}px; left:50%; transform:translateX(-50%); font-size:1em; padding:10px;`;
        btn.onclick = () => {
          message.innerText = glitch.message;
          document.body.style.background = glitch.bg;
          const synth = new Tone.Synth().toDestination();
          Tone.start();
          synth.triggerAttackRelease(glitch.tone, "8n");
        };
        document.body.appendChild(btn);
      });
    }
  }
});
