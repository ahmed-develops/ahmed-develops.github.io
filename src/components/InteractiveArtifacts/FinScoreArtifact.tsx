"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Persona Profiles for easy user switching
interface PersonaProfile {
  id: string;
  name: string;
  role: string;
  monthlyIncome: number;
  healthScore: number;
  segment: string;
  forecastTrend: string;
  projectedEndBalance: number;
  transactions: {
    id: string;
    rawText: string;
    amount: number;
    category: string;
    date: string;
    confidence: number;
    isAnomaly: boolean;
    anomalyReason?: string;
    isolationScore: number;
    madZScore: number;
  }[];
  categoryBreakdown: {
    category: string;
    amount: number;
    percentage: number;
    color: string;
  }[];
  cashFlowHistory: number[]; // 14 days historical
  cashFlowForecast: { day: number; val: number; upper: number; lower: number }[]; // 14 days forecast
}

const PERSONAS: PersonaProfile[] = [
  {
    id: "sarah",
    name: "Sarah M.",
    role: "Full-Time Product Designer",
    monthlyIncome: 6200,
    healthScore: 84,
    segment: "Stable Accumulator",
    forecastTrend: "+$840 / month",
    projectedEndBalance: 5120,
    transactions: [
      {
        id: "tx-1",
        rawText: "WOOLWORTHS 3192 SURRY HILLS AUS",
        amount: -142.5,
        category: "Groceries",
        date: "Today, 14:10",
        confidence: 0.98,
        isAnomaly: false,
        isolationScore: 0.12,
        madZScore: 0.4,
      },
      {
        id: "tx-2",
        rawText: "SQ *PARAMOUNT COFFEE SURRY HILLS",
        amount: -6.5,
        category: "Dining & Coffee",
        date: "Today, 08:30",
        confidence: 0.96,
        isAnomaly: false,
        isolationScore: 0.08,
        madZScore: 0.2,
      },
      {
        id: "tx-3",
        rawText: "SALARY DEPOSIT - TECH CORP SYD",
        amount: 3100.0,
        category: "Income",
        date: "2 days ago",
        confidence: 0.99,
        isAnomaly: false,
        isolationScore: 0.05,
        madZScore: 0.1,
      },
      {
        id: "tx-4",
        rawText: "APPLE.COM/BILL ITUNES SYDNEY",
        amount: -18.99,
        category: "Subscriptions",
        date: "3 days ago",
        confidence: 0.94,
        isAnomaly: false,
        isolationScore: 0.14,
        madZScore: 0.3,
      },
      {
        id: "tx-5",
        rawText: "TRANSPORT FOR NSW OPAL TAP",
        amount: -24.8,
        category: "Transport",
        date: "4 days ago",
        confidence: 0.97,
        isAnomaly: false,
        isolationScore: 0.1,
        madZScore: 0.3,
      },
    ],
    categoryBreakdown: [
      { category: "Housing & Rent", amount: 1850, percentage: 41, color: "bg-blue-500" },
      { category: "Groceries & Food", amount: 620, percentage: 14, color: "bg-emerald-500" },
      { category: "Dining & Social", amount: 380, percentage: 8, color: "bg-amber-500" },
      { category: "Transport & Utils", amount: 250, percentage: 6, color: "bg-indigo-500" },
      { category: "Savings Preserved", amount: 1420, percentage: 31, color: "bg-teal-400" },
    ],
    cashFlowHistory: [3400, 3350, 3290, 3200, 3140, 3050, 2980, 2900, 5900, 5820, 5680, 5550, 5420, 5350],
    cashFlowForecast: [
      { day: 1, val: 5310, upper: 5430, lower: 5190 },
      { day: 3, val: 5200, upper: 5360, lower: 5040 },
      { day: 6, val: 5080, upper: 5290, lower: 4870 },
      { day: 8, val: 3230, upper: 3460, lower: 3000 }, // Rent deduction
      { day: 11, val: 3120, upper: 3390, lower: 2850 },
      { day: 14, val: 6150, upper: 6480, lower: 5820 }, // Next Salary
    ],
  },
  {
    id: "jordan",
    name: "Jordan T. (Anomaly Detected)",
    role: "Contract Specialist",
    monthlyIncome: 7500,
    healthScore: 68,
    segment: "Volatile High Spender",
    forecastTrend: "-$420 / month",
    projectedEndBalance: 2450,
    transactions: [
      {
        id: "tx-a1",
        rawText: "HARVEY NORMAN ELECTRICAL 0491",
        amount: -1850.0,
        category: "Luxury Electronics",
        date: "Today, 11:20",
        confidence: 0.91,
        isAnomaly: true,
        anomalyReason: "3.8x above 90-day weekend discretionary baseline",
        isolationScore: 0.88,
        madZScore: 4.2,
      },
      {
        id: "tx-a2",
        rawText: "CROWN RESORTS CASINO SYDNEY",
        amount: -450.0,
        category: "Entertainment",
        date: "Yesterday",
        confidence: 0.93,
        isAnomaly: true,
        anomalyReason: "Unprecedented merchant code for this customer profile",
        isolationScore: 0.84,
        madZScore: 3.6,
      },
      {
        id: "tx-a3",
        rawText: "COLES SUPERMARKET BONDI JUNCT",
        amount: -88.4,
        category: "Groceries",
        date: "3 days ago",
        confidence: 0.97,
        isAnomaly: false,
        isolationScore: 0.15,
        madZScore: 0.3,
      },
      {
        id: "tx-a4",
        rawText: "INVOICE SETTLEMENT CLIENT #84",
        amount: 3750.0,
        category: "Income",
        date: "4 days ago",
        confidence: 0.98,
        isAnomaly: false,
        isolationScore: 0.08,
        madZScore: 0.2,
      },
    ],
    categoryBreakdown: [
      { category: "Housing & Rent", amount: 2200, percentage: 38, color: "bg-blue-500" },
      { category: "Discretionary Spikes", amount: 2300, percentage: 40, color: "bg-rose-500" },
      { category: "Groceries & Food", amount: 550, percentage: 10, color: "bg-emerald-500" },
      { category: "Dining & Drinks", amount: 480, percentage: 8, color: "bg-amber-500" },
      { category: "Savings Preserved", amount: 220, percentage: 4, color: "bg-teal-400" },
    ],
    cashFlowHistory: [4800, 4720, 4650, 4580, 4500, 4420, 4350, 4200, 7800, 7650, 5800, 5350, 5100, 4650],
    cashFlowForecast: [
      { day: 1, val: 4200, upper: 4450, lower: 3950 },
      { day: 3, val: 3800, upper: 4150, lower: 3450 },
      { day: 6, val: 3400, upper: 3850, lower: 2950 },
      { day: 8, val: 1200, upper: 1750, lower: 650 }, // Volatile Dip
      { day: 11, val: 950, upper: 1600, lower: 300 },
      { day: 14, val: 4600, upper: 5350, lower: 3850 },
    ],
  },
];

export function FinScoreArtifact() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("sarah");
  const [activeView, setActiveView] = useState<"forecast" | "categories" | "anomalies" | "health">("forecast");
  const [selectedTxId, setSelectedTxId] = useState<string>("tx-1");
  const [userSimulatedTx, setUserSimulatedTx] = useState<boolean>(false);

  const currentPersona = PERSONAS.find((p) => p.id === selectedPersonaId) || PERSONAS[0];

  const handleInjectExpense = () => {
    setUserSimulatedTx(true);
    setSelectedPersonaId("jordan");
    setSelectedTxId("tx-a1");
    setActiveView("anomalies");
  };

  const handleResetProfile = () => {
    setUserSimulatedTx(false);
    setSelectedPersonaId("sarah");
    setSelectedTxId("tx-1");
    setActiveView("forecast");
  };

  // Helper for generating simple smooth SVG path for forecast
  const renderCashflowChart = () => {
    const width = 640;
    const height = 160;
    const padding = 28;

    const hist = currentPersona.cashFlowHistory;
    const fore = currentPersona.cashFlowForecast;

    const allValues = [
      ...hist,
      ...fore.map((f) => f.val),
      ...fore.map((f) => f.upper),
      ...fore.map((f) => f.lower),
    ];
    const minVal = Math.min(...allValues) * 0.9;
    const maxVal = Math.max(...allValues) * 1.05;

    const totalSteps = hist.length + fore.length;
    const getX = (index: number) => padding + (index / (totalSteps - 1)) * (width - padding * 2);
    const getY = (val: number) => height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);

    // Historical Points
    const histPoints = hist.map((val, i) => `${getX(i)},${getY(val)}`).join(" ");

    // Forecast Points
    const foreStartIndex = hist.length - 1;
    const forePoints = [
      `${getX(foreStartIndex)},${getY(hist[hist.length - 1])}`,
      ...fore.map((f, i) => `${getX(foreStartIndex + 1 + i)},${getY(f.val)}`),
    ].join(" ");

    // Shaded Upper/Lower 95% Confidence Band
    const bandPoints = [
      `${getX(foreStartIndex)},${getY(hist[hist.length - 1])}`,
      ...fore.map((f, i) => `${getX(foreStartIndex + 1 + i)},${getY(f.upper)}`),
      ...fore
        .slice()
        .reverse()
        .map((f, i) => `${getX(foreStartIndex + fore.length - i)},${getY(f.lower)}`),
    ].join(" ");

    return (
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 select-none"
          style={{ minWidth: "520px" }}
        >
          {/* Background Grid Lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--hairline)" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="var(--hairline)" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--hairline)" />

          {/* Dividing Marker for Today */}
          <line
            x1={getX(hist.length - 1)}
            y1={10}
            x2={getX(hist.length - 1)}
            y2={height - 18}
            stroke="var(--accent)"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <text
            x={getX(hist.length - 1) - 4}
            y={22}
            textAnchor="end"
            fontSize="10"
            fill="var(--accent)"
            fontFamily="monospace"
            fontWeight="bold"
          >
            TODAY
          </text>
          <text
            x={getX(hist.length - 1) + 6}
            y={22}
            fontSize="10"
            fill="var(--text-muted)"
            fontFamily="monospace"
          >
            HOLT-WINTERS FORECAST →
          </text>

          {/* Shaded 95% Confidence Area */}
          <polygon points={bandPoints} fill="var(--accent)" fillOpacity="0.1" />

          {/* Historical Solid Line */}
          <polyline
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={histPoints}
          />

          {/* Forecast Dashed Line */}
          <polyline
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={forePoints}
          />

          {/* Key Milestone Nodes */}
          {hist.map((val, i) => {
            if (i === 0 || i === hist.length - 1 || i === 8) {
              return (
                <g key={`h-node-${i}`}>
                  <circle cx={getX(i)} cy={getY(val)} r="3.5" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="2" />
                  <text
                    x={getX(i)}
                    y={getY(val) - 8}
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="monospace"
                    fill="var(--text-secondary)"
                  >
                    ${val}
                  </text>
                </g>
              );
            }
            return null;
          })}

          {fore.map((f, i) => {
            if (i === 3 || i === fore.length - 1) {
              return (
                <g key={`f-node-${i}`}>
                  <circle
                    cx={getX(foreStartIndex + 1 + i)}
                    cy={getY(f.val)}
                    r="3.5"
                    fill="var(--bg)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <text
                    x={getX(foreStartIndex + 1 + i)}
                    y={getY(f.val) - 8}
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="monospace"
                    fill="var(--accent)"
                    fontWeight="bold"
                  >
                    ${f.val}
                  </text>
                </g>
              );
            }
            return null;
          })}
        </svg>

        {/* Graph Legend & Simple Explanation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--hairline)] text-xs font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[var(--text-primary)] inline-block" />
              <span className="text-[var(--text-secondary)]">Historical Bank Ledger</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-[var(--accent)] inline-block" />
              <span className="text-[var(--text-primary)] font-medium">Holt-Winters ETS Prediction</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-[var(--accent)] opacity-20 inline-block rounded-xs" />
              <span className="text-[var(--text-muted)]">95% Confidence Band</span>
            </div>
          </div>
          <div className="text-[var(--text-muted)]">
            Auto-detects fortnightly payroll & fixed monthly rent dips
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 font-sans text-[var(--text-primary)]">
      {/* 1. Clear Contextual Header & Easy Profile Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-[var(--surface-raised)]/50 border border-[var(--hairline)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)]">
              Interactive ML Analysis Engine
            </span>
          </div>
          <h3 className="text-base md:text-lg font-medium text-[var(--text-primary)] mt-0.5">
            Open Banking Financial Behaviour & Health Scoring
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5 max-w-xl">
            Clean, explainable machine learning running directly on bank transaction feeds (Basiq CDR API 3.0). Switch profiles or trigger an anomaly below to see how the models respond.
          </p>
        </div>

        {/* Quick Profile Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setSelectedPersonaId("sarah");
              setSelectedTxId("tx-1");
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
              selectedPersonaId === "sarah"
                ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold shadow-xs"
                : "hairline-all bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Profile 1: Stable Earner
          </button>
          <button
            onClick={() => {
              setSelectedPersonaId("jordan");
              setSelectedTxId("tx-a1");
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
              selectedPersonaId === "jordan"
                ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold shadow-xs"
                : "hairline-all bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Profile 2: Anomaly Spike
          </button>
          <button
            onClick={handleInjectExpense}
            className="px-2.5 py-1.5 rounded-md text-xs font-mono border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
          >
            + Test Sudden Anomaly
          </button>
        </div>
      </div>

      {/* 2. Top-Level Summary Metric Cards (Easy to understand at a glance) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-md hairline-all bg-[var(--surface)]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Financial Health
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`text-2xl font-bold font-mono ${
                currentPersona.healthScore >= 80 ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {currentPersona.healthScore}
            </span>
            <span className="text-xs font-mono text-[var(--text-muted)]">/ 100</span>
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
            {currentPersona.healthScore >= 80 ? "Strong & Resilient" : "Moderate Volatility"}
          </p>
        </div>

        <div className="p-3.5 rounded-md hairline-all bg-[var(--surface)]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            K-Means Segment
          </span>
          <div className="text-sm font-semibold text-[var(--text-primary)] font-mono mt-1 truncate">
            {currentPersona.segment}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Silhouette k=4 Cluster</p>
        </div>

        <div className="p-3.5 rounded-md hairline-all bg-[var(--surface)]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            30-Day Cash Trajectory
          </span>
          <div className="text-sm font-semibold text-emerald-500 font-mono mt-1">
            {currentPersona.forecastTrend}
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
            Est. Close: ${currentPersona.projectedEndBalance.toLocaleString()}
          </p>
        </div>

        <div className="p-3.5 rounded-md hairline-all bg-[var(--surface)]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Anomalies Flagged
          </span>
          <div
            className={`text-sm font-semibold font-mono mt-1 ${
              currentPersona.transactions.some((t) => t.isAnomaly) ? "text-rose-500" : "text-emerald-500"
            }`}
          >
            {currentPersona.transactions.filter((t) => t.isAnomaly).length > 0
              ? `${currentPersona.transactions.filter((t) => t.isAnomaly).length} Outlier Detected`
              : "0 Outliers (Normal)"}
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Isolation Forest + MAD</p>
        </div>
      </div>

      {/* 3. Navigation View Switcher (Simple Tabs) */}
      <div className="flex border-b border-[var(--hairline)] gap-6 text-xs font-mono">
        <button
          onClick={() => setActiveView("forecast")}
          className={`pb-2.5 transition-colors cursor-pointer relative ${
            activeView === "forecast"
              ? "text-[var(--text-primary)] font-semibold"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          1. Cash Flow Forecast (Graph)
          {activeView === "forecast" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text-primary)]" />
          )}
        </button>

        <button
          onClick={() => setActiveView("categories")}
          className={`pb-2.5 transition-colors cursor-pointer relative ${
            activeView === "categories"
              ? "text-[var(--text-primary)] font-semibold"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          2. Spending Breakdown & n-Grams
          {activeView === "categories" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text-primary)]" />
          )}
        </button>

        <button
          onClick={() => setActiveView("anomalies")}
          className={`pb-2.5 transition-colors cursor-pointer relative ${
            activeView === "anomalies"
              ? "text-[var(--text-primary)] font-semibold"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          3. Anomaly Detection (Timeline)
          {activeView === "anomalies" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text-primary)]" />
          )}
        </button>

        <button
          onClick={() => setActiveView("health")}
          className={`pb-2.5 transition-colors cursor-pointer relative ${
            activeView === "health"
              ? "text-[var(--text-primary)] font-semibold"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          4. 5-Pillar Health Score
          {activeView === "health" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text-primary)]" />
          )}
        </button>
      </div>

      {/* 4. Tab 1: Cash Flow Forecast (Holt-Winters ETS Graph) */}
      {activeView === "forecast" && (
        <div className="p-5 rounded-lg hairline-all bg-[var(--surface)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                Holt-Winters ETS 30-Day Liquidity Forecast
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Evaluates short, noisy household transactions with additive trend and weekly pay-cycle seasonality.
              </p>
            </div>
            <div className="text-right text-xs font-mono text-[var(--text-muted)]">
              Model: <span className="text-[var(--text-primary)]">Holt-Winters ETS (Add + Damped)</span>
            </div>
          </div>

          {/* Interactive Forecast Curve Graph */}
          <div className="p-3 rounded-md bg-[var(--bg)] hairline-all">
            {renderCashflowChart()}
          </div>

          {/* Plain English Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded bg-[var(--surface-raised)]/40 border border-[var(--hairline)]">
              <span className="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold">
                Why this matters
              </span>
              <p className="text-[var(--text-secondary)] mt-1 leading-relaxed">
                Most budgeting apps show past spending. This graph projects whether the user will have enough cash to cover their next mortgage/rent before their next salary arrives.
              </p>
            </div>

            <div className="p-3 rounded bg-[var(--surface-raised)]/40 border border-[var(--hairline)]">
              <span className="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold">
                How the ML works
              </span>
              <p className="text-[var(--text-secondary)] mt-1 leading-relaxed">
                Holt-Winters decomposes noisy data into baseline level, trend, and weekly cycles. If data history is too brief, it safely falls back to damped linear drift.
              </p>
            </div>

            <div className="p-3 rounded bg-[var(--surface-raised)]/40 border border-[var(--hairline)]">
              <span className="font-mono text-[10px] text-[var(--accent)] uppercase font-semibold">
                Projected Safe Buffer
              </span>
              <p className="text-[var(--text-secondary)] mt-1 leading-relaxed">
                Projected minimum account balance is <strong className="text-[var(--text-primary)] font-mono">$3,120</strong>, giving the user a 98% probability of zero overdraft.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Spending Categories & n-Gram Classifier */}
      {activeView === "categories" && (
        <div className="p-5 rounded-lg hairline-all bg-[var(--surface)] space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              Expense Profiling & Character n-Gram Classification
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Bank transaction descriptions are notoriously truncated (e.g., &ldquo;WOOLW 3192 SYD&rdquo;). Character-level n-grams capture sub-word patterns that normal dictionary parsers miss.
            </p>
          </div>

          {/* Visual Category Distribution Graph (Stacked Horizontal Bar) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Monthly Expense Breakdown</span>
              <span className="text-[var(--text-primary)] font-semibold">
                Total Outflow: ${(currentPersona.monthlyIncome - 1420).toLocaleString()}
              </span>
            </div>

            {/* Stacked Visual Bar */}
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-[var(--surface-raised)] border border-[var(--hairline)]">
              {currentPersona.categoryBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.percentage}%` }}
                  className={`${item.color} h-full transition-all duration-500`}
                  title={`${item.category}: $${item.amount} (${item.percentage}%)`}
                />
              ))}
            </div>

            {/* Category Legend & Values */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2">
              {currentPersona.categoryBreakdown.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[var(--bg)] hairline-all text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-[var(--text-muted)] truncate text-[11px]">{item.category}</span>
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                    ${item.amount}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{item.percentage}% of income</div>
                </div>
              ))}
            </div>
          </div>

          {/* Character n-Gram Extraction Demo on Bank Feed */}
          <div className="p-4 rounded bg-[var(--bg)] hairline-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-[var(--text-primary)]">
                Live Inspection: How TF-IDF Character n-Grams Classify Raw Bank Feed
              </span>
              <span className="text-emerald-500">Inference: 2.4ms</span>
            </div>

            <div className="p-2.5 rounded bg-[var(--surface)] border border-[var(--hairline)] font-mono text-xs text-[var(--text-primary)]">
              Raw Feed String: &ldquo;WOOLWORTHS 3192 SURRY HILLS AUS&rdquo;
            </div>

            <div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                Extracted 3-to-5 Character n-Grams (Survives Bank Truncation):
              </span>
              <div className="flex flex-wrap gap-1 mt-1 font-mono text-[10px]">
                {["woo", "ool", "lwo", "wor", "orth", "rth", "surr", "hill", "aus"].map((gram, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--hairline)] text-[var(--accent)] font-semibold"
                  >
                    &apos;{gram}&apos;
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              <span>Classified Category: <strong>Groceries & Supermarkets</strong></span>
              <span>Confidence: 98.4% (Calibrated Logistic Regression)</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Tab 3: Anomaly Detection (Timeline Scatter Chart) */}
      {activeView === "anomalies" && (
        <div className="p-5 rounded-lg hairline-all bg-[var(--surface)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                Dual-Layer Unsupervised Anomaly Detection
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Combines an <strong>Isolation Forest</strong> (detects rare global anomalies) with a <strong>Median Absolute Deviation (MAD) z-score</strong> (detects what is abnormal specifically for this user).
              </p>
            </div>
            <button
              onClick={handleInjectExpense}
              className="px-3 py-1.5 rounded text-xs font-mono bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/25 transition-colors cursor-pointer shrink-0"
            >
              Simulate Luxury Anomaly Spike
            </button>
          </div>

          {/* Visual Timeline Scatter Plot */}
          <div className="p-4 rounded-md bg-[var(--bg)] hairline-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-b border-[var(--hairline)] pb-2">
              <span>Transaction Timeline (Last 7 Days)</span>
              <span>Personal Threshold: $350 (MAD 3.0σ)</span>
            </div>

            {/* Visual Scatter Grid */}
            <div className="relative h-36 w-full flex items-end justify-between px-6 pt-4 border-b border-[var(--hairline)]">
              {/* Threshold line */}
              <div
                className="absolute left-0 right-0 border-b border-dashed border-amber-500/70"
                style={{ bottom: "52%" }}
              >
                <span className="absolute right-2 -top-4 text-[9px] font-mono text-amber-500">
                  Anomaly Ceiling (3.0σ)
                </span>
              </div>

              {/* Plotted transactions */}
              {currentPersona.transactions.map((tx, idx) => {
                const isOutlier = tx.isAnomaly;
                const heightPercent = Math.min(95, Math.max(15, (Math.abs(tx.amount) / 2000) * 90));

                return (
                  <div
                    key={tx.id}
                    onClick={() => setSelectedTxId(tx.id)}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                    style={{ height: "100%", justifyContent: "flex-end" }}
                  >
                    {/* Tooltip on hover */}
                    <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                      ${Math.abs(tx.amount)}
                    </span>

                    {/* Node Dot */}
                    <div
                      style={{ marginBottom: `${heightPercent}%` }}
                      className={`w-4 h-4 rounded-full transition-all flex items-center justify-center ${
                        isOutlier
                          ? "bg-rose-500 text-white animate-pulse shadow-md ring-4 ring-rose-500/20"
                          : "bg-[var(--text-primary)] hover:scale-125"
                      }`}
                    >
                      {isOutlier && <span className="text-[8px] font-bold">!</span>}
                    </div>

                    <span className="text-[9px] font-mono text-[var(--text-muted)] truncate max-w-[64px]">
                      {tx.rawText.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-[var(--text-muted)] font-mono pt-1 text-center">
              Dots plotted by spending magnitude. Red dots breach both global Isolation Forest and personal MAD boundaries.
            </p>
          </div>

          {/* Anomaly Inspection Cards */}
          <div className="space-y-2">
            {currentPersona.transactions.map((tx) => (
              <div
                key={tx.id}
                className={`p-3 rounded-md border text-xs font-mono transition-all ${
                  tx.isAnomaly
                    ? "border-rose-500/40 bg-rose-500/5 text-rose-900 dark:text-rose-100"
                    : "border-[var(--hairline)] bg-[var(--surface)] text-[var(--text-secondary)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--text-primary)]">{tx.rawText}</span>
                      {tx.isAnomaly && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500 text-white font-bold">
                          OUTLIER FLAGGED
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      Category: {tx.category} · {tx.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)]">Isolation Score</div>
                      <div className="font-bold text-[var(--text-primary)]">{tx.isolationScore}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)]">MAD z-Score</div>
                      <div className={`font-bold ${tx.isAnomaly ? "text-rose-500" : "text-emerald-500"}`}>
                        {tx.madZScore}σ
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">
                      ${Math.abs(tx.amount).toFixed(2)}
                    </div>
                  </div>
                </div>

                {tx.isAnomaly && (
                  <div className="mt-2 pt-2 border-t border-rose-500/20 text-[11px] text-rose-600 dark:text-rose-300">
                    <strong>Model Insight:</strong> {tx.anomalyReason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Tab 4: 5-Pillar Wellbeing Health Score */}
      {activeView === "health" && (
        <div className="p-5 rounded-lg hairline-all bg-[var(--surface)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                Transparent 5-Pillar Financial Health Score
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Computed via <strong>Gradient Boosting with Isotonic Calibration</strong>. Every score includes direct dollar attribution so users know exactly which levers to pull.
              </p>
            </div>

            <div className="p-3 rounded-md bg-[var(--bg)] hairline-all text-center font-mono">
              <span className="text-[10px] uppercase text-[var(--text-muted)]">Composite Score</span>
              <div className="text-2xl font-bold text-emerald-500 mt-0.5">
                {currentPersona.healthScore} <span className="text-xs text-[var(--text-muted)]">/ 100</span>
              </div>
            </div>
          </div>

          {/* The 5 Pillar Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "1. Savings Rate",
                val: "24.2%",
                score: 88,
                target: ">20% of net income",
                note: "User preserves $1,420 into interest-bearing reserves each month.",
              },
              {
                title: "2. Emergency Buffer",
                val: "4.1 Months",
                score: 82,
                target: "3–6 months baseline living costs",
                note: "Liquid funds cover 4.1 months of non-discretionary expenses.",
              },
              {
                title: "3. Debt Servicing Ratio",
                val: "14.8%",
                score: 91,
                target: "<30% safe ceiling",
                note: "Committed loan and repayment overhead is exceptionally low.",
              },
              {
                title: "4. Credit Utilisation",
                val: "11.4%",
                score: 94,
                target: "<30% credit limit",
                note: "Credit card revolving balance stays comfortably minimal.",
              },
              {
                title: "5. Spending Stability",
                val: "82 / 100",
                score: 82,
                target: "Low week-over-week variance",
                note: "Consistent weekly grocery and bill rhythm without erratic spikes.",
              },
            ].map((p, i) => (
              <div key={i} className="p-3.5 rounded-md bg-[var(--bg)] hairline-all space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--text-primary)]">{p.title}</span>
                  <span className="text-emerald-500 font-bold">{p.val}</span>
                </div>

                <div className="w-full bg-[var(--surface-raised)] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${p.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                  <span>Score: {p.score}/100</span>
                  <span>{p.target}</span>
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] font-sans pt-1">
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Bottom Source & Engine Telemetry Footer */}
      <div className="pt-3 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[var(--text-muted)]">
        <span>AUSTRALIAN OPEN BANKING (CDR) // BASIQ API 3.0 // CUSCAL LTD</span>
        <span>MODELS: SCIKIT-LEARN + FASTAPI // ZERO CLOUD TOKEN LATENCY</span>
      </div>
    </div>
  );
}
