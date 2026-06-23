import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="bg-surface text-surface-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Build your mixer. Get a quote in 24 hours.
          </h2>
          <p className="mt-2 max-w-xl text-surface-foreground/70">
            Configure your model and options in minutes. Our engineering team
            reviews every request and replies with a tailored proposal.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link to="/configurator">
            Open Configurator <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
