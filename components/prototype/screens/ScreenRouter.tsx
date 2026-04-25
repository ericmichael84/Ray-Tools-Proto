"use client";

import type { ComponentType } from "react";
import { usePrototype } from "@/lib/prototype/context";
import type { ScreenId } from "@/lib/prototype/types";
import { CallRubricScreen } from "./CallRubricScreen";
import { DashboardScreen } from "./DashboardScreen";
import { DataComparisonScreen } from "./DataComparisonScreen";
import { DesignAnalysisScreen } from "./DesignAnalysisScreen";
import { SettingsScreen } from "./SettingsScreen";
import { SignalGeneratorScreen } from "./SignalGeneratorScreen";

const registry: Record<ScreenId, ComponentType> = {
  dashboard: DashboardScreen,
  "call-rubric": CallRubricScreen,
  "data-comparison": DataComparisonScreen,
  "signal-generator": SignalGeneratorScreen,
  "design-analysis": DesignAnalysisScreen,
  settings: SettingsScreen,
};

export function ScreenRouter() {
  const { screen, explorationKey } = usePrototype();
  const Active = registry[screen];
  return (
    <div
      key={`${screen}-${explorationKey}`}
      className="proto-canvas min-h-0 flex-1 overflow-auto p-6 md:p-8"
    >
      <Active />
    </div>
  );
}
