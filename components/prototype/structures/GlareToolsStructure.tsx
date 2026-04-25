"use client";

import { useState } from "react";
import { SCREENS } from "@/lib/prototype/constants";
import { usePrototype } from "@/lib/prototype/context";
import { ScreenRouter } from "../screens/ScreenRouter";
import { GlareNavIcon } from "./glare-nav-icons";

function CollapseIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      className={`size-[18px] text-[var(--proto-text-muted)] transition-transform ${open ? "" : "rotate-180"}`}
      aria-hidden
    >
      <path
        d="M11.5 4.5L6.5 9l5 4.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GlareToolsStructure() {
  const { screen, setScreen } = usePrototype();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-0 flex-1 bg-[var(--proto-surface)] text-[var(--proto-text)]">
      <aside
        className={`flex shrink-0 flex-col border-r border-[var(--proto-border)] bg-[var(--proto-surface)] transition-[width] duration-200 ease-out ${
          collapsed ? "w-[72px]" : "w-[240px]"
        }`}
      >
        <div className="flex h-[52px] shrink-0 items-center gap-2 border-b border-[var(--proto-border)] px-4">
          {!collapsed ? (
            <span className="min-w-0 flex-1 truncate text-[17px] font-semibold leading-7 text-[var(--proto-accent)]">
              Glare Playground
            </span>
          ) : (
            <span className="sr-only">Glare Playground</span>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="proto-nav-hover flex size-9 shrink-0 items-center justify-center rounded border border-transparent text-[var(--proto-text-muted)] hover:text-[var(--proto-text)]"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            <CollapseIcon open={!collapsed} />
          </button>
        </div>

        <nav
          aria-label="Playground apps"
          className="min-h-0 flex-1 overflow-y-auto px-2 py-2"
        >
          <ul className="flex flex-col gap-0.5">
            {SCREENS.map((item) => {
              const active = screen === item.id;
              const base =
                "flex w-full items-center gap-2 rounded py-2 text-[13.5px] leading-5 transition-colors";
              const expanded = collapsed
                ? active
                  ? "proto-nav-active justify-center"
                  : "proto-nav-hover justify-center text-[var(--proto-text)]"
                : active
                  ? "proto-nav-active border-l-4 border-[var(--proto-accent)] px-3 text-left font-medium"
                  : "proto-nav-hover border-l-4 border-transparent px-3 text-left font-normal text-[var(--proto-text)]";
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setScreen(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`${base} ${expanded}`}
                  >
                    <GlareNavIcon screen={item.id} />
                    {!collapsed ? (
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="h-14 shrink-0 bg-[var(--proto-text)] text-[var(--proto-surface)]"
          aria-hidden
          title="Account / footer slot"
        />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[var(--proto-canvas)]">
        <ScreenRouter />
      </div>
    </div>
  );
}
