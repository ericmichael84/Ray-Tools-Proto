"use client";

import { screensInGroup } from "@/lib/prototype/constants";
import { usePrototype } from "@/lib/prototype/context";
import { ScreenRouter } from "../screens/ScreenRouter";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-6 shrink-0 ${active ? "text-[var(--proto-accent)]" : "text-[var(--proto-text-muted)]"}`}
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0 text-[var(--proto-text-muted)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4.5-4.5" strokeLinecap="round" />
    </svg>
  );
}

function FeedComposer() {
  return (
    <div className="mb-3 rounded-xl border border-[var(--proto-border)] bg-[var(--proto-surface)] p-3 shadow-sm md:mb-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--proto-accent)] to-sky-600 text-sm font-bold text-[var(--proto-accent-fg)]">
          R
        </div>
        <div className="min-w-0 flex-1 cursor-default rounded-full bg-[var(--proto-canvas)] px-4 py-2.5 text-sm text-[var(--proto-text-muted)]">
          What&apos;s driving your roadmap? (placeholder composer)
        </div>
      </div>
    </div>
  );
}

function SmallFeedCard({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent?: string;
}) {
  return (
    <article className="mb-3 rounded-xl border border-[var(--proto-border)] bg-[var(--proto-surface)] p-3 shadow-sm last:mb-0 md:p-4">
      {accent ? (
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--proto-text-muted)]">
          {accent}
        </p>
      ) : null}
      <h3 className="text-sm font-semibold text-[var(--proto-text)]">{title}</h3>
      <p className="mt-1 text-sm leading-snug text-[var(--proto-text-muted)]">{body}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded-md bg-[var(--proto-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--proto-accent-fg)]"
        >
          Act
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-xs font-semibold text-[var(--proto-accent)]"
        >
          Save
        </button>
      </div>
    </article>
  );
}

function RightRail() {
  return (
    <aside
      className="hidden shrink-0 space-y-3 overflow-y-auto py-3 pl-2 pr-1 md:block md:w-[280px] xl:w-[300px]"
      aria-label="Contextual"
    >
      <div className="rounded-xl border border-[var(--proto-border)] bg-[var(--proto-surface)] p-3 shadow-sm">
        <p className="text-xs font-semibold text-[var(--proto-text-muted)]">Sponsored</p>
        <div className="mt-2 h-24 rounded-lg border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)]" />
        <p className="mt-2 text-xs text-[var(--proto-text-muted)]">
          Placeholder placement — no real ads.
        </p>
      </div>
      <div className="rounded-xl border border-[var(--proto-border)] bg-[var(--proto-surface)] p-3 shadow-sm">
        <p className="text-sm font-semibold text-[var(--proto-text)]">Contacts</p>
        <ul className="mt-2 space-y-2">
          {["A", "B", "C"].map((l) => (
            <li key={l} className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-[var(--proto-surface-elevated)] text-xs font-semibold text-[var(--proto-text-muted)]">
                {l}
              </span>
              <span className="text-sm text-[var(--proto-text)]">Teammate {l}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-[var(--proto-border)] bg-[var(--proto-surface)] p-3 text-xs leading-relaxed text-[var(--proto-text-muted)] shadow-sm">
        Right rail: recommendations, activity, quick actions — depth without
        leaving the feed (PRD §4.6).
      </div>
    </aside>
  );
}

export function FacebookRayStructure() {
  const { screen, setScreen } = usePrototype();
  const tools = screensInGroup("tools");
  const activeLabel =
    screen === "dashboard"
      ? "Home"
      : tools.find((t) => t.id === screen)?.label ?? "Ray";

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[var(--proto-canvas)] text-[var(--proto-text)]">
      <header className="flex shrink-0 items-center gap-2 border-b border-[var(--proto-border)] bg-[var(--proto-surface)] px-2 py-2 shadow-sm md:gap-3 md:px-4">
        <button
          type="button"
          className="proto-nav-hover flex size-10 shrink-0 items-center justify-center rounded-full"
          aria-label="Menu (placeholder)"
        >
          <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
            <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
          </svg>
        </button>
        <div className="flex shrink-0 items-center gap-2 pr-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--proto-accent)] to-sky-600 text-sm font-bold text-[var(--proto-accent-fg)]">
            R
          </div>
          <span className="hidden text-xl font-bold tracking-tight text-[var(--proto-accent)] sm:inline">
            Ray
          </span>
        </div>
        <div className="mx-auto hidden min-w-0 max-w-xl flex-1 md:block">
          <div className="flex items-center gap-2 rounded-full bg-[var(--proto-canvas)] px-3 py-2">
            <SearchIcon />
            <span className="truncate text-sm text-[var(--proto-text-muted)]">
              Search Ray (placeholder)
            </span>
          </div>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="proto-nav-hover flex size-10 shrink-0 items-center justify-center rounded-full"
            aria-label="Video (placeholder)"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6 text-[var(--proto-accent)]"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </button>
          <button
            type="button"
            className="proto-nav-hover relative flex size-10 shrink-0 items-center justify-center rounded-full"
            aria-label="Notifications (placeholder)"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6 fill-current text-[var(--proto-text-muted)]"
              aria-hidden
            >
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.13 5.36 5 7.92 5 11v5l-2 2v1h18v-1l-2-2z" />
            </svg>
            <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500 ring-2 ring-[var(--proto-surface)]" />
          </button>
          <button
            type="button"
            className="ml-1 flex size-9 items-center justify-center rounded-full bg-[var(--proto-surface-elevated)] text-sm font-semibold text-[var(--proto-text)] hover:opacity-90"
            aria-label="Profile (placeholder)"
          >
            Z
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <nav
          aria-label="Primary sections"
          className="flex shrink-0 gap-1 overflow-x-auto border-b border-[var(--proto-border)] bg-[var(--proto-surface)] px-2 py-2 md:w-60 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r md:px-0 md:py-3"
        >
          <div className="hidden px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--proto-text-muted)] md:block">
            Navigate
          </div>
          <button
            type="button"
            onClick={() => setScreen("dashboard")}
            className={`flex min-w-[3.5rem] flex-col items-center gap-1 rounded-lg px-2 py-2 md:flex-row md:gap-3 md:px-3 md:py-2.5 md:mx-2 md:rounded-xl ${
              screen === "dashboard" ? "proto-nav-active" : "proto-nav-hover"
            }`}
          >
            <HomeIcon active={screen === "dashboard"} />
            <span className="text-[11px] font-medium md:text-sm">Home</span>
          </button>
          <div className="mx-2 my-2 hidden h-px bg-[var(--proto-border)] md:block" />
          <p className="hidden px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--proto-text-muted)] md:block">
            Shortcuts
          </p>
          {tools.map((item) => {
            const on = screen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setScreen(item.id)}
                className={`flex min-w-[3.5rem] flex-col items-center gap-1 rounded-lg px-2 py-2 md:flex-row md:gap-3 md:px-3 md:py-2.5 md:mx-2 md:rounded-xl ${
                  on ? "proto-nav-active" : "proto-nav-hover"
                }`}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--proto-surface-elevated)] text-xs font-semibold text-[var(--proto-text-muted)]">
                  {item.initial}
                </span>
                <span className="max-w-[4.5rem] truncate text-[11px] font-medium md:max-w-none md:text-sm">
                  {item.navLabel}
                </span>
              </button>
            );
          })}
          <div className="hidden flex-1 md:block" />
          <button
            type="button"
            onClick={() => setScreen("settings")}
            className={`mx-2 mt-auto flex min-w-[3.5rem] flex-col items-center gap-1 rounded-lg px-2 py-2 md:flex-row md:gap-3 md:px-3 md:py-2.5 md:rounded-xl ${
              screen === "settings" ? "proto-nav-active" : "proto-nav-hover"
            }`}
          >
            <span className="text-lg md:text-base" aria-hidden>
              ⚙
            </span>
            <span className="text-[11px] font-medium md:text-sm">Settings</span>
          </button>
        </nav>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col md:flex-row">
          <main
            className="min-h-0 flex-1 overflow-y-auto px-2 py-3 md:px-4 md:py-4"
            aria-label="Feed"
          >
            <div className="mx-auto max-w-[680px]">
              <FeedComposer />
              <SmallFeedCard
                accent="Suggested for you"
                title="Pick up where you left off"
                body="Continue exploring the pipeline or open a Playground tool — interactions stay shallow by design."
              />
              <SmallFeedCard
                accent="Action module"
                title="Start a quick comparison"
                body="Simulated entry point into Data Comparison without leaving the feed context."
              />
              <div className="mt-3 rounded-xl border border-[var(--proto-border)] bg-[var(--proto-surface)] shadow-md md:mt-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--proto-border)] px-3 py-2.5 md:px-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--proto-text-muted)]">
                      Embedded module
                    </p>
                    <p className="text-sm font-semibold text-[var(--proto-text)] md:text-base">
                      {activeLabel}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--proto-text-muted)]">
                    PRD: depth increases progressively, not via app switching
                  </span>
                </div>
                <div className="min-h-[50vh]">
                  <ScreenRouter />
                </div>
              </div>
            </div>
          </main>
          <RightRail />
        </div>
      </div>
    </div>
  );
}
