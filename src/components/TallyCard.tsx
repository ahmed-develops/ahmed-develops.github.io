"use client";

import React from "react";

export function TallyCard() {
  return (
    <div className="p-3.5 rounded-lg hairline-all bg-[var(--surface)] flex flex-col justify-between">
      <div>
        {/* Top Header Tag */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
            Tally · Activity Telemetry
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE SYNC
          </span>
        </div>

        {/* 2x2 Mini-Grid of Build Metrics */}
        <div className="grid grid-cols-2 gap-2 my-2 font-mono">
          <div className="p-1.5 rounded bg-[var(--bg)] hairline-all">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Keystrokes</div>
            <div className="text-xs font-semibold text-[var(--text-primary)] tabular-nums">3,420</div>
          </div>
          <div className="p-1.5 rounded bg-[var(--bg)] hairline-all">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Pointer Clicks</div>
            <div className="text-xs font-semibold text-[var(--text-primary)] tabular-nums">845</div>
          </div>
          <div className="p-1.5 rounded bg-[var(--bg)] hairline-all">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Screenshots</div>
            <div className="text-xs font-semibold text-[var(--text-primary)] tabular-nums">7 taken</div>
          </div>
          <div className="p-1.5 rounded bg-[var(--bg)] hairline-all">
            <div className="text-[10px] text-[var(--text-muted)] uppercase">App Switches</div>
            <div className="text-xs font-semibold text-[var(--text-primary)] tabular-nums">200 context</div>
          </div>
        </div>

        {/* Subtle Activity Sparkline */}
        <div className="my-2 h-7 w-full flex items-end overflow-hidden rounded">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 200 30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="tally-spark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 1 26 Q 20 22, 40 24 T 80 14 T 120 18 T 160 6 T 199 12 L 199 30 L 1 30 Z"
              fill="url(#tally-spark)"
            />
            <path
              d="M 1 26 Q 20 22, 40 24 T 80 14 T 120 18 T 160 6 T 199 12"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Live Status Footer */}
      <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between font-mono text-[11px] text-[var(--text-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Currently in: Cursor / Figma</span>
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">macOS</span>
      </div>
    </div>
  );
}
