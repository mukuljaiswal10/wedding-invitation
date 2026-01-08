"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
    src: string;
    alt: string;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    pos?: string;
};

export function HeroSlider({
    slides,
    title,
    subtitle,
    eyebrow = "Featured Moments",
}: {
    slides: ReadonlyArray<Slide>;
    title?: string;
    subtitle?: string;
    eyebrow?: string;
}) {
    // ✅ keep a stable autoplay instance we can control
    const autoplayRef = useRef(
        Autoplay({
            delay: 3200,
            stopOnInteraction: true, // user interacts => autoplay pauses
            stopOnMouseEnter: true,
        })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "center", skipSnaps: false },
        [autoplayRef.current]
    );

    const [selected, setSelected] = useState(0);
    const [snaps, setSnaps] = useState<number[]>([]);
    const [animKey, setAnimKey] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const idx = emblaApi.selectedScrollSnap();
        setSelected(idx);
        setAnimKey((k) => k + 1);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setSnaps(emblaApi.scrollSnapList());
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", () => {
            setSnaps(emblaApi.scrollSnapList());
            onSelect();
        });
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

    // ✅ WORKABLE Reset Auto:
    // 1) stop autoplay
    // 2) reset timer
    // 3) scroll to first slide (optional but premium predictable)
    // 4) start autoplay again
    const resetAuto = useCallback(() => {
        const api = emblaApi;
        const autoplay = autoplayRef.current;
        if (!api || !autoplay) return;

        try {
            autoplay.stop();
            autoplay.reset();
            api.scrollTo(0, true); // jump to first slide
            autoplay.play();       // resume auto
        } catch {
            // ignore
        }
    }, [emblaApi]);

    return (
        <div className="glass overflow-hidden heroShell">
            {/* Carousel viewport */}
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                    {slides.map((s, i) => {
                        const slideEyebrow = s.eyebrow ?? eyebrow;
                        const slideTitle = s.title ?? title ?? "";
                        const slideSubtitle = s.subtitle ?? subtitle ?? "";

                        return (
                            <div
                                key={s.src + i}
                                className="relative min-w-0 flex-[0_0_100%] h-[420px] sm:h-[480px] lg:h-[520px] xl:h-[560px]"
                            >
                                <Image
                                    src={s.src}
                                    alt={s.alt}
                                    fill
                                    priority={i === 0}
                                    className="object-cover"
                                    style={{ objectPosition: s.pos ?? "50% 35%" }}
                                />

                                {/* overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(214,175,97,0.14),transparent_55%)]" />

                                {/* Text (animate only for active slide) */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                    {i === selected && (
                                        <div key={`hs-${selected}-${animKey}`} className="hs-textWrap">
                                            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold/90 hs-eyebrow">
                                                <span className="h-px w-10 bg-gold/40" />
                                                {slideEyebrow}
                                            </div>

                                            {!!slideTitle && (
                                                <div className="mt-3 font-display text-3xl sm:text-4xl hs-title">
                                                    {slideTitle}
                                                </div>
                                            )}

                                            {!!slideSubtitle && (
                                                <p className="mt-2 max-w-xl text-sm sm:text-base text-white/75 hs-subtitle">
                                                    {slideSubtitle}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={scrollPrev}
                        className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition focus-ring"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition focus-ring"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex items-center gap-2">
                    {snaps.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`h-2.5 w-2.5 rounded-full transition ${i === selected ? "bg-gold" : "bg-white/25 hover:bg-white/40"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                <Button variant="secondary" onClick={resetAuto}>
                    Reset Auto
                </Button>
            </div>
        </div>
    );
}