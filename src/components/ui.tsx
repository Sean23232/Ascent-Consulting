import type { ElementType, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useReveal } from "@/lib/hooks";
import { IconArrow, type IconName, Icon } from "@/components/Icon";

/* --------------------------------- Reveal --------------------------------- */

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  mask = false,
  threshold,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  mask?: boolean;
  threshold?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold });
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={cn(mask ? "reveal-mask" : "reveal", className)}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------- Eyebrow -------------------------------- */

export function Eyebrow({
  children,
  tone = "dark",
  className,
  rule = true,
}: {
  children: ReactNode;
  tone?: "dark" | "light" | "gold";
  className?: string;
  rule?: boolean;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        tone === "dark" && "text-royal",
        tone === "light" && "text-ivory/70",
        tone === "gold" && "text-gold",
        className
      )}
    >
      {rule && (
        <span
          aria-hidden
          className={cn(
            "h-px w-8 shrink-0",
            tone === "dark" && "bg-royal/40",
            tone === "light" && "bg-ivory/30",
            tone === "gold" && "bg-gold/60"
          )}
        />
      )}
      {children}
    </span>
  );
}

/* ---------------------------------- Button --------------------------------- */

type ButtonTone = "gold" | "navy" | "ghost-light" | "ghost-dark";

const toneClass: Record<ButtonTone, string> = {
  gold: "btn-gold",
  navy: "btn-navy",
  "ghost-light": "btn-ghost-light",
  "ghost-dark": "btn-ghost-dark",
};

type CommonBtn = {
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
  arrow?: boolean;
  size?: "md" | "sm";
};

const sizeClass = { md: "", sm: "!py-2.5 !px-4 !text-[0.8rem]" } as const;

export function ButtonLink({
  children,
  to,
  tone = "gold",
  className,
  arrow = false,
  size = "md",
  onClick,
}: CommonBtn & { to: string; onClick?: () => void }) {
  const isExternal = /^https?:/.test(to);
  const Comp: ElementType = isExternal ? "a" : Link;
  return (
    <Comp
      {...(isExternal ? { href: to, target: "_blank", rel: "noreferrer noopener" } : { to })}
      onClick={onClick}
      className={cn("btn sweep", toneClass[tone], sizeClass[size], className)}
    >
      <span className="relative z-10">{children}</span>
      {arrow && <IconArrow size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
    </Comp>
  );
}

export function Button({
  children,
  tone = "gold",
  className,
  arrow = false,
  size = "md",
  ...rest
}: CommonBtn & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={cn("btn sweep", toneClass[tone], sizeClass[size], className)}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && <IconArrow size={16} />}
      </span>
    </button>
  );
}

export function ArrowLink({
  children,
  to,
  tone = "dark",
  className,
  onClick,
}: {
  children: ReactNode;
  to: string;
  tone?: "dark" | "light" | "gold";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "link-arrow group",
        tone === "dark" && "text-navy hover:text-gold-deep",
        tone === "light" && "text-ivory hover:text-gold-soft",
        tone === "gold" && "text-gold hover:text-gold-soft",
        className
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-500",
            tone === "dark" ? "bg-navy/25" : "bg-current/30",
            "opacity-70"
          )}
        />
      </span>
      <IconArrow size={16} aria-hidden className="shrink-0" />
    </Link>
  );
}

/* ------------------------------ Section heading ---------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  align = "left",
  className,
  titleClass,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  titleClass?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone === "dark" ? "dark" : "light"} className={cn(align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal delay={70}>
        <h2
          className={cn(
            "display-lg mt-5",
            tone === "dark" ? "text-charcoal" : "text-ivory",
            titleClass
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={140}>
          <p className={cn("lede mt-5", tone === "dark" ? "text-slateink" : "text-ivory/70")}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

/* --------------------------------- Shell ---------------------------------- */

export function Section({
  children,
  className,
  id,
  tone = "light",
  container = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "dark" | "ivory" | "paper";
  container?: boolean;
}) {
  const tones = {
    light: "bg-ivory text-charcoal",
    paper: "bg-paper text-charcoal",
    ivory: "bg-ivory-deep text-charcoal",
    dark: "bg-navy text-ivory",
  };
  return (
    <section id={id} className={cn("relative overflow-hidden py-20 sm:py-24 lg:py-32", tones[tone], className)}>
      {container ? <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">{children}</div> : children}
    </section>
  );
}

/* ------------------------------- Status pill ------------------------------- */

export function Pill({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "neutral" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-full border px-3 py-1",
        tone === "gold" && "border-gold/40 bg-gold/10 text-gold-deep",
        tone === "neutral" && "border-navy/15 bg-navy/[0.04] text-slateink",
        tone === "light" && "border-ivory/25 bg-ivory/[0.06] text-ivory/75",
        className
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------- IconBox --------------------------------- */

export function IconBox({
  name,
  tone = "dark",
  className,
  size = 26,
}: {
  name: IconName;
  tone?: "dark" | "light";
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center border transition-colors duration-500",
        tone === "dark"
          ? "border-navy/12 bg-navy/[0.035] text-royal group-hover:border-gold/50 group-hover:text-gold-deep"
          : "border-ivory/15 bg-ivory/[0.05] text-gold-soft group-hover:border-gold/60",
        className
      )}
      style={{ borderRadius: 3 }}
    >
      <Icon name={name} size={size} />
    </span>
  );
}
