"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ServiceNode {
  id: string;
  name: string;
  role: string;
  p99: number;
  rps: number;
  status: "nominal" | "degraded" | "critical";
  spans: { name: string; duration: number; type: string }[];
}

const DEFAULT_SERVICES: ServiceNode[] = [
  {
    id: "edge",
    name: "edge-ingress-gateway",
    role: "L7 Reverse Proxy & TLS",
    p99: 18,
    rps: 12400,
    status: "nominal",
    spans: [
      { name: "tls.handshake", duration: 4, type: "network" },
      { name: "waf.inspect", duration: 8, type: "security" },
      { name: "proxy.route", duration: 6, type: "routing" },
    ],
  },
  {
    id: "auth",
    name: "auth-session-v2",
    role: "JWT & RBAC Verifier",
    p99: 34,
    rps: 8200,
    status: "nominal",
    spans: [
      { name: "jwt.decrypt", duration: 6, type: "crypto" },
      { name: "redis.session_read", duration: 14, type: "cache" },
      { name: "scope.verify", duration: 14, type: "logic" },
    ],
  },
  {
    id: "payment",
    name: "payment-router.core",
    role: "ISO8583 Settlement Pipeline",
    p99: 48,
    rps: 3100,
    status: "nominal",
    spans: [
      { name: "idempotency.check", duration: 8, type: "db" },
      { name: "ledger.mutation", duration: 22, type: "db" },
      { name: "webhook.dispatch", duration: 18, type: "queue" },
    ],
  },
  {
    id: "postgres",
    name: "pg-aurora-primary",
    role: "ACID Transaction Store",
    p99: 14,
    rps: 4600,
    status: "nominal",
    spans: [
      { name: "conn_pool.acquire", duration: 2, type: "pool" },
      { name: "sql.exec_tx", duration: 10, type: "db" },
      { name: "wal.fsync", duration: 2, type: "disk" },
    ],
  },
  {
    id: "fraud",
    name: "fraud-evaluator-ml",
    role: "ONNX Inference Engine",
    p99: 22,
    rps: 2900,
    status: "nominal",
    spans: [
      { name: "feature.hydrate", duration: 6, type: "memory" },
      { name: "onnx.infer_score", duration: 12, type: "compute" },
      { name: "rule.evaluate", duration: 4, type: "logic" },
    ],
  },
];

export function RelayMeshArtifact() {
  const [services, setServices] = useState<ServiceNode[]>(DEFAULT_SERVICES);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("payment");
  const [incidentActive, setIncidentActive] = useState(false);

  const triggerIncident = () => {
    if (incidentActive) {
      setServices(DEFAULT_SERVICES);
      setIncidentActive(false);
    } else {
      setIncidentActive(true);
      setServices((prev) =>
        prev.map((s) => {
          if (s.id === "payment") {
            return {
              ...s,
              status: "critical",
              p99: 1420,
              spans: [
                { name: "idempotency.check", duration: 24, type: "db" },
                { name: "ledger.lock_timeout", duration: 1280, type: "lock" },
                { name: "webhook.retry_backoff", duration: 116, type: "queue" },
              ],
            };
          }
          if (s.id === "postgres") {
            return {
              ...s,
              status: "degraded",
              p99: 460,
              spans: [
                { name: "conn_pool.exhausted_wait", duration: 380, type: "pool" },
                { name: "sql.exec_tx", duration: 72, type: "db" },
                { name: "wal.fsync", duration: 8, type: "disk" },
              ],
            };
          }
          if (s.id === "edge") {
            return { ...s, p99: 1440, status: "degraded" };
          }
          return s;
        })
      );
      setSelectedServiceId("payment");
    }
  };

  const selected = services.find((s) => s.id === selectedServiceId) || services[0];
  const totalSpanDuration = selected.spans.reduce((acc, curr) => acc + curr.duration, 0);

  return (
    <div className="w-full flex flex-col font-sans select-none text-[var(--text-primary)]">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--hairline)] pb-3 mb-4 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              incidentActive ? "bg-red-500 animate-ping" : "bg-emerald-500"
            }`}
          />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
            {incidentActive
              ? "INCIDENT #4092: P99 TAIL BREACH DETECTED"
              : "TOPOLOGY HEALTH: 25,400 SPANS/SEC NOMINAL"}
          </span>
        </div>

        <button
          onClick={triggerIncident}
          className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-all font-semibold flex items-center gap-1.5 cursor-pointer ${
            incidentActive
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "border border-red-500/40 text-red-500 hover:bg-red-500/10"
          }`}
        >
          {incidentActive ? (
            <>
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
              </svg>
              <span>Auto-Mitigate Incident</span>
            </>
          ) : (
            <>
              <span className="text-[10px]">⚡</span>
              <span>Simulate Cascade Failure</span>
            </>
          )}
        </button>
      </div>

      {/* Main Graph & Inspector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Microservice Topology Nodes */}
        <div className="md:col-span-7 rounded border border-[var(--hairline)] bg-[var(--surface)] p-3 md:p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                TOPOLOGICAL CAUSAL CONE
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                CLICK NODE TO INSPECT
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {services.map((svc) => {
                const isSelected = svc.id === selectedServiceId;
                const statusColor =
                  svc.status === "critical"
                    ? "border-red-500 bg-red-500/10 text-red-500"
                    : svc.status === "degraded"
                    ? "border-amber-500 bg-amber-500/10 text-amber-500"
                    : "border-[var(--hairline)] bg-[var(--bg)] text-[var(--text-primary)]";

                return (
                  <div
                    key={svc.id}
                    onClick={() => setSelectedServiceId(svc.id)}
                    className={`cursor-pointer p-2.5 rounded border transition-all ${statusColor} ${
                      isSelected ? "ring-1 ring-[var(--accent)]" : "hover:border-[var(--text-secondary)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            svc.status === "critical"
                              ? "bg-red-500"
                              : svc.status === "degraded"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        <span className="font-mono text-xs font-semibold">{svc.name}</span>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-[var(--text-secondary)]">{svc.rps.toLocaleString()} rps</span>
                        <span
                          className={`font-bold ${
                            svc.p99 > 300 ? "text-red-500" : "text-[var(--text-primary)]"
                          }`}
                        >
                          p99: {svc.p99}ms
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-1 font-mono pl-4">
                      {svc.role}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[var(--hairline)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
            <span>CANVAS ENGINE: WEBGL / 60 FPS</span>
            <span>INDEX: R-TREE SPATIAL</span>
          </div>
        </div>

        {/* Right: Trace Span Waterfall Inspector */}
        <div className="md:col-span-5 rounded border border-[var(--hairline)] bg-[var(--surface)] p-3 md:p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[var(--hairline)] pb-2">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                  SELECTED SPAN WATERFALL
                </span>
                <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                  {selected.name}
                </span>
              </div>
              <span
                className={`font-mono text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                  selected.status === "critical"
                    ? "bg-red-500/20 text-red-500"
                    : selected.status === "degraded"
                    ? "bg-amber-500/20 text-amber-500"
                    : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {selected.status}
              </span>
            </div>

            {/* Waterfall bars */}
            <div className="space-y-3 mt-3">
              {selected.spans.map((sp, idx) => {
                const widthPercent = Math.max(8, Math.round((sp.duration / totalSpanDuration) * 100));
                const isAnomaly = sp.duration > 200;

                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-[var(--text-secondary)]">{sp.name}</span>
                      <span className={isAnomaly ? "text-red-500 font-bold" : "text-[var(--text-primary)]"}>
                        {sp.duration}ms
                      </span>
                    </div>

                    <div className="w-full bg-[var(--bg)] h-3 rounded overflow-hidden flex border border-[var(--hairline)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercent}%` }}
                        transition={{ duration: 0.3 }}
                        className={`h-full ${
                          isAnomaly
                            ? "bg-red-500"
                            : idx === 0
                            ? "bg-[var(--accent)]"
                            : idx === 1
                            ? "bg-blue-500"
                            : "bg-neutral-500"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--hairline)]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">TOTAL TRACE TIME</span>
              <span className="font-bold text-[var(--text-primary)]">{totalSpanDuration} ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
