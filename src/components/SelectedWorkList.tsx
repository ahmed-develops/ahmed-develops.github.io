"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  year?: string;
  tag?: string;
  metric?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    slug: "faware-os",
    title: "FawareOS",
    description: "Agentic AI operating system to auto-pilot culinary workflows.",
    // year: "2026–Present",
    // tag: "",
    // metric: "-42% prep logging friction"
  },
  {
    slug: "inume-ai",
    title: "Inume AI",
    description: "AI-powered travel guide with automated journaling and personalised itinerary generation.",
    // year: "2023",
    // tag: "",
    // metric: "3.8m MTTD triage",
  },
  {
    slug: "screenalyze",
    title: "Screenalyze",
    description: "AI-powered screenshot analysis and appended workflow manager.",
    // year: "2026-Present",
    // tag: "",
    // metric: "-64% bundle size",
  },
];

export function SelectedWorkList() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="mb-14">
      {/* Section Header */}
      <h2 className="text-[13px] font-medium text-[var(--text-muted)] uppercase tracking-[0.06em] mb-4">
        Projects
      </h2>

      {/* Index Rows List */}
      <div className="flex flex-col">
        {PROJECTS.map((project) => {
          const isHovered = hoveredSlug === project.slug;

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="relative group py-3 border-b border-dashed border-[var(--hairline)] first:border-t transition-colors hover:bg-[var(--surface-raised)]/30 px-1 -mx-1 rounded"
            >
              {/* Desktop layout: Single-line flex container */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                {/* Left: Title + Muted Description */}
                <div className="flex items-baseline min-w-0">
                  <span className="font-medium text-[15px] text-[var(--text-primary)] group-hover:text-[var(--accent)] group-hover:underline group-hover:underline-offset-3 whitespace-nowrap transition-colors">
                    {project.title}
                  </span>
                  <span className="ml-2.5 text-sm text-[var(--text-secondary)] truncate">
                    {project.description}
                  </span>
                </div>

                {/* Right: Year / Timeline */}
                <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-[var(--text-muted)]">
                  {/* Subtle hover metric pill on desktop */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: 4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        transition={{ duration: 0.15 }}
                        className="hidden md:inline-flex px-1.5 py-0.5 rounded bg-[var(--surface-raised)] text-[var(--accent)] text-[11px] font-mono"
                      >
                        {project.metric}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <span className="tabular-nums">{project.year}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
