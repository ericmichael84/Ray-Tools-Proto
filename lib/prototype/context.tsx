"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ScreenId, ThemeId, VariationId } from "./types";

type PrototypeContextValue = {
  variation: VariationId;
  theme: ThemeId;
  screen: ScreenId;
  explorationKey: number;
  setVariation: (id: VariationId) => void;
  setTheme: (id: ThemeId) => void;
  setScreen: (id: ScreenId) => void;
  resetExploration: () => void;
};

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

export type PrototypeInitialState = {
  variation: VariationId;
  theme: ThemeId;
  screen: ScreenId;
};

function writeParams(
  variation: VariationId,
  theme: ThemeId,
  screen: ScreenId,
) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  params.set("v", variation);
  params.set("t", theme);
  params.set("s", screen);
  const next = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", next);
}

export function PrototypeProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial: PrototypeInitialState;
}) {
  const [variation, setVariationState] = useState<VariationId>(
    initial.variation,
  );
  const [theme, setThemeState] = useState<ThemeId>(initial.theme);
  const [screen, setScreenState] = useState<ScreenId>(initial.screen);
  const [explorationKey, setExplorationKey] = useState(0);

  useEffect(() => {
    writeParams(variation, theme, screen);
  }, [variation, theme, screen]);

  const setVariation = useCallback((id: VariationId) => {
    setVariationState(id);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
  }, []);

  const setScreen = useCallback((id: ScreenId) => {
    setScreenState(id);
  }, []);

  const resetExploration = useCallback(() => {
    setExplorationKey((k) => k + 1);
  }, []);

  const value = useMemo(
    () => ({
      variation,
      theme,
      screen,
      explorationKey,
      setVariation,
      setTheme,
      setScreen,
      resetExploration,
    }),
    [
      explorationKey,
      resetExploration,
      screen,
      setScreen,
      setTheme,
      setVariation,
      theme,
      variation,
    ],
  );

  return (
    <PrototypeContext.Provider value={value}>
      {children}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  const ctx = useContext(PrototypeContext);
  if (!ctx) {
    throw new Error("usePrototype must be used within PrototypeProvider");
  }
  return ctx;
}
