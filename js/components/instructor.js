// StreakIt! - Instructor Character Component (Arshi)
// Visual representation with consistent short curly dark hair, lab coat, safety glasses

export class InstructorGuide {
  constructor(containerId = "instructor-container") {
    this.container = document.getElementById(containerId);
    this.isMinimized = false;
    this.currentMessage = "";
  }

  // Returns SVG markup for Arshi with short curly dark hair, lab coat, and safety glasses
  getAvatarSvg(size = 72) {
    return `
      <svg class="arshi-avatar-svg" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Instructor Arshi with short curly hair and lab coat">
        <defs>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FCD3B8"/>
            <stop offset="100%" stop-color="#F6B894"/>
          </linearGradient>
          <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#E2E8F0"/>
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E1B18"/>
            <stop offset="100%" stop-color="#2D2824"/>
          </linearGradient>
        </defs>

        <!-- Background soft circle -->
        <circle cx="50" cy="50" r="48" fill="#F1F5F9" stroke="#22D3EE" stroke-width="2.5"/>

        <!-- Lab Coat & Shoulders -->
        <path d="M18 95 C22 75, 30 70, 50 70 C70 70, 78 75, 82 95 Z" fill="url(#coatGrad)" stroke="#CBD5E1" stroke-width="1.5"/>
        <!-- Inner shirt -->
        <path d="M43 70 L50 82 L57 70 Z" fill="#3B82F6"/>
        <!-- Lab coat lapels -->
        <path d="M38 70 L48 95 L40 95 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="0.8"/>
        <path d="M62 70 L52 95 L60 95 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="0.8"/>
        <!-- Stethoscope or ID badge -->
        <rect x="30" y="80" width="8" height="12" rx="1" fill="#22D3EE" stroke="#0891B2" stroke-width="0.8"/>

        <!-- Neck -->
        <path d="M44 60 L44 72 C44 75, 56 75, 56 72 L56 60 Z" fill="url(#skinGrad)"/>

        <!-- Head / Face -->
        <ellipse cx="50" cy="48" rx="16" ry="19" fill="url(#skinGrad)"/>

        <!-- Short Curly Hair - Back Base -->
        <path d="M30 42 C26 35, 28 22, 50 20 C72 22, 74 35, 70 42 C74 48, 71 58, 66 58 C62 50, 62 46, 62 46 C60 46, 40 46, 38 46 C38 46, 38 50, 34 58 C29 58, 26 48, 30 42 Z" fill="url(#hairGrad)"/>

        <!-- Short Curly Curls around the head -->
        <circle cx="33" cy="28" r="7" fill="url(#hairGrad)"/>
        <circle cx="43" cy="22" r="7" fill="url(#hairGrad)"/>
        <circle cx="56" cy="21" r="7" fill="url(#hairGrad)"/>
        <circle cx="67" cy="27" r="7" fill="url(#hairGrad)"/>
        <circle cx="71" cy="38" r="6.5" fill="url(#hairGrad)"/>
        <circle cx="70" cy="48" r="6" fill="url(#hairGrad)"/>
        <circle cx="29" cy="38" r="6.5" fill="url(#hairGrad)"/>
        <circle cx="30" cy="48" r="6" fill="url(#hairGrad)"/>
        <!-- Curly fringe waves -->
        <path d="M37 26 Q44 20 49 26 Q55 20 62 27 Q55 31 50 28 Q44 32 37 26 Z" fill="#2D2824"/>
        <circle cx="41" cy="30" r="4.5" fill="url(#hairGrad)"/>
        <circle cx="59" cy="31" r="4.5" fill="url(#hairGrad)"/>

        <!-- Eyebrows -->
        <path d="M40 40 Q44 38 47 40" stroke="#2D2824" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M53 40 Q56 38 60 40" stroke="#2D2824" stroke-width="1.4" stroke-linecap="round"/>

        <!-- Eyes -->
        <ellipse cx="44" cy="44" rx="2.2" ry="2.6" fill="#1F2937"/>
        <circle cx="44.8" cy="43.2" r="0.8" fill="#FFFFFF"/>
        <ellipse cx="56" cy="44" rx="2.2" ry="2.6" fill="#1F2937"/>
        <circle cx="56.8" cy="43.2" r="0.8" fill="#FFFFFF"/>

        <!-- Nose -->
        <path d="M50 45 L49 50 L52 50" stroke="#E09F7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Gentle Smile -->
        <path d="M46 55 Q50 58 54 55" stroke="#C2410C" stroke-width="1.4" stroke-linecap="round" fill="none"/>

        <!-- Safety Glasses -->
        <rect x="38" y="39" width="11" height="9" rx="2" fill="none" stroke="#22D3EE" stroke-width="1.4"/>
        <rect x="51" y="39" width="11" height="9" rx="2" fill="none" stroke="#22D3EE" stroke-width="1.4"/>
        <path d="M49 43 L51 43" stroke="#22D3EE" stroke-width="1.4"/>
        <path d="M38 42 L32 40" stroke="#22D3EE" stroke-width="1.2"/>
        <path d="M62 42 L68 40" stroke="#22D3EE" stroke-width="1.2"/>
        <!-- Glasses reflection -->
        <line x1="40" y1="41" x2="43" y2="46" stroke="#FFFFFF" stroke-width="0.8" stroke-opacity="0.8"/>
        <line x1="53" y1="41" x2="56" y2="46" stroke="#FFFFFF" stroke-width="0.8" stroke-opacity="0.8"/>
      </svg>
    `;
  }

  showDialogue(message, actionHint = "", options = {}) {
    if (!this.container) return;
    this.currentMessage = message;

    const roleTitle = options.title || "Instructor Arshi";
    const badge = options.badge || "Microbiology Mentor";

    this.container.innerHTML = `
      <div class="arshi-guide-card ${this.isMinimized ? 'is-minimized' : ''}">
        <div class="arshi-guide-avatar">
          ${this.getAvatarSvg(64)}
        </div>
        <div class="arshi-guide-content">
          <div class="arshi-guide-header">
            <div>
              <span class="arshi-guide-name">${roleTitle}</span>
              <span class="arshi-guide-badge">${badge}</span>
            </div>
            <button class="arshi-guide-toggle-btn" id="btn-toggle-arshi" title="Minimize / Expand guidance" aria-label="Toggle guidance">
              ${this.isMinimized ? '▲ Expand' : '▼ Minimize'}
            </button>
          </div>
          <div class="arshi-guide-body" style="${this.isMinimized ? 'display: none;' : ''}">
            <p class="arshi-speech-text">${message}</p>
            ${actionHint ? `<div class="arshi-action-hint"><strong>Next step:</strong> ${actionHint}</div>` : ''}
          </div>
        </div>
      </div>
    `;

    const toggleBtn = document.getElementById("btn-toggle-arshi");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        this.isMinimized = !this.isMinimized;
        this.showDialogue(this.currentMessage, actionHint, options);
      });
    }
  }

  hide() {
    if (this.container) {
      this.container.innerHTML = "";
    }
  }
}
