// "use client";

// import { useMemo } from "react";

// type Item = {
//     left: number;
//     size: number;
//     dur: number;
//     delay: number;
//     blur: number;
//     opacity: number;
// };

// export default function FallingFlowers() {
//     const items = useMemo<Item[]>(() => {
//         const count = typeof window !== "undefined" && window.innerWidth < 640 ? 14 : 22; // mobile lighter
//         return Array.from({ length: count }).map((_, i) => ({
//             left: (i * (100 / count)) + Math.random() * 6,
//             size: 14 + Math.random() * 18,
//             dur: 7 + Math.random() * 8,
//             delay: -Math.random() * 10,
//             blur: Math.random() * 0.8,
//             opacity: 0.55 + Math.random() * 0.35,
//         }));
//     }, []);

//     return (
//         <div className="falling-flowers" aria-hidden="true">
//             {items.map((p, idx) => (
//                 <span
//                     key={idx}
//                     className="petal"
//                     style={{
//                         left: `${p.left}%`,
//                         width: `${p.size}px`,
//                         height: `${p.size}px`,
//                         animationDuration: `${p.dur}s`,
//                         animationDelay: `${p.delay}s`,
//                         opacity: p.opacity,
//                         filter: `blur(${p.blur}px)`,
//                     }}
//                 >
//                     <span className="petalInner" />
//                 </span>
//             ))}
//             <div className="royal-twinkle" />
//         </div>
//     );
// }





"use client";
import { useMemo } from "react";

type Item = {
    left: number;
    size: number;
    dur: number;
    delay: number;
    blur: number;
    opacity: number;
};

export default function FallingFlowers() {
    const items = useMemo<Item[]>(() => {
        const count =
            typeof window !== "undefined" && window.innerWidth < 640 ? 14 : 22;
        return Array.from({ length: count }).map((_, i) => ({
            left: (i * (100 / count)) + Math.random() * 6,
            size: 14 + Math.random() * 18,
            dur: 7 + Math.random() * 8,
            delay: -Math.random() * 10,
            blur: Math.random() * 0.8,
            opacity: 0.55 + Math.random() * 0.35,
        }));
    }, []);

    return (
        <div className="falling-flowers" aria-hidden="true">
            {items.map((p, idx) => (
                <span
                    key={idx}
                    className="petal"
                    style={{
                        left: `${p.left}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDuration: `${p.dur}s`,
                        animationDelay: `${p.delay}s`,
                        opacity: p.opacity,
                        filter: `blur(${p.blur}px)`,
                    }}
                >
                    <span className="petalInner" />
                </span>
            ))}
            <div className="twinkleLayer" />
        </div>
    );
}