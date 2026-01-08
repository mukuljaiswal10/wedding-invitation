"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";




export function ScrollToTop({ showAfter = 420 }: { showAfter?: number }) {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);

    const holdTimer = useRef<number | null>(null);
    const didHold = useRef(false);

    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const y = window.scrollY;
                const doc = document.documentElement;
                const total = Math.max(1, doc.scrollHeight - doc.clientHeight);
                const p = Math.min(1, Math.max(0, y / total));

                setProgress(p);
                setShow(y > showAfter);

                ticking = false;
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [showAfter]);

    const dash = useMemo(() => {
        const circumference = 2 * Math.PI * 16; // r=16
        return { circumference, offset: circumference * (1 - progress) };
    }, [progress]);

    const smoothTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const instantTop = () => window.scrollTo({ top: 0, behavior: "auto" });

    const clearHold = () => {
        if (holdTimer.current) {
            window.clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
    };

    const onPressStart = () => {
        didHold.current = false;
        clearHold();
        holdTimer.current = window.setTimeout(() => {
            didHold.current = true;
            instantTop();
        }, 350);
    };

    const onPressEnd = () => {
        clearHold();
        if (!didHold.current) smoothTop();
    };

    return (
        <div
            className={cn(
                "fixed z-[75]",
                // ✅ MOBILE: keep it ABOVE sticky bottom bar (your bar is ~60px+)
                "right-[calc(1.25rem+env(safe-area-inset-right))]",
                "bottom-[calc(6.25rem+env(safe-area-inset-bottom))]",
                // ✅ DESKTOP: normal bottom
                "sm:right-[calc(1.75rem+env(safe-area-inset-right))]",
                "sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))]",
                "transition-all duration-300",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            )}
        >
            <button
                type="button"
                className={cn(
                    "group relative h-12 w-12 rounded-2xl",
                    "border border-white/10 bg-black/[0.25] backdrop-blur-xl",
                    "shadow-glow hover:bg-black/[0.32] transition focus-ring",
                    "select-none touch-none"
                )}
                aria-label="Scroll to top"
                title="Tap: smooth • Hold: instant"
                onPointerDown={onPressStart}
                onPointerUp={onPressEnd}
                onPointerCancel={clearHold}
                onPointerLeave={clearHold}
            >
                {/* Progress ring */}
                <svg className="absolute inset-0 m-auto" width="44" height="44" viewBox="0 0 44 44">
                    <circle
                        cx="22"
                        cy="22"
                        r="16"
                        fill="none"
                        stroke="rgba(184,142,78,0.22)"
                        strokeWidth="3"
                    />
                    <circle
                        cx="22"
                        cy="22"
                        r="16"
                        fill="none"
                        stroke="rgba(184,142,78,0.95)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={dash.circumference}
                        strokeDashoffset={dash.offset}
                        transform="rotate(-90 22 22)"
                        style={{ transition: "stroke-dashoffset 160ms linear" }}
                    />
                </svg>

                {/* ✅ Icon white for visibility */}
                <span className="absolute inset-0 grid place-items-center">
                    <ArrowUp size={18} className="text-white/90 group-hover:text-white transition" />
                </span>

                {/* Tiny shimmer */}
                <span className="pointer-events-none absolute inset-x-1 top-1 h-[1px] bg-gradient-to-r from-transparent via-[rgba(184,142,78,0.65)] to-transparent opacity-70" />
            </button>
        </div>
    );
}
