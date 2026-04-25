"use client";

import { useState } from "react";
import {
  PhaseList,
  PlaceholderInputRow,
  PlaceholderTextarea,
  ProtoBadge,
  ProtoPanel,
  ProtoScreenHeader,
  ProtoTabs,
  useSimulatedPhases,
} from "../tools/playground-ui";

const PIPELINE = [
  "Extract VP context",
  "Fetch pages (parallel)",
  "Analyze vs. priorities",
] as const;

const VP_PRIORITIES = [
  "Grow self-serve conversion in Q3",
  "Reduce support load on billing",
  "Differentiate on trust for enterprise",
];

const PAGES = [
  { id: "p1", url: "acme.com/pricing", issues: 4, status: "done" as const },
  { id: "p2", url: "acme.com/signup", issues: 6, status: "done" as const },
  { id: "p3", url: "acme.com/docs/api", issues: 0, status: "pending" as const },
];

const ISSUES = {
  business: [
    {
      title: "Pricing page lacks ROI proof",
      sev: "High" as const,
      vp: "Grow self-serve conversion",
    },
  ],
  presentation: [
    {
      title: "Hero competes with primary CTA",
      sev: "Medium" as const,
      vp: "Trust for enterprise",
    },
  ],
  interaction: [
    {
      title: "Signup exposes optional fields too early",
      sev: "Low" as const,
      vp: "Reduce support load",
    },
  ],
};

const CHAT_TOOLS = [
  "getAuditOverview",
  "getVPContext",
  "getPageAnalysis(pageId)",
  "comparePages(pageA, pageB)",
  "searchIssues(keyword)",
];

export function DesignAnalysisScreen() {
  const [tab, setTab] = useState<"setup" | "results" | "chat">("setup");
  const sim = useSimulatedPhases(PIPELINE);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <ProtoScreenHeader
        kicker="Tool · Design Analysis"
        title="Design Analysis"
        subtitle="VP transcript + page URLs → categorized issues and conversational exploration — chat tools listed statically."
      />

      <ProtoTabs
        tabs={
          [
            { id: "setup", label: "Context & pages" },
            { id: "results", label: "Results" },
            { id: "chat", label: "Chat" },
          ] as const
        }
        value={tab}
        onChange={setTab}
      />

      {tab === "setup" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <ProtoPanel title="Context setup">
            <PlaceholderTextarea
              label="VP conversation transcript"
              hint="Paste stakeholder conversation…"
            />
            <PlaceholderTextarea
              label="Audit overview"
              hint="Goals, scope, business context…"
            />
            <p className="text-xs text-[var(--proto-text-muted)]">
              GPT-4o extraction of priorities, audience, metrics (not wired).
            </p>
          </ProtoPanel>
          <ProtoPanel title="Page management">
            <PlaceholderInputRow
              label="Add page URL"
              placeholder="https://…"
            />
            <ul className="space-y-2 text-sm">
              {PAGES.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-2 rounded border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-3 py-2"
                >
                  <span className="truncate font-mono text-xs text-[var(--proto-text)]">
                    {p.url}
                  </span>
                  <ProtoBadge tone={p.status === "done" ? "good" : "neutral"}>
                    {p.status === "done"
                      ? `${p.issues} issues`
                      : "Pending"}
                  </ProtoBadge>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={sim.start}
                disabled={sim.running}
                className="rounded-[var(--proto-radius-sm)] bg-[var(--proto-accent)] px-3 py-1.5 text-sm font-medium text-[var(--proto-accent-fg)] disabled:opacity-50"
              >
                {sim.running ? "Analyzing…" : "Simulate pipeline"}
              </button>
              <button
                type="button"
                onClick={sim.reset}
                className="ml-2 rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] px-3 py-1.5 text-sm"
              >
                Reset
              </button>
            </div>
            <PhaseList phases={PIPELINE} activeIndex={sim.phaseIndex} />
          </ProtoPanel>
        </div>
      ) : null}

      {tab === "results" ? (
        <div className="grid gap-4 lg:grid-cols-3">
          <ProtoPanel title="VP priorities (sample)">
            <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--proto-text-muted)]">
              {VP_PRIORITIES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </ProtoPanel>
          <ProtoPanel title="Tabbed pages (outline)" className="lg:col-span-2">
            <p className="mb-3 text-sm text-[var(--proto-text-muted)]">
              One tab per analyzed page · 3-column layout: Business /
              Presentation / Interaction.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {(
                [
                  ["Business", ISSUES.business],
                  ["Presentation", ISSUES.presentation],
                  ["Interaction", ISSUES.interaction],
                ] as const
              ).map(([title, list]) => (
                <div
                  key={title}
                  className="rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-3"
                >
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--proto-text-muted)]">
                    {title}
                  </p>
                  <ul className="space-y-2">
                    {list.map((issue) => (
                      <li
                        key={issue.title}
                        className="rounded border border-[var(--proto-border)] bg-[var(--proto-surface)] p-2 text-sm"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <ProtoBadge
                            tone={
                              issue.sev === "High"
                                ? "bad"
                                : issue.sev === "Medium"
                                  ? "warn"
                                  : "neutral"
                            }
                          >
                            {issue.sev}
                          </ProtoBadge>
                          <span className="font-medium text-[var(--proto-text)]">
                            {issue.title}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[var(--proto-text-muted)]">
                          VP link: {issue.vp}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ProtoPanel>
        </div>
      ) : null}

      {tab === "chat" ? (
        <div className="grid gap-4 lg:grid-cols-5">
          <ProtoPanel title="Suggested prompts" className="lg:col-span-2">
            <ul className="space-y-2 text-sm">
              {[
                "Summarize audit with severity breakdown",
                "List business issues only",
                "Compare pricing vs. signup",
              ].map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    className="w-full rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-3 py-2 text-left text-[var(--proto-text)] hover:bg-[var(--proto-surface)]"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[var(--proto-text-muted)]">
              Tool calling (8 tools, up to 10 rounds) — not executed here.
            </p>
            <ul className="mt-2 grid grid-cols-1 gap-1 font-mono text-[10px] text-[var(--proto-text-muted)]">
              {CHAT_TOOLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </ProtoPanel>
          <ProtoPanel title="Conversation (static)" className="lg:col-span-3">
            <div className="space-y-3 rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-4 text-sm text-[var(--proto-text-muted)]">
              <p>
                <strong className="text-[var(--proto-text)]">You:</strong>{" "}
                What are the top business risks across pages?
              </p>
              <p>
                <strong className="text-[var(--proto-text)]">Assistant:</strong>{" "}
                Placeholder markdown response. High-severity items cluster on
                pricing (ROI proof) and signup (optional fields). Enable debug
                mode to inspect tool calls (not wired).
              </p>
            </div>
            <PlaceholderInputRow
              label="Message"
              placeholder="Ask about the audit…"
            />
          </ProtoPanel>
        </div>
      ) : null}
    </div>
  );
}
