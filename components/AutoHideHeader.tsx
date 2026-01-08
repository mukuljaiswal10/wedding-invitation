"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function AutoHideHeader({
    children,
    className,
    revealOffset = 24,
    hideOffset = 80,
}: {
    children: React.ReactNode;
    className?: string;
    revealOffset?: number;
    hideOffset?: number;
}) {
    const [hidden, setHidden] = useState(false);
    const [sweep, setSweep] = useState(false);

    const lastY = useRef(0);
    const accUp = useRef(0);
    const accDown = useRef(0);
    const ticking = useRef(false);

    // trigger shimmer when header becomes visible
    useEffect(() => {
        if (!hidden) {
            setSweep(true);
            const t = window.setTimeout(() => setSweep(false), 650);
            return () => window.clearTimeout(t);
        }
    }, [hidden]);

    useEffect(() => {
        lastY.current = window.scrollY;

        const onScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            requestAnimationFrame(() => {
                const y = window.scrollY;
                const dy = y - lastY.current;

                if (dy > 0) {
                    accDown.current += dy;
                    accUp.current = 0;
                } else if (dy < 0) {
                    accUp.current += Math.abs(dy);
                    accDown.current = 0;
                }

                if (y < 8) {
                    setHidden(false);
                    accUp.current = 0;
                    accDown.current = 0;
                } else {
                    if (accDown.current > hideOffset) setHidden(true);
                    if (accUp.current > revealOffset) setHidden(false);
                }

                lastY.current = y;
                ticking.current = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [revealOffset, hideOffset]);

    return (
        <div
            className={cn(
                "fixed left-0 right-0 top-0 z-[70] will-change-transform",
                "transition-[transform,opacity,filter] duration-[420ms]",
                "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                hidden ? "opacity-0 blur-[6px]" : "opacity-100 blur-0",
                className
            )}
            style={{
                transform: hidden ? "translate3d(0,-112%,0)" : "translate3d(0,0,0)",
            }}
        >
            {/* shimmer sweep layer (only when showing) */}
            <div className="relative">
                {children}

                <div
                    className={cn(
                        "pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden",
                        sweep ? "opacity-100" : "opacity-0"
                    )}
                >
                    <span
                        className={cn(
                            "absolute inset-y-0 -left-[40%] w-[35%]",
                            "bg-gradient-to-r from-transparent via-gold/25 to-transparent",
                            sweep ? "animate-[headerSweep_650ms_ease-out_1]" : ""
                        )}
                    />
                </div>
            </div>

            {/* local keyframes */}
            <style jsx>{`
        @keyframes headerSweep {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateX(420%);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}















