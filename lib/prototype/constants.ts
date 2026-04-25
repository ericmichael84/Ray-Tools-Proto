import type { ScreenGroupId, ScreenId, ThemeId, VariationId } from "./types";

export type ScreenConfig = {
  id: ScreenId;
  label: string;
  navLabel: string;
  initial: string;
  group: ScreenGroupId;
  path: string;
  description: string;
};

export const VARIATIONS: {
  id: VariationId;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: "glare-tools",
    label: "Glare Tools Playground",
    shortLabel: "Glare",
    description: "Tool-rail + canvas layout tuned for creative workflows.",
  },
  {
    id: "ray-google",
    label: "Ray Platform — Google",
    shortLabel: "Google",
    description:
      "Workspace shell: app bar, search, 9-dot app launcher, account placeholders; Material-style app shortcuts.",
  },
  {
    id: "ray-facebook",
    label: "Ray Platform — Facebook",
    shortLabel: "Facebook",
    description:
      "Feed shell: top bar, left rail, scrollable feed with composer + cards and a large embedded module for tools; right rail placeholders.",
  },
  {
    id: "ray-adobe",
    label: "Ray Platform — Adobe CC",
    shortLabel: "Adobe CC",
    description:
      "Creative Cloud–style capability shell: top nav, category rail + filters, app catalog grid (Try/Install/Open), full-surface active tool.",
  },
];

export const THEMES: {
  id: ThemeId;
  label: string;
  description: string;
}[] = [
  {
    id: "glare",
    label: "Glare",
    description:
      "Glare Playground — indigo brand, soft gray canvas, SIGNAL score semantics (Figma Ray — Tools).",
  },
  {
    id: "zurb",
    label: "ZURB",
    description:
      "Light blue–green field with cyan primary; SIGNAL rubric keeps the starfield score ramp and circular chips.",
  },
  {
    id: "editorial",
    label: "Editorial / premium",
    description: "High contrast, serif display, restrained ornament.",
  },
  {
    id: "bright-future",
    label: "Bright Future",
    description:
      "Mesh pastel field on canvas + chrome; white cards; solid violet CTA; pragmatic square rubric chips.",
  },
  {
    id: "glass",
    label: "Glass",
    description:
      "Liquid glass — light frosted layers, SF-style blue accent, calm typography; blur on panels with reduced-transparency fallback.",
  },
];

export const SCREENS: ScreenConfig[] = [
  {
    id: "dashboard",
    label: "Pipeline",
    navLabel: "Home",
    initial: "◇",
    group: "overview",
    path: "/",
    description: "Research-to-action overview across Playground tools.",
  },
  {
    id: "call-rubric",
    label: "Call Rubric",
    navLabel: "Call",
    initial: "R",
    group: "tools",
    path: "/call-rubric",
    description: "SIGNAL call scorecards, behavioral metrics, automations.",
  },
  {
    id: "data-comparison",
    label: "Data Comparison",
    navLabel: "Compare",
    initial: "C",
    group: "tools",
    path: "/data-comparison",
    description: "Helio test alignment, deltas, and AI comparison signals.",
  },
  {
    id: "signal-generator",
    label: "Signal Generator",
    navLabel: "Signals",
    initial: "S",
    group: "tools",
    path: "/signal-generator",
    description: "Single-test and multi-test narrative design signals.",
  },
  {
    id: "design-analysis",
    label: "Design Analysis",
    navLabel: "Design",
    initial: "A",
    group: "tools",
    path: "/design-analysis",
    description: "VP-grounded audits with categorized issues and chat.",
  },
  {
    id: "settings",
    label: "Settings",
    navLabel: "Settings",
    initial: "⚙",
    group: "overview",
    path: "/settings",
    description: "Prototype shell preferences (local only).",
  },
];

export const SCREEN_GROUPS: { id: ScreenGroupId; title: string }[] = [
  { id: "overview", title: "Overview" },
  { id: "tools", title: "Playground tools" },
];

export function screensInGroup(group: ScreenGroupId): ScreenConfig[] {
  return SCREENS.filter((s) => s.group === group);
}

export const DEFAULT_VARIATION: VariationId = "glare-tools";
export const DEFAULT_THEME: ThemeId = "glare";
export const DEFAULT_SCREEN: ScreenId = "dashboard";
