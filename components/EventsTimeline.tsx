import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { MapPin, Clock } from "lucide-react";

type EventKind = "mehndi" | "haldi" | "sangeet" | "wedding";

const tone: Record<EventKind, { chip: string; bg: string; ring: string }> = {
    mehndi: {
        chip: "Mehndi • Emerald",
        bg: "bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(214,175,97,0.12),transparent_55%)]",
        ring: "hover:border-emerald-400/25",
    },
    haldi: {
        chip: "Haldi • Saffron",
        bg: "bg-[radial-gradient(circle_at_25%_25%,rgba(250,204,21,0.20),transparent_55%),radial-gradient(circle_at_80%_15%,rgba(214,175,97,0.12),transparent_55%)]",
        ring: "hover:border-yellow-300/25",
    },
    sangeet: {
        chip: "Sangeet • Lavender",
        bg: "bg-[radial-gradient(circle_at_25%_20%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(circle_at_80%_15%,rgba(236,72,153,0.12),transparent_55%)]",
        ring: "hover:border-fuchsia-300/25",
    },
    wedding: {
        chip: "Wedding • Royal",
        bg: "bg-[radial-gradient(circle_at_25%_20%,rgba(244,63,94,0.18),transparent_55%),radial-gradient(circle_at_80%_15%,rgba(214,175,97,0.16),transparent_55%)]",
        ring: "hover:border-rose-300/25",
    },
};

export function EventsTimeline({
    events,
}: {
    events: {
        kind: EventKind;
        title: string;
        date: string;
        time: string;
        venue: string;
        mapUrl: string;
    }[];
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {events.map((e, i) => {
                const t = tone[e.kind];

                // ✅ Stagger: 1-by-1 reveal
                const delay = 80 + i * 110;

                return (
                    <Reveal key={`${e.title}-${i}`} variant="fade-up" delayMs={delay}>
                        <div
                            className={`glass p-5 transition duration-300 ease-out hover:-translate-y-[2px] ${t.ring} ${t.bg}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-white/70">
                                        <span className="h-1.5 w-1.5 rounded-full bg-gold/90" />
                                        {t.chip}
                                    </div>

                                    <div className="mt-2 font-display text-xl">{e.title}</div>

                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/75">
                                        <span className="inline-flex items-center gap-2">
                                            <Clock size={16} className="text-gold/90" />
                                            {e.date} • {e.time}
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            <MapPin size={16} className="text-gold/90" />
                                            {e.venue}
                                        </span>
                                    </div>
                                </div>

                                <a href={e.mapUrl} target="_blank" rel="noreferrer">
                                    <Button variant="secondary">Open Map</Button>
                                </a>
                            </div>

                            <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                            <div className="mt-4 text-xs text-white/65">
                                Tip: Arrive 15 min early for best seating & photos.
                            </div>
                        </div>
                    </Reveal>
                );
            })}
        </div>
    );
}