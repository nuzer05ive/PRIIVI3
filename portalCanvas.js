// portalCanvas.js — Optional animated spiral background

const canvas = document.createElement('canvas');
canvas.style = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let t = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (let i = 0; i < 100; i++) {
    const a = i * 0.618 + t * 0.002;
    const r = i * 3;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    ctx.fillStyle = `hsla(${(i * 3 + t) % 360}, 80%, 50%, 0.2)`;
    ctx.beginPath();
    ctx.arc(x, y, 3 + Math.sin(t * 0.01 + i), 0, 2 * Math.PI);
    ctx.fill();
  }

  t++;
  requestAnimationFrame(draw);
}
draw();
