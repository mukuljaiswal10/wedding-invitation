"use client";

import { useEffect, useMemo, useState } from "react";

function diffParts(target: Date) {
    const now = new Date();
    const ms = Math.max(0, target.getTime() - now.getTime());
    const s = Math.floor(ms / 1000);
    const days = Math.floor(s / 86400);
    const hrs = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return { days, hrs, mins, secs };
}

function pad2(n: number) {
    const s = String(Math.max(0, n));
    return s.length === 1 ? `0${s}` : s;
}

function PremiumCountCard({
    label,
    value,
    delay = 0,
}: {
    label: string;
    value: number;
    delay?: number;
}) {
    return (
        <div className="count-card glass relative overflow-hidden px-4 py-4 text-center">
            {/* ribbon edges */}
            <div className="ribbon-edge ribbon-top"><span style={{ animationDelay: `${delay}s` }} /></div>
            <div className="ribbon-edge ribbon-bottom"><span style={{ animationDelay: `${delay + 0.6}s` }} /></div>
            <div className="ribbon-edge ribbon-left"><span style={{ animationDelay: `${delay + 0.2}s` }} /></div>
            <div className="ribbon-edge ribbon-right"><span style={{ animationDelay: `${delay + 0.9}s` }} /></div>

            {/* shimmer overlay */}
            <div className="count-shimmer"><span style={{ animationDelay: `${delay + 0.3}s` }} /></div>

            {/* tiny sparkles */}
            <span className="sparkle-dot" style={{ top: "10px", left: "14px", animationDelay: `${delay}s` }} />
            <span className="sparkle-dot" style={{ bottom: "10px", right: "18px", animationDelay: `${delay + 0.8}s` }} />

            <div className="font-display text-3xl text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                {pad2(value)}
            </div>
            <div className="mt-1 text-[11px] tracking-[0.25em] uppercase text-white/65">
                {label}
            </div>
        </div>
    );
}

export function Countdown({ targetISO }: { targetISO: string }) {
    const target = useMemo(() => new Date(targetISO), [targetISO]);
    const [t, setT] = useState(() => diffParts(target));

    useEffect(() => {
        const id = setInterval(() => setT(diffParts(target)), 1000);
        return () => clearInterval(id);
    }, [target]);

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <PremiumCountCard label="Days" value={t.days} delay={0} />
            <PremiumCountCard label="Hours" value={t.hrs} delay={0.2} />
            <PremiumCountCard label="Mins" value={t.mins} delay={0.4} />
            <PremiumCountCard label="Secs" value={t.secs} delay={0.6} />
        </div>
    );
}