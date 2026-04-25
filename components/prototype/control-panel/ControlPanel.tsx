"use client";

import { SCREENS, THEMES, VARIATIONS } from "@/lib/prototype/constants";
import { usePrototype } from "@/lib/prototype/context";
import type { ScreenId, ThemeId, VariationId } from "@/lib/prototype/types";

export function ControlPanel() {
  const {
    variation,
    theme,
    screen,
    setVariation,
    setTheme,
    setScreen,
    resetExploration,
  } = usePrototype();

  return (
    <div
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-50 border-t bg-gradient-to-b pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[var(--proto-chrome-shadow)]"
      style={{
        borderColor: "var(--proto-chrome-border)",
        background: `linear-gradient(to bottom, var(--proto-chrome-from), var(--proto-chrome-to))`,
        color: "var(--proto-chrome-text)",
      }}
      data-prototype-chrome
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 md:flex-row md:items-end md:justify-between md:gap-6 md:px-4 md:py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
            style={{
              borderColor: "var(--proto-chrome-badge-border)",
              background: "var(--proto-chrome-badge-bg)",
              color: "var(--proto-chrome-text)",
            }}
          >
            Prototype
          </span>
          <span className="text-xs" style={{ color: "var(--proto-chrome-muted)" }}>
            Structure, theme, and screen are independent layers.
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end md:justify-end">
          <label
            className="flex min-w-[10rem] flex-1 flex-col gap-1 text-[11px] font-medium uppercase tracking-wide"
            style={{ color: "var(--proto-chrome-muted)" }}
          >
            Variation
            <select
              value={variation}
              onChange={(e) => setVariation(e.target.value as VariationId)}
              className="rounded-md border px-2 py-1.5 text-sm font-normal normal-case outline-none focus:ring-2 focus:ring-[var(--proto-accent)]"
              style={{
                borderColor: "var(--proto-chrome-input-border)",
                background: "var(--proto-chrome-input-bg)",
                color: "var(--proto-chrome-input-text)",
              }}
            >
              {VARIATIONS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label
            className="flex min-w-[10rem] flex-1 flex-col gap-1 text-[11px] font-medium uppercase tracking-wide"
            style={{ color: "var(--proto-chrome-muted)" }}
          >
            Theme
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeId)}
              className="rounded-md border px-2 py-1.5 text-sm font-normal normal-case outline-none focus:ring-2 focus:ring-[var(--proto-accent)]"
              style={{
                borderColor: "var(--proto-chrome-input-border)",
                background: "var(--proto-chrome-input-bg)",
                color: "var(--proto-chrome-input-text)",
              }}
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <label
            className="flex min-w-[10rem] flex-1 flex-col gap-1 text-[11px] font-medium uppercase tracking-wide"
            style={{ color: "var(--proto-chrome-muted)" }}
          >
            Screen
            <select
              value={screen}
              onChange={(e) => setScreen(e.target.value as ScreenId)}
              className="rounded-md border px-2 py-1.5 text-sm font-normal normal-case outline-none focus:ring-2 focus:ring-[var(--proto-accent)]"
              style={{
                borderColor: "var(--proto-chrome-input-border)",
                background: "var(--proto-chrome-input-bg)",
                color: "var(--proto-chrome-input-text)",
              }}
            >
              {SCREENS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={resetExploration}
            className="shrink-0 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:opacity-95"
            style={{
              borderColor: "var(--proto-chrome-reset-border)",
              background: "var(--proto-chrome-reset-bg)",
              color: "var(--proto-chrome-reset-text)",
            }}
          >
            Reset state
          </button>
        </div>
      </div>
    </div>
  );
}
