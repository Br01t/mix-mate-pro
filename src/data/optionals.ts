import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ShieldCheck,
  Database,
  Flame,
  Wifi,
  Sparkles,
  Droplets,
  Wrench,
} from "lucide-react";

export type Bi = { it: string; en: string };

export type Optional = {
  id: string;
  name: Bi;
  description: Bi;
  price: number;
  icon: LucideIcon;
};

export const optionals: Optional[] = [
  {
    id: "sensors",
    icon: Activity,
    price: 2500,
    name: { it: "Pacchetto sensori avanzati", en: "Advanced Sensors Pack" },
    description: {
      it: "Monitoraggio inline di viscosità, temperatura e granulometria.",
      en: "Inline viscosity, temperature & particle-size monitoring.",
    },
  },
  {
    id: "warranty",
    icon: ShieldCheck,
    price: 1200,
    name: { it: "Garanzia estesa (5 anni)", en: "Extended Warranty (5 years)" },
    description: {
      it: "Ricambi, manodopera e diagnostica remota per 5 anni.",
      en: "Parts, labor and remote diagnostics for 5 years.",
    },
  },
  {
    id: "tank",
    icon: Database,
    price: 4000,
    name: { it: "Upgrade serbatoio alta capacità", en: "High-Capacity Tank Upgrade" },
    description: {
      it: "+40% di capacità volumetrica con camicia rinforzata.",
      en: "Adds 40% volumetric capacity with reinforced jacket.",
    },
  },
  {
    id: "atex",
    icon: Flame,
    price: 5500,
    name: { it: "Certificazione antideflagrante", en: "Explosion-Proof Certification" },
    description: {
      it: "Pacchetto elettrico conforme ATEX Zona 1 / IECEx.",
      en: "ATEX Zone 1 / IECEx compliant electrical package.",
    },
  },
  {
    id: "iot",
    icon: Wifi,
    price: 3200,
    name: { it: "Monitoraggio remoto (IoT)", en: "Remote Monitoring (IoT)" },
    description: {
      it: "Telemetria cloud, alert e dashboard OEE.",
      en: "Cloud telemetry, alerting and OEE dashboard.",
    },
  },
  {
    id: "stainless",
    icon: Sparkles,
    price: 6800,
    name: { it: "Upgrade acciaio inox 316L", en: "316L Stainless Steel Upgrade" },
    description: {
      it: "Superfici a contatto in 316L, finitura elettro-lucidata.",
      en: "Full 316L contact surfaces, electro-polished finish.",
    },
  },
  {
    id: "cip",
    icon: Droplets,
    price: 4500,
    name: { it: "Pulizia automatizzata CIP", en: "Automated CIP Cleaning" },
    description: {
      it: "Loop clean-in-place integrato con gestione ricette.",
      en: "Integrated clean-in-place loop with recipe control.",
    },
  },
  {
    id: "install",
    icon: Wrench,
    price: 3900,
    name: { it: "Installazione e training in loco", en: "On-site Installation & Training" },
    description: {
      it: "Messa in servizio guidata da un ingegnere e training operatori.",
      en: "Engineer-led commissioning and operator training program.",
    },
  },
];
