import { FlaskConical, Beaker, Sparkles, Factory, Fuel, HardHat, type LucideIcon } from "lucide-react";

export type IndustryId = "pharma" | "cosm" | "food" | "chem" | "petro" | "constr";

export type Industry = {
  id: IndustryId;
  icon: LucideIcon;
  label: { it: string; en: string };
  desc: { it: string; en: string };
};

export const industries: Industry[] = [
  {
    id: "pharma",
    icon: FlaskConical,
    label: { it: "Farmaceutico", en: "Pharmaceutical" },
    desc: {
      it: "Workflow sterili, formulazione API, conformità FDA ed EHEDG.",
      en: "Sterile workflows, API formulation, FDA and EHEDG compliance.",
    },
  },
  {
    id: "cosm",
    icon: Beaker,
    label: { it: "Cosmetica", en: "Cosmetics" },
    desc: {
      it: "Gommosi, creme, gel ed emulsioni ad alta viscosità.",
      en: "High-viscosity creams, gels, lotions and emulsions.",
    },
  },
  {
    id: "food",
    icon: Sparkles,
    label: { it: "Food & Beverage", en: "Food & Beverage" },
    desc: {
      it: "Salse, latticini, e pulizia CIP/SIP ad alta frequenza.",
      en: "Sauces, dairy, and high-frequency CIP/SIP cleaning.",
    },
  },
  {
    id: "chem",
    icon: Factory,
    label: { it: "Chimico", en: "Chemicals" },
    desc: {
      it: "Miscelazione reattiva, catalizzatori e dispersione polimeri.",
      en: "Reactive mixing, catalysts and polymer dispersion.",
    },
  },
  {
    id: "petro",
    icon: Fuel,
    label: { it: "Petrolchimico", en: "Petrochemical" },
    desc: {
      it: "Miscelazione solventi, atmosfere volatili ed ATEX Zona 1.",
      en: "Solvent blending, volatile environments, ATEX Zone 1.",
    },
  },
  {
    id: "constr",
    icon: HardHat,
    label: { it: "Edilizia", en: "Construction" },
    desc: {
      it: "Slurry abrasive, malte e cementi con elevata coppia motrice.",
      en: "Abrasive slurries, mortars and cements with high drive train.",
    },
  },
];

export const CAPACITY_OPTIONS = [
  { id: "small", label: { it: "Lab (<100 L)", en: "Lab (<100 L)" } },
  { id: "medium", label: { it: "Pilota (100-1k L)", en: "Pilot (100-1k L)" } },
  { id: "large", label: { it: "Produzione (>1k L)", en: "Plant (>1k L)" } },
] as const;

export const VISCOSITY_OPTIONS = [
  { id: "low", label: { it: "Bassa (<10k cP)", en: "Low (<10k cP)" } },
  { id: "medium", label: { it: "Media (10k-100k)", en: "Mid (10k-100k)" } },
  { id: "high", label: { it: "Alta (>100k cP)", en: "High (>100k cP)" } },
] as const;
