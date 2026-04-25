"use client";

import {
  PrototypeProvider,
  usePrototype,
  type PrototypeInitialState,
} from "@/lib/prototype/context";
import { ControlPanel } from "./control-panel/ControlPanel";
import { StructureHost } from "./StructureHost";

function PrototypeRoot() {
  const { theme } = usePrototype();
  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      data-prototype-root
      data-theme={theme}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-[19rem] md:pb-32">
        <StructureHost />
      </div>
      <ControlPanel />
    </div>
  );
}

export function PrototypeApp({ initial }: { initial: PrototypeInitialState }) {
  return (
    <PrototypeProvider initial={initial}>
      <PrototypeRoot />
    </PrototypeProvider>
  );
}
