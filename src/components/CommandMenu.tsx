"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  category: "Navigation" | "Case Studies" | "Actions" | "Preferences";
  title: string;
  subtitle?: string;
  shortcut?: string;
  action: () => void;
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseStudy: (slug: string) => void;
  onOpenResume: () => void;
}

export function CommandMenu({
  isOpen,
  onClose,
  onOpenCaseStudy,
  onOpenResume,
}: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const copyEmail = () => {
    navigator.clipboard.writeText("ma675967@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const items: CommandItem[] = [
    // Case Studies
    {
      id: "case-fin-score",
      category: "Case Studies",
      title: "01 / FinScore & Spending Behaviour Analysis",
      subtitle: "Open Banking ML pipeline on Basiq API 3.0 (CDR)",
      shortcut: "↵",
      action: () => {
        onClose();
        onOpenCaseStudy("fin-score");
      },
    },
    {
      id: "case-relay-mesh",
      category: "Case Studies",
      title: "02 / Relay Mesh",
      subtitle: "60fps WebGL telemetry graph & distributed trace topology",
      shortcut: "↵",
      action: () => {
        onClose();
        onOpenCaseStudy("relay-mesh");
      },
    },
    {
      id: "case-kernel-ds",
      category: "Case Studies",
      title: "03 / Kernel DS",
      subtitle: "Multi-brand headless token compiler & zero-runtime primitives",
      shortcut: "↵",
      action: () => {
        onClose();
        onOpenCaseStudy("kernel-ds");
      },
    },
    // Navigation
    {
      id: "nav-mcp",
      category: "Navigation",
      title: "Talk to this Portfolio via MCP",
      subtitle: "Model Context Protocol setup for Claude, Cursor & Windsurf",
      shortcut: "G M",
      action: () => {
        onClose();
        router.push("/mcp");
      },
    },
    {
      id: "nav-home",
      category: "Navigation",
      title: "Go to Home Index",
      subtitle: "Muhammad Ahmed portfolio home",
      shortcut: "G H",
      action: () => {
        onClose();
        router.push("/");
      },
    },
    // Actions
    {
      id: "action-resume",
      category: "Actions",
      title: "View Principal & Staff Resume",
      subtitle: "Career history, patents, and technical competencies",
      shortcut: "⌘ R",
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: "action-email",
      category: "Actions",
      title: copiedEmail ? "Email Copied to Clipboard!" : "Copy Direct Email (ma675967@gmail.com)",
      subtitle: "Available for Staff Product Design & Design Engineering roles",
      shortcut: "⌘ C",
      action: copyEmail,
    },
    // Preferences
    {
      id: "pref-theme",
      category: "Preferences",
      title: `Toggle Color Theme (Current: ${theme === "dark" ? "Dark Carbon" : "Warm Paper"})`,
      subtitle: "Press T anytime or toggle here",
      shortcut: "T",
      action: () => {
        toggleTheme();
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global keydown listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          const event = new CustomEvent("open-command-menu");
          window.dispatchEvent(event);
        }
      }

      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg rounded-lg hairline-all bg-[var(--surface)] shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 hairline-b bg-[var(--bg)] gap-3">
              <span className="font-mono text-xs text-[var(--accent)] font-bold">⌘K</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search case studies, commands, or tools..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none font-sans"
              />
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase border hairline-all px-1.5 py-0.5 rounded">
                ESC
              </span>
            </div>

            {/* Items List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-[var(--text-muted)]">
                  No matching commands found.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left p-2.5 rounded-md transition-colors flex items-center justify-between group cursor-pointer ${isSelected
                        ? "bg-[var(--text-primary)] text-[var(--bg)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
                        }`}
                    >
                      <div className="flex flex-col min-w-0 mr-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[9px] uppercase tracking-wider px-1 py-0.2 rounded ${isSelected
                              ? "bg-[var(--bg)] text-[var(--text-primary)]"
                              : "bg-[var(--surface-raised)] text-[var(--text-muted)]"
                              }`}
                          >
                            {item.category}
                          </span>
                          <span className="text-xs font-semibold truncate">{item.title}</span>
                        </div>
                        {item.subtitle && (
                          <span
                            className={`text-[11px] truncate mt-0.5 ${isSelected ? "text-[var(--bg)]/80" : "text-[var(--text-secondary)]"
                              }`}
                          >
                            {item.subtitle}
                          </span>
                        )}
                      </div>

                      {item.shortcut && (
                        <span
                          className={`font-mono text-[10px] uppercase px-1.5 py-0.5 rounded ${isSelected
                            ? "bg-[var(--bg)] text-[var(--text-primary)] font-bold"
                            : "border hairline-all text-[var(--text-muted)]"
                            }`}
                        >
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 hairline-t bg-[var(--bg)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span className="text-[var(--accent)] font-medium">PRESS &apos;T&apos; FOR THEME</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
