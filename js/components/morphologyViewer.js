// StreakIt! - Colony Morphology Viewer & Magnified Inspector Component
// Scientifically informed SVG rendering of colonial form, margin, elevation, texture, and Kirby-Bauer ZOI

import { sound } from "./audio.js";

export class MorphologyViewer {
  constructor(plateContainerId, modalContainerId) {
    this.plateContainer = document.getElementById(plateContainerId);
    this.modalContainer = document.getElementById(modalContainerId);
    this.currentMission = null;
    this.selectedMorph = null;
    this.onObservationRecorded = null;
  }

  renderIncubatedPlate(mission, onObservationRecorded) {
    this.currentMission = mission;
    this.onObservationRecorded = onObservationRecorded;
    if (!this.plateContainer) return;

    const isKirbyBauer = mission.id === "mission-8";

    this.plateContainer.innerHTML = `
      <div class="incubated-plate-view">
        <div class="plate-status-header">
          <span class="status-indicator-live"></span>
          <h4>Incubated Culture Plate — ${mission.mediaOptions.find(m => m.isCorrect)?.name || "Agar Plate"}</h4>
          <span class="plate-hint-tag">Click on any colony cluster to inspect 10× magnified morphology</span>
        </div>

        <div class="plate-inspection-stage">
          <div class="agar-dish-frame">
            ${isKirbyBauer ? this.getKirbyBauerPlateSvg(mission) : this.getStandardIncubatedSvg(mission)}
          </div>

          <div class="plate-legend-card">
            <h5>Observed Colony Morphotypes</h5>
            <p class="legend-sub">Click a morphotype to inspect characteristics:</p>
            <div class="morph-type-buttons">
              ${mission.colonyMorphologies.map((m, idx) => `
                <button class="btn-morph-select" id="btn-morph-${idx}" data-idx="${idx}">
                  <span class="morph-color-swatch" style="background-color: ${m.visualColor};"></span>
                  <div class="morph-btn-text">
                    <strong>${m.label}</strong>
                    <span>Form: ${m.form} | Margin: ${m.margin}</span>
                  </div>
                  <span class="inspect-icon">🔍 Inspect</span>
                </button>
              `).join("")}
            </div>

            ${isKirbyBauer && mission.kirbyBauerResults ? `
              <div class="kb-zone-table-container">
                <h5>Kirby–Bauer Zone Diameter Table (CLSI M100)</h5>
                <table class="kb-table">
                  <thead>
                    <tr>
                      <th>Antibiotic Disk</th>
                      <th>Zone (mm)</th>
                      <th>CLSI Standard</th>
                      <th>Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${mission.kirbyBauerResults.map(r => `
                      <tr>
                        <td><strong>${r.antibiotic}</strong></td>
                        <td class="text-cyan font-mono">${r.zoneMm} mm</td>
                        <td class="text-slate">${r.clsiThresholds.R} / ${r.clsiThresholds.S}</td>
                        <td><span class="badge-${r.interpretation.startsWith('R') ? 'red' : r.interpretation.startsWith('S') ? 'green' : 'amber'}">${r.interpretation}</span></td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            ` : ''}

            <div class="obs-guidance-box">
              <span class="guidance-bulb">💡</span>
              <p><strong>Microbiology Rule:</strong> Colony morphology informs hypotheses, but is insufficient on its own to confirm bacterial species.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind morphotype inspection clicks
    mission.colonyMorphologies.forEach((m, idx) => {
      const btn = document.getElementById(`btn-morph-${idx}`);
      if (btn) {
        btn.addEventListener("click", () => {
          sound.playClick();
          this.openMorphologyModal(m);
        });
      }
    });

    // Also bind SVG interactive colony clicks
    const colonyHits = this.plateContainer.querySelectorAll(".interactive-colony");
    colonyHits.forEach(el => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(el.getAttribute("data-morph-idx") || "0", 10);
        const m = mission.colonyMorphologies[idx] || mission.colonyMorphologies[0];
        sound.playClick();
        this.openMorphologyModal(m);
      });
    });
  }

  getStandardIncubatedSvg(mission) {
    const morphs = mission.colonyMorphologies;
    const morphA = morphs[0];
    const morphB = morphs.length > 1 ? morphs[1] : null;

    return `
      <svg class="petri-dish-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="agarGradInc" cx="45%" cy="45%" r="50%">
            <stop offset="0%" stop-color="#FEF3C7"/>
            <stop offset="70%" stop-color="#FDE68A"/>
            <stop offset="100%" stop-color="#F59E0B"/>
          </radialGradient>
          <filter id="colonyShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#78350F" flood-opacity="0.35"/>
          </filter>
        </defs>

        <!-- Glass Outer Rim -->
        <circle cx="200" cy="200" r="190" fill="#E2E8F0" stroke="#94A3B8" stroke-width="4"/>
        <circle cx="200" cy="200" r="182" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.8"/>

        <!-- Agar Gel Surface -->
        <circle cx="200" cy="200" r="176" fill="url(#agarGradInc)"/>

        <!-- Quadrant streak marks faded in agar -->
        <path d="M220 80 Q280 120 320 160" stroke="#FBBF24" stroke-width="1" opacity="0.4" fill="none"/>
        <path d="M280 220 Q320 280 260 320" stroke="#FBBF24" stroke-width="1" opacity="0.4" fill="none"/>

        <!-- QUADRANT 1 (Heavy confluent growth in top right) -->
        <g opacity="0.9" filter="url(#colonyShadow)">
          <path d="M220 60 Q310 90 330 180 Q280 160 220 140 Z" fill="${morphA.visualColor}"/>
          <circle cx="250" cy="90" r="8" fill="${morphA.visualColor}"/>
          <circle cx="275" cy="115" r="9" fill="${morphA.visualColor}"/>
          <circle cx="300" cy="140" r="11" fill="${morphA.visualColor}"/>
        </g>

        <!-- QUADRANT 2 (Moderate thinning in bottom right) -->
        <g opacity="0.9" filter="url(#colonyShadow)">
          <circle cx="310" cy="230" r="7" fill="${morphA.visualColor}" class="interactive-colony" data-morph-idx="0" style="cursor: pointer;"/>
          <circle cx="280" cy="270" r="6.5" fill="${morphA.visualColor}" class="interactive-colony" data-morph-idx="0" style="cursor: pointer;"/>
          <circle cx="250" cy="305" r="7.5" fill="${morphA.visualColor}" class="interactive-colony" data-morph-idx="0" style="cursor: pointer;"/>
          ${morphB ? `
            <!-- Secondary morphotype in Q2 -->
            <path d="M285 245 Q305 240 315 255 Q295 270 285 245 Z" fill="${morphB.visualColor}" class="interactive-colony" data-morph-idx="1" style="cursor: pointer;"/>
          ` : ''}
        </g>

        <!-- QUADRANT 3 (More dilute discrete colonies in bottom left) -->
        <g opacity="0.95" filter="url(#colonyShadow)">
          <circle cx="160" cy="310" r="6" fill="${morphA.visualColor}" class="interactive-colony" data-morph-idx="0" style="cursor: pointer;"/>
          <circle cx="120" cy="285" r="6.5" fill="${morphA.visualColor}" class="interactive-colony" data-morph-idx="0" style="cursor: pointer;"/>
          <circle cx="95" cy="250" r="6" fill="${morphA.visualColor}" class="interactive-colony" data-morph-idx="0" style="cursor: pointer;"/>
          ${morphB ? `
            <path d="M135 270 Q155 260 160 280 Q140 295 135 270 Z" fill="${morphB.visualColor}" class="interactive-colony" data-morph-idx="1" style="cursor: pointer;"/>
          ` : ''}
        </g>

        <!-- QUADRANT 4 (Single isolated target colonies in top left!) -->
        <g opacity="1" filter="url(#colonyShadow)">
          <!-- Clickable isolated target colonies with soft pulse ring -->
          <g class="interactive-colony" data-morph-idx="0" style="cursor: pointer;">
            <circle cx="90" cy="160" r="10" fill="none" stroke="#22D3EE" stroke-width="1.8" stroke-dasharray="3,3" class="pulse-ring"/>
            <circle cx="90" cy="160" r="6.5" fill="${morphA.visualColor}"/>
            <circle cx="88" cy="158" r="2" fill="#FFFFFF" opacity="0.6"/>
          </g>
          <g class="interactive-colony" data-morph-idx="0" style="cursor: pointer;">
            <circle cx="110" cy="115" r="10" fill="none" stroke="#22D3EE" stroke-width="1.8" stroke-dasharray="3,3" class="pulse-ring"/>
            <circle cx="110" cy="115" r="7" fill="${morphA.visualColor}"/>
            <circle cx="108" cy="113" r="2" fill="#FFFFFF" opacity="0.6"/>
          </g>
          <g class="interactive-colony" data-morph-idx="0" style="cursor: pointer;">
            <circle cx="145" cy="85" r="6" fill="${morphA.visualColor}"/>
          </g>
          ${morphB ? `
            <g class="interactive-colony" data-morph-idx="1" style="cursor: pointer;">
              <circle cx="125" cy="150" r="12" fill="none" stroke="#F59E0B" stroke-width="1.8" stroke-dasharray="3,3"/>
              <ellipse cx="125" cy="150" rx="9" ry="7" fill="${morphB.visualColor}"/>
            </g>
          ` : ''}
        </g>

        <!-- Glass Specular Arc Reflection -->
        <path d="M80 60 A176 176 0 0 1 320 60" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.55" stroke-linecap="round"/>
      </svg>
    `;
  }

  getKirbyBauerPlateSvg(mission) {
    return `
      <svg class="petri-dish-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="mhaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#F1F5F9"/>
            <stop offset="100%" stop-color="#CBD5E1"/>
          </radialGradient>
        </defs>

        <!-- Glass Dish -->
        <circle cx="200" cy="200" r="190" fill="#E2E8F0" stroke="#64748B" stroke-width="3"/>
        <circle cx="200" cy="200" r="176" fill="url(#mhaGrad)"/>

        <!-- Confluent Bacterial Lawn (Uniform stippling) -->
        <circle cx="200" cy="200" r="172" fill="#E2E8F0" opacity="0.9"/>

        <!-- DISK 1: Ampicillin (Resistant: 8mm tiny zone) -->
        <!-- Clear Zone of Inhibition -->
        <circle cx="140" cy="130" r="22" fill="#CBD5E1" opacity="0.75"/>
        <circle cx="140" cy="130" r="22" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3,3"/>
        <!-- Antibiotic Paper Disk (6mm standardized) -->
        <circle cx="140" cy="130" r="14" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.2"/>
        <text x="140" y="129" font-size="8" font-weight="bold" fill="#0F172A" text-anchor="middle">AMP 10</text>
        <text x="140" y="139" font-size="7" fill="#64748B" text-anchor="middle">8 mm (R)</text>

        <!-- DISK 2: Ciprofloxacin (Susceptible: 28mm large clear zone) -->
        <circle cx="260" cy="140" r="65" fill="#CBD5E1" opacity="0.85"/>
        <circle cx="260" cy="140" r="65" fill="none" stroke="#10B981" stroke-width="2" stroke-dasharray="4,4"/>
        <circle cx="260" cy="140" r="14" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.2"/>
        <text x="260" y="139" font-size="8" font-weight="bold" fill="#0F172A" text-anchor="middle">CIP 5</text>
        <text x="260" y="149" font-size="7" fill="#64748B" text-anchor="middle">28 mm (S)</text>

        <!-- DISK 3: Gentamicin (Intermediate: 14mm moderate zone) -->
        <circle cx="200" cy="280" r="36" fill="#CBD5E1" opacity="0.8"/>
        <circle cx="200" cy="280" r="36" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="3,3"/>
        <circle cx="200" cy="280" r="14" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.2"/>
        <text x="200" y="279" font-size="8" font-weight="bold" fill="#0F172A" text-anchor="middle">GEN 10</text>
        <text x="200" y="289" font-size="7" fill="#64748B" text-anchor="middle">14 mm (I)</text>
      </svg>
    `;
  }

  openMorphologyModal(m) {
    this.selectedMorph = m;
    if (!this.modalContainer) return;

    this.modalContainer.innerHTML = `
      <div class="morph-modal-backdrop" id="morph-backdrop">
        <div class="morph-inspection-card">
          <div class="morph-card-header">
            <div>
              <span class="morph-badge">10× Digital Magnification</span>
              <h3>${m.label}</h3>
            </div>
            <button class="btn-close-modal" id="btn-close-morph" aria-label="Close inspection window">✕</button>
          </div>

          <div class="morph-card-grid">
            <!-- Magnified Visual Canvas / SVG -->
            <div class="morph-magnified-visual">
              <div class="lens-viewfinder">
                ${this.getMagnifiedColonySvg(m)}
              </div>
              <span class="magnification-tag">10× Optical Equivalent</span>
            </div>

            <!-- Morphological Trait Callouts -->
            <div class="morph-traits-details">
              <h4>Standard Colonial Characteristics</h4>
              
              <div class="trait-row">
                <span class="trait-name">Form (Shape):</span>
                <span class="trait-value font-bold">${m.form}</span>
                <span class="trait-def" title="${m.definitions?.form || ''}">ℹ️</span>
              </div>
              <div class="trait-row">
                <span class="trait-name">Margin (Edge):</span>
                <span class="trait-value font-bold">${m.margin}</span>
                <span class="trait-def" title="${m.definitions?.margin || ''}">ℹ️</span>
              </div>
              <div class="trait-row">
                <span class="trait-name">Elevation:</span>
                <span class="trait-value font-bold">${m.elevation}</span>
                <span class="trait-def" title="${m.definitions?.elevation || ''}">ℹ️</span>
              </div>
              <div class="trait-row">
                <span class="trait-name">Pigmentation:</span>
                <span class="trait-value font-bold">${m.pigmentation}</span>
              </div>
              <div class="trait-row">
                <span class="trait-name">Surface Texture:</span>
                <span class="trait-value font-bold">${m.surface}</span>
              </div>
              <div class="trait-row">
                <span class="trait-name">Opacity:</span>
                <span class="trait-value font-bold">${m.opacity}</span>
              </div>
              <div class="trait-row">
                <span class="trait-name">Estimated Size:</span>
                <span class="trait-value font-bold font-mono text-cyan">${m.size}</span>
              </div>

              <!-- Observation vs Interpretation check -->
              <div class="obs-log-action-card">
                <p><strong>Record Observation:</strong> Confirm and log these observed colonial parameters into your laboratory evidence record.</p>
                <button class="btn-primary" id="btn-record-morph-evidence">
                  Log Colony Observation & Open Evidence Board ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById("btn-close-morph");
    const backdrop = document.getElementById("morph-backdrop");
    const logBtn = document.getElementById("btn-record-morph-evidence");

    const closeModal = () => {
      this.modalContainer.innerHTML = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal();
      });
    }

    if (logBtn) {
      logBtn.addEventListener("click", () => {
        sound.playClick();
        closeModal();
        if (this.onObservationRecorded) {
          this.onObservationRecorded(m);
        }
      });
    }
  }

  getMagnifiedColonySvg(m) {
    const color = m.visualColor || "#FDE68A";
    const isFilamentous = m.form.toLowerCase().includes("filamentous");
    const isIrregular = m.form.toLowerCase().includes("irregular");

    if (isFilamentous) {
      return `
        <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FEF3C7" opacity="0.4"/>
          <!-- Filamentous hyphal branches radiating outward -->
          <g stroke="${color}" stroke-linecap="round" fill="none">
            <path d="M100 100 Q120 70 145 40 M145 40 Q155 25 170 20" stroke-width="3"/>
            <path d="M100 100 Q70 80 40 60 M40 60 Q25 50 15 35" stroke-width="3"/>
            <path d="M100 100 Q80 130 50 155 M50 155 Q35 170 20 180" stroke-width="3"/>
            <path d="M100 100 Q130 130 160 150 M160 150 Q175 165 185 180" stroke-width="3"/>
            <path d="M100 100 L100 30 M100 30 L90 15" stroke-width="2"/>
            <path d="M100 100 L170 100 M170 100 L185 95" stroke-width="2"/>
            <path d="M100 100 L100 170 M100 170 L110 185" stroke-width="2"/>
            <path d="M100 100 L30 100 M30 100 L15 105" stroke-width="2"/>
          </g>
          <!-- Dense central mycelial core -->
          <circle cx="100" cy="100" r="35" fill="${color}" opacity="0.9"/>
          <circle cx="100" cy="100" r="20" fill="#1C1917" opacity="0.3"/>
        </svg>
      `;
    }

    if (isIrregular) {
      return `
        <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" fill="#FEF3C7" opacity="0.4"/>
          <!-- Irregular lobate perimeter -->
          <path d="M100 35 C130 30, 160 50, 155 80 C150 110, 180 135, 160 160 C140 185, 105 165, 80 175 C55 185, 30 150, 35 120 C40 90, 25 60, 55 45 C85 30, 70 40, 100 35 Z" 
                fill="${color}" stroke="#CBD5E1" stroke-width="2"/>
          <!-- Shimmer surface reflection -->
          <ellipse cx="85" cy="75" rx="30" ry="15" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 85 75)"/>
        </svg>
      `;
    }

    // Standard Circular Convex Colony
    return `
      <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="magnifiedGrad" cx="40%" cy="40%" r="55%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8"/>
            <stop offset="30%" stop-color="${color}"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0.9"/>
          </radialGradient>
          <filter id="dome3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#1E293B" flood-opacity="0.3"/>
          </filter>
        </defs>

        <circle cx="100" cy="100" r="95" fill="#FEF3C7" opacity="0.4"/>

        <!-- Convex Colony Dome -->
        <circle cx="100" cy="100" r="70" fill="url(#magnifiedGrad)" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" filter="url(#dome3d)"/>
        
        <!-- Surface Specular Light Arc -->
        <path d="M65 65 A50 50 0 0 1 125 55" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" opacity="0.75"/>
      </svg>
    `;
  }
}
