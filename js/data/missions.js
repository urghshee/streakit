// StreakIt! - Mission Catalog & Educational Scenario Data
// Mapped comprehensively across the 6-unit undergraduate microbiology syllabus

export const MISSIONS = [
  {
    id: "mission-0",
    number: "0",
    title: "First Investigation: Your First Streak Plate",
    topic: "Introduction to Aseptic Inoculation & Quadrant Dilution",
    syllabusUnit: "unit-1",
    unitCode: "Unit I",
    difficulty: "Beginner",
    estimatedTime: "5 mins",
    prerequisite: null,
    objective: "Collect an introductory rhizosphere soil sample, practise 4-quadrant dilution streaking on Nutrient Agar, observe isolated colony morphology, and distinguish direct observation from scientific inference.",
    briefing: "Welcome to your first practical investigation! In microbiology, mixed samples contain millions of invisible cells. Quadrant dilution streaking physically separates individual cells so that each multiplies into a discrete, visible clone called a colony. Remember: observe carefully before concluding anything.",
    habitat: {
      id: "soil-rhizosphere",
      name: "Soil & Plant Rhizosphere",
      type: "Terrestrial",
      description: "Rich topsoil surrounding clover root systems, high in organic matter and microbial diversity.",
      ecologicalFactors: ["High organic carbon", "Aerobic topsoil with anaerobic micro-niches", "Diverse microbial community"],
      hotspots: [
        { id: "rhizo-root", name: "Clover Root Rhizosphere", x: 42, y: 65, permitted: true, hint: "Soil tightly adhering to root hairs" },
        { id: "soil-bulk", name: "Bulk Topsoil", x: 75, y: 78, permitted: true, hint: "General mineral topsoil" },
        { id: "plant-leaf", name: "Plant Stem", x: 30, y: 35, permitted: false, reason: "Our mission objective targets root-associated soil, not aerial plant stems." }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-001",
      locationName: "Clover Root Rhizosphere",
      fieldNotes: "Moist, crumbly dark loam with visible fine root hairs. Distinct earthy petrichor odor (geosmin)."
    },
    mediaOptions: [
      {
        id: "nutrient-agar",
        name: "Nutrient Agar (NA)",
        type: "General-Purpose",
        isCorrect: true,
        description: "Standard non-selective complex medium supporting a wide variety of non-fastidious heterotrophs.",
        rationale: "Ideal for initial exploratory cultivation of non-fastidious environmental soil bacteria."
      },
      {
        id: "macconkey-agar",
        name: "MacConkey Agar (MAC)",
        type: "Selective & Differential",
        isCorrect: false,
        description: "Contains bile salts and crystal violet to select for Gram-negative enteric bacilli.",
        rationale: "Unnecessarily restrictive for an exploratory soil sample; inhibits Gram-positive soil microbes like Actinobacteria and Bacillus."
      },
      {
        id: "blood-agar",
        name: "5% Sheep Blood Agar",
        type: "Enriched & Differential",
        isCorrect: false,
        description: "Enriched medium used primarily for fastidious clinical pathogens and hemolysis testing.",
        rationale: "Expensive clinical enriched medium not warranted for introductory environmental soil plating."
      }
    ],
    streakingGuide: {
      recommendedPattern: "quadrant",
      instructions: "Inoculate primary streak in Quadrant 1. Flame loop, rotate 90°, pull 2-3 strokes from Q1 into Q2. Flame loop again, pull from Q2 into Q3. Finally, gently streak into Q4 without overlapping Q1."
    },
    incubation: {
      temperature: "30°C",
      duration: "24-48 hours (simulated 3s)",
      conditions: "Aerobic dark incubation"
    },
    colonyMorphologies: [
      {
        id: "morph-0-A",
        label: "Colony Type A (Dominant isolate)",
        count: "Isolated colonies in Q3 & Q4",
        form: "Circular",
        margin: "Entire (Smooth)",
        elevation: "Convex",
        size: "2.5 mm",
        pigmentation: "Creamy off-white",
        surface: "Glistening / Smooth",
        opacity: "Opaque",
        visualColor: "#F3EFE0",
        texture: "Butyrous (butter-like)",
        definitions: {
          form: "Circular: round outline with symmetrical radius.",
          margin: "Entire: sharply defined, smooth unbroken perimeter.",
          elevation: "Convex: dome-shaped profile when viewed from the side."
        }
      },
      {
        id: "morph-0-B",
        label: "Colony Type B (Spreading isolate)",
        count: "Few colonies in Q2 & Q3",
        form: "Irregular",
        margin: "Undulate (Wavy)",
        elevation: "Flat",
        size: "5.0 mm",
        pigmentation: "Translucent grey",
        surface: "Dull / Rough",
        opacity: "Translucent",
        visualColor: "#CBD5E1",
        texture: "Dry",
        definitions: {
          form: "Irregular: non-symmetrical, spreading outline.",
          margin: "Undulate: moderately wavy edge.",
          elevation: "Flat: minimal elevation above agar surface."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-1",
        title: "Mixed Environmental Bacterial Isolates (Presumptive Bacillus-like & Gram-negative rods)",
        status: "best-supported",
        reasoning: "The sample yielded multiple distinct colonial morphotypes (smooth convex cream colonies and flat spreading dull colonies) on general Nutrient Agar from soil. This accurately reflects a mixed soil bacterial population.",
        feedback: "Excellent scientific reasoning! You correctly identified that multiple colony types reflect diverse soil bacteria, and you appropriately refrained from making an unsupported species-level claim based on morphology alone."
      },
      {
        id: "cand-2",
        title: "Definitive Identification: Bacillus subtilis and Escherichia coli",
        status: "unwarranted-inference",
        reasoning: "Colony morphology alone can never conclusively differentiate species. Many environmental bacteria share smooth circular or spreading colony appearances.",
        feedback: "Caution: This is an over-confident inference. While the colonies share physical similarities with these species, colony morphology alone cannot provide species-level identification without biochemical, Gram staining, or 16S rRNA sequencing."
      },
      {
        id: "cand-3",
        title: "Sterile Sample / Complete Culture Failure",
        status: "contradicted",
        reasoning: "Discrete colonies are visibly thriving across quadrants on the agar surface.",
        feedback: "Contradicted by the evidence. Robust colony growth is clearly present in multiple sectors of your plate."
      }
    ],
    reflectionPrompt: "Why must a microbiologist flame the inoculation loop between quadrants during a dilution streak?"
  },

  {
    id: "mission-1",
    number: "1",
    title: "Life in Soil: Microbial Diversity and Cell Structure",
    topic: "Cellular Architecture & Soil Microflora",
    syllabusUnit: "unit-1",
    unitCode: "Units I & V",
    difficulty: "Beginner-Intermediate",
    estimatedTime: "6 mins",
    prerequisite: "mission-0",
    objective: "Investigate soil microbial diversity, differentiate prokaryotic bacterial colonies from eukaryotic filamentous fungal mycelia, and explore historical foundations of pure culture microbiology.",
    briefing: "Topsoil is one of Earth's densest microbial habitats. A single gram contains billions of bacteria, actinomycetes, and fungal hyphae. Here we investigate how fundamental cellular architecture (prokaryote vs eukaryote) expresses visibly in culture morphology and ecological function.",
    habitat: {
      id: "garden-soil",
      name: "Agricultural Compost & Humus",
      type: "Terrestrial",
      description: "Decomposing leaf litter and rich composted soil teeming with active decomposers.",
      ecologicalFactors: ["High cellulose and lignin content", "Moist aerobic microhabitats", "Intense competitive interactions"],
      hotspots: [
        { id: "compost-humus", name: "Decaying Plant Compost", x: 50, y: 60, permitted: true, hint: "Rich organic detritus zone" },
        { id: "mineral-gravel", name: "Inorganic Stone Layer", x: 80, y: 85, permitted: false, reason: "Sparse microbial biomass compared to organic humus." }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-002",
      locationName: "Decaying Plant Compost",
      fieldNotes: "Rich black humus with white mycelial threads visible to the naked eye. Rich earthy aroma."
    },
    mediaOptions: [
      {
        id: "sabouraud-dextrose",
        name: "Sabouraud Dextrose Agar (SDA)",
        type: "Selective for Fungi",
        isCorrect: true,
        description: "Low pH (~5.6) and high dextrose concentration inhibit bacterial overgrowth while favoring fungi.",
        rationale: "Allows examination of eukaryotic molds and yeasts without being overwhelmed by rapid bacterial swarmers."
      },
      {
        id: "nutrient-agar",
        name: "Nutrient Agar (NA)",
        type: "General-Purpose",
        isCorrect: false,
        description: "Standard non-selective medium with neutral pH (~7.0).",
        rationale: "Rapidly dividing soil bacteria will quickly overgrow and mask slower-growing eukaryotic molds on neutral NA."
      }
    ],
    streakingGuide: {
      recommendedPattern: "t-streak",
      instructions: "Use a 3-sector T-streak pattern. Spread initial inoculum in Sector 1. Rotate 90° for Sector 2, then complete Sector 3 to isolate spores and hyphal fragments."
    },
    incubation: {
      temperature: "25°C",
      duration: "72 hours (simulated 3s)",
      conditions: "Room temperature dark incubation (optimal for soil fungi)"
    },
    colonyMorphologies: [
      {
        id: "morph-1-Fungal",
        label: "Eukaryotic Filamentous Colony (Mold)",
        count: "3 large radiating colonies",
        form: "Filamentous",
        margin: "Filamentous (Hyphal feathering)",
        elevation: "Umbonate / Cottony aerial hyphae",
        size: "25 mm (Rapid radial spread)",
        pigmentation: "Olive green center with white hyphal margin",
        surface: "Velvety / Powdery (due to conidiospores)",
        opacity: "Opaque",
        visualColor: "#4A6B56",
        texture: "Fibrous aerial mycelium",
        definitions: {
          form: "Filamentous: thread-like vegetative hyphae branching outwards.",
          margin: "Filamentous: fuzzy perimeter composed of microscopic hyphae.",
          elevation: "Umbonate: elevated central knob with spreading aerial hyphae."
        }
      },
      {
        id: "morph-1-Actino",
        label: "Prokaryotic Actinobacteria Colony",
        count: "10 small powdery colonies",
        form: "Circular / Embedded",
        margin: "Undulate",
        elevation: "Raised",
        size: "1.5 mm",
        pigmentation: "Chalky white",
        surface: "Dry / Crusty",
        opacity: "Opaque",
        visualColor: "#FAFAF9",
        texture: "Hard, embedded in agar",
        definitions: {
          form: "Circular: compact colonial cluster.",
          margin: "Undulate: gently uneven edge.",
          elevation: "Raised: elevated plateau above agar."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-soil-1",
        title: "Mixed Soil Community: Eukaryotic Filamentous Mold (Fungi) and Prokaryotic Actinobacteria",
        status: "best-supported",
        reasoning: "The large powdery green spreading colony exhibits true eukaryotic hyphal filaments (mold), while the small chalky slow-growing colonies represent filamentous prokaryotic Actinobacteria (such as Streptomyces).",
        feedback: "Spot on! You distinguished eukaryotic filamentous fungi (with extensive aerial spore-bearing mycelia) from prokaryotic actinobacteria, both of which are central to soil organic breakdown."
      },
      {
        id: "cand-soil-2",
        title: "Pure Bacterial Culture of Escherichia coli",
        status: "contradicted",
        reasoning: "E. coli forms moist, creamy, non-filamentous colonies, whereas this culture displays dry powdery aerial mycelia and hyphal branching.",
        feedback: "Incorrect. The velvety green colonies with branching hyphae are diagnostic of eukaryotic molds, not enteric Gram-negative rods."
      },
      {
        id: "cand-soil-3",
        title: "Inconclusive: Impossible to distinguish Bacteria from Fungi without electron microscopy",
        status: "insufficient-reasoning",
        reasoning: "While species identification requires advanced methods, macroscopic colonial traits (powdery aerial mycelium vs moist bacterial domes) readily distinguish molds from bacteria.",
        feedback: "Too hesitant: while exact species cannot be named, macroscopic colony morphology clearly distinguishes filamentous fungal mycelia from unicellular bacterial colonies."
      }
    ],
    reflectionPrompt: "How did Fanny Hesse's suggestion to use agar instead of gelatin revolutionize Robert Koch's ability to isolate pure cultures at body temperature (37°C)?"
  },

  {
    id: "mission-2",
    number: "2",
    title: "Choosing the Right Media: Diversity, Growth & Culture",
    topic: "Selective Media, Bacterial Growth Kinetics & The Viral Distinction",
    syllabusUnit: "unit-2",
    unitCode: "Unit II",
    difficulty: "Intermediate",
    estimatedTime: "7 mins",
    prerequisite: "mission-1",
    objective: "Master selective vs differential media selection, interpret the four phases of a bacterial batch growth curve, and solve a crucial diagnostic challenge involving viral replication.",
    briefing: "Not all microbes grow under the same conditions. In this mission, an environmental water sample suspected of containing both bacteria and bacteriophages arrives at your bench. You must select the right medium, analyze bacterial growth kinetics, and recognize why viruses cannot reproduce on bacteriological agar.",
    habitat: {
      id: "freshwater-estuary",
      name: "River Estuary Surface Water",
      type: "Aquatic",
      description: "Brackish estuarine transition zone carrying agricultural runoff and aquatic microorganisms.",
      ecologicalFactors: ["Variable salinity", "Suspended nutrients", "Presence of bacteriophages"],
      hotspots: [
        { id: "water-planktonic", name: "Estuary Water Sample", x: 45, y: 55, permitted: true, hint: "Surface water column" },
        { id: "mud-bed", name: "Deep Anoxic Silt", x: 70, y: 88, permitted: false, reason: "Strict anoxic sediment requires anaerobic jars, which are not configured for this aerobic test." }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-003",
      locationName: "Estuary Water Sample",
      fieldNotes: "Slightly turbid brackish water, pH 7.4. Contains suspended particulates and aquatic microflora."
    },
    mediaOptions: [
      {
        id: "macconkey-agar",
        name: "MacConkey Agar (MAC)",
        type: "Selective & Differential",
        isCorrect: true,
        description: "Bile salts and crystal violet inhibit Gram-positive organisms. Neutral red differentiates lactose fermenters (pink) from non-fermenters (colorless).",
        rationale: "Ideal for isolating and differentiating potential enteric Gram-negative bacilli from water samples."
      },
      {
        id: "nutrient-agar",
        name: "Nutrient Agar (General)",
        type: "General-Purpose",
        isCorrect: false,
        description: "General non-selective agar.",
        rationale: "Will allow uncontrolled background growth of all water bacteria without differentiating lactose fermentation."
      },
      {
        id: "viral-agar-trick",
        name: "Standard Bacteriological Agar for Viral Isolation",
        type: "Invalid Concept",
        isCorrect: false,
        description: "Standard nutrient agar plate intended to grow environmental viruses.",
        rationale: "CRUCIAL ERROR: Viruses are obligate intracellular entities lacking metabolic machinery. They CANNOT replicate or form autonomous colonies on agar without living host cells!"
      }
    ],
    streakingGuide: {
      recommendedPattern: "quadrant",
      instructions: "Quadrant streak the water sample to isolate distinct coliform colonies. Note any viral interaction clues."
    },
    incubation: {
      temperature: "37°C",
      duration: "24 hours (simulated 3s)",
      conditions: "Standard aerobic incubator"
    },
    colonyMorphologies: [
      {
        id: "morph-2-LactosePos",
        label: "Lactose-Fermenting Colony (Coliform-type)",
        count: "Numerous pink colonies",
        form: "Circular",
        margin: "Entire",
        elevation: "Convex",
        size: "3.0 mm",
        pigmentation: "Intense pink / magenta (with bile precipitate halo)",
        surface: "Smooth / Mucoid",
        opacity: "Opaque",
        visualColor: "#EC4899",
        texture: "Moist",
        definitions: {
          form: "Circular: round outline.",
          margin: "Entire: smooth edge.",
          elevation: "Convex: dome profile indicating vigorous acid production."
        }
      },
      {
        id: "morph-2-LactoseNeg",
        label: "Non-Lactose Fermenting Colony",
        count: "Few pale colonies",
        form: "Circular",
        margin: "Entire",
        elevation: "Flat to slightly raised",
        size: "2.0 mm",
        pigmentation: "Colorless / Pale amber",
        surface: "Smooth",
        opacity: "Translucent",
        visualColor: "#FDE68A",
        texture: "Butyrous",
        definitions: {
          form: "Circular: round perimeter.",
          margin: "Entire: continuous smooth margin.",
          elevation: "Flat: minimal height above media."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-med-1",
        title: "Gram-Negative Enteric Coliforms Isolated; Viruses Require Living Host Cell Plaque Assays (Not Agar)",
        status: "best-supported",
        reasoning: "The growth of pink lactose-fermenting colonies on MacConkey agar indicates Gram-negative enteric bacilli. Any viruses present cannot form colonies on agar and instead require host cell monolayers or bacterial lawns for plaque formation.",
        feedback: "Outstanding scientific comprehension! You accurately interpreted the MacConkey differential reaction and articulated the essential biological truth: viruses are obligate intracellular agents that cannot grow autonomously on agar."
      },
      {
        id: "cand-med-2",
        title: "Culture Demonstrates Environmental Viruses Growing Directly on Agar Media",
        status: "contradicted",
        reasoning: "Viruses possess no ribosomes, ATP synthase, or biosynthetic enzymes; they cannot divide or form colonies on cell-free agar media.",
        feedback: "Critical scientific flaw! Viruses CANNOT grow on ordinary agar plates. To culture or detect bacteriophages, you must inoculate a living host bacterial lawn to observe clear zones of lysis (plaques)."
      },
      {
        id: "cand-med-3",
        title: "All Colonies on MacConkey are Gram-Positive Staphylococci",
        status: "contradicted",
        reasoning: "Bile salts and crystal violet in MacConkey agar actively inhibit the vast majority of Gram-positive organisms.",
        feedback: "Contradicted by media properties. MacConkey agar specifically inhibits Gram-positive bacteria; the growing isolates are Gram-negative bacilli."
      }
    ],
    reflectionPrompt: "In a closed liquid batch culture, why does the population growth rate plateau during the Stationary Phase?"
  },

  {
    id: "mission-3",
    number: "3",
    title: "Microbial Ecology: Aquatic and Terrestrial Interactions",
    topic: "Symbiotic Partnerships, Biofilms & Environmental Context",
    syllabusUnit: "unit-5",
    unitCode: "Units V & I",
    difficulty: "Intermediate",
    estimatedTime: "7 mins",
    prerequisite: "mission-2",
    objective: "Compare microbial life in aquatic freshwater biofilms against root-nodule terrestrial mutualisms, identifying how environmental context dictates microbial roles.",
    briefing: "Microbes rarely live in isolation. In rivers, they construct resilient multi-species biofilms. In plant roots, mutualistic Rhizobia fix atmospheric nitrogen in exchange for photosynthates. You will examine root nodules and river stones to analyze ecological interactions.",
    habitat: {
      id: "freshwater-stream",
      name: "Freshwater Stream & Riparian Bank",
      type: "Aquatic / Riparian",
      description: "Flowing freshwater stream with submerged stones and emergent wild legume roots along the bank.",
      ecologicalFactors: ["Dissolved oxygen gradient", "Flow shear stress encouraging biofilm attachment", "Nitrogen-poor riparian soil favoring nodulation"],
      hotspots: [
        { id: "root-nodules", name: "Legume Root Nodules", x: 35, y: 70, permitted: true, hint: "Fleshy pink nodules on root system" },
        { id: "stone-biofilm", name: "Submerged Stream Pebble", x: 68, y: 55, permitted: true, hint: "Slimy epilithic biofilm on rock surface" }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-004",
      locationName: "Legume Root Nodules",
      fieldNotes: "Excised fresh root nodules showing internal pink coloration (leghemoglobin, active nitrogenase protection)."
    },
    mediaOptions: [
      {
        id: "yeast-mannitol-agar",
        name: "Yeast Extract Mannitol Agar (YMA) with Congo Red",
        type: "Differential for Rhizobia",
        isCorrect: true,
        description: "Specialized medium for cultivating Rhizobium; rhizobia absorb Congo red poorly, forming white/translucent mucoid colonies.",
        rationale: "Standard microbiological medium for isolating symbiotic nitrogen-fixing rhizobia from legume root nodules."
      },
      {
        id: "nutrient-agar",
        name: "Nutrient Agar",
        type: "General-Purpose",
        isCorrect: false,
        description: "General broth agar.",
        rationale: "Non-optimal carbon source for fastidious nitrogen fixers."
      }
    ],
    streakingGuide: {
      recommendedPattern: "quadrant",
      instructions: "Streak crushed nodule suspension carefully across four quadrants to obtain isolated mucoid colonies."
    },
    incubation: {
      temperature: "28°C",
      duration: "48-72 hours (simulated 3s)",
      conditions: "Aerobic incubation at plant growth temperature"
    },
    colonyMorphologies: [
      {
        id: "morph-3-Rhizobia",
        label: "Presumptive Rhizobium Isolate",
        count: "Numerous isolated colonies in Q3/Q4",
        form: "Circular",
        margin: "Entire",
        elevation: "Convex / Domed",
        size: "3.5 mm",
        pigmentation: "Translucent white / Glistening (poor Congo red uptake)",
        surface: "Copious slime (Extracellular Polysaccharide - EPS)",
        opacity: "Translucent",
        visualColor: "#F1F5F9",
        texture: "Viscous / Mucoid",
        definitions: {
          form: "Circular: regular rounded dome.",
          margin: "Entire: smooth uninterrupted perimeter.",
          elevation: "Convex: prominent rounded dome."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-eco-1",
        title: "Mutualistic Nitrogen-Fixing Symbiont (Presumptive Rhizobium sp.)",
        status: "best-supported",
        reasoning: "The sample derived from leghemoglobin-pink legume root nodules produced copious mucoid, Congo-red negative colonies on YMA, characteristic of symbiotic nitrogen-fixing Rhizobiaceae.",
        feedback: "Outstanding ecological reasoning! You combined environmental source evidence (legume nodules) with media characteristics (YMA with Congo red) and colony morphology (mucoid EPS) to infer a mutualistic symbiont."
      },
      {
        id: "cand-eco-2",
        title: "Pathogenic Parasite Causing Plant Root Decay",
        status: "contradicted",
        reasoning: "The root nodules were healthy, pink (indicating active leghemoglobin protecting nitrogenase), and showed no signs of tissue necrosis or phytopathogenic rot.",
        feedback: "Incorrect. The pink interior of the nodules and healthy plant vigor signify beneficial mutualistic nitrogen fixation, not destructive phytopathology."
      },
      {
        id: "cand-eco-3",
        title: "Free-Living Obligate Anaerobe Unrelated to Plant Roots",
        status: "contradicted",
        reasoning: "The isolate grew robustly on aerobic plates and was physically isolated from within washed legume nodule tissue.",
        feedback: "Contradicted by incubation and sampling facts. The organism is aerobic and resides symbiotically within plant root tissue."
      }
    ],
    reflectionPrompt: "Why is the presence of leghemoglobin in root nodules vital for the enzyme nitrogenase during biological nitrogen fixation?"
  },

  {
    id: "mission-4",
    number: "4",
    title: "Metabolic Clues: Energy, Oxygen & Fermentation",
    topic: "Respiration, Fermentation & The Entner–Doudoroff Pathway",
    syllabusUnit: "unit-3",
    unitCode: "Unit III",
    difficulty: "Intermediate",
    estimatedTime: "7 mins",
    prerequisite: "mission-3",
    objective: "Investigate microbial bioenergetics: differentiate aerobic respiration, anaerobic respiration, and fermentation, and identify bacteria utilizing the Entner–Doudoroff pathway.",
    briefing: "How do microbes harvest energy? Aerobic respiration extracts maximal ATP using oxygen as the final electron acceptor. Fermentation uses internal organic molecules under anoxic conditions. Certain soil bacteria, like Pseudomonas, utilize the unique Entner–Doudoroff (ED) pathway to metabolize hexoses without classical glycolysis.",
    habitat: {
      id: "anaerobic-marsh",
      name: "Waterlogged Marsh Sediment & Soil",
      type: "Wetland",
      description: "Steep oxygen gradient from oxygenated surface water down into reducing anoxic sediment.",
      ecologicalFactors: ["Sharp redox cline", "Microaerophilic and facultative zones", "Alternative electron acceptors (nitrate, sulfate)"],
      hotspots: [
        { id: "rhizo-aerobic", name: "Oxygenated Root Interface", x: 40, y: 40, permitted: true, hint: "Aerated surface micro-zone" },
        { id: "anoxic-silt", name: "Anoxic Black Silt", x: 65, y: 75, permitted: true, hint: "Fermentation and sulfate-reduction zone" }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-005",
      locationName: "Oxygenated Root Interface",
      fieldNotes: "Brownish aerobic interface soil. Oxidase positive test on preliminary field swab."
    },
    mediaOptions: [
      {
        id: "glucose-of-medium",
        name: "Hugh & Leifson Oxidation-Fermentation (O-F) Glucose Medium",
        type: "Metabolic Diagnostic",
        isCorrect: true,
        description: "Semi-solid tube media testing whether glucose is metabolized oxidatively (open tube yellow only) or fermentatively (both open and sealed oil tubes yellow).",
        rationale: "Directly distinguishes oxidative aerobic respiration from fermentative catabolism."
      },
      {
        id: "nutrient-agar",
        name: "Standard Nutrient Agar",
        type: "General-Purpose",
        isCorrect: false,
        description: "General growth agar.",
        rationale: "Contains no pH indicators or oxygen-exclusion controls to measure metabolic pathways."
      }
    ],
    streakingGuide: {
      recommendedPattern: "zigzag",
      instructions: "Perform stab-and-streak inoculation into the O-F diagnostic media to compare open aerobic vs sealed mineral oil conditions."
    },
    incubation: {
      temperature: "35°C",
      duration: "24-48 hours (simulated 3s)",
      conditions: "Paired aerobic and sealed anaerobic test"
    },
    colonyMorphologies: [
      {
        id: "morph-4-Oxidative",
        label: "Oxidative Gram-Negative Soil Isolate (Pseudomonas-type)",
        count: "Surface growth in aerobic tube; no growth in sealed tube",
        form: "Irregular / Spreading",
        margin: "Undulate",
        elevation: "Flat",
        size: "3.0 mm",
        pigmentation: "Fluorescent greenish-yellow (pyoverdine pigment)",
        surface: "Smooth / Glistening",
        opacity: "Translucent",
        visualColor: "#A3E635",
        texture: "Slimy",
        definitions: {
          form: "Spreading: non-discrete boundary.",
          margin: "Undulate: wavy edge.",
          elevation: "Flat: minimal elevation."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-met-1",
        title: "Strictly Oxidative Aerobe Utilizing the Entner–Doudoroff Pathway (e.g. Pseudomonas-like)",
        status: "best-supported",
        reasoning: "Acid production (yellow bromothymol blue) occurred strictly in the open aerobic tube, with no reaction under anaerobic oil. Combined with oxidase positivity and pyoverdine pigment, this points to an oxidative aerobe that catabolizes glucose via the Entner–Doudoroff pathway.",
        feedback: "Masterful metabolic analysis! You correlated the O-F test results (oxidative only) with pigment clues and recognized the role of the Entner–Doudoroff pathway in Gram-negative oxidative bacteria."
      },
      {
        id: "cand-met-2",
        title: "Obligate Fermenter (e.g. Lactic Acid Bacterium)",
        status: "contradicted",
        reasoning: "Obligate fermenters produce acid throughout both aerobic and sealed anaerobic tubes without requiring oxygen, which contradicts the open-tube-only acidification observed here.",
        feedback: "Contradicted by data. A fermentative organism turns both open and closed tubes yellow. Here, acid only formed at the aerobic surface."
      },
      {
        id: "cand-met-3",
        title: "Strict Anaerobic Methanogen",
        status: "contradicted",
        reasoning: "Strict methanogens are killed by oxygen exposure and cannot grow at the aerobic surface of open culture tubes.",
        feedback: "Incorrect. Strict methanogens cannot tolerate oxygen, yet this isolate grew specifically where atmospheric oxygen was highest."
      }
    ],
    reflectionPrompt: "How does the net ATP yield of the Entner–Doudoroff pathway (1 ATP per glucose) compare to classical Embden–Meyerhof–Parnas glycolysis (2 ATP)?"
  },

  {
    id: "mission-5",
    number: "5",
    title: "Genetic Exchange: How Traits Move",
    topic: "Horizontal Gene Transfer: Transformation, Conjugation & Transduction",
    syllabusUnit: "unit-4",
    unitCode: "Unit IV",
    difficulty: "Intermediate-Advanced",
    estimatedTime: "8 mins",
    prerequisite: "mission-4",
    objective: "Analyze mechanisms of horizontal gene transfer (HGT), distinguish conjugative plasmids from transposons, and evaluate how antibiotic resistance traits disseminate.",
    briefing: "Bacteria do not reproduce sexually, yet they share genes with astonishing speed. Through transformation (naked DNA uptake), conjugation (pilus-mediated plasmid bridge), and transduction (bacteriophage delivery), bacteria acquire novel metabolic traits and antibiotic resistances. Transposons facilitate this by hopping between chromosomal and plasmid DNA.",
    habitat: {
      id: "hospital-effluent",
      name: "Wastewater Treatment Plant Inflow",
      type: "Engineered Environment",
      description: "Municipal wastewater carrying mixed bacteria and sub-inhibitory antimicrobial residues that select for horizontal gene transfer.",
      ecologicalFactors: ["High cell density promoting cell-to-cell contact", "Diverse plasmid pool", "Selective pressure from trace antibiotics"],
      hotspots: [
        { id: "biofilm-sludge", name: "Activated Sludge Flocs", x: 50, y: 65, permitted: true, hint: "Dense microbial flocs where conjugation frequency is highest" },
        { id: "chlorine-tank", name: "Post-Chlorination Effluent", x: 80, y: 30, permitted: false, reason: "Chlorine kills viable conjugative pairs." }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-006",
      locationName: "Activated Sludge Flocs",
      fieldNotes: "Flocculent bacterial aggregates with high plasmid transfer potential. Trace ampicillin and tetracycline detected."
    },
    mediaOptions: [
      {
        id: "dual-antibiotic-agar",
        name: "Luria-Bertani (LB) Agar + Ampicillin & Tetracycline",
        type: "Dual-Selective",
        isCorrect: true,
        description: "Supplements both ampicillin and tetracycline; only recombinant transconjugants inheriting both resistance markers can grow.",
        rationale: "Specifically selects for successful horizontal gene transfer events where an R-plasmid has been transferred."
      },
      {
        id: "plain-lb-agar",
        name: "Standard LB Agar (No Antibiotics)",
        type: "Non-Selective",
        isCorrect: false,
        description: "Permits growth of both donor and recipient parental strains.",
        rationale: "Fails to differentiate recombinant transconjugants from the billions of non-recombinant parental cells."
      }
    ],
    streakingGuide: {
      recommendedPattern: "quadrant",
      instructions: "Streak the mating mixture onto dual-antibiotic selective plates. Only cells that successfully underwent horizontal gene transfer will form colonies in the dilution sectors."
    },
    incubation: {
      temperature: "37°C",
      duration: "24 hours (simulated 3s)",
      conditions: "Standard incubation"
    },
    colonyMorphologies: [
      {
        id: "morph-5-Transconjugant",
        label: "Transconjugant Recombinant Colony",
        count: "Discrete colonies in Q3 and Q4",
        form: "Circular",
        margin: "Entire",
        elevation: "Convex",
        size: "2.0 mm",
        pigmentation: "Cream / White",
        surface: "Smooth / Glistening",
        opacity: "Opaque",
        visualColor: "#F8FAFC",
        texture: "Butyrous",
        definitions: {
          form: "Circular: round outline.",
          margin: "Entire: smooth edge.",
          elevation: "Convex: dome."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-gen-1",
        title: "Conjugative Transfer of a Multi-Resistance R-Plasmid Mobilized by a Transposon",
        status: "best-supported",
        reasoning: "DNase treatment did not halt gene transfer (ruling out naked DNA transformation), and no bacteriophage plaques were present (ruling out transduction). Physical cell contact mediated plasmid transfer carrying the ampicillin/tetracycline resistance transposon.",
        feedback: "Exceptional genetic deduction! You ruled out transformation via DNase resistance and ruled out transduction via absence of phages, confirming pilus-mediated conjugation carrying a mobile transposon."
      },
      {
        id: "cand-gen-2",
        title: "Spontaneous Simultaneous Point Mutations in Both Resistance Genes",
        status: "statistically-improbable",
        reasoning: "The probability of two independent spontaneous resistance mutations occurring simultaneously in a single cell is negligible (~10^-14), whereas conjugative transfer occurs at frequencies of 10^-3 to 10^-6.",
        feedback: "Scientifically unsupportable. Simultaneous dual spontaneous mutations are astronomically rare; high-frequency acquisition of dual resistance in dense flocs is driven by horizontal gene transfer."
      },
      {
        id: "cand-gen-3",
        title: "Naked DNA Transformation Dependent on Environmental Competence",
        status: "contradicted",
        reasoning: "Transformation is completely abolished by adding extracellular DNase I enzyme, yet this transfer occurred unimpeded in the presence of DNase.",
        feedback: "Contradicted by experimental controls: DNase eliminates naked transforming DNA. The transfer persisted, verifying cell-to-cell conjugation."
      }
    ],
    reflectionPrompt: "What is the structural difference between a conjugative plasmid and a transposable element (transposon)?"
  },

  {
    id: "mission-6",
    number: "6",
    title: "Contamination Control: Sterilization and Disinfection",
    topic: "Autoclaving, Sporicidal Action & Aseptic Laboratory Technique",
    syllabusUnit: "unit-6",
    unitCode: "Unit VI",
    difficulty: "Intermediate",
    estimatedTime: "6 mins",
    prerequisite: "mission-5",
    objective: "Master the critical distinctions between sterilization, disinfection, and antisepsis, and evaluate the sporicidal efficacy of steam heat under pressure.",
    briefing: "In the microbiology laboratory, precision depends on pure cultures. A single contaminant can ruin an investigation. But do disinfectants truly sterilize? In this mission, an agar batch is suspected of harboring heat-resistant bacterial endospores. You must investigate the outcome of boiling vs pressurized autoclaving.",
    habitat: {
      id: "lab-bench-surface",
      name: "Microbiology Prep Laboratory Bench",
      type: "Laboratory Environment",
      description: "Laboratory workbench used for preparing media, showing both chemical-disinfected surfaces and autoclaved glassware.",
      ecologicalFactors: ["Airborne dust carrying bacterial endospores", "Disinfected surface carrying chemical residues", "Aseptic Bunsen burner cone"],
      hotspots: [
        { id: "unautoclaved-flask", name: "Boiled (Unautoclaved) Media Flask", x: 35, y: 55, permitted: true, hint: "Media boiled to 100°C but not pressurized" },
        { id: "autoclaved-flask", name: "Autoclaved Media Flask (121°C, 15 psi)", x: 65, y: 55, permitted: true, hint: "Properly autoclaved control media" },
        { id: "bench-edge", name: "Floor Dust Spill", x: 85, y: 85, permitted: false, reason: "Focus on media sterilization comparison, not floor dust." }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-007",
      locationName: "Boiled (Unautoclaved) Media Flask",
      fieldNotes: "Liquid agar heated to 100°C for 20 minutes in open water bath, then poured into Petri dish without pressure autoclaving."
    },
    mediaOptions: [
      {
        id: "nutrient-agar-boiled",
        name: "Boiled-Only Nutrient Agar Plate (100°C)",
        type: "Sub-sterilized Test Medium",
        isCorrect: true,
        description: "Media brought to boiling point (100°C) without autoclave pressure. Kills vegetative cells but spares bacterial endospores.",
        rationale: "Tests whether atmospheric boiling achieves true sterilization against endospore-forming bacteria."
      },
      {
        id: "autoclaved-control",
        name: "Properly Autoclaved Media (121°C, 15 psi, 20 min)",
        type: "Sterilized Control",
        isCorrect: false,
        description: "True sterilization benchmark.",
        rationale: "Serves as negative control where zero growth should occur."
      }
    ],
    streakingGuide: {
      recommendedPattern: "quadrant",
      instructions: "No streaking required; uninoculated plate incubated to test for endogenous spore germination."
    },
    incubation: {
      temperature: "37°C",
      duration: "48 hours (simulated 3s)",
      conditions: "Standard incubation of uninoculated media"
    },
    colonyMorphologies: [
      {
        id: "morph-6-Endospore",
        label: "Spore-Forming Contaminant (Bacillus-type)",
        count: "Spontaneous colonial growth across uninoculated plate",
        form: "Irregular / Spreading",
        margin: "Lobate / Undulate",
        elevation: "Flat to slightly raised",
        size: "6.0 mm",
        pigmentation: "Dull chalky cream",
        surface: "Wrinkled / Dry",
        opacity: "Opaque",
        visualColor: "#E2E8F0",
        texture: "Dry, membranous",
        definitions: {
          form: "Irregular: spreading dendritic form.",
          margin: "Lobate: deeply indented, lobe-like edge.",
          elevation: "Flat: spreading surface growth."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-ctrl-1",
        title: "Atmospheric Boiling Failed to Sterilize; Bacterial Endospores Survived and Germinated",
        status: "best-supported",
        reasoning: "Boiling at 100°C destroys vegetative cells but does not destroy bacterial endospores (such as those of Bacillus and Clostridium), which require steam under pressure at 121°C for at least 15 minutes to guarantee sterilization.",
        feedback: "Spot on! You articulated the fundamental difference between disinfection/boiling (which kills vegetative cells) and true sterilization (which eradicates endospores via autoclaving)."
      },
      {
        id: "cand-ctrl-2",
        title: "Boiling at 100°C is Equivalent to Autoclaving and Guarantees Absolute Sterilization",
        status: "contradicted",
        reasoning: "The uninoculated boiled plate displayed robust bacterial growth, proving that boiling alone is insufficient for sterilization.",
        feedback: "Dangerous misconception! Atmospheric boiling at 100°C is a disinfection procedure, NOT sterilization. Bacterial endospores survive boiling water for hours."
      },
      {
        id: "cand-ctrl-3",
        title: "The Growth is Due to Spontaneous Generation of Microbes from Pure Agar Gelatin",
        status: "disproven-historical",
        reasoning: "Louis Pasteur and John Tyndall permanently disproved spontaneous generation; growth originates exclusively from pre-existing endospores that survived inadequate heat treatment.",
        feedback: "Historically disproven! Louis Pasteur's swan-neck flask experiments demonstrated that microbes do not arise spontaneously; they originate from pre-existing resistant cells or spores."
      }
    ],
    reflectionPrompt: "Why does an autoclave require pressure (15 psi) in addition to steam heat to reach 121°C?"
  },

  {
    id: "mission-7",
    number: "7",
    title: "Microbes in Food and Industry",
    topic: "Lactic Fermentation, Industrial Metabolites & Contextual Roles",
    syllabusUnit: "unit-6",
    unitCode: "Units VI & III",
    difficulty: "Intermediate",
    estimatedTime: "7 mins",
    prerequisite: "mission-6",
    objective: "Examine how microbial metabolism is harnessed in food bioprocessing, contrast beneficial fermentations with spoilage, and analyze industrial scale-up principles.",
    briefing: "Microbes are the world's most versatile chemical engineers. In yogurt and cheese, lactic acid bacteria ferment lactose into lactic acid, dropping the pH and preserving milk proteins. In industrial bioreactors, microorganisms synthesize enzymes, vitamins, and therapeutic proteins. Context determines whether an organism is a beneficial agent or an undesirable contaminant.",
    habitat: {
      id: "dairy-fermenter",
      name: "Traditional Fermented Dairy Bioreactor",
      type: "Industrial / Food",
      description: "Artisanal dairy fermentation vat producing traditional probiotic yogurt.",
      ecologicalFactors: ["High lactose substrate", "Progressive lactic acidification (pH drops to ~4.2)", "Microaerophilic to anaerobic conditions"],
      hotspots: [
        { id: "curd-sample", name: "Fermented Milk Curd", x: 45, y: 50, permitted: true, hint: "Thickened probiotic curd matrix" },
        { id: "air-vent", name: "Ventilation Exhaust", x: 80, y: 20, permitted: false, reason: "Focus on the active fermented curd." }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-008",
      locationName: "Fermented Milk Curd",
      fieldNotes: "Pleasant tangy acid aroma. pH measured at 4.3. Smooth, creamy coagulated protein matrix."
    },
    mediaOptions: [
      {
        id: "mrs-agar",
        name: "de Man, Rogosa and Sharpe (MRS) Agar",
        type: "Selective & Enriched for Lactic Acid Bacteria",
        isCorrect: true,
        description: "Specialized medium formulated with sodium acetate, polysorbate 80, and manganese to enrich and isolate Lactobacilli.",
        rationale: "Gold standard selective medium for isolating lactic acid bacteria from food and dairy products."
      },
      {
        id: "nutrient-agar",
        name: "Standard Nutrient Agar",
        type: "General-Purpose",
        isCorrect: false,
        description: "General broth agar.",
        rationale: "Lacks the specific nutrients and acetate buffering required by fastidious lactic acid bacteria."
      }
    ],
    streakingGuide: {
      recommendedPattern: "quadrant",
      instructions: "Streak the curd suspension across four quadrants of MRS agar. Incubate under microaerophilic conditions."
    },
    incubation: {
      temperature: "37°C",
      duration: "48 hours (simulated 3s)",
      conditions: "Microaerophilic (5% CO2)"
    },
    colonyMorphologies: [
      {
        id: "morph-7-Lacto",
        label: "Lactic Acid Bacterium (Lactobacillus-type)",
        count: "Abundant uniform colonies in Q3/Q4",
        form: "Circular / Punctiform",
        margin: "Entire",
        elevation: "Convex",
        size: "1.2 mm",
        pigmentation: "Creamy white",
        surface: "Smooth / Glistening",
        opacity: "Opaque",
        visualColor: "#FEF3C7",
        texture: "Homogeneous, soft",
        definitions: {
          form: "Punctiform/Circular: small compact pinpoint colonies.",
          margin: "Entire: smooth circular edge.",
          elevation: "Convex: rounded dome."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-food-1",
        title: "Beneficial Starter Culture: Lactic Acid Bacteria (Lactobacillus bulgaricus / Streptococcus thermophilus)",
        status: "best-supported",
        reasoning: "The uniform pinpoint cream colonies grown on MRS agar from an acidic, pleasant-tasting curd matrix represent beneficial lactic acid fermenters whose acid production curdles casein and suppresses food-borne pathogens.",
        feedback: "Superb food microbiology synthesis! You recognized that the presence of microbes in food is intentionally beneficial here, lowering pH to preserve dairy proteins through homolactic or heterolactic fermentation."
      },
      {
        id: "cand-food-2",
        title: "Pathogenic Food Spoilage Contamination That Must Be Discarded",
        status: "contradicted",
        reasoning: "The pH drop, texture coagulation, pleasant aroma, and pure lactic culture on MRS confirm a deliberate, controlled dairy fermentation rather than accidental putrefactive spoilage.",
        feedback: "Incorrect context interpretation. In fermented dairy products, lactic acid bacteria are intentionally cultured to preserve the product and produce desirable textures and flavors."
      },
      {
        id: "cand-food-3",
        title: "Gas-Producing Clostridium botulinum Anaerobic Contamination",
        status: "contradicted",
        reasoning: "C. botulinum does not grow at pH below 4.6, and no gas distension, putrid odor, or spore swelling occurred.",
        feedback: "Contradicted by data. The pH is 4.3 (inhibiting botulinum germination) and the colonies are classic lactic acid bacteria on MRS agar."
      }
    ],
    reflectionPrompt: "How does the drop in pH generated by lactic acid bacteria help prevent the growth of harmful food-borne pathogens in yogurt and cheese?"
  },

  {
    id: "mission-8",
    number: "8",
    title: "Antimicrobial Resistance: Interpreting the Evidence",
    topic: "Kirby–Bauer Disk Diffusion, CLSI Breakpoints & Stewardship",
    syllabusUnit: "unit-6",
    unitCode: "Units VI & I",
    difficulty: "Advanced",
    estimatedTime: "8 mins",
    prerequisite: "mission-7",
    objective: "Interpret a standardized Kirby–Bauer disk diffusion antimicrobial susceptibility test, measure zones of inhibition, classify clinical breakpoints, and understand antibiotic stewardship.",
    briefing: "Antimicrobial resistance (AMR) is one of the greatest global public health challenges. The Kirby–Bauer disk diffusion assay tests whether an isolated bacterial pathogen is Susceptible (S), Intermediate (I), or Resistant (R) to specific antibiotics. Remember: zone diameter in millimeters must be compared against standardized CLSI charts, not judged simply by eye.",
    habitat: {
      id: "clinical-effluent",
      name: "Clinical Surveillance Swab",
      type: "Clinical Microbiology",
      description: "Surveillance isolate from an environmental healthcare setting undergoing susceptibility profiling.",
      ecologicalFactors: ["Selective pressure from hospital antiseptic and antibiotic use", "High frequency of beta-lactamase producers", "Crucial public health tracking"],
      hotspots: [
        { id: "isolate-swab", name: "Surveillance Culture Plate", x: 50, y: 50, permitted: true, hint: "Pure isolated colony picked for Kirby-Bauer lawn" }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-009",
      locationName: "Surveillance Culture Plate",
      fieldNotes: "Pure Gram-negative rod standardized to 0.5 McFarland turbidity for confluent lawn inoculation."
    },
    mediaOptions: [
      {
        id: "mueller-hinton-agar",
        name: "Mueller–Hinton Agar (MHA)",
        type: "Standardized Susceptibility Medium",
        isCorrect: true,
        description: "Standardized depth (4 mm), loose agar concentration (permitting consistent antibiotic diffusion), and neutral pH (7.2-7.4) required for Kirby-Bauer testing.",
        rationale: "Globally mandated standard medium for all CLSI and EUCAST disk diffusion susceptibility assays."
      },
      {
        id: "nutrient-agar",
        name: "Nutrient Agar",
        type: "Non-standardized",
        isCorrect: false,
        description: "General growth agar.",
        rationale: "Variable divalent cation concentrations (Ca2+, Mg2+) and inconsistent diffusion rates yield clinically invalid zone diameters."
      }
    ],
    streakingGuide: {
      recommendedPattern: "lawn",
      instructions: "Perform a 3-way confluent cotton swab lawn across the entire agar plate to create a uniform bacterial carpet before applying antibiotic disks."
    },
    incubation: {
      temperature: "35°C",
      duration: "16-18 hours (simulated 3s)",
      conditions: "Aerobic standard incubation"
    },
    kirbyBauerResults: [
      { antibiotic: "Ampicillin (AMP 10µg)", zoneMm: 8, clsiThresholds: { R: "≤13mm", I: "14-16mm", S: "≥17mm" }, interpretation: "Resistant (R)" },
      { antibiotic: "Ciprofloxacin (CIP 5µg)", zoneMm: 28, clsiThresholds: { R: "≤15mm", I: "16-20mm", S: "≥21mm" }, interpretation: "Susceptible (S)" },
      { antibiotic: "Gentamicin (GEN 10µg)", zoneMm: 14, clsiThresholds: { R: "≤12mm", I: "13-14mm", S: "≥15mm" }, interpretation: "Intermediate (I)" }
    ],
    colonyMorphologies: [
      {
        id: "morph-8-Lawn",
        label: "Kirby-Bauer Mueller-Hinton Susceptibility Plate",
        count: "Confluent bacterial lawn with antibiotic disks",
        form: "Confluent Lawn",
        margin: "Uniform carpet",
        elevation: "Flat",
        size: "Complete plate coverage",
        pigmentation: "Translucent grey lawn",
        surface: "Smooth lawn",
        opacity: "Translucent",
        visualColor: "#E2E8F0",
        texture: "Confluent carpet",
        definitions: {
          form: "Confluent lawn: dense, uniform bacterial layer covering the plate.",
          margin: "Zone of Inhibition: circular clear halo surrounding an antibiotic disk where growth is inhibited.",
          elevation: "Flat standardized 4mm agar depth."
        }
      }
    ],
    evidenceOptions: [
      {
        id: "cand-amr-1",
        title: "Isolate is Ampicillin-Resistant (R), Gentamicin-Intermediate (I), and Ciprofloxacin-Susceptible (S)",
        status: "best-supported",
        reasoning: "Measuring the clear zone diameters against standard CLSI clinical breakpoints confirms: Ampicillin zone (8 mm ≤ 13 mm) indicates Resistance (R); Gentamicin (14 mm) falls into the Intermediate range (13-14 mm); Ciprofloxacin (28 mm ≥ 21 mm) demonstrates clear Susceptibility (S).",
        feedback: "Flawless interpretation of antimicrobial susceptibility data! You correctly applied standardized CLSI clinical interpretive criteria rather than assuming that any visible halo equals clinical efficacy."
      },
      {
        id: "cand-amr-2",
        title: "Isolate is Susceptible to All Three Antibiotics Because Halos are Visible Around Disks",
        status: "contradicted",
        reasoning: "The 8 mm zone around Ampicillin equals the disk diameter plus minimal edge effect, which is classified as clinically Resistant (R) under standard CLSI guidelines.",
        feedback: "Dangerous clinical misinterpretation! A tiny halo does NOT mean susceptibility. Antimicrobial activity must exceed established CLSI breakpoint diameters to be categorized as Susceptible."
      },
      {
        id: "cand-amr-3",
        title: "All Antibiotics Are Ineffective Because the Bacterial Lawn is Visible",
        status: "contradicted",
        reasoning: "The extensive 28 mm clear zone surrounding Ciprofloxacin proves profound susceptibility and inhibition of bacterial growth.",
        feedback: "Incorrect. The vast 28 mm zone of inhibition around Ciprofloxacin demonstrates high antibiotic sensitivity."
      }
    ],
    reflectionPrompt: "Why does an 'Intermediate' susceptibility result prompt a clinician to either avoid that drug or consider increasing the dosage if toxicological limits allow?"
  },

  {
    id: "mission-dossier",
    number: "★",
    title: "Final Integrative Mission: The Evidence Dossier",
    topic: "Comprehensive Synthesis: Habitat, Media, Morphology, Staining & Uncertainty",
    syllabusUnit: "unit-dossier",
    unitCode: "Comprehensive Units I-VI",
    difficulty: "Expert",
    estimatedTime: "10 mins",
    prerequisite: "mission-8",
    objective: "Synthesize all six units of the microbiology syllabus: integrate environmental origin, selective media performance, colony morphology, Gram stain microscopy, and metabolic clues into a rigorous, evidence-based Dossier distinguishing direct observations from warranted interpretations and remaining uncertainties.",
    briefing: "Welcome to your capstone investigation as a biotechnology researcher! An unknown environmental isolate has been recovered from an active soil bio-remediation site. You must assemble all evidence—environmental provenance, selective growth media, colony morphology, Gram reaction, and bioenergetics—to construct a defensible scientific Dossier.",
    habitat: {
      id: "bioremediation-site",
      name: "Hydrocarbon-Contaminated Soil Remediation Plot",
      type: "Terrestrial / Environmental Remediation",
      description: "Industrial soil plot undergoing bio-augmentation to degrade diesel hydrocarbons.",
      ecologicalFactors: ["High petroleum hydrocarbons", "Aerated windrow composting", "Selection for catabolically versatile bacteria"],
      hotspots: [
        { id: "rhizo-hydrocarbon", name: "Soil Micro-Niche near Root-Hydrocarbon Interface", x: 48, y: 58, permitted: true, hint: "Soil actively breaking down petroleum compounds" }
      ]
    },
    sampleDefaults: {
      idPrefix: "STK-DOSSIER",
      locationName: "Soil Micro-Niche near Root-Hydrocarbon Interface",
      fieldNotes: "Dark hydrocarbon-scented soil core. Shows active microbial respiration in preliminary respirometry assays."
    },
    mediaOptions: [
      {
        id: "pseudomonas-isolation-agar",
        name: "Pseudomonas Isolation Agar (PIA)",
        type: "Selective & Differential",
        isCorrect: true,
        description: "Contains Irgasan (triclosan) to inhibit other Gram-negatives and Gram-positives, with magnesium and potassium salts to stimulate pyocyanin and pyoverdine pigment production.",
        rationale: "Tailored to isolate catabolically versatile pseudomonads and related hydrocarbon degraders."
      },
      {
        id: "sabouraud-agar",
        name: "Sabouraud Dextrose Agar",
        type: "Fungal Medium",
        isCorrect: false,
        description: "Acidic fungal agar.",
        rationale: "Our objective targets bacterial hydrocarbon degradation pathways, not fungal molds."
      }
    ],
    streakingGuide: {
      recommendedPattern: "quadrant",
      instructions: "Perform an immaculate 4-quadrant dilution streak to achieve well-isolated single colonies for multi-parameter morphology and evidence recording."
    },
    incubation: {
      temperature: "30°C",
      duration: "48 hours (simulated 3s)",
      conditions: "Aerobic incubation at environmental bioremediation temperature"
    },
    colonyMorphologies: [
      {
        id: "morph-dossier-A",
        label: "Hydrocarbon-Degrading Isolate (Target Isolate)",
        count: "Isolated single colonies in Q4",
        form: "Circular to slightly irregular",
        margin: "Entire to slightly undulate",
        elevation: "Convex",
        size: "3.5 mm",
        pigmentation: "Blue-green pigment diffusing into agar (pyocyanin) with yellow fluorescence under UV (pyoverdine)",
        surface: "Glistening / Smooth / Mucoid",
        opacity: "Translucent with metallic sheen",
        visualColor: "#06B6D4",
        texture: "Viscous",
        definitions: {
          form: "Circular to irregular: dynamic colonial expansion.",
          margin: "Entire to undulate: smooth with slight wave.",
          elevation: "Convex: pronounced dome profile."
        }
      }
    ],
    auxiliaryClues: {
      gramStain: "Gram-negative, straight to slightly curved rods, non-spore forming",
      oxidaseReaction: "Positive (rapid deep purple with tetramethyl-p-phenylenediamine)",
      catalaseReaction: "Positive (vigorous effervescence with 3% H2O2)",
      metabolism: "Obligate aerobe; utilizes Entner–Doudoroff pathway for glucose; incapable of fermentation; oxidizes aliphatic hydrocarbons"
    },
    evidenceOptions: [
      {
        id: "cand-dos-1",
        title: "Presumptive Pseudomonas aeruginosa / Pseudomonas group member (Aerobic, Gram-negative, Oxidase-positive, Pyocyanin producer) — Definitive species identification pending 16S rRNA gene sequencing",
        status: "best-supported",
        reasoning: "The synthesis of evidence is compelling: Gram-negative rod, oxidase-positive, obligate aerobe, growing on PIA with blue-green diffusible pyocyanin pigment and yellow-green fluorescent pyoverdine, catabolizing glucose via the Entner–Doudoroff pathway. Crucially, the dossier appropriately acknowledges that 16S rRNA gene sequencing or MALDI-TOF mass spectrometry is required to definitively distinguish P. aeruginosa from related pseudomonads.",
        feedback: "Exemplary scientific dossier! You synthesized cellular traits, selective growth, colony pigmentation, enzymatic tests, and metabolic pathways, while exhibiting the maturity of a true scientist by stating the appropriate boundaries of uncertainty."
      },
      {
        id: "cand-dos-2",
        title: "Definitive 100% Proven Species Identity: Pseudomonas putida (No further testing needed)",
        status: "unwarranted-inference",
        reasoning: "Pseudomonas putida does NOT produce blue-green pyocyanin (pyocyanin is characteristic of P. aeruginosa), and claiming 100% species certainty from phenotypic traits alone violates sound microbiology practice.",
        feedback: "Unwarranted certainty! P. putida does not typically synthesize pyocyanin, and claiming 100% species identification without genomic or mass spectrometry verification is scientifically unsound."
      },
      {
        id: "cand-dos-3",
        title: "Eukaryotic Filamentous Yeast (Saccharomyces cerevisiae)",
        status: "contradicted",
        reasoning: "S. cerevisiae is an oval eukaryotic budding yeast with a chitin cell wall, Gram-positive staining reaction, fermentative metabolism, and no pyocyanin pigment production.",
        feedback: "Completely contradicted. The isolate is a Gram-negative prokaryotic rod, oxidase positive, and an obligate aerobe; it bears no resemblance to eukaryotic yeast."
      }
    ],
    reflectionPrompt: "Why does genuine scientific integrity require a researcher to explicitly document limitations and uncertainty in their final laboratory report?"
  }
];
