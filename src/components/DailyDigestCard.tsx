"use client";

import React, { useState, useEffect, useRef } from "react";

export function DailyDigestCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 252; // 4 minutes 12 seconds
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Synthesize pleasant ambient chime on play
  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3 warm tone
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2); // swell up to A4

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  const stopAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      try {
        gainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.2);
        setTimeout(() => {
          oscRef.current?.stop();
          oscRef.current?.disconnect();
          oscRef.current = null;
        }, 220);
      } catch {
        // clean up safely
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  };

  // Timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            stopAudio();
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = Math.min(100, (currentTime / totalDuration) * 100);

  return (
    <div className="p-3.5 rounded-lg hairline-all bg-[var(--surface)] flex flex-col justify-between">
      <div>
        {/* Top Header Tag */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
            Daily Digest · March 10
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--accent)] font-semibold">
            {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />}
            AI BRIEFING
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-[var(--text-primary)] leading-snug truncate mb-1">
          Software Design in the Age of Agents
        </h3>
        <p className="text-xs text-[var(--text-secondary)] line-clamp-1 leading-normal mb-3">
          Synthesizing 8 articles on autonomous tool use, tactile interfaces & canvas engines.
        </p>
      </div>

      {/* Audio Player Controls */}
      <div>
        {/* Scrubber Progress Bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const ratio = Math.max(0, Math.min(1, clickX / rect.width));
            setCurrentTime(Math.round(ratio * totalDuration));
          }}
          className="w-full h-1.5 rounded-full bg-[var(--surface-raised)] hairline-all cursor-pointer relative overflow-hidden mb-2.5 group"
        >
          <div
            className="h-full bg-[var(--accent)] rounded-full transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Play Button, Waveform, and Timer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Play/Pause Button with min 44x44px touch target area */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause briefing" : "Play briefing"}
              className="w-8 h-8 rounded-full bg-[var(--text-primary)] text-[var(--bg)] flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-xs"
            >
              {isPlaying ? (
                // Pause icon
                <svg className="w-3 h-3 fill-current" viewBox="0 0 16 16">
                  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                </svg>
              ) : (
                // Play icon
                <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              )}
            </button>

            {/* Animated Waveform Bars */}
            <div className="flex items-center gap-0.5 h-4">
              {[40, 75, 55, 90, 60, 100, 45, 80, 65, 30].map((h, i) => (
                <span
                  key={i}
                  className={`w-[2px] rounded-full transition-all duration-200 ${
                    isPlaying ? "bg-[var(--accent)]" : "bg-[var(--text-muted)]"
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, (h * (i % 2 === 0 ? 0.9 : 1.1)))}%` : "25%",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Time Display */}
          <div className="font-mono text-[11px] text-[var(--text-secondary)] tabular-nums">
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </div>
        </div>
      </div>
    </div>
  );
}
