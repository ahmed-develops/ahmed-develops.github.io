import { Metadata } from "next";
import Link from "next/link";
import { McpSimulator } from "@/components/McpSimulator";
import { ArthurFooter } from "@/components/ArthurFooter";

export const metadata: Metadata = {
  title: "Talk to this Portfolio via MCP — Muhammad Ahmed",
  description:
    "Add this portfolio to Claude, Cursor, Windsurf, or any AI assistant via the Model Context Protocol.",
};

export default function McpPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-150">
      <main className="max-w-[600px] mx-auto px-5 py-12 md:py-20 flex flex-col min-h-screen">
        {/* Top Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            <span>MODEL CONTEXT PROTOCOL</span>
            <span className="text-[var(--hairline)]">/</span>
            <span>INTEGRATION</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
            Talk to this portfolio
          </h1>
          <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            Add this portfolio to Claude, Cursor, or any AI assistant via Model Context Protocol. Your assistant can query my project metrics, technical opinions, and hiring availability directly during code reviews or interviews.
          </p>
        </header>

        {/* MCP Interactive Setup and Simulator */}
        <McpSimulator />

        {/* Footer */}
        <ArthurFooter />
      </main>
    </div>
  );
}
