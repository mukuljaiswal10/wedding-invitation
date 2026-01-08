import { cn } from "@/lib/cn";

export function SectionHeading({
    eyebrow,
    title,
    desc,
    className,
}: {
    eyebrow?: string;
    title: string;
    desc?: string;
    className?: string;
}) {
    return (
        <div className={cn("mb-8 sm:mb-10", className)}>
            {eyebrow && (
                <div className="mb-3 inline-flex items-center gap-2 text-xs tracking-[0.25em] text-gold/90">
                    <span className="h-px w-8 bg-gold/40" />
                    <span className="uppercase">{eyebrow}</span>
                </div>
            )}

            <h2 className="font-display text-3xl sm:text-4xl leading-tight">
                {title}
            </h2>

            {desc && (
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/70">
                    {desc}
                </p>
            )}
        </div>
    );
}