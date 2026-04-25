"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrototype } from "@/lib/prototype/context";
import type { ThemeId } from "@/lib/prototype/types";
import {
  PhaseList,
  PlaceholderTextarea,
  ProtoBadge,
  ProtoPanel,
  ProtoTabs,
  useSimulatedPhases,
} from "../tools/playground-ui";
import {
  CALL_RUBRIC_INDEX_ROWS,
  callDetailFromRow,
  totalPillClass,
  type CallRubricDetail,
  type CallRubricIndexRow,
} from "./call-rubric-data";

const RUBRIC_PHASES = [
  "Parse transcript",
  "Extract evidence",
  "Score 6 dimensions (parallel)",
  "Synthesize narrative",
  "Identify automations",
] as const;

const SIGNAL_LETTERS = ["S", "I", "G", "N", "A", "L"] as const;

/** Themes with full SIGNAL score pills, totals, and CTA chrome in CSS. */
function usesSignalRubricChrome(theme: ThemeId) {
  return (
    theme === "glare" ||
    theme === "zurb" ||
    theme === "bright-future" ||
    theme === "glass"
  );
}

function clampScore(n: number) {
  return Math.min(5, Math.max(1, Math.round(n))) as 1 | 2 | 3 | 4 | 5;
}

function ScoreBadge({
  value,
  size = "table",
}: {
  value: number;
  size?: "table" | "hero";
}) {
  const { theme } = usePrototype();
  const v = clampScore(value);
  if (usesSignalRubricChrome(theme)) {
    const lg = size === "hero" ? " glare-score-node--lg" : "";
    return (
      <span
        className={`glare-score-node glare-score-node--${v}${lg}`}
        aria-label={`Score ${value}`}
      >
        {value}
      </span>
    );
  }
  const dim = size === "hero" ? "h-8 min-w-8 text-sm" : "h-7 min-w-[1.75rem] text-xs";
  return (
    <span
      className={`inline-flex items-center justify-center rounded bg-zinc-200 font-bold text-zinc-800 ${dim}`}
    >
      {value}
    </span>
  );
}

function TotalCell({ num, den }: { num: number; den: number }) {
  const { theme } = usePrototype();
  const label = `${num}/${den}`;
  if (usesSignalRubricChrome(theme)) {
    return <span className={totalPillClass(num, den)}>{label}</span>;
  }
  return (
    <span className="text-[13px] font-bold text-emerald-800">{label}</span>
  );
}

function StatusCell() {
  const { theme } = usePrototype();
  if (usesSignalRubricChrome(theme)) {
    return <span className="glare-status-complete">Complete</span>;
  }
  return <ProtoBadge tone="good">Complete</ProtoBadge>;
}

function PrimaryAction({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const { theme } = usePrototype();
  const glare =
    usesSignalRubricChrome(theme)
      ? "proto-btn-cta"
      : "rounded-[var(--proto-radius-md)] bg-[var(--proto-accent)] px-4 py-2 text-sm font-medium text-[var(--proto-accent-fg)] shadow-sm disabled:opacity-50";
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={glare}>
      {children}
    </button>
  );
}

function IndexChrome({
  children,
  action,
}: {
  children: ReactNode;
  action: ReactNode;
}) {
  return (
    <div className="w-full max-w-[976px]">
      <header className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold leading-8 tracking-tight text-[var(--proto-text)]">
            SIGNAL Call Rubric
          </h1>
          <p className="max-w-xl text-[13.6px] leading-5 text-[var(--proto-text-muted)]">
            AI-powered assessment of client calls across 6 SIGNAL dimensions.
          </p>
        </div>
        {action}
      </header>
      {children}
    </div>
  );
}

function CallRubricIndexTable({
  onOpen,
}: {
  onOpen: (row: CallRubricIndexRow) => void;
}) {
  return (
    <div
      data-call-rubric-index
      className="overflow-hidden rounded-lg border border-[var(--proto-border)] bg-[var(--proto-surface)] shadow-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
          <thead>
            <tr className="h-[36.5px] border-b border-[var(--proto-border)] text-[13.7px] font-medium text-[var(--proto-text)]">
              <th className="w-[22%] px-3 py-2 align-middle">Client</th>
              <th className="w-[14%] px-3 py-2 align-middle">Date</th>
              {SIGNAL_LETTERS.map((h) => (
                <th key={h} className="w-[8%] px-1 py-2 text-center align-middle">
                  <span className="font-mono text-sm font-medium">{h}</span>
                </th>
              ))}
              <th className="w-[10%] px-2 py-2 text-center align-middle">Total</th>
              <th className="w-[12%] px-2 py-2 text-center align-middle">Status</th>
            </tr>
          </thead>
          <tbody className="text-[13.7px]">
            {CALL_RUBRIC_INDEX_ROWS.map((row) => (
              <tr
                key={row.id}
                role="button"
                tabIndex={0}
                className="h-[49px] cursor-pointer border-b border-[var(--proto-border)] last:border-0 hover:bg-[var(--proto-surface-elevated)]/90"
                onClick={() => onOpen(row)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(row);
                  }
                }}
              >
                <td className="px-3 align-middle font-medium text-[var(--proto-text)]">
                  {row.client}
                </td>
                <td className="px-3 align-middle text-[var(--proto-text-muted)]">
                  {row.dateShort}
                </td>
                {row.scores.map((s, i) => (
                  <td key={i} className="px-1 text-center align-middle">
                    <ScoreBadge value={s} />
                  </td>
                ))}
                <td className="px-2 text-center align-middle">
                  <TotalCell num={row.totalNum} den={row.totalDen} />
                </td>
                <td className="px-2 text-center align-middle">
                  <StatusCell />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M5 9.5 11 6M5 6.5 11 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="4" r="2.25" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="4" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconMore() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="currentColor" aria-hidden>
      <circle cx="3" cy="8" r="1.35" />
      <circle cx="8" cy="8" r="1.35" />
      <circle cx="13" cy="8" r="1.35" />
    </svg>
  );
}

function CallRubricDetailView({
  detail,
  onBack,
  analysisTab,
  onTab,
  sim,
}: {
  detail: CallRubricDetail;
  onBack: () => void;
  analysisTab: "overview" | "transcript" | "metrics" | "automations";
  onTab: (t: typeof analysisTab) => void;
  sim: ReturnType<typeof useSimulatedPhases>;
}) {
  return (
    <div className="w-full max-w-[896px] space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <nav className="flex flex-wrap items-center gap-1.5 text-[13.7px] leading-5 text-[var(--proto-text-muted)]">
            <button
              type="button"
              onClick={onBack}
              className="rounded px-0.5 hover:text-[var(--proto-text)] hover:underline"
            >
              Calls
            </button>
            <span className="text-[var(--proto-text-muted)]" aria-hidden>
              /
            </span>
            <span className="sr-only">Current call</span>
          </nav>
          <h1 className="text-2xl font-semibold leading-8 text-[var(--proto-text)]">
            {detail.client}
          </h1>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[var(--proto-text-muted)]">
            <span className="text-[13.7px] leading-5">{detail.dateLong}</span>
            <span className="text-xs leading-4">{detail.transcriptFile}</span>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md border border-transparent text-[var(--proto-text-muted)] hover:bg-[var(--proto-surface-elevated)] hover:text-[var(--proto-text)]"
            aria-label="Share"
          >
            <IconShare />
          </button>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md border border-transparent text-[var(--proto-text-muted)] hover:bg-[var(--proto-surface-elevated)] hover:text-[var(--proto-text)]"
            aria-label="More"
          >
            <IconMore />
          </button>
        </div>
      </div>

      <section className="rounded-lg border border-[var(--proto-border)] bg-[var(--proto-surface)] p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 space-y-1">
            <p className="text-2xl font-bold leading-8 text-[var(--proto-rubric-total-headline)]">
              {detail.totalNum}/{detail.totalDen}
            </p>
            <p className="text-[13.7px] font-medium leading-5 text-[var(--proto-rubric-total-headline)]">
              {detail.band}
            </p>
            <p className="max-w-lg text-xs leading-4 text-[var(--proto-text-muted)]">
              {detail.tagline}
            </p>
          </div>
          <div className="flex shrink-0 gap-2 sm:gap-3">
            {SIGNAL_LETTERS.map((letter, i) => (
              <div key={letter} className="flex flex-col items-center gap-1">
                <span className="font-mono text-xs font-bold text-[var(--proto-text)]/70">
                  {letter}
                </span>
                <ScoreBadge value={detail.scores[i]!} size="hero" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--proto-border)] bg-[var(--proto-surface)] p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            className="size-4 shrink-0 text-[var(--proto-rubric-strength)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden
          >
            <path d="M3 8.5 6 12l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="text-[13.7px] font-semibold leading-5 text-[var(--proto-rubric-strength)]">
            Strengths
          </h2>
        </div>
        <ul className="space-y-3.5 text-[13.7px] leading-5 text-[var(--proto-text)]">
          {detail.strengths.map((line) => (
            <li key={line} className="flex gap-2 pl-0.5">
              <span className="shrink-0 font-normal text-[var(--proto-rubric-strength-bullet)]" aria-hidden>
                •
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-[var(--proto-border)] pt-5">
          <div className="mb-4 flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              className="size-4 shrink-0 text-[var(--proto-text-muted)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M8 3v10M3 8h10" strokeLinecap="round" />
            </svg>
            <h2 className="text-[13.7px] font-semibold leading-5 text-[var(--proto-text)]">
              Areas for Improvement
            </h2>
          </div>
          <ul className="space-y-3.5 text-[13.6px] leading-5 text-[var(--proto-text)]">
            {detail.improvements.map((line, idx) => (
              <li key={`${idx}-${line.slice(0, 24)}`} className="flex gap-2 pl-0.5">
                <span className="shrink-0 text-[var(--proto-text-muted)]" aria-hidden>
                  •
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--proto-border)] bg-[var(--proto-surface)] p-4 shadow-sm md:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[var(--proto-rubric-stub-pill-bg)] text-lg font-bold text-white">
            3
          </span>
          <h2 className="font-mono text-base font-semibold text-[var(--proto-text)]">S</h2>
          <span className="text-[15.4px] font-semibold text-[var(--proto-text)]">
            — Surface Challenges
          </span>
        </div>
        <p className="text-sm leading-6 text-[var(--proto-text-muted)]">
          Narrative assessment for this dimension (prototype). In production this
          section scrolls with full evidence, quotes, and “why it’s not a 5”
          guidance per SIGNAL.
        </p>
      </section>

      <div className="rounded-lg border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-1">
        <ProtoTabs
          tabs={
            [
              { id: "overview", label: "Pipeline (simulated)" },
              { id: "transcript", label: "Transcript" },
              { id: "metrics", label: "Metrics" },
              { id: "automations", label: "Automations" },
            ] as const
          }
          value={analysisTab}
          onChange={onTab}
        />
      </div>

      {analysisTab === "overview" ? (
        <ProtoPanel title="Real-time analysis (simulated)">
          <PhaseList phases={RUBRIC_PHASES} activeIndex={sim.phaseIndex} />
          <p className="mt-2 text-xs text-[var(--proto-text-muted)]">
            Phase:{" "}
            <strong className="text-[var(--proto-text)]">
              {sim.phaseLabel ?? "Idle"}
            </strong>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <PrimaryAction onClick={sim.start} disabled={sim.running}>
              {sim.running ? "Running…" : "Simulate run"}
            </PrimaryAction>
            <button
              type="button"
              onClick={sim.reset}
              className="rounded-md border border-[var(--proto-border)] bg-[var(--proto-surface)] px-3 py-2 text-sm text-[var(--proto-text)] hover:bg-[var(--proto-surface-elevated)]"
            >
              Reset phases
            </button>
          </div>
        </ProtoPanel>
      ) : null}

      {analysisTab === "transcript" ? (
        <ProtoPanel title="Transcript">
          <PlaceholderTextarea
            label="Source file"
            hint="Transcript preview (placeholder)…"
          />
        </ProtoPanel>
      ) : null}

      {analysisTab === "metrics" ? (
        <ProtoPanel title="Behavioral metrics (static)">
          <p className="text-sm text-[var(--proto-text-muted)]">
            Talk-time ratio, problem ownership, and reframe adoption appear here
            in the shipped tool.
          </p>
        </ProtoPanel>
      ) : null}

      {analysisTab === "automations" ? (
        <ProtoPanel title="Automation opportunities">
          <p className="text-sm text-[var(--proto-text-muted)]">
            Friction → Glare Block mapping (Define / Measure / Focus / Lead).
          </p>
        </ProtoPanel>
      ) : null}
    </div>
  );
}

export function CallRubricScreen() {
  const { theme, explorationKey } = usePrototype();
  const [openRow, setOpenRow] = useState<CallRubricIndexRow | null>(null);
  const [analysisTab, setAnalysisTab] = useState<
    "overview" | "transcript" | "metrics" | "automations"
  >("overview");
  const prevKey = useRef(explorationKey);
  const sim = useSimulatedPhases(RUBRIC_PHASES);

  useEffect(() => {
    if (prevKey.current !== explorationKey) {
      setOpenRow(null);
      setAnalysisTab("overview");
    }
    prevKey.current = explorationKey;
  }, [explorationKey]);

  const detail = openRow ? callDetailFromRow(openRow) : null;

  if (detail) {
    return (
      <div
        className={
          usesSignalRubricChrome(theme)
            ? "w-full px-4 pb-10 pt-2 md:px-8 lg:px-[5.5rem] lg:pt-4"
            : "mx-auto w-full max-w-4xl px-4 py-2 md:px-6"
        }
      >
        <CallRubricDetailView
          detail={detail}
          onBack={() => setOpenRow(null)}
          analysisTab={analysisTab}
          onTab={setAnalysisTab}
          sim={sim}
        />
      </div>
    );
  }

  return (
    <div
      className={
        usesSignalRubricChrome(theme)
          ? "w-full px-4 pb-10 pt-2 md:px-8 lg:px-[5.5rem] lg:pt-4"
          : "mx-auto w-full max-w-5xl px-4 py-2 md:px-6"
      }
    >
      <IndexChrome
        action={
          <PrimaryAction onClick={() => {}}>
            <svg
              viewBox="0 0 16 16"
              className="size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M8 3v10M3 8h10" strokeLinecap="round" />
            </svg>
            New Call
          </PrimaryAction>
        }
      >
        <CallRubricIndexTable onOpen={setOpenRow} />
        <p className="mt-4 text-xs text-[var(--proto-text-muted)]">
          Prototype: click a client to open the single-call layout. Reset state in
          the control panel returns to this index.
        </p>
      </IndexChrome>

      {!usesSignalRubricChrome(theme) ? (
        <div className="mt-10 border-t border-[var(--proto-border)] pt-8">
          <p className="mb-4 text-sm font-medium text-[var(--proto-text-muted)]">
            Non-Glare themes · exploratory panels
          </p>
          <LegacyExplorerTabs sim={sim} />
        </div>
      ) : null}
    </div>
  );
}

function LegacyExplorerTabs({
  sim,
}: {
  sim: ReturnType<typeof useSimulatedPhases>;
}) {
  const [mainTab, setMainTab] = useState<
    "transcript" | "scorecard" | "metrics" | "automations"
  >("transcript");

  return (
    <>
      <ProtoTabs
        tabs={
          [
            { id: "transcript", label: "Transcript" },
            { id: "scorecard", label: "Scorecard" },
            { id: "metrics", label: "Metrics" },
            { id: "automations", label: "Automations" },
          ] as const
        }
        value={mainTab}
        onChange={setMainTab}
      />
      {mainTab === "transcript" ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ProtoPanel title="Transcript ingestion">
            <PlaceholderTextarea label="Transcript" hint="Paste…" />
          </ProtoPanel>
          <ProtoPanel title="Simulated pipeline">
            <PhaseList phases={RUBRIC_PHASES} activeIndex={sim.phaseIndex} />
            <div className="mt-3 flex gap-2">
              <PrimaryAction onClick={sim.start} disabled={sim.running}>
                {sim.running ? "Running…" : "Simulate run"}
              </PrimaryAction>
              <button
                type="button"
                onClick={sim.reset}
                className="rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] px-3 py-2 text-sm"
              >
                Reset
              </button>
            </div>
          </ProtoPanel>
        </div>
      ) : null}
      {mainTab !== "transcript" ? (
        <p className="mt-4 text-sm text-[var(--proto-text-muted)]">
          Additional tabs mirror earlier prototype placeholders.
        </p>
      ) : null}
    </>
  );
}
