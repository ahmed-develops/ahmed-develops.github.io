"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

interface ArthurHeaderProps {
  onOpenCommand: () => void;
}

export function ArthurHeader({ onOpenCommand }: ArthurHeaderProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [sydneyTime, setSydneyTime] = useState("");
  const [showBioMore, setShowBioMore] = useState(false);

  // Live ticking client-side clock for Sydney, AU
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Sydney",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setSydneyTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="mb-14">
      {/* Top Identity Row: Avatar / Mark on Left, Command & Theme Buttons on Right */}
      <div className="flex items-center justify-between mb-5">
        {/* Avatar / Portrait Image */}
        <Link href="/" className="group flex items-center gap-3 no-underline">
          <div className="relative w-20 h-20 rounded-full overflow-hidden hairline-all bg-[var(--surface)] flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/pf.PNG`}
              alt="Muhammad Ahmed"
              width={80}
              height={80}
              priority
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 rounded-full border border-black/10 dark:border-white/10 pointer-events-none" />
          </div>
        </Link>

        {/* Action Controls: Command Palette & Tactile Theme Switcher */}
        <div className="flex items-center gap-2">
          {/* Command Button */}
          <button
            onClick={onOpenCommand}
            aria-label="Open Command Menu"
            className="w-8 h-8 rounded-full flex items-center justify-center hairline-all bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-xs active:scale-95"
            title="Command Menu (⌘K)"
          >
            <svg
              className="w-3.5 h-3.5 text-[var(--accent)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
            </svg>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            suppressHydrationWarning
            className="w-8 h-8 rounded-full flex items-center justify-center hairline-all bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-xs active:scale-95"
            title={`Toggle theme (shortcut: T) - Current: ${mounted ? theme : "light"}`}
          >
            {mounted && theme === "dark" ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Name */}
      <h1 className="text-[17px] font-medium text-[var(--text-primary)] mb-2 tracking-tight">
        Muhammad Ahmed
      </h1>

      {/* Punchy 3-Line Plain-Text Bio */}
      <div className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
        <p>
          AI/ML Engineer. Building at the intersection of data and agents to elevate human-centered experience of AI.
        </p>
        <p className="mt-2 text-[var(--text-secondary)]">
          Based in Sydney &nbsp;
          <button
            onClick={() => setShowBioMore(!showBioMore)}
            className="inline-flex items-center gap-1 text-[var(--text-primary)] font-medium underline underline-offset-3 hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            <span>{showBioMore ? "Show less" : "Read more"}</span>
          </button>
          <span aria-hidden="true">→</span>
        </p>
      </div>

      {/* Expandable Bio Drawer */}
      <AnimatePresence>
        {showBioMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-4 pt-3 hairline-t text-sm text-[var(--text-secondary)] space-y-2 leading-relaxed"
          >
            <p>
              Worked previously as a Development and Technology Intern at fast-paced Bahraini FinTech startup, StackUp. Promoted to Project and Tech Manager soon after. Did mostly R&D and some management.
            </p>
            <p>
              Avid fütbol watcher. Love reading articles and documentation. A cup of tea at any time of the day. A good listener and even better talker.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Telemetry Pill Bar with Faware MCP Pill */}
      <div className="flex items-center justify-between gap-3 flex-wrap mt-5 text-[13px] leading-5 text-[var(--text-secondary)]">
        <div className="flex items-center gap-3.5 flex-wrap">
          {/* Sydney Clock */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)]">
            <span className="text-[var(--text-muted)]">Sydney, AU</span>
            <span className="text-[var(--hairline)]">·</span>
            <span className="tabular-nums text-[var(--text-primary)] font-medium">
              {sydneyTime || "Loading..."}
            </span>
          </div>

          {/* Live Availability Status */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </span>
            <span className="text-[var(--text-primary)] font-medium text-xs">
              Open to opportunities and collabs
            </span>
          </div>
        </div>

        {/* Faware MCP Pill Button styled directly like the reference image */}
        {/* <Link
          href="/mcp"
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--accent)] text-white border border-[#161314] dark:border-white/20 text-xs font-medium shadow-xs hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Faware MCP</span>
          <span aria-hidden="true" className="text-[10px]">→</span>
        </Link> */}
      </div>
    </header>
  );
}
