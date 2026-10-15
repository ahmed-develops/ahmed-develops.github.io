"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { MonnetCaseStudy } from "@/data/monnetCaseStudies";
import { ArchitecturePipeline } from "./ArchitecturePipeline";
import { WhatIKilledComparison } from "./WhatIKilledComparison";
import { MultiSurfaceSwitcher } from "./MultiSurfaceSwitcher";
import { ArthurFooter } from "./ArthurFooter";

interface MonnetCaseStudyViewProps {
  study: MonnetCaseStudy;
}

export function MonnetCaseStudyView({ study }: MonnetCaseStudyViewProps) {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initialSurface =
    study.slug === "fin-score"
      ? "finscore"
      : study.slug === "faware-os" || study.slug === "kitch-os"
      ? "faware"
      : study.slug === "relay-mesh"
      ? "topology"
      : "tokens";

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-150">
      <div className="py-12 md:py-20 px-5">
        {/* Top Navigation Strip (Locked to 600px) */}
        <div className="max-w-[600px] mx-auto mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>Return to Index</span>
          </Link>
        </div>

        {/* 1. Header & Metadata Strip (Locked to 600px) */}
        <header className="max-w-[600px] mx-auto mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
              {study.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {study.articleUrl && (
                <a
                  href={study.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-md text-xs font-mono hairline-all bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all"
                >
                  Article ↗
                </a>
              )}
              {study.githubUrl && (
                <a
                  href={study.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-md text-xs font-mono hairline-all bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all"
                >
                  Code Repo ↗
                </a>
              )}
              <button
                onClick={scrollToDemo}
                className="px-3 py-1.5 rounded-md text-xs font-mono font-medium bg-[var(--text-primary)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white transition-all cursor-pointer shadow-xs"
              >
                Live Demo ↓
              </button>
            </div>
          </div>

          <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)] mb-6">
            {study.tagline}
          </p>

          {/* Inline Monospace Metadata Strip */}
          <div className="p-3 rounded-md hairline-all bg-[var(--surface)] text-xs font-mono space-y-1.5 text-[var(--text-secondary)]">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-[var(--text-muted)] uppercase">ROLE:</span>
              <span className="text-[var(--text-primary)] font-medium">{study.type}</span>
              <span className="text-[var(--hairline)]">·</span>
              <span className="text-[var(--text-muted)] uppercase">TIMELINE:</span>
              <span className="text-[var(--text-primary)]">{study.year}</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-1.5 text-[11px]">
              <span className="text-[var(--text-muted)] uppercase">STACK:</span>
              <span>{study.stack.join(" · ")}</span>
            </div>
          </div>
        </header>

        {/* 2. Narrative Section 1: The Problem / The Chaos (Locked to 600px) */}
        <section className="max-w-[600px] mx-auto mb-12 space-y-4">
          <h2 className="text-[13px] font-medium text-[var(--text-muted)] uppercase tracking-[0.06em]">
            The Problem & The Chaos
          </h2>

          <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            {study.narrative.problemContext}
          </p>

          {/* Candid Quote from the Trenches */}
          <blockquote className="my-6 pl-4 border-l-2 border-l-[var(--text-primary)] py-1 italic font-serif text-[15px] text-[var(--text-primary)] leading-relaxed">
            &ldquo;{study.narrative.chaosQuote}&rdquo;
          </blockquote>

          <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            {study.narrative.chaosAnalysis}
          </p>
        </section>

        {/* 3. The Vision & Architecture (Narrative 600px -> Diagram breaks out to 920px) */}
        <section className="mb-14">
          <div className="max-w-[600px] mx-auto mb-6 space-y-3">
            <h2 className="text-[13px] font-medium text-[var(--text-muted)] uppercase tracking-[0.06em]">
              The Vision & System Architecture
            </h2>
            <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
              {study.narrative.architectureOverview}
            </p>
          </div>

          {/* Breakout Container (max-w-[920px]) for Interactive Architecture Flow */}
          <div className="max-w-[920px] mx-auto my-8">
            <ArchitecturePipeline nodes={study.narrative.pipelineNodes} />
          </div>
        </section>

        {/* 4. "What I Killed" (AI Slop vs. Polished Craft) (Breakout to 920px) */}
        <section className="mb-14">
          <div className="max-w-[600px] mx-auto mb-6 space-y-3">
            <h2 className="text-[13px] font-medium text-[var(--text-muted)] uppercase tracking-[0.06em]">
              What I Killed
            </h2>
            <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
              Building great software is mostly about deciding what *not* to build. Here is what we originally thought would work, why it collapsed in real usability testing, and what we replaced it with.
            </p>
          </div>

          {/* Breakout Container (max-w-[920px]) for What I Killed Comparison */}
          <div className="max-w-[920px] mx-auto my-8">
            <WhatIKilledComparison data={study.narrative.whatIKilled} />
          </div>
        </section>

        {/* 5. Live Interactive Prototype Breakout (max-w-[920px]) */}
        <section ref={demoRef} className="mb-14 scroll-mt-8">
          <div className="max-w-[600px] mx-auto mb-6 space-y-3">
            <h2 className="text-[13px] font-medium text-[var(--text-muted)] uppercase tracking-[0.06em]">
              Interactive Product Prototype
            </h2>
            <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
              Try the real component states below. Everything runs client-side in React with real state machines.
            </p>
          </div>

          {/* Breakout Container (max-w-[920px]) */}
          <div className="max-w-[920px] mx-auto my-8">
            <MultiSurfaceSwitcher initialSurface={initialSurface} studySlug={study.slug} />
          </div>
        </section>

        {/* 6. Takeaways & Reflections (Locked to 600px) */}
        <section className="max-w-[600px] mx-auto mb-16 space-y-4">
          <h2 className="text-[13px] font-medium text-[var(--text-muted)] uppercase tracking-[0.06em]">
            Takeaways & What I Learned
          </h2>

          <ul className="space-y-3 pt-2 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            {study.narrative.takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-[var(--accent)] font-bold mt-1">0{idx + 1}.</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer (Locked to 600px) */}
        <div className="max-w-[600px] mx-auto">
          <ArthurFooter />
        </div>
      </div>
    </div>
  );
}
