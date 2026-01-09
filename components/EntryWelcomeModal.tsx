// "use client";

// import { useEffect, useRef } from "react";

// type Props = {
//     open: boolean;
//     onClose: () => void;
//     autoCloseMs?: number; // default 15000
// };

// export default function EntryWelcomeModal({
//     open,
//     onClose,
//     autoCloseMs = 15000,
// }: Props) {
//     const timerRef = useRef<number | null>(null);

//     useEffect(() => {
//         if (!open) return;

//         timerRef.current = window.setTimeout(() => onClose(), autoCloseMs);

//         return () => {
//             if (timerRef.current) window.clearTimeout(timerRef.current);
//         };
//     }, [open, autoCloseMs, onClose]);

//     if (!open) return null;

//     return (
//         <div className="fixed inset-0 z-[9999]">
//             {/* backdrop */}
//             <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

//             {/* modal */}
//             <div className="absolute inset-0 grid place-items-center p-4">
//                 <div className="relative w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] shadow-2xl">
//                     {/* premium layers */}
//                     <div className="pointer-events-none absolute inset-0 entry-sparkle" />
//                     <div className="pointer-events-none absolute inset-0 entry-shimmer" />
//                     <div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-[min(420px,78%)] -translate-x-1/2 entry-ribbon" />

//                     {/* close */}
//                     <button
//                         onClick={onClose}
//                         className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-white/90 hover:bg-black/40"
//                         aria-label="Close welcome"
//                     >
//                         ✕ Close
//                     </button>

//                     <div className="p-7 md:p-8">
//                         <p className="text-[11px] tracking-[0.28em] text-[#d6a855]/90">
//                             WELCOME • WEDDING INVITATION
//                         </p>

//                         <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
//                             Manish <span className="text-[#d6a855]">❤️</span> Nainika
//                         </h2>

//                         <p className="mt-3 text-white/75 leading-relaxed">
//                             आपके स्नेह और आशीर्वाद के साथ, हम आपको अपने शुभ विवाह समारोह में
//                             पधारने का सादर निमंत्रण देते हैं। ✨
//                             <br />
//                             कृपया कार्यक्रम, Venue और RSVP विवरण देखने के लिए आगे बढ़ें।
//                         </p>

//                         <div className="mt-6 flex items-center justify-between gap-3">
//                             <div className="text-xs text-white/60">
//                                 यह संदेश 15 सेकंड में अपने-आप बंद हो जाएगा।
//                             </div>

//                             <button
//                                 onClick={onClose}
//                                 className="rounded-full bg-[#d6a855] px-5 py-2 text-sm font-semibold text-black hover:opacity-95"
//                             >
//                                 Enter →
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }














"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    autoCloseMs?: number;
};

export default function EntryWelcomeModal({ open, onClose, autoCloseMs = 15000 }: Props) {
    const timerRef = useRef<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!open) return;

        timerRef.current = window.setTimeout(() => onClose(), autoCloseMs);

        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, [open, autoCloseMs, onClose]);

    if (!open || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[99999]">
            {/* SUPER STRONG blur + dark */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />

            <div className="absolute inset-0 grid place-items-center p-4">
                <div className="relative w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/12 bg-white/[0.08] shadow-2xl">
                    <div className="pointer-events-none absolute inset-0 entry-sparkle" />
                    <div className="pointer-events-none absolute inset-0 entry-shimmer" />
                    <div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-[min(420px,78%)] -translate-x-1/2 entry-ribbon" />

                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-white/90 hover:bg-black/55"
                    >
                        ✕ Close
                    </button>

                    <div className="p-7 md:p-8">
                        <p className="text-[11px] tracking-[0.28em] text-[#d6a855]/90">
                            WELCOME • WEDDING INVITATION
                        </p>

                        <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                            Manish <span className="text-[#d6a855]">❤️</span> Nainika
                        </h2>

                        <p className="mt-3 text-white/75 leading-relaxed">
                            आपके स्नेह और आशीर्वाद के साथ, हम आपको अपने शुभ विवाह समारोह में पधारने का सादर निमंत्रण देते हैं। ✨
                            <br />
                            कृपया कार्यक्रम, Venue और RSVP विवरण देखने के लिए आगे बढ़ें।
                        </p>

                        <div className="mt-6 flex items-center justify-between gap-3">
                            <div className="text-xs text-white/60">
                                यह संदेश 15 सेकंड में अपने-आप बंद हो जाएगा।
                            </div>

                            <button
                                onClick={onClose}
                                className="rounded-full bg-[#d6a855] px-5 py-2 text-sm font-semibold text-black hover:opacity-95"
                            >
                                Enter →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}