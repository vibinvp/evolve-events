import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light" | "outline-light";
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

const base =
  "group relative inline-flex items-center justify-between gap-6 overflow-hidden rounded-full px-7 py-4 text-[0.95rem] font-semibold transition-[transform,color,border-color] duration-500 ease-out active:scale-[0.97]";

/* A fill slides up on hover; the label stays put. */
const styles = {
  primary: "bg-white text-night before:bg-brand hover:text-white",
  light: "bg-white text-night before:bg-brand hover:text-white",
  outline: "border border-white/30 text-white before:bg-white hover:text-night hover:border-white",
  "outline-light": "border border-white/40 text-white before:bg-white hover:text-night hover:border-white",
};

export function ButtonLink({ href, children, variant = "primary", arrow = true, className, external }: Props) {
  const cls = clsx(
    base,
    "before:absolute before:inset-0 before:translate-y-full before:transition-transform before:duration-500 before:ease-out hover:before:translate-y-0",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight className="flip-rtl relative z-10 size-[1.1rem] transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}
