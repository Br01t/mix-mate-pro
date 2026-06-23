export type Optional = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const optionals: Optional[] = [
  { id: "sensors",     name: "Advanced Sensors Pack",          description: "Inline viscosity, temperature & particle-size monitoring.", price: 2500 },
  { id: "warranty",    name: "Extended Warranty (5 years)",    description: "Parts, labor and remote diagnostics for 5 years.",          price: 1200 },
  { id: "tank",        name: "High-Capacity Tank Upgrade",     description: "Adds 40% volumetric capacity with reinforced jacket.",      price: 4000 },
  { id: "atex",        name: "Explosion-Proof Certification",  description: "ATEX Zone 1 / IECEx compliant electrical package.",         price: 5500 },
  { id: "iot",         name: "Remote Monitoring (IoT)",        description: "Cloud telemetry, alerting and OEE dashboard.",              price: 3200 },
  { id: "stainless",   name: "316L Stainless Steel Upgrade",   description: "Full 316L contact surfaces, electro-polished finish.",      price: 6800 },
  { id: "cip",         name: "Automated CIP Cleaning",         description: "Integrated clean-in-place loop with recipe control.",       price: 4500 },
  { id: "install",     name: "On-site Installation & Training",description: "Engineer-led commissioning and operator training program.", price: 3900 },
];
