"use client";
import { MapPinned, Sparkles, Calendar } from "lucide-react";

export function StickyMobileBar({ onRSVP }: { onRSVP: () => void }) {
    return (
        <div className="fixed bottom-3 left-0 right-0 z-40 px-4 sm:hidden">
            <div className="glass mx-auto flex max-w-md items-center justify-between gap-2 p-2">
                <button
                    onClick={onRSVP}
                    className="flex-1 rounded-xl bg-gold px-4 py-3 text-sm font-medium text-black active:scale-[0.98] transition"
                >
                    RSVP
                </button>
                <a href="#events" className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 focus-ring" aria-label="Events">
                    <Sparkles size={18} />
                </a>
                <a href="#venue" className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 focus-ring" aria-label="Venue">
                    <MapPinned size={18} />
                </a>
                <a href="#calendar" className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 focus-ring" aria-label="Calendar">
                    <Calendar size={18} />
                </a>
            </div>
        </div>
    );
}