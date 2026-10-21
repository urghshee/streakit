// StreakIt! - Microbiology Syllabus Concept Library
// Aligned with the 6 core units of undergraduate microbiology

export const SYLLABUS_UNITS = [
  {
    id: "unit-1",
    code: "Unit I",
    title: "History, Scope & Cellular Foundations",
    description: "Milestones in microbiology, microscopy, prokaryotic vs eukaryotic cell architecture, and roles of microbes in society.",
    icon: "🔬"
  },
  {
    id: "unit-2",
    code: "Unit II",
    title: "Diversity, Taxonomy, Growth & Culture",
    description: "Microbial classification, viral replication distinctions, culture media formulations, and bacterial growth kinetics.",
    icon: "🧫"
  },
  {
    id: "unit-3",
    code: "Unit III",
    title: "Microbial Metabolism & Bioenergetics",
    description: "Aerobic vs anaerobic respiration, fermentation pathways, and the Entner–Doudoroff alternative pathway.",
    icon: "⚡"
  },
  {
    id: "unit-4",
    code: "Unit IV",
    title: "Microbial Genetics & Gene Transfer",
    description: "Horizontal gene transfer via transformation, conjugation, and transduction; role of plasmids and transposons.",
    icon: "🧬"
  },
  {
    id: "unit-5",
    code: "Unit V",
    title: "Microbial Ecology & Symbiosis",
    description: "Aquatic (freshwater, marine) and terrestrial ecosystems, biofilms, mutualism, commensalism, and microbial loops.",
    icon: "🌱"
  },
  {
    id: "unit-6",
    code: "Unit VI",
    title: "Microbial Control, Food, Industry & AMR",
    description: "Sterilization vs disinfection, heat control, food/industrial fermentations, and antimicrobial resistance mechanisms.",
    icon: "🛡️"
  }
];

export const CONCEPTS_LIBRARY = [
  // UNIT 1: Foundations
  {
    id: "c-quadrant-streaking",
    unitId: "unit-1",
    term: "Quadrant Streaking (Dilution Streaking)",
    category: "Practical Microbiology",
    definition: "A progressive dilution technique where a microbial sample is systematically spread across four quadrants of an agar plate, flaming the loop between sectors, to obtain isolated single-cell colonies.",
    whyItMatters: "Essential for producing pure cultures from mixed environmental or clinical samples.",
    example: "Starting with a dense primary inoculum in Quadrant 1, diluted into Quadrants 2, 3, and finally single isolated colonies in Quadrant 4.",
    missions: ["mission-0", "mission-1"]
  },
  {
    id: "c-obs-vs-infer",
    unitId: "unit-1",
    term: "Observation vs. Scientific Interpretation",
    category: "Scientific Method",
    definition: "An observation is a direct, verifiable sensory recording (e.g. 'colony is circular, 2mm, yellow'). An interpretation is a conclusion or hypothesis inferred from that evidence (e.g. 'this might be Micrococcus luteus').",
    whyItMatters: "Colony morphology alone can never conclusively identify a bacterial species without confirmatory biochemical, microscopic, or molecular tests.",
    example: "Saying a colony is 'smooth and white' is an observation; claiming 'it is definitely Staphylococcus epidermidis' is an unverified inference.",
    missions: ["mission-0", "mission-1", "mission-dossier"]
  },
  {
    id: "c-prok-vs-euk",
    unitId: "unit-1",
    term: "Prokaryotic vs. Eukaryotic Cell Structure",
    category: "Cellular Foundations",
    definition: "Prokaryotes (Bacteria, Archaea) lack membrane-bound nuclei and complex organelles, containing 70S ribosomes and peptidoglycan cell walls. Eukaryotes (Fungi, Protozoa, Algae) possess membrane-bound organelles, linear chromosomes within a nucleus, and 80S ribosomes.",
    whyItMatters: "Determines cellular susceptibility to antibiotics, growth kinetics, and ecological specialization.",
    example: "Penicillin targets the transpeptidase cross-linking bacterial peptidoglycan, having no effect on eukaryotic host cells.",
    missions: ["mission-1"]
  },
  {
    id: "c-history-milestones",
    unitId: "unit-1",
    term: "Historical Milestones: Pasteur, Koch & Leeuwenhoek",
    category: "History of Science",
    definition: "Antonie van Leeuwenhoek discovered 'animalcules' via microscopy; Louis Pasteur disproved spontaneous generation and established germ theory principles; Robert Koch established Koch's Postulates and introduced solid agar media.",
    whyItMatters: "Foundation of aseptic technique and the pure culture paradigm used worldwide in microbiology labs.",
    example: "Fanny Hesse suggested using agar instead of gelatin, enabling plates to remain solid at 37°C incubation temperatures.",
    missions: ["mission-1"]
  },

  // UNIT 2: Diversity, Taxonomy, Growth
  {
    id: "c-selective-differential",
    unitId: "unit-2",
    term: "Selective vs. Differential Media",
    category: "Culture Media",
    definition: "Selective media contain chemical inhibitors that permit growth of specific microbial groups while suppressing others (e.g., bile salts inhibiting Gram-positives). Differential media contain indicators (dyes, pH indicators) displaying distinct visual changes based on metabolic activities.",
    whyItMatters: "Allows rapid presumptive differentiation from mixed samples without requiring extensive prior isolation.",
    example: "MacConkey agar is selective for Gram-negative enteric bacilli (via bile salts & crystal violet) and differential for lactose fermentation (turning neutral red pink).",
    missions: ["mission-2", "mission-dossier"]
  },
  {
    id: "c-growth-curve",
    unitId: "unit-2",
    term: "Bacterial Growth Curve (Batch Culture)",
    category: "Microbial Growth",
    definition: "The four classic phases of population growth in a closed liquid system: 1. Lag Phase (enzymatic adaptation), 2. Log/Exponential Phase (constant maximal doubling), 3. Stationary Phase (nutrient depletion & waste accumulation, growth rate equals death rate), 4. Death/Decline Phase (exponential cell death).",
    whyItMatters: "Critical for industrial fermentation harvesting, antibiotic timing, and determining generation times.",
    example: "Primary metabolites like ethanol or biomass are harvested during log phase; secondary metabolites like penicillin peak in stationary phase.",
    missions: ["mission-2"]
  },
  {
    id: "c-virus-culture",
    unitId: "unit-2",
    term: "Viral Obligate Intracellular Nature",
    category: "Virology",
    definition: "Viruses are acellular biological entities containing either DNA or RNA protected by a protein capsid. Because they lack metabolic machinery, ribosomes, and ATP generation, they CANNOT replicate or form colonies on nutrient agar plates; they require living host cells (tissue culture, embryonated eggs, or bacterial lawns for bacteriophages).",
    whyItMatters: "A fundamental distinction in microbiological diagnostics: attempting to streak or grow viruses on standard agar is biologically futile.",
    example: "Bacteriophages are enumerated as clear 'plaques' on a confluent lawn of host bacteria, rather than autonomous microbial colonies.",
    missions: ["mission-2"]
  },

  // UNIT 3: Metabolism
  {
    id: "c-respiration-fermentation",
    unitId: "unit-3",
    term: "Aerobic vs. Anaerobic Respiration vs. Fermentation",
    category: "Bioenergetics",
    definition: "Aerobic respiration uses molecular O2 as the terminal electron acceptor via an electron transport chain (~32-38 ATP). Anaerobic respiration uses inorganic compounds (NO3-, SO4^2-, CO2) as terminal acceptors. Fermentation uses internal organic intermediates (pyruvate derivatives) with no electron transport chain, generating ~2 ATP via substrate-level phosphorylation.",
    whyItMatters: "Determines microbial niche adaptation, gas production in culture, and food fermentation products.",
    example: "Yeast ferment sugars to ethanol and CO2 under anoxic conditions, while Escherichia coli can switch between aerobic respiration, nitrate respiration, and mixed-acid fermentation.",
    missions: ["mission-4", "mission-7"]
  },
  {
    id: "c-entner-doudoroff",
    unitId: "unit-3",
    term: "Entner–Doudoroff (ED) Pathway",
    category: "Metabolic Pathways",
    definition: "An alternative catabolic pathway for oxidizing glucose to pyruvate, yielding 1 ATP, 1 NADPH, and 1 NADH per glucose molecule (compared to 2 ATP and 2 NADH in classical glycolysis/EMP). Common in Gram-negative aerobes like Pseudomonas and enteric bacterium Zymomonas mobilis.",
    whyItMatters: "Crucial for identifying microorganisms lacking phosphofructokinase (PFK) and provides metabolic flexibility in soil and rhizosphere environments.",
    example: "Pseudomonas aeruginosa relies on the ED pathway rather than the Embden-Meyerhof-Parnas pathway for hexose catabolism.",
    missions: ["mission-4"]
  },

  // UNIT 4: Genetics
  {
    id: "c-hgt-mechanisms",
    unitId: "unit-4",
    term: "Horizontal Gene Transfer: Transformation, Conjugation, Transduction",
    category: "Microbial Genetics",
    definition: "The lateral transfer of genetic material between non-parental cells. 1. Transformation: Uptake of naked foreign DNA from the environment by competent cells. 2. Conjugation: Direct plasmid transfer via sex pilus contact. 3. Transduction: Bacteriophage-mediated accidental transfer of bacterial host DNA.",
    whyItMatters: "Drives rapid evolution, virulence factor dissemination, and the spread of multi-drug resistance across microbial species.",
    example: "Conjugative R-plasmids carrying beta-lactamase genes transferred from Klebsiella to E. coli in hospital environments.",
    missions: ["mission-5"]
  },
  {
    id: "c-plasmids-transposons",
    unitId: "unit-4",
    term: "Plasmids vs. Transposable Elements (Transposons)",
    category: "Genetic Elements",
    definition: "Plasmids are extrachromosomal, self-replicating circular double-stranded DNA molecules. Transposons ('jumping genes') are mobile DNA segments flanked by inverted repeats that can excise and insert into plasmids or chromosomes via transposase, but CANNOT replicate independently.",
    whyItMatters: "Transposons mobilize antibiotic resistance genes into conjugative plasmids, compounding dissemination.",
    example: "Tn3 transposon carries ampicillin resistance and readily transposes between plasmids and the bacterial chromosome.",
    missions: ["mission-5"]
  },

  // UNIT 5: Ecology
  {
    id: "c-rhizosphere-symbiosis",
    unitId: "unit-5",
    term: "Rhizosphere & Mutualistic Nitrogen Fixation",
    category: "Terrestrial Ecology",
    definition: "The rhizosphere is the narrow zone of soil directly influenced by root secretions. Mutualistic symbioses, such as Rhizobium with leguminous plants, convert atmospheric N2 into bioavailable ammonia (NH3) inside specialized root nodules using the oxygen-sensitive nitrogenase enzyme protected by leghemoglobin.",
    whyItMatters: "Drives terrestrial nitrogen cycling and sustainable agricultural productivity without synthetic fertilizers.",
    example: "Rhizobium leguminosarum forming functional pink nodules on clover and pea plant roots.",
    missions: ["mission-1", "mission-3"]
  },
  {
    id: "c-aquatic-biofilms",
    unitId: "unit-5",
    term: "Aquatic Microbial Ecology & Biofilm Formation",
    category: "Aquatic Ecology",
    definition: "In freshwater and marine environments, bacteria predominantly transition from free-swimming (planktonic) states into structured, surface-attached communities encased in extracellular polymeric substances (EPS) termed biofilms. Microbes exhibit metabolic cooperation and heightened chemical tolerance.",
    whyItMatters: "Biofilms facilitate nutrient cycling in streams and oceans, but also cause pipe biofouling and medical catheter infections.",
    example: "Pond stream pebbles covered in slippery epilithic biofilms composed of cyanobacteria, diatoms, and heterotrophic bacteria.",
    missions: ["mission-3"]
  },

  // UNIT 6: Control, Food, AMR
  {
    id: "c-sterilization-disinfection",
    unitId: "unit-6",
    term: "Sterilization vs. Disinfection vs. Antisepsis",
    category: "Contamination Control",
    definition: "Sterilization is the absolute destruction or elimination of ALL viable forms of microbial life, including highly resistant bacterial endospores (e.g. autoclaving at 121°C, 15 psi for 15-20 mins). Disinfection reduces pathogenic microorganisms on inanimate objects to safe levels but does NOT reliably destroy endospores. Antisepsis applies non-toxic chemical antimicrobials to living tissue.",
    whyItMatters: "Confusing sterilization with disinfection risks catastrophic surgical infections and cell culture cross-contamination.",
    example: "Autoclaving agar media achieves sterilization; wiping laboratory workbenches with 70% isopropanol performs disinfection.",
    missions: ["mission-6"]
  },
  {
    id: "c-food-industrial-fermentation",
    unitId: "unit-6",
    term: "Microbes in Food Preservation & Industrial Bioprocesses",
    category: "Food & Industrial",
    definition: "Fermentation in food leverages beneficial microbial metabolism (e.g. lactic acid bacteria like Lactobacillus) to lower pH, inhibit spoilage pathogens, and produce pleasant organoleptic textures and flavors (yogurt, cheese, kimchi). Industrial microbiology scales microbial monocultures in bioreactors to yield enzymes, amino acids, and therapeutic proteins.",
    whyItMatters: "Microbial presence is not inherently harmful; environmental context determines whether an organism is a beneficial workhorse or a spoilage contaminant.",
    example: "Lactobacillus bulgaricus ferments milk lactose into lactic acid, coagulating casein proteins into yogurt while suppressing Listeria.",
    missions: ["mission-7"]
  },
  {
    id: "c-amr-kirby-bauer",
    unitId: "unit-6",
    term: "Antimicrobial Resistance & Kirby–Bauer Disk Diffusion",
    category: "Antimicrobial Agents",
    definition: "Standardized phenotypic assay (on Mueller–Hinton agar) measuring the sensitivity of an isolated bacterial lawn to antibiotic-impregnated paper disks. The resulting clear circular Zone of Inhibition (ZOI) diameter in millimeters is compared against standard clinical breakpoints (CLSI/EUCAST) to classify the isolate as Susceptible (S), Intermediate (I), or Resistant (R).",
    whyItMatters: "Guiding rational antibiotic therapy and monitoring the global emergence of resistant pathogens.",
    example: "A clear zone diameter of 8 mm around an ampicillin disk indicating Resistance (R), whereas a 22 mm zone indicates Susceptibility (S).",
    missions: ["mission-8"]
  }
];
