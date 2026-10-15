"use client";

import React, { useState } from "react";
import { FinScoreArtifact } from "./InteractiveArtifacts/FinScoreArtifact";
import { FawareOsArtifact } from "./InteractiveArtifacts/FawareOsArtifact";
import { RelayMeshArtifact } from "./InteractiveArtifacts/RelayMeshArtifact";
import { KernelDsArtifact } from "./InteractiveArtifacts/KernelDsArtifact";

export type SurfaceType = "finscore" | "faware" | "topology" | "tokens";

interface SurfaceSwitcherProps {
  initialSurface?: SurfaceType | string;
  studySlug?: string;
}

export function MultiSurfaceSwitcher({
  initialSurface = "finscore",
  studySlug,
}: SurfaceSwitcherProps) {
  const normalizeSurface = (s?: string): SurfaceType => {
    if (s === "faware" || s === "faware-os" || s === "scale" || s === "kitch-os") return "faware";
    if (s === "topology" || s === "relay-mesh") return "topology";
    if (s === "tokens" || s === "kernel-ds") return "tokens";
    return "finscore";
  };

  const currentInitial = normalizeSurface(studySlug || initialSurface);
  const [activeSurface, setActiveSurface] = useState<SurfaceType>(currentInitial);

  // If viewed from within a dedicated case study page, keep the artifact focused
  const isDedicatedStudy = Boolean(studySlug);

  return (
    <div className="rounded-lg hairline-all bg-[var(--surface)] p-4 md:p-6 space-y-4">
      {/* Top Header & Surface Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--hairline)] pb-3 gap-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
            Interactive Product Artifact
          </span>
          <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
            {activeSurface === "finscore"
              ? "FinScore Analytics & ML Engine"
              : activeSurface === "faware"
              ? "FawareOS BLE Scale Appliance"
              : activeSurface === "topology"
              ? "Relay Mesh Telemetry Canvas"
              : "Kernel Token Compiler"}
          </h4>
        </div>

        {/* Surface Tabs (Only show cross-project switcher tabs when NOT on a dedicated case study) */}
        {!isDedicatedStudy && (
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setActiveSurface("finscore")}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                activeSurface === "finscore"
                  ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold"
                  : "hairline-all bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              FinScore Engine
            </button>
            <button
              onClick={() => setActiveSurface("faware")}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                activeSurface === "faware"
                  ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold"
                  : "hairline-all bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              FawareOS Scale
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
        )}
      </div>

      {/* Embedded Live Component View */}
      <div className="p-2 md:p-4 rounded-md hairline-all bg-[var(--bg)]">
        {activeSurface === "finscore" && <FinScoreArtifact />}
        {activeSurface === "faware" && <FawareOsArtifact />}
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
