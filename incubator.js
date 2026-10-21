// StreakIt! - Simulated Incubation Chamber Component
// Digital incubator animation with temperature controls, audio hum, and progress bar

import { sound } from "./audio.js";

export class IncubatorChamber {
  constructor(containerId, onComplete) {
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    this.timer = null;
    this.humInstance = null;
    this.isIncubating = false;
  }

  startIncubation(mission, durationMs = 3500) {
    if (!this.container || this.isIncubating) return;
    this.isIncubating = true;

    const temp = mission.incubation?.temperature || "37°C";
    const simDuration = mission.incubation?.duration || "24-48 Hours (Simulated)";
    const conditions = mission.incubation?.conditions || "Aerobic incubation";

    this.humInstance = sound.startIncubatorHum();

    this.container.innerHTML = `
      <div class="incubator-modal-overlay">
        <div class="incubator-unit-card">
          <div class="incubator-top-display">
            <div class="incubator-brand">
              <span class="incubator-logo-dot"></span>
              <strong>THERMO-CULTURE 3000</strong>
              <span class="incubator-sub">Microbiology Digital Incubator</span>
            </div>
            <div class="incubator-digital-screen">
              <div class="screen-metric">
                <span class="metric-label">CHAMBER TEMP</span>
                <span class="metric-val text-cyan">${temp}</span>
              </div>
              <div class="screen-metric">
                <span class="metric-label">TARGET TIME</span>
                <span class="metric-val text-amber">${simDuration}</span>
              </div>
              <div class="screen-metric">
                <span class="metric-label">ATMOSPHERE</span>
                <span class="metric-val text-green">${conditions}</span>
              </div>
            </div>
          </div>

          <div class="incubator-view-window">
            <div class="incubator-chamber-glow"></div>
            <div class="incubator-shelf">
              <div class="incubator-plate-preview">
                <div class="plate-ring-inner">
                  <div class="plate-growth-halo"></div>
                </div>
              </div>
            </div>
            <div class="heat-wave-lines">
              <div class="heat-wave w1"></div>
              <div class="heat-wave w2"></div>
              <div class="heat-wave w3"></div>
            </div>
          </div>

          <div class="incubator-progress-section">
            <div class="progress-bar-track">
              <div class="progress-bar-fill" id="inc-progress-fill"></div>
            </div>
            <div class="progress-meta">
              <span id="inc-status-text">Accelerating biological time-lapse...</span>
              <span id="inc-percent-text">0%</span>
            </div>
          </div>

          <div class="incubator-footer-actions">
            <button class="btn-secondary" id="btn-skip-incubation">
              Skip Time-Lapse ⏭️
            </button>
            <p class="incubator-disclaimer">
              Predefined educational simulation model. Results illustrate scenario outcomes.
            </p>
          </div>
        </div>
      </div>
    `;

    const fillEl = document.getElementById("inc-progress-fill");
    const percentEl = document.getElementById("inc-percent-text");
    const statusEl = document.getElementById("inc-status-text");
    const skipBtn = document.getElementById("btn-skip-incubation");

    const startTime = performance.now();

    const updateProgress = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const percent = Math.round(progress * 100);

      if (fillEl) fillEl.style.width = `${percent}%`;
      if (percentEl) percentEl.textContent = `${percent}%`;

      if (progress < 0.3) {
        if (statusEl) statusEl.textContent = "Thermal equilibration at optimal growth temperature...";
      } else if (progress < 0.7) {
        if (statusEl) statusEl.textContent = "Logarithmic cellular division and colony biomass expansion...";
      } else {
        if (statusEl) statusEl.textContent = "Colony pigmentation, elevation, and margins fully resolved!";
      }

      if (progress < 1) {
        this.timer = requestAnimationFrame(updateProgress);
      } else {
        this.finish();
      }
    };

    this.timer = requestAnimationFrame(updateProgress);

    if (skipBtn) {
      skipBtn.addEventListener("click", () => {
        sound.playClick();
        this.finish();
      });
    }
  }

  finish() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }
    if (this.humInstance) {
      this.humInstance.stop();
      this.humInstance = null;
    }
    sound.playSuccess();
    this.isIncubating = false;

    if (this.container) {
      this.container.innerHTML = "";
    }

    if (this.onComplete) {
      this.onComplete();
    }
  }
}
