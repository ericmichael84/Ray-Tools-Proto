"use client";

import { useEffect, useRef, useState } from "react";
import { SCREENS } from "@/lib/prototype/constants";
import { usePrototype } from "@/lib/prototype/context";
import type { ScreenId } from "@/lib/prototype/types";
import { ScreenRouter } from "../screens/ScreenRouter";

function AppsGridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
      <circle cx="5" cy="5" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="12" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-4 shrink-0 text-[var(--proto-text-muted)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M12.5 12.5L17 17" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 text-[var(--proto-text-muted)]"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 text-[var(--proto-text-muted)]"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9.5 9.5a2.8 2.8 0 115.2 1.5c-.8.6-1.2 1-1.2 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function GoogleRayStructure() {
  const { screen, setScreen } = usePrototype();
  const [launcherOpen, setLauncherOpen] = useState(false);
  const launcherRef = useRef<HTMLDivElement>(null);

  const active = SCREENS.find((s) => s.id === screen) ?? SCREENS[0]!;

  useEffect(() => {
    if (!launcherOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      if (
        launcherRef.current &&
        !launcherRef.current.contains(e.target as Node)
      ) {
        setLauncherOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [launcherOpen]);

  function pickApp(id: ScreenId) {
    setScreen(id);
    setLauncherOpen(false);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[var(--proto-canvas)]">
      <header className="flex shrink-0 flex-col border-b border-[var(--proto-border)] bg-[var(--proto-surface)] shadow-[var(--proto-shadow)]">
        <div className="flex min-h-[56px] items-center gap-2 px-3 py-2 md:gap-3 md:px-4">
          <button
            type="button"
            className="proto-nav-hover flex size-10 shrink-0 items-center justify-center rounded-full text-[var(--proto-text-muted)] md:hidden"
            aria-label="Main menu (placeholder)"
          >
            <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
              <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            </svg>
          </button>

          <div className="flex shrink-0 items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--proto-accent)] text-xs font-bold text-[var(--proto-accent-fg)] shadow-sm">
              R
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="text-[15px] font-medium tracking-tight text-[var(--proto-text)]">
                Ray
              </p>
              <p className="text-[11px] text-[var(--proto-text-muted)]">Workspace</p>
            </div>
          </div>

          <div className="mx-1 hidden min-w-0 flex-1 md:mx-2 md:block lg:mx-8 lg:max-w-2xl">
            <div className="flex items-center gap-3 rounded-full border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-4 py-2.5 shadow-inner">
              <SearchIcon />
              <span className="truncate text-sm text-[var(--proto-text-muted)]">
                Search across apps (placeholder)
              </span>
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            <div className="relative" ref={launcherRef}>
              <button
                type="button"
                onClick={() => setLauncherOpen((o) => !o)}
                className={`proto-nav-hover flex size-10 items-center justify-center rounded-full text-[var(--proto-text-muted)] transition-colors ${
                  launcherOpen ? "proto-nav-active" : ""
                }`}
                aria-expanded={launcherOpen}
                aria-haspopup="true"
                aria-controls="ray-app-launcher"
                title="App launcher — switch modules"
              >
                <AppsGridIcon />
              </button>
              {launcherOpen ? (
                <div
                  id="ray-app-launcher"
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-[var(--proto-border)] bg-[var(--proto-surface)] p-3 shadow-lg"
                >
                  <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--proto-text-muted)]">
                    Apps in this workspace
                  </p>
                  <ul className="grid grid-cols-3 gap-2 sm:grid-cols-3">
                    {SCREENS.map((app) => {
                      const on = screen === app.id;
                      return (
                        <li key={app.id}>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => pickApp(app.id)}
                            className={`flex w-full flex-col items-center gap-1.5 rounded-lg border px-1.5 py-3 text-center transition-colors ${
                              on
                                ? "border-[var(--proto-border)] proto-nav-active"
                                : "border-transparent proto-nav-hover"
                            }`}
                          >
                            <span className="flex size-10 items-center justify-center rounded-lg bg-[var(--proto-surface-elevated)] text-sm font-semibold text-[var(--proto-text)]">
                              {app.initial}
                            </span>
                            <span className="line-clamp-2 text-[11px] font-medium leading-tight text-[var(--proto-text)]">
                              {app.navLabel}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-2 border-t border-[var(--proto-border)] px-1 pt-2 text-[10px] leading-snug text-[var(--proto-text-muted)]">
                    PRD: launcher is the primary way to move between modules — no
                    flow gating.
                  </p>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              className="proto-nav-hover hidden size-10 items-center justify-center rounded-full sm:flex"
              aria-label="Help (placeholder)"
            >
              <HelpIcon />
            </button>
            <button
              type="button"
              className="proto-nav-hover hidden size-10 items-center justify-center rounded-full md:flex"
              aria-label="Notifications (placeholder)"
            >
              <BellIcon />
            </button>
            <button
              type="button"
              className="ml-0.5 flex size-9 items-center justify-center rounded-full border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] text-xs font-semibold text-[var(--proto-text)] hover:opacity-90"
              aria-label="Account (placeholder)"
              title="Account"
            >
              Z
            </button>
          </div>
        </div>

        <div className="border-t border-[var(--proto-border)] px-3 py-2 md:hidden">
          <div className="flex items-center gap-2 rounded-full border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-3 py-2">
            <SearchIcon />
            <span className="truncate text-xs text-[var(--proto-text-muted)]">Search…</span>
          </div>
        </div>
      </header>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[var(--proto-border)] bg-[var(--proto-surface)] px-3 py-2 md:px-4">
        <div className="min-w-0 text-sm text-[var(--proto-text-muted)]">
          <span className="text-[var(--proto-text-muted)]">Ray</span>
          <span className="mx-1.5 text-[var(--proto-text-muted)]/50" aria-hidden>
            /
          </span>
          <span className="font-medium text-[var(--proto-text)]">{active.label}</span>
        </div>
        <button
          type="button"
          onClick={() => setLauncherOpen(true)}
          className="proto-nav-hover shrink-0 rounded-md px-2 py-1 text-sm font-medium text-[var(--proto-accent)]"
        >
          Switch app
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <ScreenRouter />
      </div>
    </div>
  );
}
