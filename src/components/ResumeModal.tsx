"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# Muhammad Ahmed — Principal Design Engineer & Staff Product Designer
Sydney, AU • ma675967@gmail.com • Available for Staff+ roles

## Executive Profile
Principal Design Engineer with 10+ years bridging human-centered interaction architecture, design systems, and production front-end engineering. Specializing in mission-critical operations, real-time telemetry engines, and sub-16ms tactile interfaces.

## Experience
- Staff Product Designer & Front-End Architect | KitchOS (2024–2026)
  Led industrial tablet UX and Bluetooth scale synchronization, reducing kitchen waste logging time by 42% and saving $18.4k/mo per store cluster.
- Principal Design Engineer | Relay Mesh (2022–2024)
  Architected 60fps WebGL/Canvas topology graph rendering 25,000 microservice spans, collapsing MTTR from 14.2m to 3.8m.
- Senior Design Systems Engineer | Kernel Systems (2020–2022)
  Consolidated 14 fragmented UI libraries into headless token compiler with zero runtime overhead, reducing bundle sizes by 64%.

## Toolkit
Figma, Design Tokens, React 19, Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, WebGL, Canvas 2D, SwiftUI, BLE API.`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl max-h-[90vh] rounded-lg hairline-all bg-[var(--surface)] shadow-2xl overflow-y-auto p-6 md:p-8 z-10 font-sans"
          >
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between border-b border-[var(--hairline)] pb-4 mb-6 gap-3">
              <div className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
                CURRICULUM VITAE {"//"} 2026
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="px-2.5 py-1 rounded hairline-all text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors cursor-pointer"
                >
                  {copied ? "Copied MD!" : "Copy MD"}
                </button>
                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1 rounded hairline-all text-xs font-mono bg-[var(--bg)] text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors font-medium cursor-pointer"
                >
                  Print / PDF
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded hairline-all hover:bg-[var(--surface-raised)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-mono text-xs ml-2 cursor-pointer"
                >
                  ✕ ESC
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="space-y-6 text-[var(--text-primary)]">
              <div className="border-b border-[var(--hairline)] pb-4">
                <h2 className="text-2xl font-bold tracking-tight mb-1">Muhammad Ahmed</h2>
                <p className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                  Principal Design Engineer & Staff Product Designer
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                  <span>Sydney, NSW, Australia</span>
                  <span>·</span>
                  <span>ma675967@gmail.com</span>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2 font-bold">
                  EXECUTIVE PROFILE
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Principal Design Engineer with 10+ years designing and shipping mission-critical enterprise systems, industrial telemetry tools, and zero-runtime design systems. Proven record leading cross-functional squads across product design, interaction architecture, and production front-end engineering.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3 font-bold">
                  EXPERIENCE RECORD
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        Staff Product Designer & Front-End Architect — KitchOS
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">2024 — Present</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Conceived and built tablet-first kitchen operations system. Engineered Web Bluetooth scale sync in Web Workers and reduced meal prep waste logging times by 42%, recovering over $18,400 monthly margin per pilot cluster.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        Principal Design Engineer — Relay Mesh
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">2022 — 2024</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Led design and interactive architecture for next-gen distributed systems observability. Engineered custom WebGL + Canvas 2D spatial graph rendering pipeline displaying 25,000 microservice trace spans at locked 60fps.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        Design Systems Lead — Kernel Systems
                      </h4>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">2020 — 2022</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Consolidated 14 disparate multi-tenant web and mobile UI libraries into a unified token compiler. Authored Figma Token Studio bridge that generated zero-runtime CSS custom properties and typed Swift structures, cutting consumer bundle sizes by 64%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
