// ── PARTICLE FIELD ──────────────────────────────────────
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 14000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  for (const p of particles) {
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,229,195,${p.alpha})`;
    ctx.fill();
  }
  // draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── TYPEWRITER ──────────────────────────────────────────
const roles = [
  'DevOps Engineer',
  'AWS Infrastructure',
  'CI/CD Pipelines',
  'Cloud Automation',
  'Linux & Shell'
];
let rIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const r = roles[rIdx];
  if (!deleting) {
    tw.textContent = r.slice(0, ++cIdx);
    if (cIdx === r.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    tw.textContent = r.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 40 : 75);
}
type();

// ── SCROLL FADE IN ──────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
