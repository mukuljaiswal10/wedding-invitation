// import { Button } from "@/components/Button";
// import { MapPin } from "lucide-react";

// export function VenueCard({
//     name,
//     address,
//     mapEmbedUrl,
//     directionsUrl,
// }: {
//     name: string;
//     address: string;
//     mapEmbedUrl: string;
//     directionsUrl: string;
// }) {
//     return (
//         <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
//             <div className="glass p-6">
//                 <div className="inline-flex items-center gap-2 text-gold/90 text-xs tracking-[0.25em] uppercase">
//                     <MapPin size={14} /> Venue
//                 </div>
//                 <h3 className="mt-3 font-display text-2xl">{name}</h3>
//                 <p className="mt-3 text-sm sm:text-base text-white/70">{address}</p>

//                 <div className="mt-6 flex flex-wrap gap-3">
//                     <a href={directionsUrl} target="_blank" rel="noreferrer">
//                         <Button>Get Directions</Button>
//                     </a>
//                     <a href={directionsUrl} target="_blank" rel="noreferrer">
//                         <Button variant="secondary">Open in Maps</Button>
//                     </a>
//                 </div>
//             </div>

//             <div className="glass overflow-hidden">
//                 <iframe
//                     title="Map"
//                     src={mapEmbedUrl}
//                     className="h-[320px] w-full"
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                 />
//             </div>
//         </div>
//     );
// }











import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { MapPin } from "lucide-react";

export function VenueCard({
    name,
    address,
    mapEmbedUrl,
    directionsUrl,
}: {
    name: string;
    address: string;
    mapEmbedUrl: string;
    directionsUrl: string;
}) {
    return (
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Venue details (reveal first) */}
            <Reveal variant="fade-up" delayMs={80}>
                <div className="glass p-6">
                    <div className="inline-flex items-center gap-2 text-gold/90 text-xs tracking-[0.25em] uppercase">
                        <MapPin size={14} /> Venue
                    </div>

                    <h3 className="mt-3 font-display text-2xl">{name}</h3>
                    <p className="mt-3 text-sm sm:text-base text-white/70">{address}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href={directionsUrl} target="_blank" rel="noreferrer">
                            <Button>Get Directions</Button>
                        </a>
                        <a href={directionsUrl} target="_blank" rel="noreferrer">
                            <Button variant="secondary">Open in Maps</Button>
                        </a>
                    </div>

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <p className="mt-4 text-xs text-white/60">
                        Tip: Tap “Open in Maps” for fastest navigation.
                    </p>
                </div>
            </Reveal>

            {/* Right: Map (reveal second) */}
            <Reveal variant="fade-up" delayMs={220}>
                <div className="glass overflow-hidden">
                    <iframe
                        title="Map"
                        src={mapEmbedUrl}
                        className="h-[320px] w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </Reveal>
        </div>
    );
}