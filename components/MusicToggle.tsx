// "use client";

// import { useEffect, useState } from "react";
// import { Volume2, VolumeX, Sparkles } from "lucide-react";
// import { Button } from "@/components/Button";

// const MUTED_KEY = "invite_music_muted_v2";
// const EVT = "invite-music-sync-v2";

// declare global {
//     interface Window {
//         __INVITE_AUDIO__?: HTMLAudioElement;
//         __INVITE_AUDIO_SRC__?: string;
//         __INVITE_MUTED__?: boolean;
//         __INVITE_AUTOPLAY_BLOCKED__?: boolean;
//     }
// }

// function getOrCreateAudio(src: string) {
//     if (window.__INVITE_AUDIO__ && window.__INVITE_AUDIO_SRC__ === src) return window.__INVITE_AUDIO__;

//     if (window.__INVITE_AUDIO__) {
//         const a = window.__INVITE_AUDIO__;
//         if (window.__INVITE_AUDIO_SRC__ !== src) {
//             a.src = src;
//             window.__INVITE_AUDIO_SRC__ = src;
//         }
//         a.loop = true;
//         a.preload = "auto";
//         a.volume = 0.55;
//         return a;
//     }

//     const a = new Audio(src);
//     a.loop = true;
//     a.preload = "auto";
//     a.volume = 0.55;
//     window.__INVITE_AUDIO__ = a;
//     window.__INVITE_AUDIO_SRC__ = src;
//     return a;
// }

// function readMuted(): boolean {
//     try {
//         return localStorage.getItem(MUTED_KEY) === "1";
//     } catch {
//         return false;
//     }
// }
// function writeMuted(m: boolean) {
//     try {
//         if (m) localStorage.setItem(MUTED_KEY, "1");
//         else localStorage.removeItem(MUTED_KEY);
//     } catch { }
// }

// function broadcastMuted(muted: boolean) {
//     window.__INVITE_MUTED__ = muted;
//     window.dispatchEvent(new CustomEvent(EVT, { detail: { muted } }));
// }

// async function hardPlay(src: string) {
//     const a = getOrCreateAudio(src);
//     a.muted = false;
//     a.volume = 0.55;
//     await a.play();
// }

// function hardStop(src: string) {
//     const a = getOrCreateAudio(src);
//     try {
//         a.pause();
//     } catch { }
//     a.muted = true;
// }

// export function MusicToggle({ src }: { src: string }) {
//     const [muted, setMuted] = useState(true);
//     const [showOverlay, setShowOverlay] = useState(false);

//     // init
//     useEffect(() => {
//         getOrCreateAudio(src);

//         // priority: global -> storage -> default ON
//         const initialMuted =
//             typeof window.__INVITE_MUTED__ === "boolean" ? window.__INVITE_MUTED__! : readMuted();

//         setMuted(initialMuted);
//         broadcastMuted(initialMuted);

//         // default behavior:
//         // - if muted => stop
//         // - else => attempt autoplay, if blocked => show overlay
//         if (initialMuted) {
//             hardStop(src);
//             setShowOverlay(false);
//             window.__INVITE_AUTOPLAY_BLOCKED__ = false;
//         } else {
//             (async () => {
//                 try {
//                     await hardPlay(src);
//                     setShowOverlay(false);
//                     window.__INVITE_AUTOPLAY_BLOCKED__ = false;
//                 } catch {
//                     // autoplay blocked: show overlay to start with 1 tap
//                     window.__INVITE_AUTOPLAY_BLOCKED__ = true;
//                     setShowOverlay(true);
//                 }
//             })();
//         }

//         const onSync = (e: Event) => {
//             const d = (e as CustomEvent<{ muted: boolean }>).detail;
//             setMuted(d.muted);
//             // If muted updated from other toggle
//             if (d.muted) {
//                 hardStop(src);
//                 setShowOverlay(false);
//             }
//         };
//         window.addEventListener(EVT, onSync as any);
//         return () => window.removeEventListener(EVT, onSync as any);
//     }, [src]);

//     // Strict toggle
//     const toggle = async () => {
//         const nextMuted = !muted;
//         writeMuted(nextMuted);

//         if (nextMuted) {
//             hardStop(src);
//             setMuted(true);
//             broadcastMuted(true);
//             setShowOverlay(false);
//             window.__INVITE_AUTOPLAY_BLOCKED__ = false;
//             return;
//         }

//         // unmute: user click => should allow play
//         setMuted(false);
//         broadcastMuted(false);

//         try {
//             await hardPlay(src);
//             setShowOverlay(false);
//             window.__INVITE_AUTOPLAY_BLOCKED__ = false;
//         } catch {
//             // if still blocked (rare), keep overlay
//             window.__INVITE_AUTOPLAY_BLOCKED__ = true;
//             setShowOverlay(true);
//         }
//     };

//     // overlay start action (guaranteed user gesture)
//     const startSoundNow = async () => {
//         writeMuted(false);
//         setMuted(false);
//         broadcastMuted(false);

//         try {
//             await hardPlay(src);
//             setShowOverlay(false);
//             window.__INVITE_AUTOPLAY_BLOCKED__ = false;
//         } catch {
//             // if still fails, just hide overlay to avoid loop
//             setShowOverlay(false);
//         }
//     };

//     const dismissOverlay = () => {
//         // user doesn't want sound now -> treat as muted for this user
//         writeMuted(true);
//         hardStop(src);
//         setMuted(true);
//         broadcastMuted(true);
//         setShowOverlay(false);
//         window.__INVITE_AUTOPLAY_BLOCKED__ = false;
//     };

//     return (
//         <>
//             {/* Toggle button */}
//             <button
//                 onClick={toggle}
//                 className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition focus-ring inline-flex items-center gap-2"
//                 aria-label={muted ? "Turn music on" : "Turn music off"}
//                 title={muted ? "Music Off (tap to unmute)" : "Music On (tap to mute)"}
//             >
//                 {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
//                 <span className="leading-none">
//                     Music <span className="text-white/60">{muted ? "Off" : "On"}</span>
//                 </span>
//             </button>

//             {/* ✅ Autoplay blocked overlay (only when needed) */}
//             {showOverlay && !muted && (
//                 <div className="fixed inset-0 z-[80] grid place-items-center bg-black/55 px-4">
//                     <div className="glass w-full max-w-md p-5 sm:p-6">
//                         <div className="flex items-start gap-3">
//                             <div className="rounded-xl border border-white/10 bg-white/5 p-2">
//                                 <Sparkles size={18} className="text-gold/90" />
//                             </div>

//                             <div className="flex-1">
//                                 <div className="text-sm font-medium text-white/90">
//                                     Tap to start music ✨
//                                 </div>
//                                 <p className="mt-1 text-xs text-white/65">
//                                     Your browser blocked autoplay. One tap will enable sound.
//                                 </p>

//                                 <div className="mt-4 flex flex-wrap gap-2">
//                                     <Button onClick={startSoundNow}>Start Music</Button>
//                                     <Button variant="secondary" onClick={dismissOverlay}>
//                                         Keep Muted
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="relative mt-4 h-px w-full overflow-hidden bg-white/10">
//                             <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold/70 to-transparent animate-sheen" />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }






"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle({ src }: { src: string }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isOn, setIsOn] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        const a = new Audio(src);
        a.loop = true;
        a.volume = 0.6;
        audioRef.current = a;

        // optional: if you want remember state
        // const saved = localStorage.getItem("music_on") === "1";
        // if (saved) a.play().then(()=>setIsOn(true)).catch(()=>setBlocked(true));

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
            // localStorage.setItem("music_on","1");
        } catch {
            // iOS / browsers block autoplay unless user gesture
            setBlocked(true);
            setIsOn(false);
            // localStorage.setItem("music_on","0");
        }
    };

    const stop = () => {
        const a = audioRef.current;
        if (!a) return;
        a.pause();
        a.currentTime = 0;
        setIsOn(false);
        setBlocked(false);
        // localStorage.setItem("music_on","0");
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

    return (
        <div className="relative">
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
                {/* Icon + animation */}
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

                <span className="lux-music-text">
                    {isOn ? (
                        <span className="inline-flex items-center gap-2">
                            <span className="lux-live-dot" />
                            <span>Sound</span>
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2">
                            <span className="lux-muted-dot" />
                            <span>Muted</span>
                        </span>
                    )}
                </span>
            </button>

            {/* small tooltip when blocked */}
            {blocked ? (
                <div className="lux-music-tip">
                    Tap to start music ✨ (Browser blocked autoplay)
                </div>
            ) : null}
        </div>
    );
}