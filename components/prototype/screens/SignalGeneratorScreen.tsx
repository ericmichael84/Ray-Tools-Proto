"use client";

import { useState } from "react";
import {
  PhaseList,
  PlaceholderInputRow,
  ProtoBadge,
  ProtoPanel,
  ProtoScreenHeader,
  ProtoTabs,
  useSimulatedPhases,
} from "../tools/playground-ui";

const QUICK_PHASES = [
  "Analyzing · overview + assets",
  "Processing · per-section extraction",
  "Synthesizing · cross-section narrative",
] as const;

const SAMPLE_SIGNAL = {
  header: "Checkout clarity drives completion more than visual polish.",
  body: "72% of participants rated task success highly on Variant A (vs. 64% on B). One participant noted: “I knew exactly what to tap next.”",
  quant: [
    { metric: "Task success", score: 72, type: "Likert" },
    { metric: "Ease", score: 68, type: "Likert" },
  ],
  qual: [
    { quote: "Felt faster than our current flow.", sentiment: "positive" },
    { quote: "Trust badges were easy to miss.", sentiment: "mixed" },
  ],
};

export function SignalGeneratorScreen() {
  const [flow, setFlow] = useState<"quick" | "deep" | "multi">("quick");
  const sim = useSimulatedPhases(QUICK_PHASES);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <ProtoScreenHeader
        kicker="Tool · Signal Generator"
        title="Signal Generator"
        subtitle="Quick Generate, Deep Analysis wizard, and multi-test comparison — map-reduce and rubric scoring are represented as static placeholders."
      />

      <ProtoTabs
        tabs={
          [
            { id: "quick", label: "Quick Generate" },
            { id: "deep", label: "Deep Analysis" },
            { id: "multi", label: "Multi-test" },
          ] as const
        }
        value={flow}
        onChange={setFlow}
      />

      {flow === "quick" ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <ProtoPanel title="Test import">
              <PlaceholderInputRow
                label="Helio URL"
                placeholder="https://helio.app/report/…"
              />
              <div className="rounded-[var(--proto-radius-sm)] border border-dashed border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-4 text-center text-sm text-[var(--proto-text-muted)]">
                Preview: “Mobile checkout — Apr 2026” · 412 responses · UX 78
              </div>
            </ProtoPanel>
            <ProtoPanel title="Audit phase (context)">
              <PlaceholderInputRow
                label="Design initiative"
                placeholder="e.g. Reduce checkout abandonment"
              />
              <p className="text-xs text-[var(--proto-text-muted)]">
                Dynamic audit questions and persisted answers are not wired in
                this prototype.
              </p>
            </ProtoPanel>
          </div>
          <ProtoPanel
            title="Generation (simulated streaming)"
            footer={
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={sim.start}
                  disabled={sim.running}
                  className="rounded-[var(--proto-radius-sm)] bg-[var(--proto-accent)] px-3 py-1.5 text-sm font-medium text-[var(--proto-accent-fg)] disabled:opacity-50"
                >
                  {sim.running ? "Generating…" : "Simulate generation"}
                </button>
                <button
                  type="button"
                  onClick={sim.reset}
                  className="rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] px-3 py-1.5 text-sm"
                >
                  Reset
                </button>
              </div>
            }
          >
            <PhaseList phases={QUICK_PHASES} activeIndex={sim.phaseIndex} />
            <p className="text-xs text-[var(--proto-text-muted)]">
              Pipeline version <code className="rounded bg-[var(--proto-surface-elevated)] px-1">v3 2026.04.02</code>{" "}
              (label only)
            </p>
          </ProtoPanel>
          <ProtoPanel title="Signal report (sample structure)">
            <div className="space-y-3 rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-4">
              <ProtoBadge tone="good">Signal</ProtoBadge>
              <p className="font-[family-name:var(--proto-font-heading)] text-lg font-semibold text-[var(--proto-text)]">
                {SAMPLE_SIGNAL.header}
              </p>
              <p className="text-sm text-[var(--proto-text-muted)]">
                {SAMPLE_SIGNAL.body}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--proto-text-muted)]">
                    Quant
                  </p>
                  <ul className="space-y-2 text-sm">
                    {SAMPLE_SIGNAL.quant.map((q) => (
                      <li
                        key={q.metric}
                        className="flex items-center justify-between gap-2 rounded border border-[var(--proto-border)] bg-[var(--proto-surface)] px-2 py-1.5"
                      >
                        <span className="text-[var(--proto-text)]">
                          {q.metric}
                        </span>
                        <span className="font-mono text-[var(--proto-text-muted)]">
                          {q.score}{" "}
                          <span className="text-xs">· {q.type}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--proto-text-muted)]">
                    Participant voice
                  </p>
                  <ul className="space-y-2">
                    {SAMPLE_SIGNAL.qual.map((q, i) => (
                      <li
                        key={i}
                        className="rounded border border-[var(--proto-border)] bg-[var(--proto-surface)] p-2 text-sm text-[var(--proto-text-muted)]"
                      >
                        <ProtoBadge>{q.sentiment}</ProtoBadge>
                        <p className="mt-1 italic text-[var(--proto-text)]">
                          “{q.quote}”
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ProtoPanel>
        </>
      ) : null}

      {flow === "deep" ? (
        <ProtoPanel title="Deep Analysis · 5-stage wizard (outline)">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--proto-text-muted)]">
            <li>Context setup</li>
            <li>Quant-only survey structure</li>
            <li>AI hypotheses from quant patterns</li>
            <li>Qualitative review</li>
            <li>Refined signals with quote evidence</li>
          </ol>
          <p className="text-xs text-[var(--proto-text-muted)]">
            Wizard navigation and persistence are not implemented — structure
            preview only.
          </p>
        </ProtoPanel>
      ) : null}

      {flow === "multi" ? (
        <ProtoPanel title="Multi-test comparison">
          <p className="text-sm text-[var(--proto-text-muted)]">
            Reuses audit + generation with metric alignment and cross-test
            synthesis. Overview tab (aligned grid) + Signals tab — represented
            here as a single combined placeholder.
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {["Test A", "Test B", "Test C"].map((name) => (
              <div
                key={name}
                className="rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-3 text-center text-sm font-medium text-[var(--proto-text)]"
              >
                {name}
              </div>
            ))}
          </div>
        </ProtoPanel>
      ) : null}
    </div>
  );
}
