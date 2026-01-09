"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle({
    src,
    promptOnLoad,
}: {
    src: string;
    promptOnLoad?: boolean;
}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isOn, setIsOn] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [shake, setShake] = useState(false);

    // ✅ Start Music / Keep Muted prompt modal
    const [promptOpen, setPromptOpen] = useState(false);

    // ✅ Portal safe (SSR)
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const a = new Audio(src);
        a.loop = true;
        a.volume = 0.6;
        audioRef.current = a;

        return () => {
            a.pause();
            // @ts-ignore
            audioRef.current = null;
        };
    }, [src]);

    const play = async () => {
        try {
            await audioRef.current?.play();
            setIsOn(true);
            setBlocked(false);
        } catch {
            setBlocked(true);
            setIsOn(false);
        }
    };

    const stop = () => {
        const a = audioRef.current;
        if (!a) return;
        a.pause();
        a.currentTime = 0;
        setIsOn(false);
        setBlocked(false);
    };

    const toggle = async () => {
        if (isOn) {
            stop();
            setShake(true);
            window.setTimeout(() => setShake(false), 420);
        } else {
            await play();
        }
    };

    // ✅ Trigger prompt AFTER entry modal closes
    useEffect(() => {
        if (!promptOnLoad) return;

        // ✅ always show on refresh/open
        setPromptOpen(true);
    }, [promptOnLoad]);

    // ✅ Click actions should instantly "enter" website (close modal)
    const handleStart = async () => {
        setPromptOpen(false);     // ✅ close instantly
        setBlocked(false);

        // ✅ let modal close paint first, then play
        setTimeout(() => {
            play();
        }, 0);
    };

    const handleMuted = () => {
        setPromptOpen(false);     // ✅ close instantly

        // ✅ let modal close paint first, then stop
        setTimeout(() => {
            stop();
        }, 0);
    };

    return (
        <div className="relative">
            {/* Button */}
            <button
                type="button"
                onClick={toggle}
                className={[
                    "lux-music-btn whitespace-nowrap",
                    isOn ? "is-on" : "is-off",
                    shake ? "is-shake" : "",
                ].join(" ")}
                aria-label={isOn ? "Mute music" : "Play music"}
            >
                <span className="lux-music-iconWrap">
                    {isOn ? (
                        <>
                            <Volume2 size={16} className="lux-music-icon lux-music-icon-on" />
                            <span className="lux-eq" aria-hidden="true">
                                <span className="lux-eq-bar b1" />
                                <span className="lux-eq-bar b2" />
                                <span className="lux-eq-bar b3" />
                            </span>
                        </>
                    ) : (
                        <VolumeX size={16} className="lux-music-icon lux-music-icon-off" />
                    )}
                </span>

                {/* Premium label */}
                <span className="lux-music-text">
                    {isOn ? (
                        <span className="inline-flex items-center gap-2">
                            <span className="lux-live-dot" />
                            <span>🎵</span>
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2">
                            <span className="lux-muted-dot" />
                            <span>🔇</span>
                        </span>
                    )}
                </span>
            </button>

            {/* Tooltip when autoplay blocked */}
            {blocked ? (
                <div className="lux-music-tip">
                    Tap to start music ✨ (Browser blocked autoplay)
                </div>
            ) : null}

            {/* ✅ Start Music / Keep Muted Prompt Modal (Portal) */}
            {promptOpen && mounted
                ? createPortal(
                    <div className="fixed inset-0 z-[99999]">
                        {/* ✅ Less dark (more website visible) */}
                        <div
                            className="absolute inset-0 bg-black/85 backdrop-blur-3xl"
                            onClick={() => setPromptOpen(false)}
                        />
                        {/* ✅ Soft vignette only (light) */}
                        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_45%_at_50%_20%,rgba(0,0,0,0),rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.35)_100%)]" />

                        {/* Modal position */}
                        <div className="absolute inset-0 flex items-start justify-center p-4 pt-28 sm:pt-32">
                            <div className="relative w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/12 bg-white/[0.10] shadow-2xl">
                                <div className="pointer-events-none absolute inset-0 entry-sparkle opacity-55" />
                                <div className="pointer-events-none absolute inset-0 entry-shimmer opacity-45" />
                                <div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-[min(420px,78%)] -translate-x-1/2 entry-ribbon" />

                                <button
                                    onClick={() => setPromptOpen(false)}
                                    className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs text-white/90 hover:bg-black/50"
                                >
                                    ✕ Close
                                </button>

                                <div className="p-7 md:p-8">
                                    <p className="text-[11px] tracking-[0.28em] text-[#d6a855]/90">
                                        EXPERIENCE • MUSIC
                                    </p>

                                    <h3 className="mt-2 text-2xl font-semibold text-white">
                                        Background Music 🎶
                                    </h3>

                                    <p className="mt-3 text-white/75 leading-relaxed">
                                        क्या आप वेबसाइट अनुभव के लिए बैकग्राउंड म्यूज़िक चालू करना चाहेंगे?
                                        आप इसे कभी भी ऊपर दिए गए toggle से mute कर सकते हैं।
                                    </p>

                                    <div className="mt-6 flex gap-3">
                                        {/* ✅ On click: start music + instantly enter (close modal) */}
                                        <button
                                            onClick={handleStart}
                                            className="flex-1 rounded-full bg-[#d6a855] px-5 py-2 text-sm font-semibold text-black hover:opacity-95"
                                        >
                                            ▶️ Start Music
                                        </button>

                                        {/* ✅ On click: keep muted + instantly enter (close modal) */}
                                        <button
                                            onClick={handleMuted}
                                            className="flex-1 rounded-full border border-white/18 bg-black/25 px-5 py-2 text-sm font-semibold text-white/90 hover:bg-black/35"
                                        >
                                            🔇 Keep Muted
                                        </button>
                                    </div>

                                    <div className="mt-4 text-xs text-white/55">
                                        Note: iPhone पर music start करने के लिए tap जरूरी होता है.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
                : null}
        </div>
    );
}