// "use client";

// import { useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import { invite } from "@/data/invite";
// import { LuxHeader } from "@/components/LuxHeader";
// import { HeroSlider } from "@/components/HeroSlider";
// import { SectionHeading } from "@/components/SectionHeading";
// import { Countdown } from "@/components/Countdown";
// import { EventsTimeline } from "@/components/EventsTimeline";
// import { VenueCard } from "@/components/VenueCard";
// import { RSVPModal } from "@/components/RSVPModal";
// import { StickyMobileBar } from "@/components/StickyMobileBar";
// import { Button } from "@/components/Button";
// import { Reveal } from "@/components/Reveal";
// import { AutoHideHeader } from "@/components/AutoHideHeader";
// import { ScrollToTop } from "@/components/ScrollToTop";
// import { CoupleMark } from "@/components/CoupleMark";
// export const dynamic = "fore-dynamic";


// function googleCalendarLink() {
//   const title =
//     invite.calendar?.title ||
//     `${invite.couple.groom} & ${invite.couple.bride} — Wedding`;

//   const details =
//     invite.calendar?.details ||
//     "Wedding celebration — thank you for being part of our special day.";

//   const location = `${invite.venue.name}${invite.venue.address ? `, ${invite.venue.address}` : ""}`;

//   const start = new Date(invite.calendar?.startISO || invite.dateISO);
//   const durationMinutes = invite.calendar?.durationMinutes ?? 240;
//   const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

//   // Google needs UTC timestamps: YYYYMMDDTHHMMSSZ
//   const fmt = (d: Date) =>
//     d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

//   const dates = `${fmt(start)}/${fmt(end)}`;

//   const url = new URL("https://calendar.google.com/calendar/render");
//   url.searchParams.set("action", "TEMPLATE");
//   url.searchParams.set("text", title);
//   url.searchParams.set("details", details);
//   url.searchParams.set("location", location);
//   url.searchParams.set("dates", dates);

//   return url.toString();
// }

// export default function Page() {
//   const [openRSVP, setOpenRSVP] = useState(false);

//   const sp = useSearchParams();
//   const guest = sp.get("guest");

//   const coupleCenterName = useMemo(
//     () => `${invite.couple.groom} × ${invite.couple.bride}`,
//     []
//   );

//   return (
//     <main className="min-h-screen bg-aurora">
//       <StickyMobileBar onRSVP={() => setOpenRSVP(true)} />

//       {
//         !openRSVP && (
//           <AutoHideHeader>
//             <LuxHeader
//               couple={coupleCenterName}
//               onRSVP={() => setOpenRSVP(true)}
//               musicSrc={invite.music?.src}
//               events={invite.events.map((e) => ({
//                 kind: e.kind,
//                 title: e.title,
//                 date: e.date,
//                 time: e.time,
//               }))}
//             />
//           </AutoHideHeader>
//         )
//       }

//       {/* <AutoHideHeader>
//         <LuxHeader
//           couple={coupleCenterName}
//           onRSVP={() => setOpenRSVP(true)}
//           musicSrc={invite.music?.src}
//           events={invite.events.map((e) => ({
//             kind: e.kind,
//             title: e.title,
//             date: e.date,
//             time: e.time,
//           }))}
//         />
//       </AutoHideHeader> */}
//       <div className="h-[96px] sm:h-[110px]" />

//       {/* HERO: Full-width slider on top */}
//       <section className="container-shell pt-6 sm:pt-8">
//         <Reveal variant="fade" delayMs={0}>
//           <HeroSlider
//             slides={invite.slides}
//           // title="A Celebration of Love"
//           // subtitle="Premium cinematic slider — replace images anytime."
//           />
//         </Reveal>
//       </section>

//       {/* SAVE THE DATE: content below slider */}
//       <section className="container-shell pt-6 mt-[70px] sm:pt-8">
//         <Reveal variant="fade-up" delayMs={80}>
//           <div className="premium-frame glass p-7 sm:p-10">
//             {/* Ribbon border */}
//             <div className="ribbon-edge ribbon-top"><span /></div>
//             <div className="ribbon-edge ribbon-bottom"><span /></div>
//             <div className="ribbon-edge ribbon-left"><span /></div>
//             <div className="ribbon-edge ribbon-right"><span /></div>

//             {/* Sparkle glow blobs */}
//             <div className="sparkle-blob" style={{ top: "-40px", left: "-40px" }} />
//             <div className="sparkle-blob" style={{ bottom: "-50px", right: "-50px", animationDelay: "1.2s" }} />

//             {/* Tiny sparkles */}
//             <div className="sparkle-dot" style={{ top: "28px", right: "34px" }} />
//             <div className="sparkle-dot" style={{ top: "70px", left: "60px", animationDelay: "1.1s" }} />
//             <div className="sparkle-dot" style={{ bottom: "64px", right: "120px", animationDelay: "0.6s" }} />

//             {guest && (
//               <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/75">
//                 ✨ Welcome, <span className="text-gold/90 font-medium">{guest}</span>
//               </div>
//             )}

//             <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold/90">
//               <span className="h-px w-10 bg-gold/40" />
//               Save The Date
//             </div>

//             <h1 className="mt-5 font-display text-[32px] text-center leading-[1.05]">
//               {invite.couple.groom} <span className="text-gold/90"><CoupleMark /></span> {invite.couple.bride}
//             </h1>

//             <p className="mt-4 text-sm sm:text-base text-white/70">
//               {invite.couple.tagline}
//             </p>

//             <div className="mt-7 flex flex-wrap gap-3">
//               <Button size="lg" onClick={() => setOpenRSVP(true)}>RSVP Now</Button>
//               <a href="#events"><Button size="lg" variant="secondary">View Schedule</Button></a>
//             </div>

//             <div className="mt-8 divider" />

//             <div className="mt-6 flex flex-wrap gap-3">
//               <span className="chip">📍 {invite.city}</span>
//               <span className="chip">✨ Luxury One-Page Invite</span>
//               <span className="chip">🕰 Smooth + Fast</span>
//             </div>

//             {/* Countdown */}
//             <div className="mt-8">
//               <div className="text-xs tracking-[0.25em] uppercase text-gold/90">Countdown</div>

//               {/* Wrap countdown cards to enhance */}
//               <div className="mt-4 grid md:grid-cols-4 grid-cols-2 gap-3">
//                 {/** We keep your Countdown component but we style cards via wrapper below */}
//                 <div className="count-card glass px-4 py-3 text-center">
//                   <div className="count-shimmer"><span>24 Feb 2026</span></div>
//                   <div className="font-display text-2xl">{String((Countdown as any) ? "" : "")}</div>
//                   {/* NOTE: keep real countdown component below */}
//                   <div className="hidden" />
//                 </div>
//               </div>

//               {/* ✅ Use your existing Countdown component (real logic) */}
//               <div className="mt-4">
//                 {/* This renders the real countdown cards (existing logic) */}
//                 <Countdown targetISO={invite.dateISO} />
//               </div>

//               <div id="calendar" className="mt-6 flex flex-wrap gap-3">
//                 <a href={googleCalendarLink()} target="_blank" rel="noreferrer">
//                   <Button variant="secondary" size="lg">Add to Google Calendar</Button>
//                 </a>
//                 <a href="/api/ics">
//                   <Button variant="secondary" size="lg">Download .ICS</Button>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </section>

//       {/* EVENTS */}
//       <section id="events" className="container-shell section">
//         <Reveal variant="fade-up">
//           <SectionHeading
//             eyebrow="Celebrations"
//             title="Events & Schedule"
//             desc="All functions at a glance — tap Open Map for directions."
//           />
//         </Reveal>

//         {/* ✅ Cards staggered animation is inside EventsTimeline now */}
//         <EventsTimeline events={invite.events as any} />
//       </section>

//       {/* VENUE */}
//       <section id="venue" className="container-shell section">
//         <Reveal variant="fade-up">
//           <SectionHeading
//             eyebrow="Location"
//             title="Venue & Directions"
//             desc="Everything you need to reach on time — clean & simple."
//           />
//         </Reveal>

//         {/* ✅ Split stagger is inside VenueCard now */}
//         <VenueCard
//           name={invite.venue.name}
//           address={invite.venue.address}
//           mapEmbedUrl={invite.venue.mapEmbedUrl}
//           directionsUrl={invite.venue.directionsUrl}
//         />
//       </section>


//       {/* THEME / DRESS CODE (ULTRA UPGRADED) */}
//       <section className="container-shell section">
//         <Reveal variant="fade-up">
//           <SectionHeading
//             eyebrow="Style"
//             title={invite.theme.title}
//             desc="Event-wise dress suggestions — classy, comfortable & photo-friendly."
//           />
//         </Reveal>

//         <Reveal variant="fade-up" delayMs={120}>
//           <div className="glass p-6 sm:p-8">
//             {/* Note */}
//             <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
//               <span className="text-gold/90 font-medium">Note: </span>
//               {invite.theme.note}
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2 justify-items-center">
//               {invite.theme.events.map((ev: any) => (
//                 <div
//                   key={ev.key}
//                   className={[
//                     "glass p-5 sm:p-6 transition duration-300 ease-out hover:-translate-y-[2px] w-full max-w-[92vw] sm:max-w-none mx-auto box-border overflow-hidden",
//                     ev.accent === "emerald"
//                       ? "bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.14),transparent_55%)]"
//                       : ev.accent === "yellow"
//                         ? "bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.16),transparent_55%)]"
//                         : ev.accent === "lavender"
//                           ? "bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.16),transparent_55%)]"
//                           : "bg-[radial-gradient(circle_at_20%_20%,rgba(214,175,97,0.14),transparent_55%)]",
//                   ].join(" ")}
//                 >
//                   {/* Header row */}
//                   <div className="flex items-start justify-between gap-4">
//                     <div>
//                       <div className="text-xs tracking-[0.25em] uppercase text-gold/90">
//                         {ev.title}
//                       </div>
//                       <div className="mt-2 font-display text-2xl">
//                         Dress Suggestions
//                       </div>

//                       {/* Photo-friendly tag */}
//                       <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-white/70">
//                         <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
//                         {ev.photoTag || "Photo-friendly"}
//                       </div>
//                     </div>

//                     {/* Mini swatches */}
//                     <div className="flex items-center gap-2">
//                       <PaletteSwatches colors={ev.palette} />
//                     </div>
//                   </div>

//                   <div className="mt-5 grid gap-4 sm:grid-cols-2">
//                     {/* Men */}
//                     <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                       <div className="text-[11px] tracking-[0.25em] uppercase text-white/70">
//                         Men
//                       </div>
//                       <ul className="mt-3 space-y-2 text-sm text-white/75">
//                         {ev.men.map((x: string) => (
//                           <li key={x} className="flex items-start gap-2">
//                             <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gold/80" />
//                             <span>{x}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Women */}
//                     <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                       <div className="text-[11px] tracking-[0.25em] uppercase text-white/70">
//                         Women
//                       </div>
//                       <ul className="mt-3 space-y-2 text-sm text-white/75">
//                         {ev.women.map((x: string) => (
//                           <li key={x} className="flex items-start gap-2">
//                             <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gold/80" />
//                             <span>{x}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

//                   <p className="mt-4 text-xs text-white/60">
//                     {invite.theme.note}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Reveal>
//       </section>

//       {/* RSVP */}
//       <section id="rsvp" className="container-shell section">
//         <Reveal variant="fade-up">
//           <SectionHeading
//             eyebrow="Confirmation"
//             title="RSVP"
//             desc="Quick RSVP in under 10 seconds."
//           />
//         </Reveal>

//         <Reveal variant="fade-up" delayMs={120}>
//           <div className="glass p-7 sm:p-10">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <div className="font-display text-2xl">Confirm your presence</div>
//                 <p className="mt-2 text-sm text-white/70">
//                   Tap below to RSVP. (Saves via API + WhatsApp too)
//                 </p>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 <Button size="lg" onClick={() => setOpenRSVP(true)}>
//                   Open RSVP
//                 </Button>
//                 <a href="#venue">
//                   <Button size="lg" variant="secondary">
//                     View Venue
//                   </Button>
//                 </a>
//               </div>
//             </div>

//             <div className="mt-8 divider" />

//             {/* ✅ Stagger cards: contact first, note second */}
//             <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-white/70">
//               <Reveal variant="fade-up" delayMs={160}>
//                 {/* <div className="glass p-5">
//                   <div className="text-xs tracking-[0.25em] uppercase text-gold/90">
//                     Contact
//                   </div>
//                   <p className="mt-3">
//                     {invite.contact.primaryName}:{" "}
//                     <a
//                       href={`tel:${invite.contact.primaryPhone.replace(/\s/g, "")}`}
//                       className="text-white/80 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/40 transition"
//                     >
//                       {invite.contact.primaryPhone}
//                     </a>
//                   </p>

//                   <p className="mt-1">
//                     {invite.contact.secondaryName}:{" "}
//                     <a
//                       href={`tel:${invite.contact.secondaryPhone.replace(/\s/g, "")}`}
//                       className="text-white/80 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/40 transition"
//                     >
//                       {invite.contact.secondaryPhone}
//                     </a>
//                   </p>
//                 </div> */}
//                 <div className="glass p-5">
//                   <div className="text-xs tracking-[0.25em] uppercase text-gold/90">Contact</div>

//                   {/* Contact 1 */}
//                   <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
//                     <div className="text-sm font-medium text-white/85">{invite.contact.primaryName}</div>

//                     <div className="mt-1 text-sm text-white/70">
//                       <a
//                         href={`tel:${invite.contact.primaryPhone.replace(/\s/g, "")}`}
//                         className="underline underline-offset-4 decoration-white/20 hover:decoration-white/40 hover:text-white transition"
//                       >
//                         {invite.contact.primaryPhone}
//                       </a>
//                     </div>

//                     <div className="mt-4 flex flex-wrap gap-3">
//                       <a href={`tel:${invite.contact.primaryPhone.replace(/\s/g, "")}`}>
//                         <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10 transition focus-ring inline-flex items-center gap-2">
//                           📞 Call
//                         </button>
//                       </a>

//                       <a
//                         href={`https://wa.me/${invite.contact.primaryPhone.replace(/\D/g, "")}`}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10 transition focus-ring inline-flex items-center gap-2">
//                           💬 WhatsApp
//                         </button>
//                       </a>
//                     </div>
//                   </div>

//                   {/* Contact 2 */}
//                   <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
//                     <div className="text-sm font-medium text-white/85">{invite.contact.secondaryName}</div>

//                     <div className="mt-1 text-sm text-white/70">
//                       <a
//                         href={`tel:${invite.contact.secondaryPhone.replace(/\s/g, "")}`}
//                         className="underline underline-offset-4 decoration-white/20 hover:decoration-white/40 hover:text-white transition"
//                       >
//                         {invite.contact.secondaryPhone}
//                       </a>
//                     </div>

//                     <div className="mt-4 flex flex-wrap gap-3">
//                       <a href={`tel:${invite.contact.secondaryPhone.replace(/\s/g, "")}`}>
//                         <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10 transition focus-ring inline-flex items-center gap-2">
//                           📞 Call
//                         </button>
//                       </a>

//                       <a
//                         href={`https://wa.me/${invite.contact.secondaryPhone.replace(/\D/g, "")}`}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10 transition focus-ring inline-flex items-center gap-2">
//                           💬 WhatsApp
//                         </button>
//                       </a>
//                     </div>
//                   </div>

//                   {/* tiny premium note */}
//                   <div className="mt-4 text-xs text-white/55">
//                     Feel free to call or WhatsApp for any help.
//                   </div>
//                 </div>
//               </Reveal>

//               <Reveal variant="fade-up" delayMs={280}>
//                 <div className="glass p-5">
//                   <div className="text-xs tracking-[0.25em] uppercase text-gold/90">
//                     Note
//                   </div>
//                   <div className="mt-3 space-y-3 text-sm text-white/75">
//                     <p className="text-white/80">
//                       Please arrive{" "}
//                       <span className="text-gold/90 font-medium">15 minutes early</span> so everyone can be seated comfortably.
//                     </p>

//                     <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                       <div className="flex items-start gap-2">
//                         <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gold/80" />
//                         <p>
//                           Keep this invite link handy —{" "}
//                           <span className="text-white/85 font-medium">schedule, venue & RSVP</span>{" "}
//                           are all available here.
//                         </p>
//                       </div>

//                       <div className="mt-3 flex items-start gap-2">
//                         <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gold/80" />
//                         <p>
//                           For a smooth entry, please follow parking guidance and the event timeline.
//                         </p>
//                       </div>

//                       <div className="mt-3 flex items-start gap-2">
//                         <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gold/80" />
//                         <p>
//                           Photography tip: soft tones look great — but{" "}
//                           <span className="text-white/85 font-medium">wear what you’re comfortable in</span>.
//                         </p>
//                       </div>
//                     </div>

//                     {/* Premium “Blessings only” line */}
//                     <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(214,175,97,0.12),transparent_55%)] p-4">
//                       <div className="text-xs tracking-[0.25em] uppercase text-gold/90">
//                         With Love
//                       </div>
//                       <p className="mt-2 text-white/75">
//                         No gifts — your{" "}
//                         <span className="text-white/85 font-medium">blessings & presence</span>{" "}
//                         are all we need. ✨
//                       </p>
//                     </div>

//                     {/* Shimmer divider */}
//                     <div className="relative mt-2 h-px w-full overflow-hidden bg-white/10">
//                       <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold/70 to-transparent animate-sheen" />
//                     </div>

//                     <p className="text-xs tracking-[0.22em] uppercase text-white/55">
//                       Thank you for celebrating with us
//                     </p>
//                   </div>
//                 </div>
//               </Reveal>
//             </div>
//           </div>
//         </Reveal>
//       </section>

//       {/* Footer */}
//       <footer className="container-shell pb-30">
//         <Reveal variant="fade" delayMs={80}>
//           {/* Premium shimmer divider */}
//           <div className="relative mb-6 h-px w-full overflow-hidden bg-white/10">
//             <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold/70 to-transparent animate-sheen" />
//           </div>

//           <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/60">
//             <span>© Wedding Invitation</span>

//             <span className="inline-flex items-center gap-2">
//               <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
//               Built by <span className="text-white/75">Mukul Jaiswal</span>
//             </span>
//           </div>

//           <div className="mt-4 text-[11px] tracking-[0.22em] uppercase text-white/45">
//             With love • Memories • Celebration
//           </div>
//         </Reveal>
//       </footer>

//       <RSVPModal
//         open={openRSVP}
//         onClose={() => setOpenRSVP(false)}
//         whatsappPhone={invite.contact.secondaryPhone}
//       />
//       <ScrollToTop />
//     </main >
//   );
// }


// {/* Local helper (same file) */ }
// function PaletteSwatches({ colors }: { colors?: string[] }) {
//   const list = colors && colors.length ? colors.slice(0, 3) : ["#D6AF61", "#FFFFFF", "#0B0F19"];

//   return (
//     <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
//       <div className="flex -space-x-2">
//         {list.map((c) => (
//           <span
//             key={c}
//             className="h-5 w-5 rounded-full border border-white/15 shadow-[0_0_14px_rgba(255,255,255,0.06)]"
//             style={{ backgroundColor: c }}
//             aria-hidden="true"
//           />
//         ))}
//       </div>

//       <span className="text-[10px] tracking-[0.22em] uppercase text-white/60">
//         Palette
//       </span>
//     </div>
//   );
// }



// app/page.tsx
import { Suspense } from "react";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic"; // ✅ spelling exact

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <HomeClient />
    </Suspense>
  );
}