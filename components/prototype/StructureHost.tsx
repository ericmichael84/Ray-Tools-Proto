"use client";

import { usePrototype } from "@/lib/prototype/context";
import { AdobeRayStructure } from "./structures/AdobeRayStructure";
import { FacebookRayStructure } from "./structures/FacebookRayStructure";
import { GlareToolsStructure } from "./structures/GlareToolsStructure";
import { GoogleRayStructure } from "./structures/GoogleRayStructure";

export function StructureHost() {
  const { variation } = usePrototype();
  switch (variation) {
    case "glare-tools":
      return <GlareToolsStructure />;
    case "ray-google":
      return <GoogleRayStructure />;
    case "ray-facebook":
      return <FacebookRayStructure />;
    case "ray-adobe":
      return <AdobeRayStructure />;
    default:
      return <GlareToolsStructure />;
  }
}
