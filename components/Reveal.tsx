"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
    children: React.ReactNode;
    className?: string;

    /** "fade-up" | "fade" | "fade-down" */
    variant?: "fade-up" | "fade" | "fade-down";

    /** how much of element should be visible to trigger */
    threshold?: number;

    /** start revealing a bit before it enters */
    rootMargin?: string;

    /** delay in ms */
    delayMs?: number;

    /** if true, animation will happen only once */
    once?: boolean;
};

export function Reveal({
    children,
    className,
    variant = "fade-up",
    threshold = 0.16,
    rootMargin = "0px 0px -10% 0px",
    delayMs = 0,
    once = false,
}: RevealProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    const reduceMotion = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (reduceMotion) {
            setInView(true);
            return;
        }

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                } else {
                    if (!once) setInView(false); // ✅ replay when re-enter
                }
            },
            { threshold, rootMargin }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold, rootMargin, once, reduceMotion]);

    return (
        <div
            ref={ref}
            data-variant={variant}
            className={cn("reveal", inView && "reveal-in", className)}
            style={
                {
                    ["--reveal-delay" as any]: `${delayMs}ms`,
                } as React.CSSProperties
            }
        >
            {children}
        </div>
    );
}