// StreakIt! - Habitat Exploration & Interactive Sampling Component
// Interactive SVG-based habitat maps with drag & click sampling swab and hotspot detection

import { sound } from "./audio.js";

export class HabitatExplorer {
  constructor(containerId, onSampleCollected) {
    this.container = document.getElementById(containerId);
    this.onSampleCollected = onSampleCollected;
    this.currentMission = null;
    this.collected = false;
  }

  loadHabitat(mission) {
    this.currentMission = mission;
    this.collected = false;
    this.render();
  }

  render() {
    if (!this.container || !this.currentMission) return;
    const h = this.currentMission.habitat;

    this.container.innerHTML = `
      <div class="habitat-panel">
        <div class="habitat-header">
          <div class="habitat-meta">
            <span class="habitat-badge">${h.type} Ecosystem</span>
            <h3 class="habitat-title">${h.name}</h3>
            <p class="habitat-desc">${h.description}</p>
          </div>
          <div class="habitat-factors">
            <h4>Ecological Factors:</h4>
            <ul>
              ${h.ecologicalFactors.map(f => `<li><span class="bullet-dot"></span>${f}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="habitat-viewport-container">
          <div class="habitat-svg-wrapper" id="habitat-svg-wrapper">
            ${this.getHabitatSvgMarkup(h.id)}
            
            <!-- Hotspots overlay -->
            <div class="hotspots-layer" id="hotspots-layer">
              ${h.hotspots.map((hs, idx) => `
                <div class="habitat-hotspot ${hs.permitted ? 'is-target' : 'is-invalid'}" 
                     id="hotspot-${hs.id}" 
                     data-id="${hs.id}" 
                     data-permitted="${hs.permitted}"
                     style="left: ${hs.x}%; top: ${hs.y}%;"
                     title="${hs.name} - ${hs.hint || hs.reason || ''}">
                  <div class="hotspot-pulse"></div>
                  <div class="hotspot-pin">
                    <span class="hotspot-icon">${hs.permitted ? '🎯' : '⚠️'}</span>
                  </div>
                  <div class="hotspot-tooltip">
                    <strong>${hs.name}</strong>
                    <p>${hs.hint || hs.reason || ''}</p>
                    <span class="hotspot-action-call">${hs.permitted ? 'Click or drag swab here' : 'Unavailable for this mission'}</span>
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- Inoculation Swab / Loop tool for sampling -->
            <div class="sampling-tool-dock" id="sampling-tool-dock">
              <div class="sampling-swab" id="sampling-swab" draggable="true" title="Drag swab to target hotspot or click a target">
                <div class="swab-handle">
                  <div class="handle-grip"></div>
                </div>
                <div class="swab-shaft"></div>
                <div class="swab-tip" id="swab-tip">
                  <span class="tip-cotton"></span>
                </div>
                <span class="swab-label">Sterile Swab</span>
              </div>
              <p class="tool-instruction-hint">Drag swab onto a hotspot or click any active target</p>
            </div>
          </div>
        </div>

        <div class="sampling-feedback-bar" id="sampling-feedback-bar">
          <span class="feedback-icon">ℹ️</span>
          <span class="feedback-text" id="sampling-feedback-text">Locate the sampling hotspot indicated in your mission briefing.</span>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  getHabitatSvgMarkup(habitatId) {
    // Highly attractive, responsive SVG illustrations representing distinct biomes
    switch (habitatId) {
      case "soil-rhizosphere":
      case "garden-soil":
      case "bioremediation-site":
        return `
          <svg class="habitat-scene-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#93C5FD"/>
                <stop offset="100%" stop-color="#DBEAFE"/>
              </linearGradient>
              <linearGradient id="soilLayer" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#78350F"/>
                <stop offset="30%" stop-color="#451A03"/>
                <stop offset="100%" stop-color="#1C1917"/>
              </linearGradient>
              <linearGradient id="rootGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FEF08A"/>
                <stop offset="100%" stop-color="#FDE047"/>
              </linearGradient>
            </defs>
            <!-- Sky / Daylight -->
            <rect width="800" height="150" fill="url(#skyGrad)"/>
            <!-- Sun glow -->
            <circle cx="700" cy="50" r="35" fill="#FEF08A" opacity="0.7"/>
            <!-- Rolling Hills in background -->
            <path d="M0 150 Q180 110 380 140 T800 130 L800 160 L0 160 Z" fill="#65A30D" opacity="0.8"/>
            <path d="M0 160 Q260 130 520 155 T800 145 L800 175 L0 175 Z" fill="#4D7C0F"/>
            <!-- Grass Line -->
            <rect y="170" width="800" height="20" fill="#365314"/>
            <!-- Plant Shoots & Clover Leaves -->
            <g transform="translate(300, 70)">
              <path d="M35 100 Q30 50 15 25" stroke="#15803D" stroke-width="4" fill="none"/>
              <ellipse cx="10" cy="20" rx="14" ry="9" fill="#22C55E" transform="rotate(-30 10 20)"/>
              <ellipse cx="20" cy="14" rx="14" ry="9" fill="#16A34A" transform="rotate(30 20 14)"/>
              <ellipse cx="6" cy="10" rx="14" ry="9" fill="#15803D"/>
              <!-- Second clover stem -->
              <path d="M35 100 Q45 60 65 35" stroke="#15803D" stroke-width="4" fill="none"/>
              <ellipse cx="65" cy="30" rx="12" ry="8" fill="#22C55E" transform="rotate(20 65 30)"/>
              <ellipse cx="75" cy="24" rx="12" ry="8" fill="#16A34A" transform="rotate(-20 75 24)"/>
            </g>
            <!-- Soil Strata (Cross Section) -->
            <rect y="180" width="800" height="270" fill="url(#soilLayer)"/>
            <!-- Organic Topsoil horizon line -->
            <path d="M0 180 Q200 185 400 180 T800 183 L800 230 L0 230 Z" fill="#292524" opacity="0.6"/>
            <!-- Intricate Clover Root System in Rhizosphere -->
            <g stroke="url(#rootGrad)" stroke-linecap="round" fill="none">
              <!-- Taproot -->
              <path d="M335 180 Q338 240 330 310 Q325 360 330 420" stroke-width="5"/>
              <!-- Lateral Secondary roots -->
              <path d="M336 210 Q280 230 220 250 Q180 260 140 280" stroke-width="3"/>
              <path d="M335 240 Q390 260 450 270 Q510 290 560 320" stroke-width="3"/>
              <path d="M332 290 Q270 320 210 350 Q170 380 130 410" stroke-width="2.5"/>
              <path d="M328 340 Q380 370 440 390 Q480 410 520 430" stroke-width="2"/>
              <!-- Fine Root Hairs (Rhizosphere envelope) -->
              <path d="M220 250 Q200 270 190 290 M230 255 Q210 280 200 310" stroke-width="1.2" opacity="0.8"/>
              <path d="M450 270 Q470 290 480 320 M440 275 Q460 305 470 335" stroke-width="1.2" opacity="0.8"/>
              <!-- Root Nodules for Mission 3 / Rhizobia -->
              <ellipse cx="280" cy="235" rx="7" ry="5" fill="#FDA4AF" stroke="#E11D48" stroke-width="1"/>
              <ellipse cx="360" cy="255" rx="8" ry="6" fill="#FDA4AF" stroke="#E11D48" stroke-width="1"/>
              <ellipse cx="260" cy="325" rx="7" ry="5" fill="#FDA4AF" stroke="#E11D48" stroke-width="1"/>
            </g>
            <!-- Soil pore spaces and aggregate pebbles -->
            <circle cx="120" cy="320" r="14" fill="#57534E"/>
            <circle cx="680" cy="260" r="18" fill="#57534E"/>
            <circle cx="590" cy="380" r="22" fill="#44403C"/>
            <circle cx="210" cy="410" r="16" fill="#57534E"/>
            <!-- Microbe glow particles in soil -->
            <circle cx="345" cy="250" r="3" fill="#22D3EE" opacity="0.8"/>
            <circle cx="320" cy="280" r="2.5" fill="#A7F3D0" opacity="0.9"/>
            <circle cx="360" cy="310" r="3" fill="#FDE047" opacity="0.8"/>
            <circle cx="310" cy="230" r="2" fill="#22D3EE" opacity="0.7"/>
          </svg>
        `;

      case "freshwater-estuary":
      case "freshwater-stream":
      case "anaerobic-marsh":
        return `
          <svg class="habitat-scene-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38BDF8"/>
                <stop offset="40%" stop-color="#0284C7"/>
                <stop offset="100%" stop-color="#0C4A6E"/>
              </linearGradient>
              <linearGradient id="siltGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#713F12"/>
                <stop offset="100%" stop-color="#1E293B"/>
              </linearGradient>
            </defs>
            <!-- Sky -->
            <rect width="800" height="120" fill="#BAE6FD"/>
            <!-- Distant riparian bank -->
            <path d="M0 120 Q200 90 400 115 T800 100 L800 150 L0 150 Z" fill="#15803D"/>
            <!-- Riparian Reeds & Sedges -->
            <path d="M80 150 L75 80 M90 150 L95 70 M105 150 L110 85 M120 150 L115 75" stroke="#166534" stroke-width="3"/>
            <path d="M220 150 L215 85 M235 150 L240 70 M250 150 L255 80" stroke="#166534" stroke-width="3"/>
            <!-- Water Body -->
            <rect y="150" width="800" height="200" fill="url(#waterGrad)"/>
            <!-- Water current ripples -->
            <path d="M50 180 Q150 170 250 180 T450 180 T650 180 T800 180" stroke="#E0F2FE" stroke-width="1.5" fill="none" opacity="0.6"/>
            <path d="M0 220 Q120 210 240 220 T480 220 T720 220" stroke="#E0F2FE" stroke-width="1.5" fill="none" opacity="0.5"/>
            <path d="M80 260 Q200 250 320 260 T560 260 T800 260" stroke="#BAE6FD" stroke-width="1.2" fill="none" opacity="0.4"/>
            <!-- Submerged River Bed / Benthic Silt Layer -->
            <path d="M0 350 Q180 330 360 345 T720 330 L800 340 L800 450 L0 450 Z" fill="url(#siltGrad)"/>
            <!-- Stream Pebble with Biofilm -->
            <g transform="translate(540, 290)">
              <ellipse cx="60" cy="50" rx="55" ry="35" fill="#64748B" stroke="#475569" stroke-width="2"/>
              <!-- Green Epilithic Biofilm Coat -->
              <path d="M15 45 Q60 20 105 45 Q80 75 25 65 Z" fill="#84CC16" opacity="0.75"/>
              <circle cx="50" cy="40" r="4" fill="#4ADE80" opacity="0.8"/>
              <circle cx="75" cy="45" r="3.5" fill="#4ADE80" opacity="0.8"/>
            </g>
            <!-- Planktonic microflora glowing dots -->
            <circle cx="360" cy="210" r="3" fill="#A7F3D0" opacity="0.85"/>
            <circle cx="380" cy="235" r="2" fill="#38BDF8" opacity="0.9"/>
            <circle cx="340" cy="245" r="2.5" fill="#FDE047" opacity="0.8"/>
          </svg>
        `;

      case "lab-bench-surface":
      case "hospital-effluent":
      case "dairy-fermenter":
      case "clinical-effluent":
      default:
        return `
          <svg class="habitat-scene-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="benchWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1E293B"/>
                <stop offset="100%" stop-color="#334155"/>
              </linearGradient>
              <linearGradient id="benchTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#F8FAFC"/>
                <stop offset="100%" stop-color="#CBD5E1"/>
              </linearGradient>
            </defs>
            <!-- Laboratory Tiled Wall -->
            <rect width="800" height="230" fill="url(#benchWall)"/>
            <line x1="0" y1="60" x2="800" y2="60" stroke="#475569" stroke-width="1"/>
            <line x1="0" y1="120" x2="800" y2="120" stroke="#475569" stroke-width="1"/>
            <line x1="0" y1="180" x2="800" y2="180" stroke="#475569" stroke-width="1"/>
            <!-- Stainless Steel Lab Bench Worktop -->
            <rect y="230" width="800" height="220" fill="url(#benchTop)"/>
            <line x1="0" y1="230" x2="800" y2="230" stroke="#94A3B8" stroke-width="4"/>
            <!-- Bunsen Burner -->
            <g transform="translate(680, 150)">
              <rect x="25" y="70" width="20" height="45" fill="#64748B"/>
              <ellipse cx="35" cy="115" rx="25" ry="8" fill="#475569"/>
              <path d="M35 70 C30 50, 40 40, 35 20 C42 35, 45 50, 35 70 Z" fill="#38BDF8" opacity="0.85"/>
              <path d="M35 70 C32 55, 38 45, 35 30 C38 42, 40 55, 35 70 Z" fill="#FDE047" opacity="0.9"/>
            </g>
            <!-- Erlenmeyer Flasks -->
            <g transform="translate(260, 160)">
              <!-- Flask 1 (Boiled media) -->
              <path d="M35 25 L45 25 L45 40 L65 85 C68 92, 60 95, 50 95 L20 95 C10 95, 12 92, 15 85 L35 40 Z" fill="#FFFFFF" fill-opacity="0.3" stroke="#94A3B8" stroke-width="2"/>
              <path d="M17 84 L63 84 C66 90, 58 93, 50 93 L20 93 C12 93, 14 90, 17 84 Z" fill="#FDE68A" fill-opacity="0.8"/>
            </g>
            <g transform="translate(500, 160)">
              <!-- Flask 2 (Autoclaved) -->
              <path d="M35 25 L45 25 L45 40 L65 85 C68 92, 60 95, 50 95 L20 95 C10 95, 12 92, 15 85 L35 40 Z" fill="#FFFFFF" fill-opacity="0.3" stroke="#94A3B8" stroke-width="2"/>
              <path d="M17 84 L63 84 C66 90, 58 93, 50 93 L20 93 C12 93, 14 90, 17 84 Z" fill="#BAE6FD" fill-opacity="0.8"/>
            </g>
          </svg>
        `;
    }
  }

  bindEvents() {
    const swab = document.getElementById("sampling-swab");
    const hotspots = document.querySelectorAll(".habitat-hotspot");
    const feedbackText = document.getElementById("sampling-feedback-text");

    if (!swab) return;

    // Direct Click/Tap Support on Hotspots
    hotspots.forEach(hs => {
      hs.addEventListener("click", () => {
        const permitted = hs.getAttribute("data-permitted") === "true";
        const hsId = hs.getAttribute("data-id");
        this.handleSamplingAction(hsId, permitted, hs);
      });
    });

    // Drag and Drop implementation
    swab.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", "swab");
      swab.classList.add("is-dragging");
    });

    swab.addEventListener("dragend", () => {
      swab.classList.remove("is-dragging");
    });

    hotspots.forEach(hs => {
      hs.addEventListener("dragover", (e) => {
        e.preventDefault();
        hs.classList.add("drag-over");
      });

      hs.addEventListener("dragleave", () => {
        hs.classList.remove("drag-over");
      });

      hs.addEventListener("drop", (e) => {
        e.preventDefault();
        hs.classList.remove("drag-over");
        const permitted = hs.getAttribute("data-permitted") === "true";
        const hsId = hs.getAttribute("data-id");
        this.handleSamplingAction(hsId, permitted, hs);
      });
    });
  }

  handleSamplingAction(hotspotId, permitted, hotspotEl) {
    if (this.collected) return;
    const feedbackText = document.getElementById("sampling-feedback-text");
    const swab = document.getElementById("sampling-swab");
    const swabTip = document.getElementById("swab-tip");

    const targetData = this.currentMission.habitat.hotspots.find(h => h.id === hotspotId);

    if (!permitted) {
      sound.playClick();
      if (feedbackText) {
        feedbackText.innerHTML = `⚠️ <strong style="color: #F59E0B">Invalid Sampling Site:</strong> ${targetData?.reason || 'This site is outside the educational mission objective.'}`;
      }
      hotspotEl.classList.add("shake-animation");
      setTimeout(() => hotspotEl.classList.remove("shake-animation"), 600);
      return;
    }

    // Valid sample collected!
    this.collected = true;
    sound.playSampleCollected();

    if (swabTip) {
      swabTip.classList.add("swab-saturated");
    }

    const sampleId = `${this.currentMission.sampleDefaults.idPrefix}`;
    const locationName = targetData?.name || this.currentMission.sampleDefaults.locationName;
    const fieldNotes = this.currentMission.sampleDefaults.fieldNotes;

    const sampleRecord = {
      id: sampleId,
      missionId: this.currentMission.id,
      missionNumber: this.currentMission.number,
      habitatName: this.currentMission.habitat.name,
      locationName: locationName,
      fieldNotes: fieldNotes,
      collectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Collected (Ready for Lab)"
    };

    if (feedbackText) {
      feedbackText.innerHTML = `✅ <strong style="color: #10B981">Sample Secured:</strong> [${sampleId}] collected from ${locationName}. Ready for laboratory investigation.`;
    }

    hotspotEl.classList.add("hotspot-collected");

    // Invoke callback to update game state & inventory
    setTimeout(() => {
      if (this.onSampleCollected) {
        this.onSampleCollected(sampleRecord);
      }
    }, 900);
  }
}
