"use client";

import React, { useState } from "react";
import Link from "next/link";

export function ArthurFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("ma675967@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer className="mt-20 pt-8 border-t border-[var(--hairline)] flex flex-col items-center w-full text-center">

      {/* External Links */}
      <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)] mb-4">
        <button
          onClick={copyEmail}
          className="hover:text-[var(--text-primary)] hover:underline cursor-pointer"
        >
          {copied ? "Copied!" : "Email"}
        </button>
        <span className="text-[var(--hairline)]">·</span>
        <a
          href="https://github.com/ahmed-develops"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--text-primary)] hover:underline"
        >
          GitHub
        </a>
        <span className="text-[var(--hairline)]">·</span>
        {/* <a
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--text-primary)] hover:underline"
        >
          Twitter / X
        </a> */}
        {/* <span className="text-[var(--hairline)]">·</span>
        <Link
          href="/mcp"
          className="hover:text-[var(--accent)] hover:underline font-semibold"
        >
          MCP Server
        </Link> */}
      </div>

      <div className="text-[11px] font-mono text-[var(--text-muted)]">
        Sydney, AU · 2026 Muhammad Ahmed
      </div>
    </footer>
  );
}
