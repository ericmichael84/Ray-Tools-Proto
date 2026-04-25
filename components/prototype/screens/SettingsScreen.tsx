"use client";

import { useState } from "react";

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header className="space-y-2">
        <p className="text-sm font-medium tracking-wide text-[var(--proto-text-muted)]">
          Screen · Settings
        </p>
        <h1 className="font-[family-name:var(--proto-font-heading)] text-2xl font-semibold tracking-tight text-[var(--proto-text)] md:text-3xl">
          Settings
        </h1>
        <p className="max-w-xl text-[var(--proto-text-muted)]">
          Shell-only preferences. Playground tools (Call Rubric, Data
          Comparison, Signal Generator, Design Analysis) are placeholders with
          no backend.
        </p>
      </header>
      <section className="space-y-4 rounded-[var(--proto-radius-md)] border border-[var(--proto-border)] bg-[var(--proto-surface)] p-5 shadow-[var(--proto-shadow)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--proto-text)]">
              Notifications (local only)
            </p>
            <p className="text-xs text-[var(--proto-text-muted)]">
              Does not connect to any service.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notifications}
            onClick={() => setNotifications((n) => !n)}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              notifications ? "bg-[var(--proto-accent)]" : "bg-[var(--proto-border)]"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                notifications ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </section>
    </div>
  );
}
