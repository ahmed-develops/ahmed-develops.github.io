"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface KitchenItem {
  id: string;
  name: string;
  sku: string;
  defaultWeight: number;
  category: string;
  station: string;
}

const ITEMS: KitchenItem[] = [
  { id: "salmon", name: "Atlantic Salmon Trimmings", sku: "SKU-9942", defaultWeight: 1420, category: "Raw / Prep", station: "Station 01" },
  { id: "tomato", name: "Heirloom Tomato Core & Ends", sku: "SKU-4410", defaultWeight: 680, category: "Cold Prep", station: "Station 02" },
  { id: "wagyu", name: "Wagyu Flank Fat Cap", sku: "SKU-8821", defaultWeight: 2150, category: "Hot Butcher", station: "Station 03" },
  { id: "brioche", name: "Brioche Crusts (Stale)", sku: "SKU-1209", defaultWeight: 920, category: "Bakery", station: "Station 02" },
];

const REASONS = [
  { id: "trim", label: "Trim Loss (Usable for Stock / Glaze)", salvageable: true },
  { id: "spoilage", label: "Spoilage / Date Expired", salvageable: false },
  { id: "overcook", label: "Line Burn / Overcooked", salvageable: false },
];

export function KitchenArtifact() {
  const [selectedStation, setSelectedStation] = useState("Station 01");
  const [selectedItem, setSelectedItem] = useState<KitchenItem>(ITEMS[0]);
  const [unit, setUnit] = useState<"g" | "kg" | "oz">("g");
  const [currentWeight, setCurrentWeight] = useState(1420);
  const [selectedReason, setSelectedReason] = useState("trim");
  const [isTare, setIsTare] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [recentLogs, setRecentLogs] = useState<Array<{ id: number; item: string; weight: string; reason: string; time: string }>>([
    { id: 1, item: "Wagyu Flank Fat Cap", weight: "2,150 g", reason: "Trim Loss", time: "11:42 AM" },
    { id: 2, item: "Heirloom Tomato Core", weight: "680 g", reason: "Prep Scrap", time: "11:15 AM" },
  ]);

  const handleSelectItem = (item: KitchenItem) => {
    setSelectedItem(item);
    setIsTare(false);
    const jitter = ((item.defaultWeight * 7) % 36) - 18;
    setCurrentWeight(Math.max(100, item.defaultWeight + jitter));
  };

  const handleTare = () => {
    setIsTare(true);
    setCurrentWeight(0);
    setTimeout(() => {
      setIsTare(false);
    }, 800);
  };

  const handleLog = () => {
    setIsLogged(true);
    const newLog = {
      id: Date.now(),
      item: selectedItem.name,
      weight: formattedWeight + " " + unit,
      reason: REASONS.find((r) => r.id === selectedReason)?.label.split(" ")[0] || "Trim",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setRecentLogs((prev) => [newLog, ...prev.slice(0, 3)]);

    setTimeout(() => {
      setIsLogged(false);
    }, 1200);
  };

  const formattedWeight =
    unit === "g"
      ? currentWeight.toLocaleString()
      : unit === "kg"
      ? (currentWeight / 1000).toFixed(3)
      : (currentWeight * 0.035274).toFixed(1);

  return (
    <div className="w-full flex flex-col font-sans select-none text-[var(--text-primary)]">
      {/* Top Industrial Hardware Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--hairline)] pb-3 mb-4 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
            BLE SCALE 03 {"//"} 120ms LATENCY
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px]">
          {["Station 01", "Station 02", "Station 03"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStation(st)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedStation === st
                  ? "bg-[var(--text-primary)] text-[var(--bg)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tablet Display Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Industrial Scale Readout Panel */}
        <div className="md:col-span-7 flex flex-col justify-between p-4 md:p-5 rounded border border-[var(--hairline)] bg-[var(--surface)]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                LIVE TARE WEIGHT READOUT
              </span>
              {/* Unit Switcher */}
              <div className="flex items-center rounded border border-[var(--hairline)] bg-[var(--bg)] p-0.5">
                {(["g", "kg", "oz"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors cursor-pointer ${
                      unit === u
                        ? "bg-[var(--accent)] text-white font-bold"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {u.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Big Numeric Scale Readout */}
            <div className="relative py-4 my-2 border-y border-[var(--hairline)] bg-[var(--bg)] px-4 rounded flex items-baseline justify-between overflow-hidden">
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={formattedWeight}
                  initial={{ opacity: 0.8, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums"
                >
                  {isTare ? "0" : formattedWeight}
                </motion.span>
                <span className="font-mono text-sm uppercase text-[var(--text-muted)] font-semibold">
                  {unit}
                </span>
              </div>

              {isTare && (
                <span className="font-mono text-xs text-[var(--accent)] animate-pulse uppercase tracking-wider font-semibold">
                  TARED [0.00]
                </span>
              )}
            </div>

            {/* Active Item Description */}
            <div className="flex flex-col gap-1 mt-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-[var(--text-primary)]">
                  {selectedItem.name}
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  {selectedItem.sku}
                </span>
              </div>
              <span className="text-xs text-[var(--text-secondary)]">
                Classification: {selectedItem.category} {"//"} {selectedStation}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-[var(--hairline)]">
            <button
              onClick={handleTare}
              className="py-2.5 px-3 rounded border border-[var(--hairline)] text-xs font-mono uppercase tracking-wider font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] active:scale-[0.98] transition-all cursor-pointer"
            >
              Zero / Tare Scale
            </button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleLog}
              className={`py-2.5 px-3 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLogged
                  ? "bg-emerald-600 text-white"
                  : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
              }`}
            >
              {isLogged ? (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span>Logged & Printed</span>
                </>
              ) : (
                <>
                  <span>Log Batch & Print</span>
                  <span className="text-[10px] opacity-75">↵</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Right: Rapid Station SKU Presets & Categorization */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              CONTEXTUAL STATION PRESETS
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {ITEMS.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`text-left p-2.5 rounded border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--text-primary)] font-medium"
                        : "border-[var(--hairline)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)]"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-medium text-[var(--text-primary)]">{item.name}</div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider">
                        {item.sku}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      ~{item.defaultWeight}g
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              REASON CODE
            </span>
            <div className="flex flex-col gap-1">
              {REASONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReason(r.id)}
                  className={`text-left px-2.5 py-1.5 rounded border text-[11px] font-mono transition-colors flex items-center justify-between cursor-pointer ${
                    selectedReason === r.id
                      ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg)] font-medium"
                      : "border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="truncate">{r.label}</span>
                  {r.salvageable && (
                    <span className="text-[9px] px-1 py-0.2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded uppercase font-semibold">
                      Stock
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Thermal Label Feed */}
      <div className="mt-4 pt-3 border-t border-[var(--hairline)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            RECENT BATCH LOGS:
          </span>
          <div className="flex items-center gap-2 overflow-hidden">
            {recentLogs.slice(0, 2).map((log) => (
              <span key={log.id} className="font-mono text-[10px] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--hairline)]">
                {log.item.split(" ")[0]} {"//"} {log.weight} {"//"} {log.time}
              </span>
            ))}
          </div>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-[var(--text-muted)]">
          TOUCH HIT TARGET: 84PX MIN
        </span>
      </div>
    </div>
  );
}
