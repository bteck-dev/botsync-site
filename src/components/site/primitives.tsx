import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fades content in on scroll; respects prefers-reduced-motion via CSS. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string | undefined;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
      className={cn("reveal", shown && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
      <span className="size-1.5 rounded-full bg-brand-cyan" aria-hidden="true" />
      {children}
    </span>
  );
}

export function Section({
  id,
  children,
  className,
  ariaLabel,
}: {
  id?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
  ariaLabel?: string | undefined;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative scroll-mt-28 py-20 sm:py-28", className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string | undefined;
  title: ReactNode;
  description?: ReactNode | undefined;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-5 text-3xl font-bold text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

const ctaBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan disabled:opacity-60";

export const ctaStyles = {
  primary: cn(
    ctaBase,
    "bg-brand-gradient text-[oklch(0.16_0.03_262)] shadow-[0_14px_34px_-16px_var(--brand-cyan)] hover:brightness-110 hover:-translate-y-0.5",
  ),
  ghost: cn(
    ctaBase,
    "border border-border bg-surface/60 text-foreground hover:border-brand-cyan/60 hover:bg-surface-2",
  ),
  quiet: cn(ctaBase, "px-3 py-2 text-muted-foreground hover:text-foreground"),
};

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <span
            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-emerald"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MockFrame({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label: string;
  className?: string | undefined;
}) {
  return (
    <figure className={cn("panel glow overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-destructive/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-warn/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-brand-emerald/70" aria-hidden="true" />
        <figcaption className="ml-2 truncate text-xs font-medium text-muted-foreground">
          {label}
        </figcaption>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </figure>
  );
}
