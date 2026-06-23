import { jsPDF } from "jspdf";
import type { Model } from "@/data/models";
import type { Optional } from "@/data/optionals";
import { formatEUR } from "./format";
import type { Lang } from "@/i18n/translations";

export interface PDFQuoteContact {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes?: string;
}

// Map of detailed specifications for each model to include in the PDF
const detailedSpecs: Record<string, Record<Lang, Array<{ k: string; v: string }>>> = {
  alpha: {
    it: [
      { k: "Potenza Motore", v: "2.2 kW (Frequenza controllata)" },
      { k: "Dimensioni (LxPxA)", v: "850 x 600 x 1150 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L (Elettrolucidato)" },
      { k: "Classe di Pressione", v: "Atmosferica" },
      { k: "Velocità Rotore", v: "50 - 1500 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta singola a secco" },
    ],
    en: [
      { k: "Motor Power", v: "2.2 kW (Variable frequency drive)" },
      { k: "Dimensions (WxDxH)", v: "850 x 600 x 1150 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel (Electro-polished)" },
      { k: "Pressure Rating", v: "Atmospheric" },
      { k: "Rotor Speed", v: "50 - 1500 RPM" },
      { k: "Shaft Seals", v: "Single dry mechanical seal" },
    ],
  },
  beta: {
    it: [
      { k: "Potenza Motore", v: "4.0 kW (Frequenza controllata)" },
      { k: "Dimensioni (LxPxA)", v: "1100 x 800 x 1450 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L" },
      { k: "Classe di Pressione", v: "Fino a 1.5 bar" },
      { k: "Velocità Rotore", v: "40 - 1200 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta doppia Flussata" },
    ],
    en: [
      { k: "Motor Power", v: "4.0 kW (Variable frequency drive)" },
      { k: "Dimensions (WxDxH)", v: "1100 x 800 x 1450 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel" },
      { k: "Pressure Rating", v: "Up to 1.5 bar" },
      { k: "Rotor Speed", v: "40 - 1200 RPM" },
      { k: "Shaft Seals", v: "Double flushed mechanical seal" },
    ],
  },
  gamma: {
    it: [
      { k: "Potenza Motore", v: "7.5 kW" },
      { k: "Dimensioni (LxPxA)", v: "1350 x 950 x 1750 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L" },
      { k: "Classe di Pressione", v: "Fino a 3.0 bar" },
      { k: "Velocità Rotore", v: "30 - 1000 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta doppia Flussata" },
    ],
    en: [
      { k: "Motor Power", v: "7.5 kW" },
      { k: "Dimensions (WxDxH)", v: "1350 x 950 x 1750 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel" },
      { k: "Pressure Rating", v: "Up to 3.0 bar" },
      { k: "Rotor Speed", v: "30 - 1000 RPM" },
      { k: "Shaft Seals", v: "Double flushed mechanical seal" },
    ],
  },
  delta: {
    it: [
      { k: "Potenza Motore", v: "11.0 kW" },
      { k: "Dimensioni (LxPxA)", v: "1550 x 1100 x 1950 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L" },
      { k: "Classe di Pressione", v: "Fino a 4.0 bar" },
      { k: "Velocità Rotore", v: "30 - 900 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta doppia Flussata" },
    ],
    en: [
      { k: "Motor Power", v: "11.0 kW" },
      { k: "Dimensions (WxDxH)", v: "1550 x 1100 x 1950 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel" },
      { k: "Pressure Rating", v: "Up to 4.0 bar" },
      { k: "Rotor Speed", v: "30 - 900 RPM" },
      { k: "Shaft Seals", v: "Double flushed mechanical seal" },
    ],
  },
  epsilon: {
    it: [
      { k: "Potenza Motore", v: "15.0 kW (Alta velocità per micro-taglio)" },
      { k: "Dimensioni (LxPxA)", v: "1550 x 1100 x 2050 mm" },
      { k: "Materiali di Contatto", v: "Inox 316L lucidato a specchio (Ra < 0.4 um)" },
      { k: "Sanificazione", v: "Completo CIP/SIP pronto con porte tri-clamp" },
      { k: "Velocità Rotore", v: "100 - 3000 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta sterile asettica flussata a vapore" },
    ],
    en: [
      { k: "Motor Power", v: "15.0 kW (High shear rotor drive)" },
      { k: "Dimensions (WxDxH)", v: "1550 x 1100 x 2050 mm" },
      { k: "Contact Materials", v: "Mirror-polished 316L Inox (Ra < 0.4 um)" },
      { k: "Sanitization", v: "Full CIP/SIP-ready with tri-clamp ports" },
      { k: "Rotor Speed", v: "100 - 3000 RPM" },
      { k: "Shaft Seals", v: "Aseptic steam-flushed mechanical seal" },
    ],
  },
  zeta: {
    it: [
      { k: "Potenza Motore", v: "22.0 kW (Coppia elevata per paste)" },
      { k: "Dimensioni (LxPxA)", v: "1800 x 1300 x 2200 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L" },
      { k: "Max Viscosità", v: "Fino a 250.000 cP" },
      { k: "Velocità Rotore", v: "10 - 500 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta a cartuccia rinforzata per alta pressione" },
    ],
    en: [
      { k: "Motor Power", v: "22.0 kW (High-torque drive for paste)" },
      { k: "Dimensions (WxDxH)", v: "1800 x 1300 x 2200 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel" },
      { k: "Max Viscosity", v: "Up to 250,000 cP" },
      { k: "Rotor Speed", v: "10 - 500 RPM" },
      { k: "Shaft Seals", v: "Reinforced high-pressure cartridge seal" },
    ],
  },
  eta: {
    it: [
      { k: "Potenza Motore", v: "30.0 kW (Drive train rinforzato per malte)" },
      { k: "Dimensioni (LxPxA)", v: "2100 x 1400 x 2400 mm" },
      { k: "Materiali di Contatto", v: "Acciaio antiusura rinforzato / AISI 304" },
      { k: "Protezione Abrasione", v: "Rivestimento in carburo di tungsteno sui rotori" },
      { k: "Velocità Rotore", v: "15 - 400 RPM" },
      { k: "Tenute Meccaniche", v: "Tenuta meccanica a labirinto per polveri abrasive" },
    ],
    en: [
      { k: "Motor Power", v: "30.0 kW (Reinforced drive train for mortar)" },
      { k: "Dimensions (WxDxH)", v: "2100 x 1400 x 2400 mm" },
      { k: "Contact Materials", v: "Reinforced wear-resistant steel / AISI 304" },
      { k: "Abrasion Protection", v: "Tungsten carbide coating on rotors" },
      { k: "Rotor Speed", v: "15 - 400 RPM" },
      { k: "Shaft Seals", v: "Labyrinth mechanical seal for abrasive powders" },
    ],
  },
  theta: {
    it: [
      { k: "Potenza Motore", v: "22.0 kW (Classe alimentare/pharma)" },
      { k: "Dimensioni (LxPxA)", v: "2200 x 1500 x 2300 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L elettrolucidato" },
      { k: "Certificazioni Sanitarie", v: "3-A Sanitary, FDA-compliant, EHEDG ready" },
      { k: "Velocità Rotore", v: "20 - 800 RPM" },
      { k: "Tenute Meccaniche", v: "Doppia tenuta asettica flussata con barriera sterile" },
    ],
    en: [
      { k: "Motor Power", v: "22.0 kW (Food/pharma grade)" },
      { k: "Dimensions (WxDxH)", v: "2200 x 1500 x 2300 mm" },
      { k: "Contact Materials", v: "Electro-polished AISI 316L Stainless Steel" },
      { k: "Sanitary Certificates", v: "3-A Sanitary, FDA-compliant, EHEDG ready" },
      { k: "Rotor Speed", v: "20 - 800 RPM" },
      { k: "Shaft Seals", v: "Double aseptic flushed seal with sterile barrier" },
    ],
  },
  iota: {
    it: [
      { k: "Potenza Motore", v: "37.0 kW (ATEX antideflagrante Zona 1)" },
      { k: "Dimensioni (LxPxA)", v: "2400 x 1600 x 2500 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L / Hastelloy" },
      { k: "Classe di Pressione", v: "Fino a 6.0 bar (Camicia)" },
      { k: "Conformità Elettrica", v: "Ex d IIB T4 Gb / ATEX Zona 1 / IECEx" },
      { k: "Tenute Meccaniche", v: "Tenuta a gas pressurizzata a doppia barriera" },
    ],
    en: [
      { k: "Motor Power", v: "37.0 kW (ATEX explosion-proof Zone 1)" },
      { k: "Dimensions (WxDxH)", v: "2400 x 1600 x 2500 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel / Hastelloy" },
      { k: "Pressure Rating", v: "Up to 6.0 bar (Jacketed)" },
      { k: "Electrical Compliance", v: "Ex d IIB T4 Gb / ATEX Zone 1 / IECEx" },
      { k: "Shaft Seals", v: "Double barrier pressurized gas seal" },
    ],
  },
  kappa: {
    it: [
      { k: "Potenza Motore", v: "55.0 kW (Grande impianto chimico)" },
      { k: "Dimensioni (LxPxA)", v: "2800 x 2000 x 2900 mm" },
      { k: "Materiali di Contatto", v: "Acciaio Inox AISI 316L / Hastelloy C-22" },
      { k: "Classe di Pressione", v: "Fino a 6.0 bar (Vaso e Camicia)" },
      { k: "Velocità Rotore", v: "10 - 600 RPM" },
      {
        k: "Tenute Meccaniche",
        v: "Cartuccia doppia bilanciata con sistema di flussaggio thermosiphon",
      },
    ],
    en: [
      { k: "Motor Power", v: "55.0 kW (Large-scale chemical plant)" },
      { k: "Dimensions (WxDxH)", v: "2800 x 2000 x 2900 mm" },
      { k: "Contact Materials", v: "AISI 316L Stainless Steel / Hastelloy C-22" },
      { k: "Pressure Rating", v: "Up to 6.0 bar (Vessel & Jacket)" },
      { k: "Rotor Speed", v: "10 - 600 RPM" },
      { k: "Shaft Seals", v: "Double balanced cartridge with thermosiphon barrier system" },
    ],
  },
  mu: {
    it: [
      { k: "Potenza Motore", v: "75.0 kW (Doppio rotore a trazione coassiale)" },
      { k: "Dimensioni (LxPxA)", v: "3400 x 2500 x 3600 mm" },
      { k: "Materiali di Contatto", v: "Hastelloy C-22 / AISI 316L" },
      { k: "Rondelle di Lavaggio", v: "Sfere di spruzzo a scomparsa integrate" },
      { k: "Velocità Rotore", v: "5 - 450 RPM (Rotazione contraria sincrona)" },
      {
        k: "Tenute Meccaniche",
        v: "Doppia tenuta a cartuccia con diagnostica di perdita integrata",
      },
    ],
    en: [
      { k: "Motor Power", v: "75.0 kW (Twin-rotor coaxial drive)" },
      { k: "Dimensions (WxDxH)", v: "3400 x 2500 x 3600 mm" },
      { k: "Contact Materials", v: "Hastelloy C-22 / AISI 316L" },
      { k: "Washing Nozzles", v: "Retractable spray balls built-in" },
      { k: "Rotor Speed", v: "5 - 450 RPM (Synchronous counter-rotation)" },
      { k: "Shaft Seals", v: "Double cartridge seal with inline leak diagnostics" },
    ],
  },
};

export function generateQuotePDF({
  ref,
  contact,
  model,
  chosenOptionals,
  total,
  lang = "it",
}: {
  ref: string;
  contact: PDFQuoteContact;
  model: Model;
  chosenOptionals: Optional[];
  total: number;
  lang?: Lang;
}) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Margins & Printable area width
  const marginX = 20;
  const contentWidth = 170; // 210 - 40
  let y = 18;

  // Colors (Brand Design)
  const primaryColor = [15, 118, 110]; // #0f766e Teal
  const darkSlate = [15, 23, 42]; // #0f172a Deep Blue/Slate
  const mutedGrey = [100, 116, 139]; // #64748b Slate Grey
  const lightGrey = [248, 250, 252]; // #f8fafc Light Slate
  const borderGrey = [226, 232, 240]; // #e2e8f0 Border Grey

  // Helper to ensure page overflow is handled
  const checkPage = (heightNeeded: number) => {
    if (y + heightNeeded > 270) {
      doc.addPage();
      y = 18;
      drawFooterAndBorder();
    }
  };

  // Helper to draw border frame & page footer
  const drawFooterAndBorder = () => {
    // Top border accent line
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 4, "F");

    // Page number / footer text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);

    const footerText =
      lang === "it"
        ? `MixCore S.p.A. — Via dell'Industria 14, 20010 Milano, Italia — sales@mixcore.industrial — Brevetto EP3 482 109`
        : `MixCore S.p.A. — Via dell'Industria 14, 20010 Milano, Italia — sales@mixcore.industrial — Patent EP3 482 109`;

    doc.text(footerText, 20, 288);

    // Page count
    const pageNo = doc.internal.pages.length - 1;
    doc.text(`${pageNo}`, 190, 288, { align: "right" });
  };

  // 1. Initial Page Border/Footer setup
  drawFooterAndBorder();

  // 2. Branded Header Block
  // Drawing logo symbol
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(20, y, 8, 8, "F");

  // Draw an inner atomic dot for the logo
  doc.setFillColor(255, 255, 255);
  doc.circle(24, y + 4, 1.2, "F");

  // Logo Text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text("MixCore", 31, y + 6.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);
  doc.text(lang === "it" ? "Ingegneria di Miscelazione" : "Mixing Engineering", 31, y + 11);

  // Quote Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(lang === "it" ? "PREVENTIVO ECONOMICO" : "ECONOMIC PROPOSAL", 190, y + 5.5, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(`${lang === "it" ? "Riferimento" : "Reference"}: ${ref}`, 190, y + 10.5, {
    align: "right",
  });

  y += 20;

  // Thin separator line
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.setLineWidth(0.3);
  doc.line(20, y, 190, y);

  y += 8;

  // 3. Client & Document Info Columns
  checkPage(40);

  // Left Column - Client Info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(lang === "it" ? "DESTINATARIO:" : "PROPOSAL FOR:", 20, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(`${contact.name}`, 20, y + 5);
  doc.setFont("helvetica", "bold");
  doc.text(`${contact.company}`, 20, y + 10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);
  doc.text(`Email: ${contact.email}`, 20, y + 15);
  doc.text(`Tel: ${contact.phone}`, 20, y + 20);

  // Right Column - Doc Details
  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(lang === "it" ? "DETTAGLI PROPOSTA:" : "PROPOSAL DETAILS:", 115, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  const dateFormatted = new Date().toLocaleDateString(lang === "it" ? "it-IT" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`${lang === "it" ? "Data Emissione" : "Date of Issue"}: ${dateFormatted}`, 115, y + 5);
  doc.text(
    `${lang === "it" ? "Validità Offerta" : "Validity"}: 30 ${lang === "it" ? "giorni" : "days"}`,
    115,
    y + 10,
  );
  doc.text(`${lang === "it" ? "Valuta" : "Currency"}: EUR (€)`, 115, y + 15);
  doc.text(`${lang === "it" ? "Incoterms" : "Incoterms"}: EXW Milano`, 115, y + 20);

  y += 28;

  // Custom Notes if available
  if (contact.notes && contact.notes.trim()) {
    checkPage(20);
    doc.setFillColor(lightGrey[0], lightGrey[1], lightGrey[2]);
    doc.rect(20, y, contentWidth, 14, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(
      lang === "it" ? "NOTE E REQUISITI CLIENTE:" : "CLIENT NOTES & REQUIREMENTS:",
      23,
      y + 5.5,
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);

    // Wrap text to fit width
    const splitNotes = doc.splitTextToSize(contact.notes.trim(), contentWidth - 8);
    doc.text(splitNotes[0] + (splitNotes.length > 1 ? "..." : ""), 23, y + 10);

    y += 20;
  }

  // 4. Configuration Header Banner (Selected Model)
  checkPage(45);

  // Grey background banner for the model info
  doc.setFillColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.rect(20, y, contentWidth, 16, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(`${model.name.toUpperCase()}`, 25, y + 6.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0] * 1.8, primaryColor[1] * 1.8, primaryColor[2] * 1.8);
  const catLabel =
    lang === "it"
      ? `Categoria: Mixer Industriale ${model.category.toUpperCase()}`
      : `Category: Industrial ${model.category.toUpperCase()} Mixer`;
  doc.text(catLabel, 25, y + 11.5);

  // Price on the right of the banner
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(formatEUR(model.basePrice, lang), 185, y + 10, { align: "right" });

  y += 20;

  // Description block
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  const descText = lang === "it" ? model.description.it : model.description.en;
  doc.text(descText, 22, y);

  y += 8;

  // 5. Technical Specifications Grid (Detailed information)
  checkPage(50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(
    lang === "it" ? "SPECIFICHE TECNICHE PRINCIPALI:" : "KEY TECHNICAL SPECIFICATIONS:",
    20,
    y,
  );

  y += 4;

  const modelSpecs = detailedSpecs[model.id]?.[lang] || [];

  // Draw grid table
  doc.setFontSize(8.5);
  let isAlt = false;

  // Add Capacity & Industry to the top of specs
  const basicSpecs =
    lang === "it"
      ? [
          { k: "Capacità Volumetrica", v: model.capacity },
          { k: "Settore Applicativo Raccomandato", v: model.industry.it },
        ]
      : [
          { k: "Volumetric Capacity", v: model.capacity },
          { k: "Recommended Industry", v: model.industry.en },
        ];

  const fullSpecList = [...basicSpecs, ...modelSpecs];

  for (const s of fullSpecList) {
    checkPage(8);

    // Draw row background
    doc.setFillColor(
      isAlt ? lightGrey[0] : 255,
      isAlt ? lightGrey[1] : 255,
      isAlt ? lightGrey[2] : 255,
    );
    doc.rect(20, y, contentWidth, 7, "F");

    // Key
    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(s.k, 23, y + 4.5);

    // Value
    doc.setFont("helvetica", "normal");
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    doc.text(s.v, 90, y + 4.5);

    // Bottom thin line for grid
    doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
    doc.line(20, y + 7, 190, y + 7);

    y += 7;
    isAlt = !isAlt;
  }

  y += 8;

  // 6. Selected Upgrades Section (Optionals)
  checkPage(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(
    lang === "it" ? "UPGRADE E ACCESSORI CONFIGURATI:" : "CONFIGURED UPGRADES & ACCESSORIES:",
    20,
    y,
  );

  y += 4;

  if (chosenOptionals.length === 0) {
    doc.setFillColor(lightGrey[0], lightGrey[1], lightGrey[2]);
    doc.rect(20, y, contentWidth, 10, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);
    doc.text(
      lang === "it" ? "Nessun upgrade opzionale configurato." : "No optional upgrades configured.",
      25,
      y + 6,
    );
    y += 15;
  } else {
    // Header for table
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(20, y, contentWidth, 6.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(lang === "it" ? "Optional / Upgrade" : "Optional / Upgrade", 23, y + 4.5);
    doc.text(lang === "it" ? "Prezzo" : "Price", 185, y + 4.5, { align: "right" });

    y += 6.5;
    isAlt = false;

    for (const o of chosenOptionals) {
      checkPage(12);

      // Draw background
      doc.setFillColor(
        isAlt ? lightGrey[0] : 255,
        isAlt ? lightGrey[1] : 255,
        isAlt ? lightGrey[2] : 255,
      );
      doc.rect(20, y, contentWidth, 11, "F");

      // Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
      const optName = lang === "it" ? o.name.it : o.name.en;
      doc.text(optName, 23, y + 4.5);

      // Desc
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);
      const optDesc = lang === "it" ? o.description.it : o.description.en;
      doc.text(optDesc, 23, y + 8.5);

      // Price
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
      doc.text(`+${formatEUR(o.price, lang)}`, 185, y + 6.5, { align: "right" });

      // Border line
      doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
      doc.line(20, y + 11, 190, y + 11);

      y += 11;
      isAlt = !isAlt;
    }

    y += 8;
  }

  // 7. Pricing Summary Box
  checkPage(40);

  const subtotal = total;
  const vat = subtotal * 0.22;
  const finalTotal = subtotal + vat;

  // Box coordinates
  const boxW = 85;
  const boxX = 190 - boxW;

  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.setFillColor(lightGrey[0], lightGrey[1], lightGrey[2]);
  doc.rect(boxX, y, boxW, 26, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);

  // Row: Subtotal
  doc.text(lang === "it" ? "Subtotale Imponibile:" : "Subtotal (Excl. VAT):", boxX + 4, y + 6);
  doc.text(formatEUR(subtotal, lang), 186, y + 6, { align: "right" });

  // Row: VAT
  doc.text(lang === "it" ? "IVA Stimata (22%):" : "Estimated VAT (22%):", boxX + 4, y + 12);
  doc.text(formatEUR(vat, lang), 186, y + 12, { align: "right" });

  // Divider
  doc.setDrawColor(borderGrey[0], borderGrey[1], borderGrey[2]);
  doc.line(boxX + 4, y + 15, 186, y + 15);

  // Row: Total
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(lang === "it" ? "TOTALE STIMATO:" : "ESTIMATED TOTAL:", boxX + 4, y + 21);
  doc.text(formatEUR(finalTotal, lang), 186, y + 21, { align: "right" });

  y += 34;

  // 8. Legal Disclaimer & Digital Code
  checkPage(35);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);

  const disclaimer1 =
    lang === "it"
      ? "La presente configurazione rappresenta una stima commerciale indicativa e non costituisce offerta contrattuale vincolante."
      : "This configuration represents an indicative commercial estimate and does not constitute a binding contract offer.";
  const disclaimer2 =
    lang === "it"
      ? "Il preventivo definitivo e formale sarà rilasciato a seguito di verifica ingegneristica dell'applicazione e dei fluidi trattati."
      : "The final formal quote will be issued following engineering verification of the application and processed fluids.";
  const disclaimer3 =
    lang === "it"
      ? "I prezzi indicati sono franco fabbrica (EXW), imballo escluso. Trasporto, installazione e training sono soggetti a preventivazione separata."
      : "Prices are Ex-Works (EXW), packing excluded. Shipping, installation and operator training are quoted separately.";

  doc.text(disclaimer1, 20, y);
  doc.text(disclaimer2, 20, y + 3.5);
  doc.text(disclaimer3, 20, y + 7);

  y += 18;

  // 9. Signatures Block
  checkPage(30);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);

  // Commercial representative
  doc.text(
    lang === "it"
      ? "Per MixCore S.p.A. (Sales Engineering)"
      : "For MixCore S.p.A. (Sales Engineering)",
    20,
    y,
  );
  doc.setDrawColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);
  doc.line(20, y + 16, 75, y + 16);
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);
  doc.text(lang === "it" ? "Firma e Timbro" : "Signature & Stamp", 20, y + 19.5);

  // Client acceptance
  doc.setFontSize(8.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(
    lang === "it"
      ? "Per Accettazione ed Approvazione (Il Cliente)"
      : "For Acceptance and Review (The Client)",
    120,
    y,
  );
  doc.line(120, y + 16, 185, y + 16);
  doc.setFontSize(7.5);
  doc.setTextColor(mutedGrey[0], mutedGrey[1], mutedGrey[2]);
  doc.text(lang === "it" ? "Data e Firma" : "Date & Signature", 120, y + 19.5);

  // Save the document
  const fileName = `MixCore_Quote_${ref}.pdf`;
  doc.save(fileName);
}
