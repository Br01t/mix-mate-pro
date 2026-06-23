import mixerLab from "@/assets/mixer-lab.jpg";
import mixerMid from "@/assets/mixer-mid.jpg";
import mixerLarge from "@/assets/mixer-large.jpg";
import mixerFlagship from "@/assets/mixer-flagship.jpg";

export type Bi = { it: string; en: string };
export type ModelCategory = "lab" | "pilot" | "production" | "heavy" | "flagship";

export type Model = {
  id: string;
  name: string;
  category: ModelCategory;
  tagline: Bi;
  description: Bi;
  basePrice: number;
  capacity: string;
  industry: Bi;
  image: string;
};

export const models: Model[] = [
  {
    id: "alpha",
    name: "Model Alpha",
    category: "lab",
    tagline: { it: "Entry-level", en: "Entry-class" },
    description: {
      it: "Mixer compatto da laboratorio per R&D e batch pilota.",
      en: "Compact lab-scale mixer for R&D and pilot batches.",
    },
    basePrice: 32000,
    capacity: "50 L",
    industry: { it: "Lab / R&D", en: "Lab / R&D" },
    image: mixerLab,
  },
  {
    id: "beta",
    name: "Model Beta",
    category: "pilot",
    tagline: { it: "Linea pilota", en: "Pilot line" },
    description: {
      it: "Produzione di piccoli batch con pieno controllo ricette.",
      en: "Small-batch production with full recipe control.",
    },
    basePrice: 48000,
    capacity: "150 L",
    industry: { it: "Cosmetica", en: "Cosmetics" },
    image: mixerLab,
  },
  {
    id: "gamma",
    name: "Model Gamma",
    category: "production",
    tagline: { it: "Produzione leggera", en: "Light production" },
    description: {
      it: "Portata e ingombro bilanciati per impianti emergenti.",
      en: "Balanced throughput and footprint for emerging plants.",
    },
    basePrice: 55000,
    capacity: "300 L",
    industry: { it: "Food & Beverage", en: "Food & Beverage" },
    image: mixerMid,
  },
  {
    id: "delta",
    name: "Model Delta",
    category: "production",
    tagline: { it: "Produzione media", en: "Mid production" },
    description: {
      it: "Mixer per servizio continuo, linee industriali di fascia media.",
      en: "Continuous-duty mixer for mid-tier industrial lines.",
    },
    basePrice: 61000,
    capacity: "500 L",
    industry: { it: "Chimico", en: "Chemicals" },
    image: mixerMid,
  },
  {
    id: "epsilon",
    name: "Model Epsilon",
    category: "production",
    tagline: { it: "Alta precisione", en: "High precision" },
    description: {
      it: "Omogeneizzazione sub-micron per workflow farmaceutici.",
      en: "Sub-micron homogenization for pharma-grade workflows.",
    },
    basePrice: 72500,
    capacity: "500 L",
    industry: { it: "Farmaceutico", en: "Pharmaceutical" },
    image: mixerMid,
  },
  {
    id: "zeta",
    name: "Model Zeta",
    category: "production",
    tagline: { it: "Alta viscosità", en: "High viscosity" },
    description: {
      it: "Progettato per paste, gel e blend ad alta viscosità.",
      en: "Engineered for pastes, gels and high-viscosity blends.",
    },
    basePrice: 84000,
    capacity: "750 L",
    industry: { it: "Adesivi", en: "Adhesives" },
    image: mixerMid,
  },
  {
    id: "eta",
    name: "Model Eta",
    category: "heavy",
    tagline: { it: "Heavy duty", en: "Heavy duty" },
    description: {
      it: "Drive train rinforzato per materiali abrasivi.",
      en: "Reinforced drive train for abrasive material mixing.",
    },
    basePrice: 96000,
    capacity: "1.000 L",
    industry: { it: "Edilizia", en: "Construction" },
    image: mixerLarge,
  },
  {
    id: "theta",
    name: "Model Theta",
    category: "production",
    tagline: { it: "Sanitario", en: "Sanitary" },
    description: {
      it: "Costruzione sanitaria CIP/SIP ready con contatto FDA.",
      en: "CIP/SIP-ready sanitary build with FDA-compliant contact.",
    },
    basePrice: 110000,
    capacity: "1.200 L",
    industry: { it: "Food & Pharma", en: "Food & Pharma" },
    image: mixerMid,
  },
  {
    id: "iota",
    name: "Model Iota",
    category: "heavy",
    tagline: { it: "Atmosfere pericolose", en: "Hazardous duty" },
    description: {
      it: "Chassis ATEX per blending di solventi e sostanze volatili.",
      en: "ATEX-ready chassis for solvent and volatile blending.",
    },
    basePrice: 128000,
    capacity: "1.500 L",
    industry: { it: "Petrolchimico", en: "Petrochemical" },
    image: mixerLarge,
  },
  {
    id: "kappa",
    name: "Model Kappa",
    category: "heavy",
    tagline: { it: "Grande scala", en: "Large scale" },
    description: {
      it: "Mixer su scala di impianto con elettronica ridondata.",
      en: "Plant-scale mixer with redundant control electronics.",
    },
    basePrice: 152000,
    capacity: "2.500 L",
    industry: { it: "Chimico", en: "Chemicals" },
    image: mixerLarge,
  },
  {
    id: "mu",
    name: "Model Mu",
    category: "flagship",
    tagline: { it: "Flagship", en: "Flagship" },
    description: {
      it: "Top di gamma, configurazione twin-rotor brevettata.",
      en: "Top-of-line patented twin-rotor flagship configuration.",
    },
    basePrice: 185000,
    capacity: "5.000 L",
    industry: { it: "Industria pesante", en: "Heavy industry" },
    image: mixerFlagship,
  },
];
