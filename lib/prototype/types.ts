export type VariationId =
  | "glare-tools"
  | "ray-google"
  | "ray-facebook"
  | "ray-adobe";

export type ThemeId =
  | "glare"
  | "zurb"
  | "editorial"
  | "bright-future"
  | "glass";

export type ScreenId =
  | "dashboard"
  | "call-rubric"
  | "data-comparison"
  | "signal-generator"
  | "design-analysis"
  | "settings";

export type ScreenGroupId = "overview" | "tools";

export type PrototypeState = {
  variation: VariationId;
  theme: ThemeId;
  screen: ScreenId;
  explorationKey: number;
};
