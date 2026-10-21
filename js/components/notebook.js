// StreakIt! - Digital Laboratory Notebook Component
// Persistent investigation logs, editable reflections, syllabus filtering, JSON export, and print styles

import { sound } from "./audio.js";

export class LabNotebook {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.storageKey = "streakit_notebook_records";
    this.activeFilter = "all";
  }

  getRecords() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load notebook records", e);
      return [];
    }
  }

  saveRecord(record) {
    const records = this.getRecords();
    const existingIndex = records.findIndex(r => r.missionId === record.missionId);

    if (existingIndex >= 0) {
      records[existingIndex] = { ...records[existingIndex], ...record };
    } else {
      records.unshift(record);
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(records));
    } catch (e) {
      console.error("Failed to persist notebook record", e);
    }
  }

  updatePersonalNotes(missionId, notes) {
    const records = this.getRecords();
    const rec = records.find(r => r.missionId === missionId);
    if (rec) {
      rec.userReflection = notes;
      localStorage.setItem(this.storageKey, JSON.stringify(records));
      sound.playClick();
    }
  }

  deleteRecord(missionId) {
    if (!confirm("Are you sure you want to remove this investigation record from your notebook?")) return;
    let records = this.getRecords();
    records = records.filter(r => r.missionId !== missionId);
    localStorage.setItem(this.storageKey, JSON.stringify(records));
    sound.playClick();
    this.render();
  }

  exportJson() {
    sound.playClick();
    const records = this.getRecords();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `StreakIt_Lab_Notebook_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  printReport() {
    sound.playClick();
    window.print();
  }

  render() {
    if (!this.container) return;
    const records = this.getRecords();

    const filteredRecords = this.activeFilter === "all" 
      ? records 
      : records.filter(r => r.unitCode?.toLowerCase().includes(this.activeFilter.toLowerCase()) || r.missionId?.includes(this.activeFilter));

    this.container.innerHTML = `
      <div class="notebook-page-layout">
        <!-- Notebook Toolbar -->
        <div class="notebook-toolbar">
          <div class="notebook-title-area">
            <span class="notebook-pill">Institutional Grade Lab Log</span>
            <h2>Digital Laboratory Notebook</h2>
            <p class="notebook-subtitle">Permanent repository of empirical observations, culture outcomes, and evidence evaluations.</p>
          </div>

          <div class="notebook-actions-cluster">
            <button class="btn-secondary" id="btn-export-notebook" title="Export records as standard JSON">
              📥 Export JSON
            </button>
            <button class="btn-secondary" id="btn-print-notebook" title="Print or save as academic PDF report">
              🖨️ Print Lab Report
            </button>
          </div>
        </div>

        <!-- Filter bar -->
        <div class="notebook-filter-bar">
          <span class="filter-label">Filter by Syllabus:</span>
          <button class="filter-chip ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all">All Investigations (${records.length})</button>
          <button class="filter-chip ${this.activeFilter === 'Unit I' ? 'active' : ''}" data-filter="Unit I">Unit I (Foundations)</button>
          <button class="filter-chip ${this.activeFilter === 'Unit II' ? 'active' : ''}" data-filter="Unit II">Unit II (Diversity/Culture)</button>
          <button class="filter-chip ${this.activeFilter === 'Unit III' ? 'active' : ''}" data-filter="Unit III">Unit III (Metabolism)</button>
          <button class="filter-chip ${this.activeFilter === 'Unit IV' ? 'active' : ''}" data-filter="Unit IV">Unit IV (Genetics)</button>
          <button class="filter-chip ${this.activeFilter === 'Unit V' ? 'active' : ''}" data-filter="Unit V">Unit V (Ecology)</button>
          <button class="filter-chip ${this.activeFilter === 'Unit VI' ? 'active' : ''}" data-filter="Unit VI">Unit VI (Control/AMR)</button>
        </div>

        <!-- Records Stream -->
        <div class="notebook-records-stream" id="notebook-records-stream">
          ${filteredRecords.length === 0 ? this.renderEmptyState() : filteredRecords.map(r => this.renderRecordCard(r)).join("")}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderEmptyState() {
    return `
      <div class="notebook-empty-card">
        <div class="empty-icon">📓</div>
        <h3>No Investigation Records Found</h3>
        <p>Complete a streak plate investigation from the Missions Hub to record your empirical field notes, incubation outcomes, and hypothesis evaluations.</p>
        <button class="btn-primary" id="btn-empty-start-mission">
          Go to Missions Hub ➔
        </button>
      </div>
    `;
  }

  renderRecordCard(r) {
    const m = r.colonyMorphology || {};
    return `
      <article class="notebook-entry-card" id="entry-${r.missionId}">
        <div class="entry-header">
          <div class="entry-meta">
            <span class="entry-unit-badge">${r.unitCode || "Microbiology Practicum"}</span>
            <span class="entry-sample-tag font-mono">Sample: ${r.sampleId}</span>
            <span class="entry-date text-slate">${r.completedAt}</span>
          </div>
          <div class="entry-header-right">
            <span class="badge-${r.isBestSupported ? 'green' : 'amber'}">
              ${r.isBestSupported ? 'Evidence-Supported' : 'Reviewed with Caution'}
            </span>
            <button class="btn-del-record" data-mission-id="${r.missionId}" title="Delete this entry">✕</button>
          </div>
        </div>

        <h3 class="entry-mission-title">Mission ${r.missionNumber}: ${r.missionTitle}</h3>

        <div class="entry-grid">
          <!-- Environmental & Sampling Details -->
          <div class="entry-column">
            <h4>1. Field Sampling</h4>
            <div class="entry-detail-row">
              <span class="detail-label">Habitat:</span>
              <span class="detail-val">${r.habitatName}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Location:</span>
              <span class="detail-val">${r.samplingLocation}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Field Notes:</span>
              <span class="detail-val text-slate font-italic">${r.fieldNotes}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Media Inoculated:</span>
              <span class="detail-val font-bold text-cyan">${r.chosenMedia}</span>
            </div>
          </div>

          <!-- Colony Morphology Inspection -->
          <div class="entry-column">
            <h4>2. Colony Morphology</h4>
            <div class="entry-detail-row">
              <span class="detail-label">Form:</span>
              <span class="detail-val">${m.form || "N/A"}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Margin:</span>
              <span class="detail-val">${m.margin || "N/A"}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Elevation:</span>
              <span class="detail-val">${m.elevation || "N/A"}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Pigment & Surface:</span>
              <span class="detail-val">${m.pigmentation || "N/A"}, ${m.surface || "Smooth"}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Size:</span>
              <span class="detail-val font-mono">${m.size || "N/A"}</span>
            </div>
          </div>

          <!-- Scientific Hypothesis & Evaluation -->
          <div class="entry-column">
            <h4>3. Hypothesis & Conclusion</h4>
            <div class="entry-detail-row">
              <span class="detail-label">Evaluated Hypothesis:</span>
              <span class="detail-val font-bold">${r.selectedHypothesis}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Stated Confidence:</span>
              <span class="detail-val font-mono">${r.confidenceLevel}</span>
            </div>
            <div class="entry-detail-row">
              <span class="detail-label">Feedback Summary:</span>
              <span class="detail-val text-slate">${r.feedbackSummary}</span>
            </div>
          </div>
        </div>

        <!-- Editable Student Personal Reflection -->
        <div class="entry-reflection-section">
          <div class="reflection-header">
            <strong>Researcher's Personal Notes & Reflections:</strong>
            <button class="btn-save-note" data-id="${r.missionId}">Save Note 💾</button>
          </div>
          <textarea class="reflection-textarea" id="note-text-${r.missionId}" rows="2">${r.userReflection || ""}</textarea>
        </div>
      </article>
    `;
  }

  bindEvents() {
    const exportBtn = document.getElementById("btn-export-notebook");
    const printBtn = document.getElementById("btn-print-notebook");
    const emptyStartBtn = document.getElementById("btn-empty-start-mission");

    if (exportBtn) exportBtn.addEventListener("click", () => this.exportJson());
    if (printBtn) printBtn.addEventListener("click", () => this.printReport());

    if (emptyStartBtn) {
      emptyStartBtn.addEventListener("click", () => {
        sound.playClick();
        window.location.hash = "#missions";
      });
    }

    // Filter chips
    const chips = this.container.querySelectorAll(".filter-chip");
    chips.forEach(c => {
      c.addEventListener("click", () => {
        sound.playClick();
        this.activeFilter = c.getAttribute("data-filter") || "all";
        this.render();
      });
    });

    // Save note buttons
    const saveNoteBtns = this.container.querySelectorAll(".btn-save-note");
    saveNoteBtns.forEach(b => {
      b.addEventListener("click", () => {
        const missionId = b.getAttribute("data-id");
        const textarea = document.getElementById(`note-text-${missionId}`);
        if (textarea) {
          this.updatePersonalNotes(missionId, textarea.value);
          b.textContent = "Saved! ✓";
          setTimeout(() => { b.textContent = "Save Note 💾"; }, 1500);
        }
      });
    });

    // Delete record buttons
    const delBtns = this.container.querySelectorAll(".btn-del-record");
    delBtns.forEach(b => {
      b.addEventListener("click", () => {
        const mId = b.getAttribute("data-mission-id");
        if (mId) this.deleteRecord(mId);
      });
    });
  }
}
