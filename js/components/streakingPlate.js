// StreakIt! - Interactive Agar-Plate Freehand Streaking Canvas
// High-performance 60fps mouse & touchscreen drawing with progressive dilution, flame loop, undo & clear

import { sound } from "./audio.js";

export class StreakingPlate {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.onFinish = options.onFinish || null;

    this.isDrawing = false;
    this.paths = []; // Array of { points: [{x, y}], quadrant: 1-4, flamed: boolean }
    this.currentPath = null;
    this.showGuides = true;
    this.patternType = "quadrant"; // 'quadrant', 't-streak', 'zigzag'
    this.loopFlamed = false;
    this.lastSoundTime = 0;

    if (this.canvas) {
      this.initCanvas();
      this.bindEvents();
    }
  }

  initCanvas() {
    // Handle Retina / HiDPI screens crisply
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 420;
    this.height = rect.height || 420;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);

    this.redraw();
  }

  setPattern(patternType) {
    this.patternType = patternType;
    this.clear();
  }

  toggleGuides() {
    this.showGuides = !this.showGuides;
    this.redraw();
    return this.showGuides;
  }

  flameLoop(buttonEl = null) {
    sound.playFlame();
    this.loopFlamed = true;

    if (buttonEl) {
      buttonEl.classList.add("flame-active");
      setTimeout(() => {
        buttonEl.classList.remove("flame-active");
      }, 700);
    }
  }

  undo() {
    if (this.paths.length > 0) {
      this.paths.pop();
      sound.playClick();
      this.redraw();
    }
  }

  clear() {
    this.paths = [];
    this.loopFlamed = false;
    sound.playClick();
    this.redraw();
  }

  // Accessible auto-streak helper for keyboard or motor accessibility
  autoStreakPattern() {
    sound.playFlame();
    this.paths = [];
    const cx = this.width / 2;
    const cy = this.height / 2;
    const r = (this.width / 2) - 25;

    // Simulate progressive quadrant streaking
    // Quadrant 1 (dense zigzags in top-right)
    const q1Points = [];
    for (let i = 0; i <= 10; i++) {
      const angle = (Math.PI * 1.5) + (i * 0.15);
      const dist = r * 0.45 + (i % 2 === 0 ? 35 : -35);
      q1Points.push({ x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist });
    }
    this.paths.push({ points: q1Points, quadrant: 1, flamed: false });

    // Quadrant 2
    const q2Points = [];
    for (let i = 0; i <= 8; i++) {
      const angle = (i * 0.18);
      const dist = r * 0.5 + (i % 2 === 0 ? 30 : -30);
      q2Points.push({ x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist });
    }
    this.paths.push({ points: q2Points, quadrant: 2, flamed: true });

    // Quadrant 3
    const q3Points = [];
    for (let i = 0; i <= 6; i++) {
      const angle = (Math.PI * 0.5) + (i * 0.22);
      const dist = r * 0.55 + (i % 2 === 0 ? 25 : -25);
      q3Points.push({ x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist });
    }
    this.paths.push({ points: q3Points, quadrant: 3, flamed: true });

    // Quadrant 4 (loose isolated streaks)
    const q4Points = [];
    for (let i = 0; i <= 5; i++) {
      const angle = Math.PI + (i * 0.28);
      const dist = r * 0.45 + (i % 2 === 0 ? 20 : -20);
      q4Points.push({ x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist });
    }
    this.paths.push({ points: q4Points, quadrant: 4, flamed: true });

    this.redraw();
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  getQuadrant(x, y) {
    const cx = this.width / 2;
    const cy = this.height / 2;
    if (x >= cx && y < cy) return 1; // Top-Right (Standard Q1)
    if (x >= cx && y >= cy) return 2; // Bottom-Right (Q2)
    if (x < cx && y >= cy) return 3; // Bottom-Left (Q3)
    return 4; // Top-Left (Q4)
  }

  bindEvents() {
    const startDrawing = (e) => {
      e.preventDefault();
      const pos = this.getPointerPos(e);
      const dist = Math.hypot(pos.x - (this.width / 2), pos.y - (this.height / 2));
      // Restrict drawing to circular agar surface
      if (dist > (this.width / 2) - 15) return;

      this.isDrawing = true;
      const q = this.getQuadrant(pos.x, pos.y);
      this.currentPath = {
        points: [pos],
        quadrant: q,
        flamed: this.loopFlamed
      };
      this.paths.push(this.currentPath);
      sound.playStreakScratch();
    };

    const draw = (e) => {
      if (!this.isDrawing || !this.currentPath) return;
      e.preventDefault();
      const pos = this.getPointerPos(e);
      const dist = Math.hypot(pos.x - (this.width / 2), pos.y - (this.height / 2));
      if (dist > (this.width / 2) - 15) return;

      this.currentPath.points.push(pos);

      // Play soft scratch audio periodically during continuous stroke
      const now = performance.now();
      if (now - this.lastSoundTime > 90) {
        sound.playStreakScratch();
        this.lastSoundTime = now;
      }

      this.redraw();
    };

    const stopDrawing = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      this.isDrawing = false;
      this.currentPath = null;
    };

    // Mouse events
    this.canvas.addEventListener("mousedown", startDrawing);
    this.canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stopDrawing);

    // Touch events
    this.canvas.addEventListener("touchstart", startDrawing, { passive: false });
    this.canvas.addEventListener("touchmove", draw, { passive: false });
    window.addEventListener("touchend", stopDrawing);
  }

  redraw() {
    if (!this.ctx) return;
    const w = this.width;
    const h = this.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = (w / 2) - 16;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Petri Dish Outer Rim & Glass Bevel
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    this.ctx.fillStyle = "#E2E8F0";
    this.ctx.shadowColor = "rgba(15, 23, 42, 0.15)";
    this.ctx.shadowBlur = 16;
    this.ctx.shadowOffsetY = 6;
    this.ctx.fill();

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#CBD5E1";
    this.ctx.stroke();
    this.ctx.restore();

    // 2. Agar Gel Base Layer
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    // Translucent rich amber-cream agar gradient
    const agarGrad = this.ctx.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, r);
    agarGrad.addColorStop(0, "#FEF3C7");
    agarGrad.addColorStop(0.7, "#FDE68A");
    agarGrad.addColorStop(1, "#F59E0B");
    this.ctx.fillStyle = agarGrad;
    this.ctx.fill();

    // Agar internal specular meniscus ring
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    this.ctx.stroke();
    this.ctx.restore();

    // 3. Quadrant or Pattern Guideline Overlay
    if (this.showGuides) {
      this.ctx.save();
      this.ctx.setLineDash([6, 6]);
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeStyle = "rgba(100, 116, 139, 0.45)";

      if (this.patternType === "quadrant") {
        // Horizontal line
        this.ctx.beginPath();
        this.ctx.moveTo(cx - r + 8, cy);
        this.ctx.lineTo(cx + r - 8, cy);
        this.ctx.stroke();

        // Vertical line
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - r + 8);
        this.ctx.lineTo(cx, cy + r - 8);
        this.ctx.stroke();

        // Quadrant Labels
        this.ctx.fillStyle = "rgba(71, 85, 105, 0.75)";
        this.ctx.font = "bold 13px Inter, sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillText("Quadrant I (Heavy)", cx + (r * 0.5), cy - (r * 0.5));
        this.ctx.fillText("Quadrant II", cx + (r * 0.5), cy + (r * 0.5));
        this.ctx.fillText("Quadrant III", cx - (r * 0.5), cy + (r * 0.5));
        this.ctx.fillText("Quadrant IV (Isolated)", cx - (r * 0.5), cy - (r * 0.5));
      } else if (this.patternType === "t-streak") {
        // T-Streak crossbar and midline
        this.ctx.beginPath();
        this.ctx.moveTo(cx - r + 8, cy - (r * 0.2));
        this.ctx.lineTo(cx + r - 8, cy - (r * 0.2));
        this.ctx.moveTo(cx, cy - (r * 0.2));
        this.ctx.lineTo(cx, cy + r - 8);
        this.ctx.stroke();

        this.ctx.fillStyle = "rgba(71, 85, 105, 0.75)";
        this.ctx.font = "bold 13px Inter, sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Sector 1", cx, cy - (r * 0.6));
        this.ctx.fillText("Sector 2", cx - (r * 0.45), cy + (r * 0.4));
        this.ctx.fillText("Sector 3", cx + (r * 0.45), cy + (r * 0.4));
      }
      this.ctx.restore();
    }

    // 4. Inoculation Streak Paths
    this.paths.forEach((path) => {
      if (path.points.length < 2) return;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(path.points[0].x, path.points[0].y);

      for (let i = 1; i < path.points.length; i++) {
        const pt = path.points[i];
        this.ctx.lineTo(pt.x, pt.y);
      }

      // Simulated dilution line thickness & opacity per quadrant
      let strokeWidth = 3.5;
      let strokeOpacity = 0.85;

      if (path.quadrant === 2) {
        strokeWidth = 2.6;
        strokeOpacity = 0.70;
      } else if (path.quadrant === 3) {
        strokeWidth = 2.0;
        strokeOpacity = 0.55;
      } else if (path.quadrant === 4) {
        strokeWidth = 1.4;
        strokeOpacity = 0.45;
      }

      this.ctx.lineWidth = strokeWidth;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      // Semi-translucent moist bacterial smear with slight shimmer
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${strokeOpacity})`;
      this.ctx.shadowColor = "rgba(180, 83, 9, 0.4)";
      this.ctx.shadowBlur = 3;
      this.ctx.stroke();
      this.ctx.restore();
    });

    // 5. Glass Dish Highlights / Reflections
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r - 2, -Math.PI * 0.75, -Math.PI * 0.25);
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
    this.ctx.lineWidth = 3.5;
    this.ctx.stroke();
    this.ctx.restore();
  }

  hasDrawnContent() {
    return this.paths.length > 0 && this.paths.some(p => p.points.length > 4);
  }
}
