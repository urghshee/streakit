// StreakIt! - Interactive Evidence Board & Scientific Reasoning Component
// Collates habitat context, media, morphology, and biochemical tests to evaluate hypotheses

import { sound } from "./audio.js";

export class EvidenceBoard {
  constructor(containerId, onInvestigationComplete) {
    this.container = document.getElementById(containerId);
    this.onInvestigationComplete = onInvestigationComplete;
    this.currentMission = null;
    this.selectedCandidateId = null;
    this.confidenceLevel = "Moderate";
    this.userNotes = "";
    this.feedbackGiven = false;
  }

  render(mission, sampleData, chosenMedia, observedMorphology) {
    this.currentMission = mission;
    this.selectedCandidateId = null;
    this.feedbackGiven = false;
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="evidence-board-card">
        <div class="evidence-board-header">
          <div class="evidence-header-left">
            <span class="evidence-pill">Phase 6: Scientific Reasoning</span>
            <h3>Investigation Evidence Board</h3>
            <p class="evidence-subtitle">Synthesize collected empirical data. Choose the hypothesis best supported by the evidence.</p>
          </div>
          <div class="evidence-badge-sample">
            <span class="badge-label">Active Sample:</span>
            <span class="badge-id font-mono">${sampleData?.id || mission.sampleDefaults.idPrefix}</span>
          </div>
        </div>

        <!-- Clue Collator Matrix -->
        <div class="evidence-clues-grid">
          <!-- Clue 1: Habitat Origin -->
          <div class="clue-card">
            <div class="clue-header">
              <span class="clue-icon">🌱</span>
              <strong>1. Environmental Provenance</strong>
            </div>
            <div class="clue-body">
              <p><strong>Habitat:</strong> ${mission.habitat.name}</p>
              <p><strong>Sampling Site:</strong> ${sampleData?.locationName || mission.sampleDefaults.locationName}</p>
              <p class="clue-subtext">Ecological context provides clues to physiological adaptations, but never proves species identity alone.</p>
            </div>
          </div>

          <!-- Clue 2: Media Performance -->
          <div class="clue-card">
            <div class="clue-header">
              <span class="clue-icon">🧫</span>
              <strong>2. Culture Medium & Selectivity</strong>
            </div>
            <div class="clue-body">
              <p><strong>Selected Agar:</strong> ${chosenMedia?.name || "Standard Agar"}</p>
              <p><strong>Function:</strong> ${chosenMedia?.type || "General"}</p>
              <p class="clue-subtext">${chosenMedia?.description || ""}</p>
            </div>
          </div>

          <!-- Clue 3: Colony Morphology -->
          <div class="clue-card">
            <div class="clue-header">
              <span class="clue-icon">🔬</span>
              <strong>3. Colony Morphology</strong>
            </div>
            <div class="clue-body">
              <p><strong>Form & Margin:</strong> ${observedMorphology?.form || mission.colonyMorphologies[0].form}, ${observedMorphology?.margin || mission.colonyMorphologies[0].margin}</p>
              <p><strong>Elevation & Pigment:</strong> ${observedMorphology?.elevation || mission.colonyMorphologies[0].elevation}, ${observedMorphology?.pigmentation || mission.colonyMorphologies[0].pigmentation}</p>
              <p class="clue-subtext">Distinguish direct observable traits from inferences.</p>
            </div>
          </div>

          <!-- Clue 4: Auxiliary Tests / Clues (if present) -->
          ${mission.auxiliaryClues ? `
            <div class="clue-card highlight-clue">
              <div class="clue-header">
                <span class="clue-icon">⚡</span>
                <strong>4. Microscopic & Enzymatic Tests</strong>
              </div>
              <div class="clue-body">
                <p><strong>Gram Stain:</strong> ${mission.auxiliaryClues.gramStain}</p>
                <p><strong>Oxidase / Catalase:</strong> ${mission.auxiliaryClues.oxidaseReaction}</p>
                <p><strong>Metabolic Pathway:</strong> ${mission.auxiliaryClues.metabolism}</p>
              </div>
            </div>
          ` : `
            <div class="clue-card">
              <div class="clue-header">
                <span class="clue-icon">⚖️</span>
                <strong>4. Scientific Uncertainty Boundary</strong>
              </div>
              <div class="clue-body">
                <p><strong>Limitation:</strong> Phenotypic colony characteristics alone leave residual taxonomic uncertainty.</p>
                <p class="clue-subtext">Recognizing when evidence is insufficient is the hallmark of genuine scientific rigor.</p>
              </div>
            </div>
          `}
        </div>

        <!-- Hypotheses Candidate Selection -->
        <div class="candidate-hypotheses-section">
          <h4>Evaluate Candidate Hypotheses</h4>
          <p class="candidate-prompt">Select the explanation best supported by the evidence above:</p>

          <div class="candidate-options-list">
            ${mission.evidenceOptions.map(opt => `
              <label class="candidate-card-label" id="label-cand-${opt.id}">
                <input type="radio" name="candidate-hypothesis" value="${opt.id}" class="candidate-radio"/>
                <div class="candidate-card-content">
                  <div class="candidate-title">${opt.title}</div>
                  <div class="candidate-rationale-preview">${opt.reasoning}</div>
                </div>
              </label>
            `).join("")}
          </div>
        </div>

        <!-- Confidence Selector & Student Note -->
        <div class="evidence-footer-controls">
          <div class="confidence-selector-block">
            <span class="confidence-title">Stated Confidence Level:</span>
            <div class="confidence-btn-group">
              <button type="button" class="btn-confidence" data-val="Low">Low (Preliminary)</button>
              <button type="button" class="btn-confidence active" data-val="Moderate">Moderate (Supported)</button>
              <button type="button" class="btn-confidence" data-val="High">High (Strong Evidence)</button>
            </div>
          </div>

          <div class="student-reflection-input-box">
            <label for="student-personal-note"><strong>Personal Field Observation / Rationale (Optional):</strong></label>
            <textarea id="student-personal-note" rows="2" placeholder="Record any noteworthy laboratory observations or reasons for your hypothesis..."></textarea>
          </div>

          <div class="submit-evidence-action">
            <button class="btn-primary btn-large" id="btn-submit-hypothesis" disabled>
              Submit Evidence & Evaluate Rationale ➔
            </button>
          </div>
        </div>

        <!-- Automatic Feedback Container -->
        <div class="evidence-feedback-display" id="evidence-feedback-display" style="display: none;"></div>
      </div>
    `;

    this.bindEvents(mission, sampleData, chosenMedia, observedMorphology);
  }

  bindEvents(mission, sampleData, chosenMedia, observedMorphology) {
    const radioInputs = this.container.querySelectorAll(".candidate-radio");
    const submitBtn = document.getElementById("btn-submit-hypothesis");
    const confBtns = this.container.querySelectorAll(".btn-confidence");
    const noteArea = document.getElementById("student-personal-note");

    radioInputs.forEach(r => {
      r.addEventListener("change", (e) => {
        sound.playClick();
        this.selectedCandidateId = e.target.value;

        // Visual selection update
        this.container.querySelectorAll(".candidate-card-label").forEach(l => l.classList.remove("selected-card"));
        const parentLabel = document.getElementById(`label-cand-${this.selectedCandidateId}`);
        if (parentLabel) parentLabel.classList.add("selected-card");

        if (submitBtn) submitBtn.disabled = false;
      });
    });

    confBtns.forEach(b => {
      b.addEventListener("click", () => {
        sound.playClick();
        confBtns.forEach(btn => btn.classList.remove("active"));
        b.classList.add("active");
        this.confidenceLevel = b.getAttribute("data-val") || "Moderate";
      });
    });

    if (noteArea) {
      noteArea.addEventListener("input", (e) => {
        this.userNotes = e.target.value;
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        this.evaluateSubmission(mission, sampleData, chosenMedia, observedMorphology);
      });
    }
  }

  evaluateSubmission(mission, sampleData, chosenMedia, observedMorphology) {
    if (!this.selectedCandidateId) return;
    const selectedOption = mission.evidenceOptions.find(o => o.id === this.selectedCandidateId);
    if (!selectedOption) return;

    const feedbackDisplay = document.getElementById("evidence-feedback-display");
    if (!feedbackDisplay) return;

    const isBest = selectedOption.status === "best-supported";
    if (isBest) {
      sound.playSuccess();
    } else {
      sound.playClick();
    }

    feedbackDisplay.style.display = "block";
    feedbackDisplay.innerHTML = `
      <div class="feedback-result-banner ${isBest ? 'feedback-success' : 'feedback-caution'}">
        <div class="feedback-header">
          <span class="feedback-badge-icon">${isBest ? '✅' : '⚠️'}</span>
          <div>
            <h4>${isBest ? 'Best Supported Interpretation' : 'Sub-Optimal Interpretation / Caution Required'}</h4>
            <span class="feedback-status-tag">${isBest ? 'Empirically Supported' : 'Exceeds or Contradicts Evidence'}</span>
          </div>
        </div>

        <div class="feedback-body-text">
          <p class="feedback-lead">${selectedOption.feedback}</p>
          <div class="feedback-takeaways">
            <h5>Scientific Takeaways:</h5>
            <ul>
              <li><strong>Supported by:</strong> ${selectedOption.reasoning}</li>
              <li><strong>Appropriate Confidence:</strong> ${isBest ? 'Moderate-to-High (depending on available biochemical confirmatory tests)' : 'Requires conservative reassessment'}</li>
            </ul>
          </div>

          <div class="reflection-prompt-box">
            <span class="prompt-icon">💭</span>
            <div class="prompt-text">
              <strong>Reflection Challenge:</strong>
              <p>${mission.reflectionPrompt}</p>
            </div>
          </div>
        </div>

        <div class="feedback-action-bar">
          <button class="btn-primary btn-large" id="btn-save-to-notebook">
            Record Investigation in Lab Notebook & Complete Mission 📖
          </button>
          ${!isBest ? `
            <button class="btn-secondary" id="btn-reconsider-evidence">
              Re-evaluate Evidence Options ↺
            </button>
          ` : ''}
        </div>
      </div>
    `;

    feedbackDisplay.scrollIntoView({ behavior: "smooth" });

    const saveBtn = document.getElementById("btn-save-to-notebook");
    const retryBtn = document.getElementById("btn-reconsider-evidence");

    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        sound.playClick();
        feedbackDisplay.style.display = "none";
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        sound.playClick();
        const investigationRecord = {
          missionId: mission.id,
          missionNumber: mission.number,
          missionTitle: mission.title,
          unitCode: mission.unitCode,
          sampleId: sampleData?.id || mission.sampleDefaults.idPrefix,
          habitatName: mission.habitat.name,
          samplingLocation: sampleData?.locationName || mission.sampleDefaults.locationName,
          fieldNotes: sampleData?.fieldNotes || mission.sampleDefaults.fieldNotes,
          chosenMedia: chosenMedia?.name || "Nutrient Agar",
          colonyMorphology: observedMorphology || mission.colonyMorphologies[0],
          selectedHypothesis: selectedOption.title,
          isBestSupported: isBest,
          confidenceLevel: this.confidenceLevel,
          userReflection: this.userNotes || "Observation recorded with standard aseptic protocols.",
          feedbackSummary: selectedOption.feedback,
          completedAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (this.onInvestigationComplete) {
          this.onInvestigationComplete(investigationRecord);
        }
      });
    }
  }
}
