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

  const updateActive = (mut: (s: Slot) => Slot) =>
    setSlots((prev) => ({ ...prev, [active]: mut(prev[active]) }));

  const setModelId = (id: string) => updateActive((s) => ({ ...s, modelId: id }));

  const toggleOptional = (id: string) =>
    updateActive((s) => {
      const next = new Set(s.optionals);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...s, optionals: next };
    });

  const selectAllOptionals = () =>
    updateActive((s) => ({ ...s, optionals: new Set(optionals.map((o) => o.id)) }));

  const clearAllOptionals = () => updateActive((s) => ({ ...s, optionals: new Set() }));

  const resetActive = () =>
    setSlots((prev) => ({ ...prev, [active]: initialSlot(models[0].id) }));

  const reset = () => {
    setSlots({ A: initialSlot(models[0].id), B: initialSlot(models[Math.min(4, models.length - 1)].id) });
    setActive("A");
  };

  const enableCompare = () => {
    setCompare(true);
    // Seed B from A if B looks "untouched-from-default and same as A"
    setSlots((prev) =>
      prev.A.modelId === prev.B.modelId && prev.B.optionals.size === 0
        ? { ...prev, B: { modelId: models[Math.min(4, models.length - 1)].id, optionals: new Set() } }
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
    setSlots((prev) => ({ ...prev, B: { modelId: prev.A.modelId, optionals: new Set(prev.A.optionals) } }));

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
  };
}
