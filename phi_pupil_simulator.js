const canvas = document.getElementById("phiPupilCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cx = canvas.width / 2;
const cy = canvas.height / 2;

function drawSpiralArm(thetaOffset, color) {
  ctx.beginPath();
  for (let t = 0; t < 12 * Math.PI; t += 0.1) {
    const r = 3 * Math.exp(0.12 * t);
    const x = cx + r * Math.cos(t + thetaOffset);
    const y = cy + r * Math.sin(t + thetaOffset);
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawPetalRing() {
  const petals = 13;
  const radius = 250;
  for (let i = 0; i < petals; i++) {
    const angle = (2 * Math.PI / petals) * i;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "hsl(" + (i * 360 / petals) + ", 80%, 60%)";
    ctx.fill();
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPetalRing();
  drawSpiralArm(0, "#88f");
  drawSpiralArm((2 * Math.PI) / 3, "#8f8");
  drawSpiralArm((4 * Math.PI) / 3, "#f88");
  requestAnimationFrame(render);
}

render();
