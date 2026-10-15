"use client";

import React from "react";
import Link from "next/link";

interface LabItem {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  href?: string;
  year?: string;
}

const LAB_BUILDS: LabItem[] = [
  {
    id: "fin-score",
    title: "Spending Behaviour Analysis and Financial Scoring",
    // description: "Visual AI pipeline for multi-document synthesis & semantic clustering",
    // badge: "New",
    href: "/work/fin-score",
    year: "2026",
  },
  {
    id: "iot-link",
    title: "Combining Federated Learning with Semantic AI Routing in IoT Devices",
    // description: "Native read-later client with local on-device neural embeddings",
    // badge: "New",
    href: "/work/relay-mesh",
    year: "2026",
  },
  // {
  //   id: "specgen",
  //   title: "SpecGen",
  //   description: "Deterministic AST bridge turning design token JSON into zero-runtime styles",
  //   href: "/work/kernel-ds",
  //   year: "2025",
  // },
];

export function LabList() {
  return (
    <section className="mb-14">
      {/* Section Header */}
      <h2 className="text-[13px] font-medium text-[var(--text-muted)] uppercase tracking-[0.06em] mb-4">
        Research
      </h2>

      {/* Rows List */}
      <div className="flex flex-col">
        {LAB_BUILDS.map((item) => (
          <Link
            key={item.id}
            href={item.href || "#"}
            className="group py-3 border-b border-dashed border-[var(--hairline)] first:border-t transition-colors hover:bg-[var(--surface-raised)]/30 px-1 -mx-1 rounded"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              {/* Left: Title + Description */}
              <div className="flex items-baseline min-w-0">
                <span className="font-medium text-[15px] text-[var(--text-primary)] group-hover:text-[var(--accent)] group-hover:underline group-hover:underline-offset-3 whitespace-nowrap transition-colors">
                  {item.title}
                </span>
                <span className="ml-2.5 text-sm text-[var(--text-secondary)] truncate">
                  {item.description}
                </span>
              </div>

              {/* Right: Badge or Year */}
              <div className="flex items-center gap-2 shrink-0">
                {item.badge && (
                  <span className="text-[11px] font-mono font-medium tracking-[0.04em] uppercase py-[1px] px-1.5 rounded-[3px] whitespace-nowrap text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 bg-emerald-500/5">
                    {item.badge}
                  </span>
                )}
                <span className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
                  {item.year}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
