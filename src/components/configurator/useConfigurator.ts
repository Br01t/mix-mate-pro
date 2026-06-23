import { useMemo, useState } from "react";
import { models } from "@/data/models";
import { optionals } from "@/data/optionals";

export function useConfigurator() {
  const [modelId, setModelId] = useState<string>(models[0].id);
  const [selectedOptionals, setSelectedOptionals] = useState<Set<string>>(new Set());

  const model = useMemo(() => models.find((m) => m.id === modelId)!, [modelId]);

  const chosenOptionals = useMemo(
    () => optionals.filter((o) => selectedOptionals.has(o.id)),
    [selectedOptionals],
  );

  const total = useMemo(
    () => model.basePrice + chosenOptionals.reduce((s, o) => s + o.price, 0),
    [model, chosenOptionals],
  );

  const toggleOptional = (id: string) =>
    setSelectedOptionals((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => {
    setModelId(models[0].id);
    setSelectedOptionals(new Set());
  };

  return { model, modelId, setModelId, chosenOptionals, selectedOptionals, toggleOptional, total, reset };
}
