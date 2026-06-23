export type Model = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  capacity: string;
  industry: string;
};

export const models: Model[] = [
  { id: "alpha",   name: "Model Alpha",   tagline: "Entry-class",      description: "Compact lab-scale mixer for R&D and pilot batches.",       basePrice: 32000,  capacity: "50 L",     industry: "Lab / R&D" },
  { id: "beta",    name: "Model Beta",    tagline: "Pilot line",       description: "Small-batch production with full recipe control.",         basePrice: 48000,  capacity: "150 L",    industry: "Cosmetics" },
  { id: "gamma",   name: "Model Gamma",   tagline: "Light production", description: "Balanced throughput and footprint for emerging plants.",   basePrice: 55000,  capacity: "300 L",    industry: "Food & Beverage" },
  { id: "delta",   name: "Model Delta",   tagline: "Mid production",   description: "Continuous-duty mixer for mid-tier industrial lines.",     basePrice: 61000,  capacity: "500 L",    industry: "Chemicals" },
  { id: "epsilon", name: "Model Epsilon", tagline: "High precision",   description: "Sub-micron homogenization for pharma-grade workflows.",    basePrice: 72500,  capacity: "500 L",    industry: "Pharmaceutical" },
  { id: "zeta",    name: "Model Zeta",    tagline: "High viscosity",   description: "Engineered for pastes, gels and high-viscosity blends.",   basePrice: 84000,  capacity: "750 L",    industry: "Adhesives" },
  { id: "eta",     name: "Model Eta",     tagline: "Heavy duty",       description: "Reinforced drive train for abrasive material mixing.",     basePrice: 96000,  capacity: "1,000 L",  industry: "Construction" },
  { id: "theta",   name: "Model Theta",   tagline: "Sanitary",         description: "CIP/SIP-ready sanitary build with FDA-compliant contact.", basePrice: 110000, capacity: "1,200 L",  industry: "Food & Pharma" },
  { id: "iota",    name: "Model Iota",    tagline: "Hazardous duty",   description: "ATEX-ready chassis for solvent and volatile blending.",    basePrice: 128000, capacity: "1,500 L",  industry: "Petrochemical" },
  { id: "kappa",   name: "Model Kappa",   tagline: "Large scale",      description: "Plant-scale mixer with redundant control electronics.",    basePrice: 152000, capacity: "2,500 L",  industry: "Chemicals" },
  { id: "mu",      name: "Model Mu",      tagline: "Flagship",         description: "Top-of-line patented twin-rotor flagship configuration.",  basePrice: 185000, capacity: "5,000 L",  industry: "Heavy industry" },
];
