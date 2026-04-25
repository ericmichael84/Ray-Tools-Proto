import {
  DEFAULT_SCREEN,
  DEFAULT_THEME,
  DEFAULT_VARIATION,
} from "./constants";
import type { ScreenId, ThemeId, VariationId } from "./types";

const LEGACY_SCREEN_MAP: Record<string, ScreenId> = {
  workspace: "signal-generator",
  library: "data-comparison",
};

export function isVariation(v: string | undefined | null): v is VariationId {
  return (
    v === "glare-tools" ||
    v === "ray-google" ||
    v === "ray-facebook" ||
    v === "ray-adobe"
  );
}

export function isTheme(t: string | undefined | null): t is ThemeId {
  return (
    t === "glare" ||
    t === "zurb" ||
    t === "editorial" ||
    t === "bright-future" ||
    t === "glass"
  );
}

/** Legacy URL params → current theme ids. */
export function normalizeThemeParam(
  t: string | undefined | null,
): ThemeId | null {
  if (t === "minimal") return "glare";
  if (t === "expressive") return "zurb";
  return isTheme(t) ? t : null;
}

export function isScreen(s: string | undefined | null): s is ScreenId {
  return (
    s === "dashboard" ||
    s === "call-rubric" ||
    s === "data-comparison" ||
    s === "signal-generator" ||
    s === "design-analysis" ||
    s === "settings"
  );
}

function normalizeScreen(s: string | undefined | null): ScreenId {
  if (isScreen(s)) return s;
  if (s && LEGACY_SCREEN_MAP[s]) return LEGACY_SCREEN_MAP[s];
  return DEFAULT_SCREEN;
}

export type PrototypeInitialSearch = {
  v?: string;
  t?: string;
  s?: string;
};

export function parsePrototypeSearch(
  search: PrototypeInitialSearch,
): {
  variation: VariationId;
  theme: ThemeId;
  screen: ScreenId;
} {
  const theme = normalizeThemeParam(search.t);
  return {
    variation: isVariation(search.v) ? search.v : DEFAULT_VARIATION,
    theme: theme ?? DEFAULT_THEME,
    screen: normalizeScreen(search.s),
  };
}
