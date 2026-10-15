"use client";

import React, { useState } from "react";

interface ComparisonProps {
  data: {
    aiSlopIteration: {
      title: string;
      description: string;
      symptoms: string[];
      failureProof: string;
    };
    shippedCraft: {
      title: string;
      description: string;
      improvements: string[];
      craftPrinciple: string;
    };
  };
}

export function WhatIKilledComparison({ data }: ComparisonProps) {
  const [viewMode, setViewMode] = useState<"split" | "slop" | "craft">("split");

  return (
    <div className="rounded-lg hairline-all bg-[var(--surface)] p-4 md:p-6 space-y-4">
      {/* Top Header & View Switcher */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--hairline)] pb-3 gap-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
            Design Taste & Trade-Offs
          </span>
          <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
            What I Killed: AI Slop vs. Shipped Craft
          </h4>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1 font-mono text-[11px]">
          <button
            onClick={() => setViewMode("split")}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              viewMode === "split"
                ? "bg-[var(--text-primary)] text-[var(--bg)] font-medium"
                : "hairline-all bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode("slop")}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              viewMode === "slop"
                ? "bg-red-500 text-white font-medium"
                : "hairline-all bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Iteration 1 (Killed)
          </button>
          <button
            onClick={() => setViewMode("craft")}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              viewMode === "craft"
                ? "bg-emerald-600 text-white font-medium"
                : "hairline-all bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Shipped Version
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className={`grid gap-4 ${viewMode === "split" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        {/* Left Column: Iteration 1 (Killed / AI Slop) */}
        {(viewMode === "split" || viewMode === "slop") && (
          <div className="p-4 rounded-md hairline-all bg-[var(--bg)] border-l-2 border-l-red-500/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-red-500 uppercase tracking-wider">
                ITERATION 1 (KILLED)
              </span>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-semibold">
                Over-Engineered
              </span>
            </div>

            <h5 className="text-xs font-bold text-[var(--text-primary)]">
              {data.aiSlopIteration.title}
            </h5>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {data.aiSlopIteration.description}
            </p>

            <div className="space-y-1.5 pt-1">
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)] font-semibold">
                Failure Symptoms:
              </div>
              <ul className="space-y-1 text-xs text-[var(--text-secondary)] font-mono">
                {data.aiSlopIteration.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 rounded bg-red-500/5 text-[11px] font-mono text-red-600 dark:text-red-400 border border-red-500/20">
              <strong>Usability Audit:</strong> {data.aiSlopIteration.failureProof}
            </div>
          </div>
        )}

        {/* Right Column: Shipped Version (Polished Craft) */}
        {(viewMode === "split" || viewMode === "craft") && (
          <div className="p-4 rounded-md hairline-all bg-[var(--bg)] border-l-2 border-l-emerald-500 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                SHIPPED IN PRODUCTION
              </span>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                Stripped to Essentials
              </span>
            </div>

            <h5 className="text-xs font-bold text-[var(--text-primary)]">
              {data.shippedCraft.title}
            </h5>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {data.shippedCraft.description}
            </p>

            <div className="space-y-1.5 pt-1">
              <div className="font-mono text-[10px] uppercase text-[var(--text-muted)] font-semibold">
                Craft Improvements:
              </div>
              <ul className="space-y-1 text-xs text-[var(--text-secondary)] font-mono">
                {data.shippedCraft.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 rounded bg-emerald-500/5 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <strong>Craft Principle:</strong> &ldquo;{data.shippedCraft.craftPrinciple}&rdquo;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
