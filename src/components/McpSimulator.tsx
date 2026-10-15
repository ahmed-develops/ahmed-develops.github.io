"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ClientTab = "claude" | "claude_code" | "cursor" | "windsurf";

interface ToolResponse {
  toolName: string;
  arguments: Record<string, unknown>;
  output: {
    title: string;
    summary: string;
    badge: string;
    details: string[];
    rawJson: Record<string, unknown>;
  };
}

const PROMPT_RESPONSES: Record<string, ToolResponse> = {
  work: {
    toolName: "search_work",
    arguments: { query: "featured", limit: 3 },
    output: {
      title: "Selected Engineering & Product Case Studies",
      summary: "4 production case studies spanning culinary agentic appliances, Open Banking ML, WebGL observability, and token compilers.",
      badge: "4 RESULTS RETURNED",
      details: [
        "FawareOS (2025–2026): Agentic AI culinary OS & BLE scale sync. Reduced meal prep logging friction by 42%.",
        "FinScore (2025–2026): Open Banking ML pipeline on Basiq API 3.0. Reduced transaction classification latency by 91% with >96% accuracy.",
        "Relay Mesh (2024–2025): 60fps WebGL telemetry graph. Collapsed incident triage from 14.2m down to 3.8m.",
        "Kernel DS (2023–2024): Multi-brand headless token compiler. 64% bundle size reduction with zero drift.",
      ],
      rawJson: {
        total: 4,
        projects: [
          { slug: "faware-os", role: "Staff Designer & AI Engineer", impact: "-42% prep friction" },
          { slug: "fin-score", role: "Lead AI & Fintech Engineer", impact: ">96% categorisation accuracy" },
          { slug: "relay-mesh", role: "Principal Design Engineer", impact: "-73% MTTD" },
          { slug: "kernel-ds", role: "Design Systems Lead", impact: "-64% bundle size" },
        ],
      },
    },
  },
  ai_approach: {
    toolName: "get_opinions",
    arguments: { topic: "ai_in_design_engineering" },
    output: {
      title: "Perspective: AI in Design & Engineering",
      summary: "AI belongs in the pipeline engine, not as an annoying chat modal pasted over every existing UI.",
      badge: "CRAFT PHILOSOPHY",
      details: [
        "Ground truth over hype: If a physical mechanical scale is faster than an AI camera, throw away the camera.",
        "Deterministic latency: Operators in high-consequence tools need sub-50ms predictability, not 3-second LLM streaming lag.",
        "Compound primitives: Design systems must compile tokens deterministically before letting generative tools touch code.",
      ],
      rawJson: {
        philosophy: "Quiet AI over Chatbot Sprawl",
        principles: ["Physical ergonomics first", "Sub-16ms feedback loops", "Zero hallucinated UX"],
      },
    },
  },
  recruiter_brief: {
    toolName: "get_recruiter_brief",
    arguments: { role: "Principal Design Engineer / Staff Product Designer" },
    output: {
      title: "Executive Recruiter Brief",
      summary: "High-leverage IC operating across interaction design, typography, systems thinking, and production code.",
      badge: "EXECUTIVE SUMMARY",
      details: [
        "10+ years experience building complex B2B systems (fintech, supply chain, industrial operations).",
        "Dual fluency: Authors Figma design systems and ships production Next.js, React 19, TypeScript, and WebGL.",
        "Proven business impact: -91% operational logging time, -73% incident response time, 64% bundle savings.",
        "Location: Sydney, Australia (Australian Citizen). Open to remote or hybrid Staff+ roles.",
      ],
      rawJson: {
        seniority: "Staff / Principal Level",
        domains: ["Design Systems", "Developer Tools", "Industrial Hardware UX", "AI Pipelines"],
        location: "Sydney, NSW, Australia",
        status: "Open to select high-impact opportunities",
      },
    },
  },
  availability: {
    toolName: "get_availability",
    arguments: {},
    output: {
      title: "Current Availability & Engagement Terms",
      summary: "Actively exploring Staff Product Designer, Principal Design Engineer, or Founding Designer roles.",
      badge: "LIVE STATUS: AVAILABLE",
      details: [
        "Availability: Immediate / Q1–Q2 2026 start.",
        "Role focus: High-autonomy Product Design, Design Engineering, and AI Systems.",
        "Direct contact: ma675967@gmail.com (responds within 24h).",
      ],
      rawJson: {
        status: "Available",
        timezone: "Australia/Sydney (AEDT)",
        preferredWorkingHours: "Flexible for US West Coast & European overlap",
        contactEmail: "ma675967@gmail.com",
      },
    },
  },
};

const TOOLS_TABLE = [
  {
    name: "get_profile",
    type: "Read-only Data",
    params: "none",
    desc: "Returns core background, current focus, and technical toolkit.",
  },
  {
    name: "search_work",
    type: "Read-only Data",
    params: "query: string, limit?: number",
    desc: "Searches case studies by keyword, tech stack, or platform.",
  },
  {
    name: "get_context",
    type: "Read-only Data",
    params: "project_slug: string",
    desc: "Extracts full technical narrative, research data, and metrics for a project.",
  },
  {
    name: "get_opinions",
    type: "Read-only Data",
    params: "topic: string",
    desc: "Returns candid builder essays on design engineering, modals, and AI ergonomics.",
  },
  {
    name: "get_availability",
    type: "Read-only Data",
    params: "none",
    desc: "Live hiring status, timezone, and preferred engagement structure.",
  },
  {
    name: "get_recruiter_brief",
    type: "Read-only Data",
    params: "role?: string",
    desc: "Structured summary of career achievements and leadership scope.",
  },
  {
    name: "get_case_studies",
    type: "Interactive UI",
    params: "slug: string",
    desc: "Returns interactive embedded component states and AST tokens.",
  },
  {
    name: "portfolio_cli",
    type: "Interactive UI",
    params: "command: string",
    desc: "Simulates keyboard terminal commands against the portfolio archive.",
  },
];

export function McpSimulator() {
  const [activeTab, setActiveTab] = useState<ClientTab>("claude");
  const [copied, setCopied] = useState(false);
  const [activePromptKey, setActivePromptKey] = useState<string>("work");
  const [showRawJson, setShowRawJson] = useState(false);

  const getClientSnippet = () => {
    switch (activeTab) {
      case "claude":
        return `// Claude Desktop or Claude.ai:
// Settings → Connectors → Add → URL:
https://alexchen.dev/mcp`;
      case "claude_code":
        return `claude mcp add --transport http alex-chen https://alexchen.dev/mcp`;
      case "cursor":
        return `// Add to ~/.cursor/mcp.json:
{
  "mcpServers": {
    "alex-chen": {
      "url": "https://alexchen.dev/mcp"
    }
  }
}`;
      case "windsurf":
        return `// Add to ~/.codeium/windsurf/mcp_config.json:
{
  "mcpServers": {
    "alex-chen": {
      "serverUrl": "https://alexchen.dev/mcp"
    }
  }
}`;
    }
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(getClientSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const currentResponse = PROMPT_RESPONSES[activePromptKey] || PROMPT_RESPONSES.work;

  return (
    <div className="space-y-12">
      {/* 1. Setup Instructions & Tabbed Code Block */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3">
          <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold">
            Setup via Model Context Protocol
          </div>
          <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            HTTP SSE Transport
          </span>
        </div>

        {/* Client Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: "claude", label: "Claude" },
            { id: "claude_code", label: "Claude Code" },
            { id: "cursor", label: "Cursor" },
            { id: "windsurf", label: "Windsurf" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ClientTab)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${activeTab === tab.id
                  ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold"
                  : "hairline-all bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Frame with Copy Button */}
        <div className="relative rounded-lg hairline-all bg-[var(--surface)] p-4 font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--hairline)] text-[10px] text-[var(--text-muted)]">
            <span className="uppercase">Configuration Snippet</span>
            <button
              onClick={handleCopySnippet}
              className="hover:text-[var(--text-primary)] cursor-pointer flex items-center gap-1 text-[11px]"
            >
              {copied ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ Copied</span>
              ) : (
                <span>Copy Command 📋</span>
              )}
            </button>
          </div>
          <pre className="text-[var(--text-primary)] overflow-x-auto leading-relaxed py-1">
            {getClientSnippet()}
          </pre>
        </div>
      </section>

      {/* 2. Interactive "Try Asking" Simulator */}
      <section className="space-y-4">
        <div className="border-b border-[var(--hairline)] pb-3">
          <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">
            Interactive MCP Simulator
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Click any prompt pill to test real MCP tool dispatch and inspect the live client response.
          </p>
        </div>

        {/* Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: "work", label: "Show me his work" },
            { key: "ai_approach", label: "What is his approach to AI in design?" },
            { key: "recruiter_brief", label: "Give me a recruiter brief" },
            { key: "availability", label: "Is he available for hire?" },
          ].map((pill) => (
            <button
              key={pill.key}
              onClick={() => setActivePromptKey(pill.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${activePromptKey === pill.key
                  ? "bg-[var(--accent)] text-white shadow-xs font-medium"
                  : "hairline-all bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
                }`}
            >
              &ldquo;{pill.label}&rdquo;
            </button>
          ))}
        </div>

        {/* Live Simulated MCP Tool Execution Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePromptKey}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="rounded-lg hairline-all bg-[var(--surface)] p-4 md:p-5 space-y-4"
          >
            {/* Tool Invocation Header */}
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-2.5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[var(--text-muted)]">Tool Call:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {currentResponse.toolName}({JSON.stringify(currentResponse.arguments)})
                </span>
              </div>
              <button
                onClick={() => setShowRawJson(!showRawJson)}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] underline cursor-pointer"
              >
                {showRawJson ? "Show Formatted Card" : "View Raw JSON"}
              </button>
            </div>

            {/* Display View: Formatted Card vs Raw JSON */}
            {showRawJson ? (
              <pre className="p-3 rounded bg-[var(--bg)] hairline-all font-mono text-[11px] text-[var(--text-secondary)] overflow-x-auto leading-relaxed">
                {JSON.stringify(currentResponse.output.rawJson, null, 2)}
              </pre>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                      {currentResponse.output.title}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                      {currentResponse.output.summary}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--surface-raised)] text-[var(--accent)] font-semibold shrink-0">
                    {currentResponse.output.badge}
                  </span>
                </div>

                {/* Bullet details */}
                <ul className="space-y-1.5 pt-1 text-xs text-[var(--text-secondary)] font-mono">
                  {currentResponse.output.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent)] font-bold">→</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer */}
            <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
              <span>LATENCY: 8MS // IN-MEMORY CACHE</span>
              <span>SCHEMA: MODEL CONTEXT PROTOCOL 1.0</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 3. Exposed MCP Tools Table */}
      <section className="space-y-4">
        <div className="border-b border-[var(--hairline)] pb-3">
          <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">
            Exposed MCP Tools Specification
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Every tool is read-only and designed to supply context directly to your agent.
          </p>
        </div>

        <div className="rounded-lg hairline-all bg-[var(--surface)] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="hairline-b text-[10px] text-[var(--text-muted)] uppercase">
                <th className="p-3">Tool Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Parameters</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {TOOLS_TABLE.map((tool) => (
                <tr key={tool.name} className="hover:bg-[var(--surface-raised)]/50 transition-colors">
                  <td className="p-3 font-semibold text-[var(--accent)]">{tool.name}</td>
                  <td className="p-3 text-[var(--text-muted)] text-[11px]">{tool.type}</td>
                  <td className="p-3 text-[var(--text-secondary)] text-[11px]">{tool.params}</td>
                  <td className="p-3 font-sans text-xs text-[var(--text-secondary)] max-w-xs leading-normal">
                    {tool.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
