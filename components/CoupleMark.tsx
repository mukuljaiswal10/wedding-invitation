"use client";

import { cn } from "@/lib/cn";

export function CoupleMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center align-middle mx-2",
        "translate-y-[1px]",
        className
      )}
      aria-label="love"
      title="love"
    >
      {/* soft glow behind heart */}
      <span className="pointer-events-none absolute inset-[-10px] rounded-full cm-glow" />

      {/* heart */}
      <span className="cm-heart">❤</span>

      {/* ✅ make keyframes global so it always runs */}
      <style jsx global>{`
        .cm-heart {
          display: inline-block;
          color: #ef4444; /* red */
          /* premium shadow */
          filter: drop-shadow(0 10px 22px rgba(239, 68, 68, 0.35))
            drop-shadow(0 2px 6px rgba(0, 0, 0, 0.28));
          transform-origin: 50% 60%;
          animation: cm-heartbeat 1.15s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          will-change: transform;
        }

        .cm-glow {
          background: radial-gradient(
            circle,
            rgba(239, 68, 68, 0.24) 0%,
            rgba(239, 68, 68, 0.12) 40%,
            rgba(239, 68, 68, 0) 70%
          );
          filter: blur(14px);
          animation: cm-glowpulse 1.15s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes cm-heartbeat {
          0% {
            transform: scale(1);
          }
          12% {
            transform: scale(1.22);
          }
          22% {
            transform: scale(0.96);
          }
          34% {
            transform: scale(1.14);
          }
          48% {
            transform: scale(1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes cm-glowpulse {
          0% {
            opacity: 0.35;
            transform: scale(0.92);
          }
          30% {
            opacity: 0.7;
            transform: scale(1.18);
          }
          55% {
            opacity: 0.45;
            transform: scale(1);
          }
          100% {
            opacity: 0.35;
            transform: scale(0.92);
          }
        }
      `}</style>
    </span>
  );
}