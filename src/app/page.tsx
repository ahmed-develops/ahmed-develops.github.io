"use client";

import React, { useState, useEffect } from "react";
import { ArthurHeader } from "@/components/ArthurHeader";
import { SelectedWorkList } from "@/components/SelectedWorkList";
import { LabList } from "@/components/LabList";
import { ArthurFooter } from "@/components/ArthurFooter";
import { CommandMenu } from "@/components/CommandMenu";
import { ResumeModal } from "@/components/ResumeModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const router = useRouter();

  // Custom event listener for open-command-menu
  useEffect(() => {
    const handleCustomOpen = () => setIsCommandOpen(true);
    window.addEventListener("open-command-menu", handleCustomOpen);
    return () => window.removeEventListener("open-command-menu", handleCustomOpen);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-150">
      {/* Centered Narrow Single-Column Editorial Spine (max-w-[600px]) */}
      <main className="max-w-[600px] mx-auto px-5 py-12 md:py-20 flex flex-col min-h-screen">
        {/* A. Compact Identity & Live Status Header */}
        <ArthurHeader onOpenCommand={() => setIsCommandOpen(true)} />

        {/* B. Selected Work (Minimalist Index Rows) */}
        <SelectedWorkList />

        {/* C. Lab (Experimental AI & Side Projects) */}
        <LabList />

        {/* D. Live Ambient Widgets Grid (2-Column Micro-Bento) */}
        {/* <section className="mb-14">
          <h2 className="text-[13px] font-medium text-[var(--text-muted)] uppercase tracking-[0.06em] mb-4">
            Ambient Telemetry
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DailyDigestCard />
            <TallyCard />
          </div>
        </section> */}

        {/* Minimalist Signature Footer */}
        <ArthurFooter />
      </main>

      {/* ⌘K Command Palette */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenCaseStudy={(slug) => router.push(`/work/${slug}`)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
