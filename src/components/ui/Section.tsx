import clsx from "clsx";

export type Tone = "paper" | "paper-2" | "dark";

export function Section({
  children, className, id, tone = "paper",
}: { children: React.ReactNode; className?: string; id?: string; tone?: Tone }) {
  return (
    <section id={id} className={clsx("relative overflow-clip py-28 lg:py-44", `tone-${tone}`, className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={clsx("eyebrow text-purple", className)} data-reveal>{children}</p>;
}

/** Hairline that draws itself in when it scrolls into view. */
export function Rule({ className }: { className?: string }) {
  return <div data-rule className={clsx("h-px w-full bg-[var(--line)]", className)} />;
}

export function SectionHead({
  eyebrow, title, body, className, split = false,
}: { eyebrow?: string; title: React.ReactNode; body?: string; className?: string; split?: boolean }) {
  return (
    <div className={clsx(split ? "grid gap-8 lg:grid-cols-12 lg:items-end" : "max-w-4xl", className)}>
      <div className={split ? "lg:col-span-8" : ""}>
        {eyebrow && <Eyebrow className="mb-7">{eyebrow}</Eyebrow>}
        <h2 className="display text-[clamp(2.4rem,5.6vw,5.4rem)]" data-reveal data-delay="0.05">{title}</h2>
      </div>
      {body && (
        <p className={clsx("text-lg leading-relaxed text-ink-soft", split ? "lg:col-span-4" : "mt-8 max-w-2xl")} data-reveal data-delay="0.1">
          {body}
        </p>
      )}
    </div>
  );
}
