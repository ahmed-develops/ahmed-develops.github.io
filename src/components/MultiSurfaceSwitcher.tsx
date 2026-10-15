"use client";

import React, { useState } from "react";
import { KitchenArtifact } from "./InteractiveArtifacts/KitchenArtifact";
import { RelayMeshArtifact } from "./InteractiveArtifacts/RelayMeshArtifact";
import { KernelDsArtifact } from "./InteractiveArtifacts/KernelDsArtifact";

interface SurfaceSwitcherProps {
  initialSurface?: "scale" | "topology" | "tokens";
}

export function MultiSurfaceSwitcher({
  initialSurface = "scale",
}: SurfaceSwitcherProps) {
  const [activeSurface, setActiveSurface] = useState<"scale" | "topology" | "tokens">(initialSurface);

  return (
    <div className="rounded-lg hairline-all bg-[var(--surface)] p-4 md:p-6 space-y-4">
      {/* Top Header & Surface Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--hairline)] pb-3 gap-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
            Interactive Product Artifacts
          </span>
          <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
            Multi-Surface Production Switcher
          </h4>
        </div>

        {/* Surface Tabs */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => setActiveSurface("scale")}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeSurface === "scale"
                ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold"
                : "hairline-all bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Hardware Scale
          </button>
          <button
            onClick={() => setActiveSurface("topology")}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeSurface === "topology"
                ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold"
                : "hairline-all bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Topology Canvas
          </button>
          <button
            onClick={() => setActiveSurface("tokens")}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeSurface === "tokens"
                ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold"
                : "hairline-all bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Token Compiler
          </button>
        </div>
      </div>

      {/* Embedded Live Component View */}
      <div className="p-2 md:p-4 rounded-md hairline-all bg-[var(--bg)]">
        {activeSurface === "scale" && <KitchenArtifact />}
        {activeSurface === "topology" && <RelayMeshArtifact />}
        {activeSurface === "tokens" && <KernelDsArtifact />}
      </div>

      {/* Bottom Telemetry Note */}
      <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
        <span>CLIENT-SIDE REACT // SUB-16MS REACTION LATENCY</span>
        <span className="text-[var(--accent)] font-semibold">TEST REAL INTERACTIONS</span>
      </div>
    </div>
  );
}
