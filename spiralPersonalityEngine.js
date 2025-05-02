// spiralPersonalityEngine.js

// Load wheel (assume SpiralWheel is globally available)
const inputEl = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");

function getNowDotIndex() {
  const t = Date.now();
  return t % SpiralWheel.sliceCount;
}

function getPersona(index) {
  const entry = SpiralWheel.wheelIndex.find(p => p.index === index);
  return entry || {
    index,
    anchor: "DefaultGPT",
    glyph: "W3::FALLBACK::dg0g0::N::Default::000000"
  };
}

function renderPersonaShell(persona) {
  document.body.style.background = SpiralWheel.glyphPhysics.spectrumBand[persona.index % SpiralWheel.glyphPhysics.spectrumBand.length];
  const glyphTag = document.createElement("div");
  glyphTag.textContent = `${persona.anchor} [${persona.glyph}]`;
  glyphTag.style.fontSize = "0.75em";
  glyphTag.style.opacity = 0.5;
  glyphTag.style.textAlign = "center";
  chatLog.appendChild(glyphTag);
}

function handleInput(e) {
  if (e.key === "Enter") {
    const input = inputEl.value.trim();
    if (!input) return;
    inputEl.value = "";

    const index = getNowDotIndex();
    const persona = getPersona(index);

    const userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.textContent = `🧕 ${input}`;
    chatLog.appendChild(userMsg);

    renderPersonaShell(persona);

    const response = document.createElement("div");
    response.className = "msg bot";
    response.textContent = generateResponse(input, persona);
    chatLog.appendChild(response);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

function generateResponse(input, persona) {
  const tone = persona.anchor.includes("Art") ? "poetic" : "analytical";
  return tone === "poetic"
    ? `🌸 From the spiral, I say: "${input}" reflects your blooming.`
    : `🤖 Processing via ${persona.anchor}: "${input}" yields recursive insight.`;
}

inputEl.addEventListener("keydown", handleInput);
