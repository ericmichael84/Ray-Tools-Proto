"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function ProtoScreenHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="space-y-2">
      <p className="text-sm font-medium tracking-wide text-[var(--proto-text-muted)]">
        {kicker}
      </p>
      <h1 className="font-[family-name:var(--proto-font-heading)] text-2xl font-semibold tracking-tight text-[var(--proto-text)] md:text-3xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="max-w-2xl text-[var(--proto-text-muted)]">{subtitle}</p>
      ) : null}
    </header>
  );
}

export function ProtoTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div
      data-proto-tabs
      role="tablist"
      className="flex flex-wrap gap-1 rounded-[var(--proto-radius-md)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] p-1"
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-[var(--proto-radius-sm)] px-3 py-1.5 text-sm font-medium transition-colors ${
            value === t.id
              ? "bg-[var(--proto-accent)] text-[var(--proto-accent-fg)]"
              : "text-[var(--proto-text-muted)] hover:text-[var(--proto-text)]"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function ProtoBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  const cls =
    tone === "good"
      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
      : tone === "warn"
        ? "bg-amber-500/15 text-amber-900 dark:text-amber-100"
        : tone === "bad"
          ? "bg-red-500/15 text-red-800 dark:text-red-200"
          : "bg-[var(--proto-surface-elevated)] text-[var(--proto-text-muted)]";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}
    >
      {children}
    </span>
  );
}

export function ProtoPanel({
  title,
  children,
  footer,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      data-proto-panel
      className={`rounded-[var(--proto-radius-md)] border border-[var(--proto-border)] bg-[var(--proto-surface)] p-4 shadow-[var(--proto-shadow)] md:p-5 ${className}`}
    >
      {title ? (
        <h2 className="mb-3 text-sm font-semibold text-[var(--proto-text)]">
          {title}
        </h2>
      ) : null}
      <div className="space-y-3">{children}</div>
      {footer ? <div className="mt-4 border-t border-[var(--proto-border)] pt-4">{footer}</div> : null}
    </section>
  );
}

/** Simulates SSE-style phase progression without a server. */
export function useSimulatedPhases(phases: readonly string[]) {
  const [index, setIndex] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const reset = useCallback(() => {
    clear();
    setIndex(null);
  }, [clear]);

  const start = useCallback(() => {
    clear();
    setIndex(0);
  }, [clear]);

  useEffect(() => {
    if (index === null) return;
    if (index >= phases.length) {
      clear();
      return;
    }
    timer.current = setTimeout(() => {
      setIndex((i) => (i === null ? null : i + 1));
    }, 700);
    return clear;
  }, [index, phases.length, clear]);

  const running = index !== null && index < phases.length;
  const complete = index !== null && index >= phases.length;
  const phaseLabel =
    index === null
      ? null
      : index < phases.length
        ? phases[index]
        : "Done";

  return {
    running,
    complete,
    phaseIndex: index,
    phaseLabel,
    start,
    reset,
  };
}

export function PhaseList({
  phases,
  activeIndex,
}: {
  phases: readonly string[];
  activeIndex: number | null;
}) {
  return (
    <ol className="space-y-2">
      {phases.map((p, i) => {
        const done = activeIndex !== null && i < activeIndex;
        const active = activeIndex === i;
        return (
          <li
            key={p}
            className={`flex items-center gap-2 text-sm ${
              done
                ? "text-[var(--proto-text-muted)] line-through"
                : active
                  ? "font-semibold text-[var(--proto-text)]"
                  : "text-[var(--proto-text-muted)]"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                done
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700"
                  : active
                    ? "border-[var(--proto-accent)] bg-[var(--proto-accent)] text-[var(--proto-accent-fg)]"
                    : "border-[var(--proto-border)] bg-[var(--proto-surface-elevated)]"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            {p}
          </li>
        );
      })}
    </ol>
  );
}

export function PlaceholderTextarea({
  label,
  hint,
}: {
  label: string;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--proto-text-muted)]">
        {label}
      </span>
      <textarea
        readOnly
        rows={5}
        className="w-full resize-y rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-3 py-2 text-sm text-[var(--proto-text-muted)] outline-none"
        placeholder={hint ?? "Paste content here (prototype — not saved)."}
      />
    </label>
  );
}

export function PlaceholderInputRow({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--proto-text-muted)]">
        {label}
      </span>
      <input
        readOnly
        type="text"
        className="w-full rounded-[var(--proto-radius-sm)] border border-[var(--proto-border)] bg-[var(--proto-surface-elevated)] px-3 py-2 text-sm text-[var(--proto-text-muted)] outline-none"
        placeholder={placeholder}
      />
    </label>
  );
}
