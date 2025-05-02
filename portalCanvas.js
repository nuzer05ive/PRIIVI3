// portalCanvas.js

const canvas = document.getElementById("portal-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let t = 0;
function drawPortal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const phi = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < 100; i++) {
    const angle = i * 0.618 + t * 0.002;
    const radius = i * 4;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    const colorIndex = i % SpiralWheel.glyphPhysics.spectrumBand.length;
    ctx.fillStyle = SpiralWheel.glyphPhysics.spectrumBand[colorIndex];
    ctx.beginPath();
    ctx.arc(x, y, 2 + Math.sin(t * 0.01 + i), 0, 2 * Math.PI);
    ctx.fill();
  }

  t++;
  requestAnimationFrame(drawPortal);
}

requestAnimationFrame(drawPortal);
