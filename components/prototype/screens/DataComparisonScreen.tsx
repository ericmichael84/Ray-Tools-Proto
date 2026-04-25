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

const REPORT_PHASES = [
  "Fetch Helio reports",
  "Align metrics",
  "Calculate deltas",
  "Render grid",
] as const;

const AI_PHASES = [
  "Fetch",
  "Analyze per-test",
  "Align metrics",
  "Calculate deltas",
  "Synthesize comparison signals",
] as const;

const METRICS = [
  { name: "Overall UX score", a: 82, b: 74 },
  { name: "Task success", a: 91, b: 88 },
  { name: "Ease", a: 68, b: 72 },
  { name: "Trust", a: 55, b: 61 },
] as const;

function scoreTone(v: number): "good" | "warn" | "bad" | "neutral" {
  if (v >= 90) return "good";
  if (v >= 70) return "neutral";
  if (v >= 50) return "warn";
  return "bad";
}

export function DataComparisonScreen() {
  const [mode, setMode] = useState<"report" | "ai">("report");
  const simReport = useSimulatedPhases(REPORT_PHASES);
  const simAi = useSimulatedPhases(AI_PHASES);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <ProtoScreenHeader
        kicker="Tool · Data Comparison"
        title="Data Comparison"
        subtitle="Report Compare (quick metrics) and AI-powered comparison via Signal Generator — placeholders only, no Helio or streaming."
      />

      <ProtoTabs
        tabs={
          [
            { id: "report", label: "Report Compare" },
            { id: "ai", label: "AI comparison" },
          ] as const
        }
        value={mode}
        onChange={setMode}
      />

      {mode === "report" ? (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <ProtoPanel title="Test selection">
              <PlaceholderInputRow
                label="Helio share URL"
                placeholder="https://helio.app/report/…"
              />
              <PlaceholderInputRow
                label="Second report"
                placeholder="https://helio.app/report/…"
              />
              <p className="text-xs text-[var(--proto-text-muted)]">
                Browse/search modal, duplicate detection, and sync (not wired).
              </p>
            </ProtoPanel>
            <ProtoPanel
              title="Quick run (simulated)"
              footer={
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={simReport.start}
                    disabled={simReport.running}
                    className="rounded-[var(--proto-radius-sm)] bg-[var(--proto-accent)] px-3 py-1.5 text-sm font-medium text-[var(--proto-accent-fg)] disabled:opacity-50"
                  >
                    {simReport.running ? "Running…" : "Simulate sync"}
                  </button>
                  <button
                    type="button"
                    onClick={simReport.reset}
                    className="rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] px-3 py-1.5 text-sm"
                  >
                    Reset
                  </button>
                </div>
              }
            >
              <PhaseList
                phases={REPORT_PHASES}
                activeIndex={simReport.phaseIndex}
              />
              <p className="text-xs text-[var(--proto-text-muted)]">
                Status:{" "}
                <strong className="text-[var(--proto-text)]">
                  {simReport.phaseLabel ?? "Idle"}
                </strong>
              </p>
            </ProtoPanel>
          </div>
          <ProtoPanel title="Aligned metrics (sample)">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--proto-border)] text-left text-xs uppercase tracking-wide text-[var(--proto-text-muted)]">
                    <th className="py-2 pr-4 font-semibold">Metric</th>
                    <th className="py-2 pr-4 font-semibold">Test A</th>
                    <th className="py-2 pr-4 font-semibold">Test B</th>
                    <th className="py-2 font-semibold">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {METRICS.map((row) => {
                    const delta = row.a - row.b;
                    return (
                      <tr
                        key={row.name}
                        className="border-b border-[var(--proto-border)]/70"
                      >
                        <td className="py-2.5 pr-4 font-medium text-[var(--proto-text)]">
                          {row.name}
                        </td>
                        <td className="py-2.5 pr-4">
                          <ProtoBadge tone={scoreTone(row.a)}>
                            {row.a}
                          </ProtoBadge>
                        </td>
                        <td className="py-2.5 pr-4">
                          <ProtoBadge tone={scoreTone(row.b)}>
                            {row.b}
                          </ProtoBadge>
                        </td>
                        <td className="py-2.5">
                          <span
                            className={
                              delta === 0
                                ? "text-[var(--proto-text-muted)]"
                                : delta > 0
                                  ? "font-semibold text-emerald-700"
                                  : "font-semibold text-amber-800"
                            }
                          >
                            {delta > 0 ? "+" : ""}
                            {delta}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--proto-text-muted)]">
              Color bands: Very Good (90+), Good (70+), Average (50+), Poor
              (30+), Very Poor (&lt;30) — static demo.
            </p>
          </ProtoPanel>
        </>
      ) : (
        <>
          <ProtoPanel title="AI-powered comparison (simulated SSE)">
            <p className="text-sm text-[var(--proto-text-muted)]">
              Five-phase pipeline: fetch → per-test analysis → align → deltas →
              synthesis. Evidence and severity tags appear in the cards below
              (static).
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={simAi.start}
                disabled={simAi.running}
                className="rounded-[var(--proto-radius-sm)] bg-[var(--proto-accent)] px-3 py-1.5 text-sm font-medium text-[var(--proto-accent-fg)] disabled:opacity-50"
              >
                {simAi.running ? "Streaming…" : "Simulate AI pipeline"}
              </button>
              <button
                type="button"
                onClick={simAi.reset}
                className="rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] px-3 py-1.5 text-sm"
              >
                Reset
              </button>
            </div>
            <PhaseList phases={AI_PHASES} activeIndex={simAi.phaseIndex} />
            <p className="text-xs text-[var(--proto-text-muted)]">
              Phase:{" "}
              <strong className="text-[var(--proto-text)]">
                {simAi.phaseLabel ?? "Idle"}
              </strong>
            </p>
          </ProtoPanel>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Convergence",
                body: "Participants agreed checkout clarity improved in both tests.",
                tag: "consistent",
              },
              {
                title: "Divergence",
                body: "Variant B underperforms on trust despite higher ease scores.",
                tag: "diverges",
              },
            ].map((card) => (
              <article
                key={card.title}
                className="rounded-[var(--proto-radius-md)] border border-[var(--proto-border)] bg-[var(--proto-surface)] p-4 shadow-[var(--proto-shadow)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <ProtoBadge>{card.tag}</ProtoBadge>
                  <h3 className="text-sm font-semibold text-[var(--proto-text)]">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--proto-text-muted)]">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
