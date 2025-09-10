const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Lizard body parts (head + tail segments)
const segments = [];
const segmentCount = 15; // short body
for (let i = 0; i < segmentCount; i++) {
  segments.push({ x: canvas.width / 2, y: canvas.height / 2 });
}

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawLizard() {
  // Head
  const head = segments[0];
  ctx.beginPath();
  ctx.arc(head.x, head.y, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#33ff66"; // green head
  ctx.fill();

  // Eyes
  ctx.beginPath();
  ctx.arc(head.x - 5, head.y - 5, 3, 0, Math.PI * 2);
  ctx.arc(head.x + 5, head.y - 5, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();

  // Legs (oscillating)
  for (let i = 2; i < 6; i++) {
    const part = segments[i];
    const angle = Date.now() / 200 + i;
    ctx.beginPath();
    ctx.moveTo(part.x, part.y);
    ctx.lineTo(part.x + Math.cos(angle) * 20, part.y + Math.sin(angle) * 20);
    ctx.strokeStyle = "#55ff88";
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  // Body + Tail
  ctx.beginPath();
  ctx.moveTo(head.x, head.y);
  for (let i = 1; i < segments.length; i++) {
    ctx.lineTo(segments[i].x, segments[i].y);
  }
  ctx.strokeStyle = "#22cc55";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Head follows cursor
  segments[0].x += (mouseX - segments[0].x) * 0.2;
  segments[0].y += (mouseY - segments[0].y) * 0.2;

  // Rest body follows previous
  for (let i = 1; i < segments.length; i++) {
    segments[i].x += (segments[i - 1].x - segments[i].x) * 0.2;
    segments[i].y += (segments[i - 1].y - segments[i].y) * 0.2;
  }

  drawLizard();
  requestAnimationFrame(animate);
}

animate();
