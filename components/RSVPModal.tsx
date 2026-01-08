"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/Button";
import { X, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

type ToastType = "success" | "error";

/* ---------- Confetti (success only) ---------- */
function ConfettiBurst() {
    const dots = Array.from({ length: 18 }, (_, i) => i);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {dots.map((i) => {
                const left = 12 + Math.random() * 76;
                const delay = Math.random() * 0.16;
                const dir = Math.random() > 0.5 ? 1 : -1;
                const dx = 38 + Math.random() * 26;

                return (
                    <span
                        key={i}
                        className="confettiDot"
                        style={{
                            left: `${left}%`,
                            animationDelay: `${delay}s`,
                            // @ts-ignore
                            "--dx": `${dir * dx}px`,
                        }}
                    />
                );
            })}

            <style jsx>{`
        .confettiDot {
          position: absolute;
          top: 54%;
          width: 6px;
          height: 10px;
          border-radius: 3px;
          background: linear-gradient(
            180deg,
            rgba(239, 68, 68, 0.95),
            rgba(214, 175, 97, 0.9)
          );
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.35));
          opacity: 0;
          animation: confettiFly 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes confettiFly {
          0% {
            transform: translate3d(0, 18px, 0) rotate(0deg);
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--dx), -96px, 0) rotate(260deg);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}

/* ---------- Center Toast (Portal) ---------- */
function CenterToast({
    open,
    type,
    title,
    message,
    onClose,
    durationMs = 5000,
}: {
    open: boolean;
    type: ToastType;
    title: string;
    message?: string;
    onClose: () => void;
    durationMs?: number;
}) {
    const [mounted, setMounted] = useState(false);

    // countdown state
    const totalSec = Math.max(1, Math.round(durationMs / 1000)); // 5000 => 5
    const [secLeft, setSecLeft] = useState(totalSec);

    useEffect(() => setMounted(true), []);

    // reset countdown whenever toast opens
    useEffect(() => {
        if (!open) return;
        setSecLeft(totalSec);
    }, [open, totalSec]);

    // tick countdown
    useEffect(() => {
        if (!open) return;

        const interval = window.setInterval(() => {
            setSecLeft((s) => (s > 1 ? s - 1 : 1));
        }, 1000);

        return () => window.clearInterval(interval);
    }, [open]);

    // autoclose
    useEffect(() => {
        if (!open) return;
        const t = window.setTimeout(onClose, durationMs);
        return () => window.clearTimeout(t);
    }, [open, onClose, durationMs]);

    if (!open || !mounted) return null;

    const isSuccess = type === "success";

    const ui = (
        <div className="fixed inset-0 z-[9999]">
            <div className="absolute inset-0 grid place-items-center">
                <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

                <div className="relative w-[min(92vw,420px)]">
                    <div
                        className={[
                            "relative overflow-hidden rounded-2xl border",
                            "bg-black/65 backdrop-blur-xl",
                            "shadow-[0_0_80px_rgba(0,0,0,0.70)]",
                            isSuccess ? "border-emerald-400/20" : "border-rose-400/20",
                            "animate-[toastIn_420ms_cubic-bezier(0.16,1,0.3,1)_both]",
                        ].join(" ")}
                        role="status"
                        aria-live="polite"
                    >
                        <div className="relative h-[2px] w-full bg-white/10 overflow-hidden">
                            <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-sheen" />
                        </div>

                        <div
                            className={[
                                "pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full blur-3xl opacity-55",
                                isSuccess ? "bg-emerald-400/35" : "bg-rose-400/35",
                            ].join(" ")}
                        />
                        <div
                            className={[
                                "pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full blur-3xl opacity-45",
                                isSuccess ? "bg-emerald-300/25" : "bg-rose-300/25",
                            ].join(" ")}
                        />

                        {isSuccess ? <ConfettiBurst /> : null}

                        <div className="p-4 sm:p-5">
                            <div className="flex items-start gap-3">
                                <div
                                    className={[
                                        "mt-0.5 h-10 w-10 rounded-2xl border flex items-center justify-center",
                                        "bg-white/5",
                                        isSuccess
                                            ? "border-emerald-400/25"
                                            : "border-rose-400/25",
                                        isSuccess
                                            ? "shadow-[0_0_22px_rgba(16,185,129,0.18)]"
                                            : "shadow-[0_0_22px_rgba(244,63,94,0.18)]",
                                    ].join(" ")}
                                >
                                    {isSuccess ? (
                                        <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                                    ) : (
                                        <AlertTriangle className="h-5 w-5 text-rose-300" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="text-[11px] tracking-[0.28em] uppercase text-white/60">
                                            Confirmation
                                        </div>
                                        <Sparkles className="h-4 w-4 text-gold/90 animate-[spark_1.6s_ease-in-out_infinite]" />
                                    </div>

                                    <div className="mt-1 font-display text-lg leading-tight text-white">
                                        {title}
                                    </div>

                                    {message ? (
                                        <div className="mt-1 text-sm text-white/70">{message}</div>
                                    ) : null}

                                    {/* ✅ Countdown line */}
                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <div className="text-[11px] tracking-[0.22em] uppercase text-white/45">
                                            Auto closes in {secLeft}s
                                        </div>

                                        {/* tiny progress bar */}
                                        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
                                            <div
                                                className="h-full bg-white/35"
                                                style={{
                                                    width: `${(secLeft / totalSec) * 100}%`,
                                                    transition: "width 320ms ease",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition focus-ring"
                                    aria-label="Close confirmation"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <style jsx>{`
              @keyframes toastIn {
                0% {
                  opacity: 0;
                  transform: translateY(18px) scale(0.98);
                  filter: blur(10px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0px) scale(1);
                  filter: blur(0px);
                }
              }
              @keyframes spark {
                0%,
                100% {
                  transform: translateY(0) scale(1);
                  opacity: 0.75;
                }
                50% {
                  transform: translateY(-2px) scale(1.08);
                  opacity: 1;
                }
              }
            `}</style>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(ui, document.body);
}

/* ---------- RSVP Modal ---------- */
export function RSVPModal({
    open,
    onClose,
    whatsappPhone,
    whatsappPhone2,
}: {
    open: boolean;
    onClose: () => void;
    whatsappPhone: string;
    whatsappPhone2?: string;
}) {
    const [name, setName] = useState("");
    const [attending, setAttending] = useState<"Yes" | "No">("Yes");
    const [guests, setGuests] = useState(1);

    const [saving, setSaving] = useState(false);

    // toast
    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState<ToastType>("success");
    const [toastTitle, setToastTitle] = useState("RSVP Confirmed ✨");
    const [toastMsg, setToastMsg] = useState<string | undefined>(
        "Your response has been saved & emailed successfully."
    );

    // ESC close
    useEffect(() => {
        function onEsc(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [open, onClose]);

    // body scroll lock while RSVP modal is open
    useEffect(() => {
        if (!open) return;

        const body = document.body;
        const prevOverflow = body.style.overflow;
        const prevPaddingRight = body.style.paddingRight;

        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        body.style.overflow = "hidden";
        if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            body.style.overflow = prevOverflow;
            body.style.paddingRight = prevPaddingRight;
        };
    }, [open]);

    // ✅ Professional WhatsApp message (real format)
    const waText = useMemo(() => {
        const timeStr = new Date().toLocaleString("en-IN");
        const statusLine =
            attending === "Yes" ? "✅ Yes, I’m coming" : "❌ Sorry, can’t";

        const pageLink =
            typeof window !== "undefined" ? window.location.href : "";

        return encodeURIComponent(
            [
                "💍 *WEDDING RSVP CONFIRMATION*",
                "────────────────────────",
                `👤 *Name:* ${name?.trim() ? name.trim() : "Guest"}`,
                `📌 *Status:* ${statusLine}`,
                `👥 *Guests:* ${guests}`,
                "────────────────────────",
                `🕒 *Submitted:* ${timeStr}`,
                pageLink ? `🔗 *Page:* ${pageLink}` : "",
                "",
                "✨ _Thank you! We’ve received your RSVP._",
            ]
                .filter(Boolean)
                .join("\n")
        );
    }, [name, attending, guests]);

    const waLink1 = useMemo(
        () => `https://wa.me/${whatsappPhone.replace(/\D/g, "")}?text=${waText}`,
        [whatsappPhone, waText]
    );

    const waLink2 = useMemo(() => {
        if (!whatsappPhone2) return null;
        return `https://wa.me/${whatsappPhone2.replace(/\D/g, "")}?text=${waText}`;
    }, [whatsappPhone2, waText]);

    async function saveRsvp() {
        setSaving(true);

        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, attending, guests }),
            });

            if (res.ok) {
                setToastType("success");
                setToastTitle("RSVP Confirmed ✨");
                setToastMsg("Your response has been saved & emailed successfully.");
                setToastOpen(true);

                // ✅ close RSVP modal immediately
                onClose();
            } else {
                setToastType("error");
                setToastTitle("Something went wrong");
                setToastMsg("Please try again in a moment.");
                setToastOpen(true);
            }
        } catch {
            setToastType("error");
            setToastTitle("Network error");
            setToastMsg("Check your connection & try again.");
            setToastOpen(true);
        } finally {
            setSaving(false);
        }
    }

    // Allow toast to show even when RSVP modal is closed
    if (!open) {
        return (
            <CenterToast
                open={toastOpen}
                type={toastType}
                title={toastTitle}
                message={toastMsg}
                onClose={() => setToastOpen(false)}
                durationMs={5000}
            />
        );
    }

    return (
        <>
            <CenterToast
                open={toastOpen}
                type={toastType}
                title={toastTitle}
                message={toastMsg}
                onClose={() => setToastOpen(false)}
                durationMs={5000}
            />

            <div className="fixed inset-0 z-50 grid place-items-center px-4">
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />

                <div className="relative w-full max-w-lg glass p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="text-xs tracking-[0.25em] uppercase text-gold/90">
                                RSVP
                            </div>
                            <h3 className="mt-2 font-display text-2xl">
                                Confirm Your Presence
                            </h3>
                            <p className="mt-2 text-sm text-white/70">
                                Quick RSVP — minimal details, premium experience.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition focus-ring"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="mt-6 grid gap-4">
                        <div>
                            <label className="text-xs text-white/70">Your Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/40"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setAttending("Yes")}
                                className={`rounded-xl border px-4 py-3 text-sm transition ${attending === "Yes"
                                        ? "border-gold/40 bg-gold/15"
                                        : "border-white/10 bg-white/5 hover:bg-white/10"
                                    }`}
                            >
                                Yes, I’m coming
                            </button>
                            <button
                                onClick={() => setAttending("No")}
                                className={`rounded-xl border px-4 py-3 text-sm transition ${attending === "No"
                                        ? "border-gold/40 bg-gold/15"
                                        : "border-white/10 bg-white/5 hover:bg-white/10"
                                    }`}
                            >
                                Sorry, can’t
                            </button>
                        </div>

                        <div>
                            <label className="text-xs text-white/70">Guests</label>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/40"
                            />
                        </div>

                        <div className="mt-2 flex flex-wrap gap-3">
                            <Button size="lg" onClick={saveRsvp} disabled={saving}>
                                {saving ? "Saving..." : "Save RSVP"}
                            </Button>

                            <a href={waLink1} target="_blank" rel="noreferrer">
                                <Button variant="secondary" size="lg">
                                    WhatsApp RSVP
                                </Button>
                            </a>

                            {waLink2 ? (
                                <a href={waLink2} target="_blank" rel="noreferrer">
                                    <Button variant="secondary" size="lg">
                                        WhatsApp RSVP (2)
                                    </Button>
                                </a>
                            ) : null}

                            <Button variant="ghost" size="lg" onClick={onClose}>
                                Close
                            </Button>
                        </div>

                        <p className="text-xs text-white/55">
                            Note: “Save RSVP” stores it in your local API. WhatsApp also
                            available.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}