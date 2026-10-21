// StreakIt! - Main Application Controller & View Router
// Coordinates state, localStorage persistence, gameplay loop, and user interface

import { MISSIONS } from "./data/missions.js";
import { SYLLABUS_UNITS, CONCEPTS_LIBRARY } from "./data/concepts.js";
import { sound } from "./components/audio.js";
import { InstructorGuide } from "./components/instructor.js";
import { HabitatExplorer } from "./components/habitat.js";
import { StreakingPlate } from "./components/streakingPlate.js";
import { IncubatorChamber } from "./components/incubator.js";
import { MorphologyViewer } from "./components/morphologyViewer.js";
import { EvidenceBoard } from "./components/evidenceBoard.js";
import { LabNotebook } from "./components/notebook.js";

class StreakItApp {
  constructor() {
    this.state = {
      currentView: "home",
      activeMission: null,
      labPhase: "habitat", // 'habitat', 'media', 'streaking', 'incubation', 'colony', 'evidence', 'complete'
      sampleInventory: [],
      activeSample: null,
      selectedMedia: null,
      observedMorphology: null,
      completedMissions: this.loadCompletedMissions(),
      soundMuted: localStorage.getItem("streakit_sound_muted") === "true",
      reducedMotion: localStorage.getItem("streakit_reduced_motion") === "true"
    };

    // Instantiate Sub-components
    this.instructor = new InstructorGuide("instructor-container");
    this.notebook = new LabNotebook("notebook-content-container");
    this.habitatExplorer = new HabitatExplorer("habitat-mount-point", (sample) => this.onSampleCollected(sample));
    this.streakingPlate = null;
    this.incubator = new IncubatorChamber("incubator-mount-point", () => this.onIncubationComplete());
    this.morphologyViewer = new MorphologyViewer("incubated-plate-mount", "morphology-modal-mount");
    this.evidenceBoard = new EvidenceBoard("evidence-board-mount", (record) => this.onInvestigationFinished(record));

    sound.setMuted(this.state.soundMuted);
    if (this.state.reducedMotion) {
      document.body.classList.add("reduced-motion");
    }
  }

  init() {
    this.bindNavigation();
    this.bindGlobalEvents();
    this.handleRoute();
    window.addEventListener("hashchange", () => this.handleRoute());
  }

  loadCompletedMissions() {
    try {
      const data = localStorage.getItem("streakit_completed_missions");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCompletedMission(missionId) {
    if (!this.state.completedMissions.includes(missionId)) {
      this.state.completedMissions.push(missionId);
      localStorage.setItem("streakit_completed_missions", JSON.stringify(this.state.completedMissions));
    }
  }

  resetAllProgress() {
    if (!confirm("Are you sure you want to reset all game progress and notebook records? This action cannot be undone.")) return;
    localStorage.removeItem("streakit_completed_missions");
    localStorage.removeItem("streakit_notebook_records");
    this.state.completedMissions = [];
    this.state.sampleInventory = [];
    this.state.activeSample = null;
    sound.playClick();
    alert("Progress has been reset.");
    window.location.hash = "#home";
    this.renderMissionsHub();
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || "home";
    const [view, param] = hash.split("/");
    this.state.currentView = view;

    // Update active nav styling
    document.querySelectorAll(".nav-link").forEach(l => {
      const target = l.getAttribute("href")?.slice(1);
      if (target === view) {
        l.classList.add("active");
      } else {
        l.classList.remove("active");
      }
    });

    // Hide all view sections
    document.querySelectorAll(".view-section").forEach(s => s.classList.remove("active-view"));

    const targetSection = document.getElementById(`view-${view}`);
    if (targetSection) {
      targetSection.classList.add("active-view");
      window.scrollTo(0, 0);
    }

    switch (view) {
      case "home":
        this.renderHome();
        break;
      case "missions":
        this.renderMissionsHub();
        break;
      case "lab":
        if (param) {
          const m = MISSIONS.find(item => item.id === param);
          if (m) this.startMission(m);
        } else if (!this.state.activeMission) {
          this.startMission(MISSIONS[0]);
        } else {
          this.renderLabStage();
        }
        break;
      case "notebook":
        this.notebook.render();
        break;
      case "concepts":
        this.renderConceptLibrary();
        break;
      case "about":
        this.renderAboutCreator();
        break;
    }
  }

  bindNavigation() {
    // Sound mute toggle in navbar
    const soundBtn = document.getElementById("nav-sound-toggle");
    if (soundBtn) {
      soundBtn.textContent = this.state.soundMuted ? "🔇 Sound Off" : "🔊 Sound On";
      soundBtn.addEventListener("click", () => {
        this.state.soundMuted = !this.state.soundMuted;
        sound.setMuted(this.state.soundMuted);
        localStorage.setItem("streakit_sound_muted", String(this.state.soundMuted));
        soundBtn.textContent = this.state.soundMuted ? "🔇 Sound Off" : "🔊 Sound On";
        if (!this.state.soundMuted) sound.playClick();
      });
    }

    // Settings modal button
    const settingsBtn = document.getElementById("nav-settings-btn");
    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => {
        sound.playClick();
        this.openSettingsModal();
      });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links-cluster");
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener("click", () => {
        sound.playClick();
        navLinks.classList.toggle("mobile-open");
      });
      // Close mobile menu when a link is clicked
      navLinks.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => navLinks.classList.remove("mobile-open"));
      });
    }
  }

  bindGlobalEvents() {
    // Any global shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const modal = document.querySelector(".modal-backdrop-open");
        if (modal) modal.remove();
      }
    });
  }

  // ================= VIEW: HOME =================
  renderHome() {
    const startBtn = document.getElementById("hero-start-btn");
    const exploreBtn = document.getElementById("hero-explore-btn");

    if (startBtn) {
      startBtn.onclick = () => {
        sound.playClick();
        window.location.hash = "#lab/mission-0";
      };
    }
    if (exploreBtn) {
      exploreBtn.onclick = () => {
        sound.playClick();
        window.location.hash = "#missions";
      };
    }

    // Show Arshi greeting
    this.instructor.showDialogue(
      "Welcome to StreakIt! I'm Arshi, your microbiology guide. In our laboratory, good microbiology always starts with careful observation, structured reasoning, and understanding uncertainty. Are you ready for your first investigation?",
      "Click 'Start Investigation' or browse our missions catalog!"
    );
  }

  // ================= VIEW: MISSIONS HUB =================
  renderMissionsHub() {
    const listContainer = document.getElementById("missions-grid-container");
    if (!listContainer) return;

    listContainer.innerHTML = MISSIONS.map((m, idx) => {
      const isCompleted = this.state.completedMissions.includes(m.id);
      const isLocked = m.prerequisite && !this.state.completedMissions.includes(m.prerequisite);

      return `
        <div class="mission-card ${isCompleted ? 'mission-completed' : ''} ${isLocked ? 'mission-locked' : ''}">
          <div class="mission-card-top">
            <span class="mission-unit-tag">${m.unitCode}</span>
            <span class="mission-status-pill ${isCompleted ? 'pill-completed' : isLocked ? 'pill-locked' : 'pill-available'}">
              ${isCompleted ? 'Completed ✓' : isLocked ? '🔒 Locked' : 'Available'}
            </span>
          </div>

          <div class="mission-card-body">
            <span class="mission-number-label">Mission ${m.number}</span>
            <h3 class="mission-title">${m.title}</h3>
            <p class="mission-topic"><strong>Topic:</strong> ${m.topic}</p>
            <p class="mission-objective">${m.objective}</p>
          </div>

          <div class="mission-card-footer">
            <div class="mission-stats">
              <span>⏱️ ${m.estimatedTime}</span>
              <span>⚡ ${m.difficulty}</span>
            </div>
            <button class="btn-primary mission-action-btn" data-mission-id="${m.id}" ${isLocked ? 'disabled' : ''}>
              ${isCompleted ? 'Revisit Lab ↺' : isLocked ? 'Complete Prerequisite' : 'Start Mission ➔'}
            </button>
          </div>
        </div>
      `;
    }).join("");

    listContainer.querySelectorAll(".mission-action-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const mId = btn.getAttribute("data-mission-id");
        if (mId) {
          sound.playClick();
          window.location.hash = `#lab/${mId}`;
        }
      });
    });
  }

  // ================= VIEW: LAB INVESTIGATION =================
  startMission(mission) {
    this.state.activeMission = mission;
    this.state.labPhase = "habitat";
    this.state.selectedMedia = null;
    this.state.observedMorphology = null;
    this.renderLabStage();
  }

  renderLabStage() {
    const mission = this.state.activeMission;
    if (!mission) return;

    const missionMetaEl = document.getElementById("active-lab-mission-meta");
    if (missionMetaEl) {
      missionMetaEl.innerHTML = `
        <div class="lab-mission-banner">
          <div>
            <span class="lab-mission-tag">Active Investigation: Mission ${mission.number} (${mission.unitCode})</span>
            <h2>${mission.title}</h2>
          </div>
          <div class="lab-step-tracker">
            <span class="step-dot ${this.state.labPhase === 'habitat' ? 'active' : 'done'}">1. Sample</span>
            <span class="step-dot ${this.state.labPhase === 'media' ? 'active' : this.isStepDone('media') ? 'done' : ''}">2. Media</span>
            <span class="step-dot ${this.state.labPhase === 'streaking' ? 'active' : this.isStepDone('streaking') ? 'done' : ''}">3. Streak</span>
            <span class="step-dot ${this.state.labPhase === 'colony' ? 'active' : this.isStepDone('colony') ? 'done' : ''}">4. Inspect</span>
            <span class="step-dot ${this.state.labPhase === 'evidence' ? 'active' : this.isStepDone('evidence') ? 'done' : ''}">5. Deduce</span>
          </div>
        </div>
      `;
    }

    // Hide all phase panels
    document.querySelectorAll(".lab-stage-panel").forEach(p => p.style.display = "none");

    switch (this.state.labPhase) {
      case "habitat":
        this.renderStageHabitat(mission);
        break;
      case "media":
        this.renderStageMedia(mission);
        break;
      case "streaking":
        this.renderStageStreaking(mission);
        break;
      case "colony":
        this.renderStageColony(mission);
        break;
      case "evidence":
        this.renderStageEvidence(mission);
        break;
    }
  }

  isStepDone(step) {
    const order = ['habitat', 'media', 'streaking', 'incubation', 'colony', 'evidence', 'complete'];
    return order.indexOf(this.state.labPhase) > order.indexOf(step);
  }

  // --- STAGE 1: HABITAT SAMPLING ---
  renderStageHabitat(mission) {
    const panel = document.getElementById("lab-stage-habitat");
    if (!panel) return;
    panel.style.display = "block";

    this.instructor.showDialogue(
      mission.briefing,
      "Drag the sterile swab tool onto the active hotspot indicated in your mission briefing to collect your environmental sample."
    );

    this.habitatExplorer.loadHabitat(mission);
  }

  onSampleCollected(sampleRecord) {
    this.state.activeSample = sampleRecord;
    // Add to sample inventory if not duplicate
    if (!this.state.sampleInventory.some(s => s.id === sampleRecord.id)) {
      this.state.sampleInventory.unshift(sampleRecord);
    }

    this.instructor.showDialogue(
      `Sample [${sampleRecord.id}] secured from ${sampleRecord.locationName}! Now let's carry this specimen to the preparation bench to select an appropriate culture medium.`,
      "Click 'Proceed to Media Preparation' to continue."
    );

    // Provide immediate button to go to Media Prep
    const feedbackBar = document.getElementById("sampling-feedback-bar");
    if (feedbackBar) {
      feedbackBar.innerHTML = `
        <div class="sample-collected-banner">
          <span>✅ <strong>Sample [${sampleRecord.id}] Ready</strong> (${sampleRecord.locationName})</span>
          <button class="btn-primary" id="btn-goto-media">Proceed to Media Preparation ➔</button>
        </div>
      `;
      const btn = document.getElementById("btn-goto-media");
      if (btn) {
        btn.onclick = () => {
          sound.playClick();
          this.state.labPhase = "media";
          this.renderLabStage();
        };
      }
    }
  }

  // --- STAGE 2: MEDIA PREPARATION ---
  renderStageMedia(mission) {
    const panel = document.getElementById("lab-stage-media");
    if (!panel) return;
    panel.style.display = "block";

    this.instructor.showDialogue(
      "Different microorganisms have distinct nutritional and atmospheric requirements. Read each formulation carefully. Choose the medium best suited for this investigation.",
      "Select an agar formulation below to pour into your sterile Petri dish."
    );

    const mediaListContainer = document.getElementById("media-options-list");
    if (mediaListContainer) {
      mediaListContainer.innerHTML = mission.mediaOptions.map((opt, idx) => `
        <div class="media-choice-card" id="media-card-${idx}">
          <div class="media-card-top">
            <span class="media-type-badge">${opt.type}</span>
            <h4>${opt.name}</h4>
          </div>
          <p class="media-card-desc">${opt.description}</p>
          <div class="media-rationale-box">
            <strong>Scientific Rationale:</strong> ${opt.rationale}
          </div>
          <button class="btn-primary select-media-btn" data-idx="${idx}">
            Select ${opt.name} ➔
          </button>
        </div>
      `).join("");

      mediaListContainer.querySelectorAll(".select-media-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-idx") || "0", 10);
          const chosen = mission.mediaOptions[idx];
          this.state.selectedMedia = chosen;
          sound.playClick();

          // Proceed to streaking canvas
          this.state.labPhase = "streaking";
          this.renderLabStage();
        });
      });
    }
  }

  // --- STAGE 3: STREAKING CANVAS ---
  renderStageStreaking(mission) {
    const panel = document.getElementById("lab-stage-streaking");
    if (!panel) return;
    panel.style.display = "block";

    this.instructor.showDialogue(
      mission.streakingGuide.instructions,
      "Draw streak lines on the agar with your mouse or touchscreen. Remember to flame the inoculation loop between quadrants to dilute the cell density!"
    );

    // Mount canvas
    this.streakingPlate = new StreakingPlate("streak-canvas");

    const undoBtn = document.getElementById("btn-streak-undo");
    const clearBtn = document.getElementById("btn-streak-clear");
    const flameBtn = document.getElementById("btn-streak-flame");
    const guidesBtn = document.getElementById("btn-streak-guides");
    const autoStreakBtn = document.getElementById("btn-streak-auto");
    const finishBtn = document.getElementById("btn-streak-finish");

    if (undoBtn) undoBtn.onclick = () => this.streakingPlate.undo();
    if (clearBtn) clearBtn.onclick = () => this.streakingPlate.clear();
    if (flameBtn) flameBtn.onclick = () => this.streakingPlate.flameLoop(flameBtn);
    if (guidesBtn) {
      guidesBtn.onclick = () => {
        sound.playClick();
        const active = this.streakingPlate.toggleGuides();
        guidesBtn.textContent = active ? "Sector Guides: ON" : "Sector Guides: OFF";
      };
    }
    if (autoStreakBtn) {
      autoStreakBtn.onclick = () => {
        this.streakingPlate.autoStreakPattern();
      };
    }

    if (finishBtn) {
      finishBtn.onclick = () => {
        if (!this.streakingPlate.hasDrawnContent()) {
          alert("Please draw streaks or use 'Accessible Pattern' before placing plate into the incubator!");
          return;
        }
        sound.playClick();
        // Start simulated incubation
        this.incubator.startIncubation(mission, this.state.reducedMotion ? 1200 : 3500);
      };
    }
  }

  onIncubationComplete() {
    this.state.labPhase = "colony";
    this.renderLabStage();
  }

  // --- STAGE 4: COLONY MORPHOLOGY INSPECTION ---
  renderStageColony(mission) {
    const panel = document.getElementById("lab-stage-colony");
    if (!panel) return;
    panel.style.display = "block";

    this.instructor.showDialogue(
      "Incubation complete! Discrete colonies have emerged in the dilution quadrants. Click on any visible colony to inspect its shape, margin, elevation, and pigmentation under 10× digital magnification.",
      "Click an isolated colony to log its characteristics into your evidence board."
    );

    this.morphologyViewer.renderIncubatedPlate(mission, (observedMorphology) => {
      this.state.observedMorphology = observedMorphology;
      // Transition to evidence board
      this.state.labPhase = "evidence";
      this.renderLabStage();
    });
  }

  // --- STAGE 5: EVIDENCE BOARD ---
  renderStageEvidence(mission) {
    const panel = document.getElementById("lab-stage-evidence");
    if (!panel) return;
    panel.style.display = "block";

    this.instructor.showDialogue(
      "Now assemble your empirical clues: environmental habitat, media reaction, and colony morphology. Formulate an appropriately cautious hypothesis and select the best-supported candidate.",
      "Review the candidate explanations and submit your scientific deduction."
    );

    this.evidenceBoard.render(
      mission,
      this.state.activeSample,
      this.state.selectedMedia,
      this.state.observedMorphology
    );
  }

  onInvestigationFinished(investigationRecord) {
    // 1. Save to notebook
    this.notebook.saveRecord(investigationRecord);

    // 2. Mark mission as completed
    this.saveCompletedMission(investigationRecord.missionId);

    // 3. Show Mission Completion Celebratory Modal
    this.showMissionCompletedModal(investigationRecord);
  }

  showMissionCompletedModal(r) {
    sound.playSuccess();
    const modal = document.createElement("div");
    modal.className = "modal-backdrop-open";
    modal.innerHTML = `
      <div class="completion-modal-card">
        <div class="modal-confetti-header">
          <span class="trophy-icon">🏆</span>
          <h3>Investigation Completed!</h3>
          <p class="modal-sub">Mission ${r.missionNumber}: ${r.missionTitle}</p>
        </div>

        <div class="completion-checklist">
          <div class="check-item"><span>✅</span> Environmental Sample [${r.sampleId}] Secured</div>
          <div class="check-item"><span>✅</span> Agar Dilution Streaking Practised</div>
          <div class="check-item"><span>✅</span> Incubation & Colony Morphology Inspected</div>
          <div class="check-item"><span>✅</span> Scientific Evidence Synthesized</div>
          <div class="check-item"><span>✅</span> Digital Laboratory Notebook Record Generated</div>
        </div>

        <div class="completion-takeaway-box">
          <strong>Core Scientific Takeaway:</strong>
          <p>${r.feedbackSummary}</p>
        </div>

        <div class="completion-actions-cluster">
          <button class="btn-primary" id="btn-modal-open-notebook">
            View Lab Notebook 📖
          </button>
          <button class="btn-secondary" id="btn-modal-next-mission">
            Next Mission ➔
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("btn-modal-open-notebook")?.addEventListener("click", () => {
      sound.playClick();
      modal.remove();
      window.location.hash = "#notebook";
    });

    document.getElementById("btn-modal-next-mission")?.addEventListener("click", () => {
      sound.playClick();
      modal.remove();
      // Find next mission
      const currIdx = MISSIONS.findIndex(m => m.id === r.missionId);
      const nextMission = MISSIONS[currIdx + 1];
      if (nextMission) {
        window.location.hash = `#lab/${nextMission.id}`;
      } else {
        window.location.hash = "#missions";
      }
    });
  }

  // ================= VIEW: CONCEPT LIBRARY =================
  renderConceptLibrary() {
    const unitsContainer = document.getElementById("concepts-units-list");
    const searchInput = document.getElementById("concept-search-input");
    if (!unitsContainer) return;

    const renderFiltered = (searchTerm = "") => {
      unitsContainer.innerHTML = SYLLABUS_UNITS.map(unit => {
        const unitConcepts = CONCEPTS_LIBRARY.filter(c => {
          const matchUnit = c.unitId === unit.id;
          const matchSearch = !searchTerm || 
            c.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.category.toLowerCase().includes(searchTerm.toLowerCase());
          return matchUnit && matchSearch;
        });

        if (unitConcepts.length === 0 && searchTerm) return "";

        return `
          <div class="concept-unit-section">
            <div class="concept-unit-header">
              <span class="unit-icon">${unit.icon}</span>
              <div>
                <h3>${unit.code}: ${unit.title}</h3>
                <p>${unit.description}</p>
              </div>
            </div>

            <div class="concepts-cards-grid">
              ${unitConcepts.map(c => `
                <div class="concept-card">
                  <div class="concept-card-top">
                    <span class="concept-cat-tag">${c.category}</span>
                    <h4>${c.term}</h4>
                  </div>
                  <p class="concept-definition">${c.definition}</p>
                  <div class="concept-why">
                    <strong>Why it matters:</strong> ${c.whyItMatters}
                  </div>
                  <div class="concept-example">
                    <strong>Example:</strong> ${c.example}
                  </div>
                  <div class="concept-mission-tags">
                    ${c.missions.map(mId => `<span class="c-m-tag">${mId.replace("mission-", "M-")}</span>`).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }).join("");
    };

    renderFiltered();

    if (searchInput) {
      searchInput.oninput = (e) => {
        renderFiltered(e.target.value);
      };
    }
  }

  // ================= VIEW: ABOUT / CREATOR =================
  renderAboutCreator() {
    // Creator section rendered in index.html with interactive email/phone buttons
  }

  // ================= SETTINGS MODAL =================
  openSettingsModal() {
    const modal = document.createElement("div");
    modal.className = "modal-backdrop-open";
    modal.innerHTML = `
      <div class="settings-modal-card">
        <div class="settings-modal-header">
          <h3>StreakIt! Laboratory Settings</h3>
          <button class="btn-close-modal" id="btn-close-settings">✕</button>
        </div>

        <div class="settings-body">
          <div class="setting-row">
            <div>
              <strong>Sound Acoustics</strong>
              <p class="setting-desc">Procedural laboratory audio (flame, loop scratch, incubator hum)</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-sound" ${!this.state.soundMuted ? 'checked' : ''}/>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-row">
            <div>
              <strong>Reduced Motion</strong>
              <p class="setting-desc">Shortens incubation time-lapse and disables decorative motion</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-motion" ${this.state.reducedMotion ? 'checked' : ''}/>
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="setting-row danger-setting">
            <div>
              <strong>Reset Investigation Progress</strong>
              <p class="setting-desc">Clears all saved missions, inventory samples, and lab notebook records</p>
            </div>
            <button class="btn-secondary btn-danger" id="btn-reset-progress">
              Reset Progress 🗑️
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = document.getElementById("btn-close-settings");
    closeBtn?.addEventListener("click", () => modal.remove());

    const soundToggle = document.getElementById("setting-sound");
    soundToggle?.addEventListener("change", (e) => {
      this.state.soundMuted = !e.target.checked;
      sound.setMuted(this.state.soundMuted);
      localStorage.setItem("streakit_sound_muted", String(this.state.soundMuted));
      const navBtn = document.getElementById("nav-sound-toggle");
      if (navBtn) navBtn.textContent = this.state.soundMuted ? "🔇 Sound Off" : "🔊 Sound On";
    });

    const motionToggle = document.getElementById("setting-motion");
    motionToggle?.addEventListener("change", (e) => {
      this.state.reducedMotion = e.target.checked;
      localStorage.setItem("streakit_reduced_motion", String(this.state.reducedMotion));
      if (this.state.reducedMotion) {
        document.body.classList.add("reduced-motion");
      } else {
        document.body.classList.remove("reduced-motion");
      }
    });

    const resetBtn = document.getElementById("btn-reset-progress");
    resetBtn?.addEventListener("click", () => {
      modal.remove();
      this.resetAllProgress();
    });
  }
}

// Instantiate on DOM load
window.addEventListener("DOMContentLoaded", () => {
  const app = new StreakItApp();
  app.init();
});
