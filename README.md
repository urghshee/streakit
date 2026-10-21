# StreakIt! — Interactive Microbiology Exploration & Virtual Laboratory

> **Explore. Sample. Streak. Discover.**  
> An interactive educational web application, microbiology exploration game, and virtual laboratory learning platform.

---

## 🌟 Creator & Project Information
- **Creator:** Arshi
- **Role:** Undergraduate Biotechnology Student & Educational Web Creator
- **Email:** [arshidhingra2006@gmail.com](mailto:arshidhingra2006@gmail.com)
- **Phone:** 9466454005
- **Audience:** Undergraduate students studying Biotechnology, Microbiology, and Life Sciences.

---

## 🚀 Quick Start Instructions

This project is built with **zero external dependencies**. No `npm install`, Node.js, or complex toolchains are required!

### Option 1: Direct Browser Launch
Simply double-click [`index.html`](index.html) or right-click and choose **Open with > Chrome / Edge / Firefox / Safari**.

### Option 2: Local Python Server
Open a terminal in this folder and run:
```bash
py -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔬 Core Gameplay Loop & Architecture

1. **Habitat Exploration:**
   - Clickable SVG biomes: Soil & Plant Rhizosphere, Freshwater Pond, Riparian Banks, Leaf Surfaces, Fermentation Vats, and Clinical Workbenches.
   - Interactive sterile swab / inoculation loop: Drag or click onto permitted hotspots to generate verified sample IDs (`STK-001`, `STK-002`, etc.).

2. **Media Selection & Aseptic Preparation:**
   - Context-sensitive selection between General-purpose (Nutrient Agar), Selective/Differential (MacConkey, Sabouraud Dextrose, Yeast Extract Mannitol with Congo Red, Pseudomonas Isolation Agar, MRS), and standardized susceptibility media (Mueller–Hinton).
   - Solves a fundamental virology distinction: clarifies why acellular viruses cannot form autonomous colonies on bacteriological agar and require living host cells.

3. **60fps Freehand Dilution Streaking Canvas:**
   - Realistic circular agar Petri dish with smooth mouse, trackpad, and touchscreen input.
   - Dilution simulation (Quadrant 1 → 2 → 3 → 4) with physical cell density thinning.
   - Sector guidelines toggle, Bunsen burner loop flame sterilization with audio, Undo, Clear, and an Accessible Auto-Streak fallback for motor/keyboard accessibility.

4. **Simulated Incubation Chamber:**
   - Digital incubator (`THERMO-CULTURE 3000`) with temperature displays (25°C, 30°C, 35°C, 37°C), motor hum acoustics, time-lapse progress animation, and a Skip button.

5. **Colony Morphology & 10× Magnification Viewer:**
   - Scientifically accurate SVG rendering of diverse colonial morphotypes: Form (circular, irregular, filamentous, punctiform), Margin (entire, undulate, lobate, filamentous), Elevation (flat, raised, convex, umbonate), Pigmentation (pyocyanin cyan, pyoverdine green, cream, yellow), and Surface Textures.
   - Interactive popover definitions for all terminology.
   - Kirby–Bauer disk diffusion plate with millimeter ruler measurements and CLSI interpretive breakpoint standards.

6. **Evidence Board & Scientific Reasoning:**
   - Collates habitat origin, media properties, and colony morphology.
   - Evaluates candidate hypotheses including an explicit *Uncertainty / Inconclusive Evidence* option when morphology alone cannot differentiate species.
   - Confidence levels (Low, Moderate, High) and encouraging, constructive feedback.

7. **Institutional Digital Laboratory Notebook:**
   - Automatically maintains chronological investigation records with persistent `localStorage`.
   - Filter records across all six undergraduate syllabus units.
   - Edit personal field notes and reflections.
   - Export structured data to standard JSON and print academic PDF reports with clean print stylesheets.

---

## 📚 Syllabus Curriculum Mapping (10 Missions)

- **Mission 0:** First Investigation — Your First Streak Plate (*Unit I: Foundations & Aseptic Dilution*)
- **Mission 1:** Life in Soil — Microbial Diversity & Cell Structure (*Units I & V: Rhizosphere, Prokaryotes vs Fungal Molds*)
- **Mission 2:** Choosing the Right Media — Diversity, Growth & Culture (*Unit II: MacConkey Agar, Growth Phases & The Obligate Viral Replication Distinction*)
- **Mission 3:** Microbial Ecology — Aquatic & Terrestrial Interactions (*Units V & I: Freshwater Biofilms & Rhizobial Nitrogen Fixation*)
- **Mission 4:** Metabolic Clues — Respiration & Fermentation (*Unit III: O-F Glucose & the Entner–Doudoroff Pathway*)
- **Mission 5:** Genetic Exchange — How Traits Move (*Unit IV: Transformation, Conjugation, Transduction, Plasmids & Transposons*)
- **Mission 6:** Contamination Control — Sterilization vs Disinfection (*Unit VI: Autoclaving vs Boiling, Bacterial Endospore Resistance*)
- **Mission 7:** Microbes in Food & Industry (*Units VI & III: Lactic Acid Fermentation & Probiotic Context*)
- **Mission 8:** Antimicrobial Resistance — Interpreting Evidence (*Units VI & I: Kirby–Bauer Disk Diffusion & Stewardship*)
- **Final Integrative Mission:** The Evidence Dossier (*Comprehensive Synthesis of Units I–VI*)

---

## 👩‍🔬 Meet Arshi (Creator & Instructor Character)
- **Real Laboratory Photograph:** Authentic photograph of Arshi operating a colony counter in a microbiology laboratory is featured in the creator section and homepage.
- **Illustrated Guide:** Instructor Arshi appears across all tutorials and investigations with her signature short curly dark hair, white lab coat, and safety glasses, providing thoughtful, scientifically rigorous mentorship.
