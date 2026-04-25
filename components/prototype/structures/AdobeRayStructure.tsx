"use client";

import { useMemo, useState } from "react";
import { SCREENS, type ScreenConfig } from "@/lib/prototype/constants";
import { usePrototype } from "@/lib/prototype/context";
import type { ScreenGroupId, ScreenId } from "@/lib/prototype/types";
import { ScreenRouter } from "../screens/ScreenRouter";

type CatalogScope = "all" | ScreenGroupId;
type AdobeView = "catalog" | "app";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-[var(--proto-text-muted)]"
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

function ToolCard({
  item,
  installed,
  selected,
  onTry,
  onInstall,
  onOpen,
}: {
  item: ScreenConfig;
  installed: boolean;
  selected: boolean;
  onTry: () => void;
  onInstall: () => void;
  onOpen: () => void;
}) {
  return (
    <article
      className={`flex flex-col rounded-lg border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-4 shadow-sm transition-colors ${
        selected
          ? "ring-2 ring-[var(--proto-accent)]/50 ring-offset-2 ring-offset-[var(--proto-canvas)]"
          : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-md text-lg font-semibold text-[var(--proto-accent-fg)]"
          style={{
            background: `color-mix(in srgb, var(--proto-accent) 42%, var(--proto-surface-elevated))`,
          }}
          aria-hidden
        >
          {item.initial}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[var(--proto-text)]">{item.label}</h3>
          <p className="mt-1 text-sm leading-snug text-[var(--proto-text-muted)]">
            {item.description}
          </p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-[var(--proto-text-muted)]">
            {item.group === "tools" ? "Playground tool" : "Overview"}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onTry}
          className="proto-nav-hover rounded-md border border-[var(--proto-border)] px-3 py-1.5 text-xs font-semibold text-[var(--proto-text)]"
        >
          Try
        </button>
        {!installed ? (
          <button
            type="button"
            onClick={onInstall}
            className="rounded-md bg-[var(--proto-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--proto-accent-fg)] transition-opacity hover:opacity-90"
          >
            Install
          </button>
        ) : null}
        <button
          type="button"
          onClick={onOpen}
          disabled={!installed}
          className="rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-35"
          style={{
            backgroundColor: installed ? "var(--proto-accent)" : "transparent",
            color: installed ? "var(--proto-accent-fg)" : "var(--proto-text-muted)",
            border: installed ? "none" : "1px solid var(--proto-border)",
          }}
        >
          Open
        </button>
      </div>
    </article>
  );
}

export function AdobeRayStructure() {
  const { screen, setScreen } = usePrototype();
  const [view, setView] = useState<AdobeView>("catalog");
  const [scope, setScope] = useState<CatalogScope>("all");
  const [installed, setInstalled] = useState<Partial<Record<ScreenId, true>>>({});

  const catalogItems = useMemo(() => {
    if (scope === "all") return SCREENS;
    return SCREENS.filter((s) => s.group === scope);
  }, [scope]);

  const currentMeta = SCREENS.find((s) => s.id === screen);

  const launch = (id: ScreenId) => {
    setScreen(id);
    setView("app");
  };

  const markInstalled = (id: ScreenId) => {
    setInstalled((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[var(--proto-canvas)] text-[var(--proto-text)]">
      <header className="flex shrink-0 flex-wrap items-center gap-2 border-b border-[var(--proto-border)] bg-[var(--proto-surface)] px-3 py-2 md:gap-3 md:px-4">
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-[var(--proto-text)]">
            Ray
          </span>
          <span className="rounded border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--proto-text-muted)]">
            CC
          </span>
        </div>
        <div className="order-last flex min-w-[12rem] flex-1 basis-full items-center gap-2 rounded-md border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-2 py-1.5 md:order-none md:max-w-md md:basis-auto">
          <SearchIcon />
          <span className="truncate text-xs text-[var(--proto-text-muted)]">
            Search capabilities… (placeholder)
          </span>
        </div>
        <nav
          aria-label="Global categories (placeholder)"
          className="ml-auto flex flex-wrap items-center gap-1 md:gap-2"
        >
          {["Discover", "Create", "Publish"].map((label) => (
            <button
              key={label}
              type="button"
              className="proto-nav-hover rounded-full border border-[var(--proto-border)] px-2.5 py-1 text-[11px] font-medium text-[var(--proto-text-muted)]"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--proto-accent)] text-xs font-semibold text-[var(--proto-accent-fg)] hover:opacity-90"
            aria-label="Account (placeholder)"
          >
            Z
          </button>
        </nav>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside
          aria-label="Catalog filters"
          className="flex shrink-0 flex-col gap-4 border-b border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-3 py-3 md:w-56 md:border-b-0 md:border-r md:py-4"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--proto-text-muted)]">
              Categories
            </p>
            <ul className="mt-2 space-y-0.5">
              {(
                [
                  { id: "all" as const, label: "All capabilities" },
                  { id: "tools" as const, label: "Playground tools" },
                  { id: "overview" as const, label: "Overview" },
                ] as const
              ).map((row) => (
                <li key={row.id}>
                  <button
                    type="button"
                    onClick={() => setScope(row.id)}
                    className={`w-full rounded-md px-2 py-2 text-left text-sm transition-colors ${
                      scope === row.id ? "proto-nav-active" : "proto-nav-hover"
                    }`}
                  >
                    {row.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--proto-text-muted)]">
              Filters
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--proto-text-muted)]">
              Type · Use case — visual placeholders (PRD §4.1).
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {["Analysis", "Data", "Design"].map((chip) => (
                <span
                  key={chip}
                  className="rounded border border-[var(--proto-border)] px-2 py-0.5 text-[10px] font-medium text-[var(--proto-text-muted)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-h-0 min-w-0 flex-1 overflow-hidden bg-[var(--proto-canvas)]">
          {view === "catalog" ? (
            <div className="h-full overflow-y-auto px-4 py-5 md:px-6 md:py-6">
              <div className="mb-6 max-w-3xl">
                <h1 className="text-xl font-semibold text-[var(--proto-text)] md:text-2xl">
                  App catalog
                </h1>
                <p className="mt-1 text-sm leading-relaxed text-[var(--proto-text-muted)]">
                  Browse capabilities, simulate install, then open a lightweight tool surface (PRD
                  §4.2–4.4). State is visual only.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {catalogItems.map((item) => (
                  <ToolCard
                    key={item.id}
                    item={item}
                    installed={!!installed[item.id]}
                    selected={screen === item.id}
                    onTry={() => launch(item.id)}
                    onInstall={() => markInstalled(item.id)}
                    onOpen={() => launch(item.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-0 flex-col">
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[var(--proto-border)] bg-[var(--proto-surface)] px-3 py-2 md:px-4">
                <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-[var(--proto-text)]">Ray</span>
                  <span className="text-[var(--proto-text-muted)]">/</span>
                  <span className="truncate text-[var(--proto-text-muted)]">
                    {currentMeta?.label ?? "Tool"}
                  </span>
                  <span className="hidden rounded border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--proto-accent)] sm:inline">
                    In use
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setView("catalog")}
                  className="proto-nav-hover shrink-0 rounded-md border border-[var(--proto-border)] px-3 py-1.5 text-xs font-semibold text-[var(--proto-text)]"
                >
                  ← Back to catalog
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-auto border-t border-[var(--proto-border)] bg-[var(--proto-canvas)]">
                <ScreenRouter />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
