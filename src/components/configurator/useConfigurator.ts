import { useMemo, useState } from "react";
import { models } from "@/data/models";
import { optionals } from "@/data/optionals";

export type SlotId = "A" | "B";
type Slot = { modelId: string; optionals: Set<string> };

const initialSlot = (modelId: string): Slot => ({ modelId, optionals: new Set() });

export function useConfigurator() {
  const [slots, setSlots] = useState<Record<SlotId, Slot>>({
    A: initialSlot(models[0].id),
    B: initialSlot(models[Math.min(4, models.length - 1)].id),
  });
  const [active, setActive] = useState<SlotId>("A");
  const [compare, setCompare] = useState(false);

  // Step wizard state (1: Requirements, 2: Model, 3: Optionals, 4: Review)
  const [step, setStepState] = useState<number>(1);

  // Requirements gathering for Step 1
  const [requirements, setRequirements] = useState<{
    industry: string | null;
    capacity: "small" | "medium" | "large" | null;
    viscosity: "low" | "medium" | "high" | null;
  }>({
    industry: null,
    capacity: null,
    viscosity: null,
  });

  const setStep = (s: number) => {
    if (s >= 1 && s <= 4) setStepState(s);
  };

  const nextStep = () => {
    if (step < 4) setStepState(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStepState(step - 1);
  };

  const setRequirement = (key: "industry" | "capacity" | "viscosity", val: string | null) => {
    setRequirements((prev) => ({
      ...prev,
      [key]: val as "small" | "medium" | "large" | "low" | "high" | null,
    }));
  };

  // Model recommendation logic based on selected requirements
  const recommendedModelIds = useMemo(() => {
    if (!requirements.industry && !requirements.capacity && !requirements.viscosity) {
      return new Set<string>();
    }
    const matches = models.filter((m) => {
      // 1. Industry match
      if (requirements.industry) {
        const ind = requirements.industry.toLowerCase();
        const mIndEn = m.industry.en.toLowerCase();

        const isPharma = ind === "pharma" && (mIndEn.includes("pharma") || mIndEn.includes("lab"));
        const isFood = ind === "food" && (mIndEn.includes("food") || mIndEn.includes("sanitary"));
        const isChem = ind === "chem" && (mIndEn.includes("chemical") || mIndEn.includes("lab"));
        const isCosm =
          ind === "cosm" &&
          (mIndEn.includes("cosmetic") || mIndEn.includes("viscosity") || mIndEn.includes("lab"));
        const isPetro =
          ind === "petro" &&
          (mIndEn.includes("petro") || mIndEn.includes("hazardous") || mIndEn.includes("heavy"));
        const isConstr =
          ind === "constr" &&
          (mIndEn.includes("construction") ||
            mIndEn.includes("heavy") ||
            mIndEn.includes("abrasive"));

        if (!isPharma && !isFood && !isChem && !isCosm && !isPetro && !isConstr) {
          return false;
        }
      }
      // 2. Capacity match
      if (requirements.capacity) {
        const capNum = parseInt(m.capacity.replace(/[^\d]/g, ""), 10);
        if (requirements.capacity === "small" && capNum > 100) return false;
        if (requirements.capacity === "medium" && (capNum < 100 || capNum > 1000)) return false;
        if (requirements.capacity === "large" && capNum < 1000) return false;
      }
      // 3. Viscosity match
      if (requirements.viscosity === "high") {
        // Zeta (high viscosity), Eta (heavy duty), Mu (heavy industry), Kappa (large scale) are suitable for high viscosity
        if (m.id !== "zeta" && m.id !== "eta" && m.id !== "mu" && m.id !== "kappa") return false;
      } else if (requirements.viscosity === "medium") {
        // mid range models
        const capNum = parseInt(m.capacity.replace(/[^\d]/g, ""), 10);
        if (capNum > 2000) return false;
      }
      return true;
    });

    return new Set(matches.map((m) => m.id));
  }, [requirements]);

  const updateSlot = (slot: SlotId, mut: (s: Slot) => Slot) =>
    setSlots((prev) => ({ ...prev, [slot]: mut(prev[slot]) }));

  const updateActive = (mut: (s: Slot) => Slot) => updateSlot(active, mut);

  const setModelId = (id: string) => updateActive((s) => ({ ...s, modelId: id }));
  const setModelIdFor = (slot: SlotId, id: string) =>
    updateSlot(slot, (s) => ({ ...s, modelId: id }));

  const toggleOptionalIn = (slot: SlotId, id: string) =>
    updateSlot(slot, (s) => {
      const next = new Set(s.optionals);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...s, optionals: next };
    });
  const toggleOptional = (id: string) => toggleOptionalIn(active, id);

  const selectAllOptionals = () =>
    updateActive((s) => ({ ...s, optionals: new Set(optionals.map((o) => o.id)) }));
  const selectAllOptionalsIn = (slot: SlotId) =>
    updateSlot(slot, (s) => ({ ...s, optionals: new Set(optionals.map((o) => o.id)) }));

  const clearAllOptionals = () => updateActive((s) => ({ ...s, optionals: new Set() }));
  const clearAllOptionalsIn = (slot: SlotId) =>
    updateSlot(slot, (s) => ({ ...s, optionals: new Set() }));

  const resetActive = () => setSlots((prev) => ({ ...prev, [active]: initialSlot(models[0].id) }));

  const reset = () => {
    setSlots({
      A: initialSlot(models[0].id),
      B: initialSlot(models[Math.min(4, models.length - 1)].id),
    });
    setActive("A");
    setStepState(1);
    setRequirements({ industry: null, capacity: null, viscosity: null });
  };

  const enableCompare = () => {
    setCompare(true);
    // Seed B from A if B looks "untouched-from-default and same as A"
    setSlots((prev) =>
      prev.A.modelId === prev.B.modelId && prev.B.optionals.size === 0
        ? {
            ...prev,
            B: { modelId: models[Math.min(4, models.length - 1)].id, optionals: new Set() },
          }
        : prev,
    );
    setActive("B");
  };

  const disableCompare = () => {
    setCompare(false);
    setActive("A");
  };

  const toggleCompare = () => (compare ? disableCompare() : enableCompare());

  const duplicateAB = () =>
    setSlots((prev) => ({
      ...prev,
      B: { modelId: prev.A.modelId, optionals: new Set(prev.A.optionals) },
    }));

  const swapAB = () => setSlots((prev) => ({ A: prev.B, B: prev.A }));

  const slotComputed = (id: SlotId) => {
    const s = slots[id];
    const model = models.find((m) => m.id === s.modelId)!;
    const chosen = optionals.filter((o) => s.optionals.has(o.id));
    const total = model.basePrice + chosen.reduce((sum, o) => sum + o.price, 0);
    return { model, chosen, total, optionals: s.optionals };
  };

  const A = useMemo(() => slotComputed("A"), [slots]);
  const B = useMemo(() => slotComputed("B"), [slots]);

  const cur = active === "A" ? A : B;

  return {
    // current/active
    model: cur.model,
    modelId: cur.model.id,
    chosenOptionals: cur.chosen,
    selectedOptionals: cur.optionals,
    total: cur.total,
    // setters
    setModelId,
    toggleOptional,
    selectAllOptionals,
    clearAllOptionals,
    resetActive,
    reset,
    // compare
    compare,
    toggleCompare,
    enableCompare,
    disableCompare,
    active,
    setActive,
    A,
    B,
    duplicateAB,
    swapAB,
    // step wizard
    step,
    setStep,
    nextStep,
    prevStep,
    requirements,
    setRequirement,
    recommendedModelIds,
  };
}
