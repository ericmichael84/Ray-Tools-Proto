"use client";

import { SCREENS, screensInGroup } from "@/lib/prototype/constants";
import { usePrototype } from "@/lib/prototype/context";
import type { ScreenId } from "@/lib/prototype/types";
import { ProtoBadge, ProtoPanel, ProtoScreenHeader } from "../tools/playground-ui";

const PIPELINE: {
  title: string;
  body: string;
  screen: ScreenId;
}[] = [
  {
    title: "Call Rubric",
    body: "Score client calls against SIGNAL and surface automation ideas.",
    screen: "call-rubric",
  },
  {
    title: "Data Comparison",
    body: "Align Helio metrics and read AI comparison signals.",
    screen: "data-comparison",
  },
  {
    title: "Signal Generator",
    body: "Turn raw tests into narrative design signals with evidence.",
    screen: "signal-generator",
  },
  {
    title: "Design Analysis",
    body: "Audit pages against VP priorities with categorized issues.",
    screen: "design-analysis",
  },
];

export function DashboardScreen() {
  const { setScreen } = usePrototype();
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <ProtoScreenHeader
        kicker="Glare Playground"
        title="Research → action pipeline"
        subtitle="Four shipped-style tools from the Playground PRD, represented as interactive placeholders. Pick a step to open its screen in the current structure and theme."
      />

      <ProtoPanel title="Pipeline">
        <ol className="grid gap-3 md:grid-cols-2">
          {PIPELINE.map((step, i) => (
            <li key={step.screen}>
              <button
                type="button"
                onClick={() => setScreen(step.screen)}
                className="flex h-full w-full flex-col gap-2 rounded-[var(--proto-radius-md)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-4 text-left transition-colors hover:border-[var(--proto-accent)]/40 hover:bg-[var(--proto-surface)]"
              >
                <span className="text-xs font-semibold text-[var(--proto-text-muted)]">
                  Step {i + 1}
                </span>
                <span className="font-[family-name:var(--proto-font-heading)] text-base font-semibold text-[var(--proto-text)]">
                  {step.title}
                </span>
                <span className="text-sm text-[var(--proto-text-muted)]">
                  {step.body}
                </span>
                <span className="text-xs font-medium text-[var(--proto-accent)]">
                  Open tool →
                </span>
              </button>
            </li>
          ))}
        </ol>
      </ProtoPanel>

      <ProtoPanel title="All destinations">
        <div className="flex flex-wrap gap-2">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScreen(s.id)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-3 py-1.5 text-sm text-[var(--proto-text)] hover:border-[var(--proto-accent)]/50"
            >
              <span className="text-xs text-[var(--proto-text-muted)]">
                {s.initial}
              </span>
              {s.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--proto-text-muted)]">
          Grouped in nav:{" "}
          {screensInGroup("tools")
            .map((t) => t.label)
            .join(" · ")}
          .
        </p>
      </ProtoPanel>

      <div className="flex flex-wrap gap-2">
        <ProtoBadge>Prototype</ProtoBadge>
        <ProtoBadge tone="warn">No API / DB</ProtoBadge>
      </div>
    </div>
  );
}
