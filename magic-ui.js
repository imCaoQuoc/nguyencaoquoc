(() => {
  // Magic UI helper: animated ribbon canvas background + light hover lift on key elements.
  const canvas = document.getElementById('magicBg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    const ribbons = 10;
    const pointsPerRibbon = 14;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ribbonBase = Array.from({ length: ribbons }).map((_, i) => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.15,
      amp: 40 + Math.random() * 35,
      hue: 155 + Math.random() * 40,
      offsetY: (i / ribbons) * height * 0.8 + height * 0.1,
    }));

    const getPoints = (rb, time) => {
      const pts = [];
      for (let i = 0; i < pointsPerRibbon; i++) {
        const t = i / (pointsPerRibbon - 1);
        const x = t * width;
        const y =
          rb.offsetY +
          Math.sin(rb.phase + time * rb.speed + t * Math.PI * 2) * rb.amp +
          Math.sin(rb.phase * 0.7 + time * rb.speed * 0.6 + t * Math.PI * 1.5) * (rb.amp * 0.35);
        pts.push({ x, y });
      }
      return pts;
    };

    const drawRibbon = (pts, hue) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];
        const cx = (prev.x + curr.x) / 2;
        const cy = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
      }
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = `hsla(${hue}, 85%, 60%, 0.35)`;
      ctx.stroke();
    };

    const render = (ts) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      ribbonBase.forEach((rb, idx) => {
        const pts = getPoints(rb, ts * 0.001);
        const inner = pts.map((p) => ({ x: p.x, y: p.y + 16 }));
        drawRibbon(pts, rb.hue);
        drawRibbon(inner, rb.hue + 12);
      });
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  // Apply subtle motion hover to cards/contact/stats
  const applyHover = () => {
    document.querySelectorAll('.card, .stat-card, .contact-item').forEach((el) => {
      el.classList.add('magic-card');
    });
  };
  document.addEventListener('DOMContentLoaded', applyHover);
})();
