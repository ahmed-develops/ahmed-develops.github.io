"use client";

import React, { useState } from "react";

export function KernelDsArtifact() {
  const [radius, setRadius] = useState<number>(6);
  const [accent, setAccent] = useState<string>("#E25263");
  const [density, setDensity] = useState<"compact" | "normal" | "spacious">("normal");
  const [activeTab, setActiveTab] = useState<"preview" | "tokens">("preview");
  const [copied, setCopied] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const paddingY = density === "compact" ? "py-1.5" : density === "normal" ? "py-2.5" : "py-3.5";
  const paddingX = density === "compact" ? "px-3" : density === "normal" ? "px-4" : "px-6";
  const fontSize = density === "compact" ? "text-xs" : density === "normal" ? "text-sm" : "text-base";

  const handleCopy = () => {
    const code = `:root {
  --radius-interactive: ${radius}px;
  --color-brand-primary: ${accent};
  --density-padding-y: ${density === "compact" ? "6px" : density === "normal" ? "10px" : "14px"};
  --motion-spring: cubic-bezier(0.16, 1, 0.3, 1);
}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full flex flex-col font-sans select-none text-[var(--text-primary)]">
      {/* Top Token Compiler Control Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--hairline)] pb-3 mb-4 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
            KERNEL TOKEN ENGINE {"//"} AST COMPILER
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-colors cursor-pointer ${
              activeTab === "preview"
                ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Component Matrix
          </button>
          <button
            onClick={() => setActiveTab("tokens")}
            className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-colors cursor-pointer ${
              activeTab === "tokens"
                ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Compiled CSS
          </button>
        </div>
      </div>

      {/* Main Grid: Controls + Preview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Live Parametric Controls */}
        <div className="md:col-span-5 rounded border border-[var(--hairline)] bg-[var(--surface)] p-4 flex flex-col justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] block mb-3">
              PARAMETRIC TOKEN CONTROLS
            </span>

            {/* Corner Radius Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between font-mono text-xs mb-1">
                <span className="text-[var(--text-secondary)]">Corner Radius</span>
                <span className="text-[var(--text-primary)] font-bold">{radius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="2"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[9px] text-[var(--text-muted)] mt-1">
                <span>0px (Sharp)</span>
                <span>6px (Swiss)</span>
                <span>24px (Pill)</span>
              </div>
            </div>

            {/* Brand Accent Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                <span className="text-[var(--text-secondary)]">Primary Color Token</span>
                <span className="text-[var(--text-primary)] font-mono text-[10px]">{accent}</span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { hex: "#E25263", label: "Coral" },
                  { hex: "#2563EB", label: "Cobalt" },
                  { hex: "#10B981", label: "Emerald" },
                  { hex: "#171717", label: "Onyx" },
                ].map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setAccent(c.hex)}
                    className="flex-1 py-1.5 rounded text-[10px] font-mono font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer"
                    style={{
                      borderColor: accent === c.hex ? c.hex : "var(--hairline)",
                      backgroundColor: accent === c.hex ? "var(--surface-raised)" : "transparent",
                    }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                    <span className="hidden sm:inline">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Density switch */}
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                <span className="text-[var(--text-secondary)]">Density Mode</span>
                <span className="text-[var(--text-primary)] font-mono text-[10px] uppercase">{density}</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(["compact", "normal", "spacious"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDensity(d)}
                    className={`py-1 text-[10px] font-mono uppercase tracking-wider rounded border transition-colors cursor-pointer ${
                      density === d
                        ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg)] font-bold"
                        : "border-[var(--hairline)] bg-[var(--bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
            <span>ZERO-RUNTIME CSS</span>
            <span>WCAG 2.1 AAA PASS</span>
          </div>
        </div>

        {/* Right Column: Interactive State Matrix or Code Preview */}
        <div className="md:col-span-7 rounded border border-[var(--hairline)] bg-[var(--surface)] p-4 flex flex-col justify-between">
          {activeTab === "preview" ? (
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] block mb-3">
                LIVE INTERACTIVE COMPONENT STATES
              </span>

              {/* State Rows */}
              <div className="space-y-4">
                {/* Primary Button States */}
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-secondary)] mb-2">
                    Primary Compound Primitive
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Default */}
                    <button
                      className={`${fontSize} ${paddingX} ${paddingY} font-medium text-white transition-all shadow-xs active:scale-95 cursor-pointer`}
                      style={{
                        backgroundColor: accent,
                        borderRadius: `${radius}px`,
                      }}
                    >
                      Default Action
                    </button>

                    {/* Interactive Loading Switcher */}
                    <button
                      onClick={() => setButtonLoading(!buttonLoading)}
                      className={`${fontSize} ${paddingX} ${paddingY} font-medium text-white transition-all shadow-xs active:scale-95 flex items-center gap-2 cursor-pointer`}
                      style={{
                        backgroundColor: accent,
                        borderRadius: `${radius}px`,
                      }}
                    >
                      {buttonLoading ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Click to Load</span>
                      )}
                    </button>

                    {/* Disabled */}
                    <button
                      disabled
                      className={`${fontSize} ${paddingX} ${paddingY} font-medium text-[var(--text-muted)] bg-[var(--surface-raised)] border border-[var(--hairline)] opacity-60 cursor-not-allowed`}
                      style={{
                        borderRadius: `${radius}px`,
                      }}
                    >
                      Disabled
                    </button>
                  </div>
                </div>

                {/* Secondary & Outline */}
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-secondary)] mb-2">
                    Secondary & Outline Primitives
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      className={`${fontSize} ${paddingX} ${paddingY} font-medium text-[var(--text-primary)] border border-[var(--hairline)] bg-[var(--bg)] hover:bg-[var(--surface-raised)] transition-all active:scale-95 cursor-pointer`}
                      style={{
                        borderRadius: `${radius}px`,
                      }}
                    >
                      Outline Action
                    </button>

                    <button
                      className={`${fontSize} ${paddingX} ${paddingY} font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer`}
                      style={{
                        borderRadius: `${radius}px`,
                      }}
                    >
                      Ghost Variant
                    </button>
                  </div>
                </div>

                {/* Compound Form Input Primitive */}
                <div>
                  <div className="font-mono text-[10px] uppercase text-[var(--text-secondary)] mb-2">
                    Compound Token-Bound Input
                  </div>
                  <div
                    className="flex items-center border border-[var(--hairline)] bg-[var(--bg)] px-3 py-2 transition-all focus-within:ring-2"
                    style={{
                      borderRadius: `${radius}px`,
                      ["--tw-ring-color" as string]: accent,
                    }}
                  >
                    <span className="font-mono text-xs text-[var(--text-muted)] mr-2 select-none">
                      {"https://"}
                    </span>
                    <input
                      type="text"
                      defaultValue="kernel.systems/tokens"
                      className="bg-transparent text-xs font-mono text-[var(--text-primary)] outline-none w-full"
                    />
                    <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-[var(--surface-raised)] text-[var(--text-secondary)]">
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  GENERATED CSS CUSTOM PROPERTIES
                </span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded border border-[var(--hairline)] bg-[var(--bg)] hover:bg-[var(--surface-raised)] text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <span>Copy CSS Tokens</span>
                  )}
                </button>
              </div>

              <pre className="p-3 rounded bg-[var(--bg)] border border-[var(--hairline)] font-mono text-[11px] text-[var(--text-secondary)] overflow-x-auto leading-relaxed">
{`:root {
  --radius-interactive: ${radius}px;
  --color-brand-primary: ${accent};
  --density-padding-y: ${density === "compact" ? "6px" : density === "normal" ? "10px" : "14px"};
  --density-padding-x: ${density === "compact" ? "12px" : density === "normal" ? "16px" : "24px"};
  --motion-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
}`}
              </pre>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-[var(--hairline)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>CONSUMERS: REACT, SWIFTUI, FIGMA</span>
            <span className="text-[var(--accent)] font-semibold">SYNC DRIFT: 0.0%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
