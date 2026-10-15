"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PipelineNode {
  id: string;
  label: string;
  role: string;
  tech: string;
  latency: string;
  details: string;
}

interface ArchitecturePipelineProps {
  nodes: PipelineNode[];
}

export function ArchitecturePipeline({ nodes }: ArchitecturePipelineProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(nodes[0]?.id || "");

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <div className="rounded-lg hairline-all bg-[var(--surface)] p-4 md:p-6 space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--hairline)] pb-3 gap-2">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
            System Architecture Pipeline
          </span>
          <div className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
            Click any node to inspect data flow & latency
          </div>
        </div>
        <span className="font-mono text-[11px] text-[var(--accent)] font-medium">
          DETERMINISTIC DATA PATH
        </span>
      </div>

      {/* Pipeline Visual Nodes (Horizontal Flow) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
        {nodes.map((node, index) => {
          const isSelected = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`p-3 rounded-md text-left transition-all border cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--text-primary)] ring-1 ring-[var(--accent)]"
                  : "border-[var(--hairline)] bg-[var(--bg)] text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)] mb-1">
                  <span>STEP 0{index + 1}</span>
                  <span className="text-[var(--accent)] font-medium">{node.latency}</span>
                </div>
                <div className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                  {node.label}
                </div>
              </div>
              <div className="text-[10px] font-mono text-[var(--text-muted)] mt-2 truncate">
                {node.role}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Inspector */}
      {activeNode && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="p-3.5 rounded bg-[var(--bg)] hairline-all text-xs space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--hairline)] pb-2 font-mono text-[11px]">
              <span className="font-semibold text-[var(--text-primary)]">
                {activeNode.label} — {activeNode.role}
              </span>
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <span>Stack: <strong className="text-[var(--text-primary)]">{activeNode.tech}</strong></span>
                <span>Latency: <strong className="text-[var(--accent)]">{activeNode.latency}</strong></span>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {activeNode.details}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
