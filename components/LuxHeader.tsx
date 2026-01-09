"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { MusicToggle } from "@/components/MusicToggle";
import { Leaf, Sun, Music, Gem, Sparkles } from "lucide-react";
import { CoupleMark } from "@/components/CoupleMark";

type EventKind = "mehndi" | "haldi" | "sangeet" | "wedding";

type TickerEvent = {
    kind: EventKind;
    title: string;
    date: string;
    time: string;
};

export function LuxHeader({
    couple,
    onRSVP,
    musicSrc,
    events,
    musicPromptAfterIntro,
}: {
    couple: string;
    onRSVP: () => void;
    musicSrc?: string;
    events?: TickerEvent[];
    /** ✅ when true, MusicToggle shows "Start Music / Keep Muted" prompt (inside MusicToggle) */
    musicPromptAfterIntro?: boolean;
}) {
    const safeEvents: TickerEvent[] = useMemo(
        () =>
            events && events.length
                ? events
                : [
                    { kind: "mehndi", title: "Mehndi", date: "22 Feb", time: "4:00 PM" },
                    { kind: "haldi", title: "Haldi", date: "22 Feb", time: "10:00 AM" },
                    { kind: "sangeet", title: "Sangeet", date: "22 Feb", time: "7:30 PM" },
                    { kind: "wedding", title: "Wedding", date: "24 Feb", time: "7:00 PM" },
                ],
        [events]
    );

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const m = window.matchMedia("(max-width: 639px)"); // tailwind sm breakpoint
        const onChange = () => setIsMobile(m.matches);
        onChange();

        if (m.addEventListener) m.addEventListener("change", onChange);
        else m.addListener(onChange);

        return () => {
            if (m.removeEventListener) m.removeEventListener("change", onChange);
            else m.removeListener(onChange);
        };
    }, []);

    // ✅ pause ONLY on long-press (so normal scroll won't freeze ticker)
    const [paused, setPaused] = useState(false);
    const holdTimer = useRef<number | null>(null);

    const startHold = () => {
        if (holdTimer.current) window.clearTimeout(holdTimer.current);
        holdTimer.current = window.setTimeout(() => setPaused(true), 250);
    };

    const endHold = () => {
        if (holdTimer.current) window.clearTimeout(holdTimer.current);
        holdTimer.current = null;
        setPaused(false);
    };


    return (
        <header className="container-shell pt-5 sticky top-0 z-40">
            <div className="glass px-4 py-3 sm:px-5 sm:py-4">
                {/* ===================== DESKTOP HEADER ===================== */}
                <div className="hidden sm:grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    {/* Left */}
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <span className="h-2 w-2 rounded-full bg-gold/70" />
                        <span className="tracking-[0.18em] uppercase">Invitation</span>
                    </div>

                    {/* Center */}
                    <div className="text-center">
                        <div className="font-display text-lg sm:text-xl leading-none drop-shadow-[0_0_18px_rgba(214,175,97,0.18)]">
                            {(() => {
                                const parts = couple
                                    .split(/×|x|X/)
                                    .map((s) => s.trim())
                                    .filter(Boolean);
                                if (parts.length < 2) return <span>{couple}</span>;
                                return (
                                    <span className="inline-flex items-center justify-center flex-wrap gap-y-1">
                                        <span>{parts[0]}</span>
                                        <CoupleMark className="text-base sm:text-lg" />
                                        <span>{parts.slice(1).join(" ")}</span>
                                    </span>
                                );
                            })()}
                        </div>

                        {/* underline */}
                        <div className="relative mx-auto mt-2 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
                            <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold/90 to-transparent animate-sheen" />
                            <span className="absolute -top-1 left-6 h-2 w-2 rounded-full bg-gold/60 blur-[1px] animate-[floaty_3.6s_ease-in-out_infinite]" />
                            <span className="absolute -top-1 right-10 h-2 w-2 rounded-full bg-white/35 blur-[1px] animate-[floaty_4.2s_ease-in-out_infinite]" />
                        </div>

                        <div className="mt-2 text-[11px] tracking-[0.22em] uppercase text-white/60">
                            Save the Date • Celebrate with us
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex justify-end items-center gap-2">
                        <div className="flex gap-2">
                            <a href="#events">
                                <Button variant="ghost">Events</Button>
                            </a>
                            <a href="#venue">
                                <Button variant="ghost">Venue</Button>
                            </a>
                        </div>

                        {musicSrc && !isMobile ? (
                            <MusicToggle src={musicSrc} promptOnLoad={musicPromptAfterIntro} />
                        ) : null}
                        <Button onClick={onRSVP}>RSVP</Button>
                    </div>
                </div>

                {/* ===================== MOBILE HEADER ===================== */}
                <div className="sm:hidden">
                    {/* Row 1 */}
                    <div className="text-center">
                        <div className="font-display text-[17px] leading-tight drop-shadow-[0_0_18px_rgba(214,175,97,0.18)]">
                            {(() => {
                                const parts = couple
                                    .split(/×|x|X/)
                                    .map((s) => s.trim())
                                    .filter(Boolean);
                                if (parts.length < 2) return <span>{couple}</span>;
                                return (
                                    <span className="inline-flex items-center justify-center flex-wrap gap-y-1">
                                        <span>{parts[0]}</span>
                                        <CoupleMark className="text-base" />
                                        <span>{parts.slice(1).join(" ")}</span>
                                    </span>
                                );
                            })()}
                        </div>

                        <div className="relative mx-auto mt-2 h-[2px] w-44 overflow-hidden rounded-full bg-white/10">
                            <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold/90 to-transparent animate-sheen" />
                            <span className="absolute -top-1 left-5 h-2 w-2 rounded-full bg-gold/70 blur-[1px] animate-[floaty_3.4s_ease-in-out_infinite]" />
                            <span className="absolute -top-1 right-8 h-2 w-2 rounded-full bg-white/30 blur-[1px] animate-[floaty_4s_ease-in-out_infinite]" />
                        </div>

                        <div className="mt-2 text-[10px] tracking-[0.22em] uppercase text-white/60">
                            Save the Date
                        </div>
                    </div>

                    {/* ✅ Ticker (guaranteed move) + pause on long-press */}
                    <div
                        className="relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 py-2 select-none"
                        onPointerDown={startHold}
                        onPointerUp={endHold}
                        onPointerCancel={endHold}
                        onPointerLeave={endHold}
                        onTouchStart={startHold}
                        onTouchEnd={endHold}
                        onTouchCancel={endHold}
                    >
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/40 to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/40 to-transparent" />

                        <div className={`lux-ticker-rail flex w-max whitespace-nowrap ${paused ? "is-paused" : ""}`}>
                            <TickerRow events={safeEvents} />
                            <TickerRow events={safeEvents} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <a
                                href="#events"
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition focus-ring"
                            >
                                Events
                            </a>
                            <a
                                href="#venue"
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition focus-ring"
                            >
                                Venue
                            </a>
                        </div>

                        <div className="flex items-center gap-2">
                            {musicSrc && isMobile ? (
                                <MusicToggle src={musicSrc} promptOnLoad={musicPromptAfterIntro} />
                            ) : null}
                            <Button onClick={onRSVP} className="px-4">
                                RSVP
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

/* ---------- Event icon helpers ---------- */

function tintClasses(kind: EventKind) {
    switch (kind) {
        case "mehndi":
            return {
                icon: "text-emerald-300/95",
                glow: "shadow-[0_0_18px_rgba(16,185,129,0.22)]",
                dot: "bg-emerald-300/70",
            };
        case "haldi":
            return {
                icon: "text-yellow-300/95",
                glow: "shadow-[0_0_18px_rgba(250,204,21,0.24)]",
                dot: "bg-yellow-300/70",
            };
        case "sangeet":
            return {
                icon: "text-fuchsia-300/95",
                glow: "shadow-[0_0_18px_rgba(217,70,239,0.22)]",
                dot: "bg-fuchsia-300/70",
            };
        case "wedding":
        default:
            return {
                icon: "text-gold/95",
                glow: "shadow-[0_0_18px_rgba(214,175,97,0.22)]",
                dot: "bg-gold/80",
            };
    }
}

function iconFor(kind: EventKind) {
    const t = tintClasses(kind);
    const common = `h-7 w-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center ${t.glow}`;
    switch (kind) {
        case "mehndi":
            return (
                <span className={common}>
                    <Leaf size={14} className={t.icon} />
                </span>
            );
        case "haldi":
            return (
                <span className={common}>
                    <Sun size={14} className={t.icon} />
                </span>
            );
        case "sangeet":
            return (
                <span className={common}>
                    <Music size={14} className={t.icon} />
                </span>
            );
        case "wedding":
            return (
                <span className={common}>
                    <Gem size={14} className={t.icon} />
                </span>
            );
        default:
            return (
                <span className={common}>
                    <Sparkles size={14} className="text-gold/95" />
                </span>
            );
    }
}

function TickerRow({ events }: { events: TickerEvent[] }) {
    return (
        <div className="flex items-center gap-3 px-4">
            {events.map((e, idx) => (
                <span key={`${e.kind}-${idx}`} className="inline-flex items-center gap-3">
                    <TickerItem icon={iconFor(e.kind)} dotClass={tintClasses(e.kind).dot}>
                        <span className="text-white/85">{e.title}</span>
                        <span className="text-white/55">
                            {e.date} • {e.time}
                        </span>
                    </TickerItem>
                    <Dot />
                </span>
            ))}

            <TickerItem
                icon={
                    <span className="h-7 w-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shadow-[0_0_18px_rgba(214,175,97,0.18)]">
                        <Sparkles size={14} className="text-gold/95" />
                    </span>
                }
                dotClass="bg-gold/80"
            >
                <span className="text-white/85">Venue</span>
                <span className="text-white/55">Directions</span>
            </TickerItem>
            <Dot />
            <TickerItem
                icon={
                    <span className="h-7 w-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shadow-[0_0_18px_rgba(214,175,97,0.18)]">
                        <Sparkles size={14} className="text-gold/95" />
                    </span>
                }
                dotClass="bg-gold/80"
            >
                <span className="text-white/85">RSVP</span>
                <span className="text-white/55">Confirm now</span>
            </TickerItem>

            <span className="inline-block w-10" />
        </div>
    );
}

function TickerItem({
    icon,
    children,
    dotClass,
}: {
    icon: ReactNode;
    children: ReactNode;
    dotClass: string;
}) {
    return (
        <span className="inline-flex items-center gap-3">
            {icon}
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-white/75">
                <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
                <span className="inline-flex items-center gap-2">{children}</span>
            </span>
        </span>
    );
}

function Dot() {
    return <span className="text-gold/70">•</span>;
}