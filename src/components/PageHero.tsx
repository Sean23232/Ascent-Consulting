import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { Eyebrow } from "@/components/ui";
import { IconArrow } from "@/components/Icon";

export default function PageHero({
  eyebrow,
  title,
  lede,
  ctas,
  image,
  imageAlt,
  meta,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  ctas?: ReactNode;
  image?: string;
  imageAlt?: string;
  meta?: { label: string; value: string }[];
  breadcrumb?: string;
}) {
  return (
    <section className="bg-arc relative overflow-hidden pb-16 pt-24 text-ivory sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-40">
      <div aria-hidden className="bg-hairline pointer-events-none absolute inset-0 opacity-35" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-royal/30 blur-[110px]" />
      {image && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] overflow-hidden lg:block">
          <img src={image} alt={imageAlt ?? ""} className="h-full w-full object-cover opacity-[0.22] grayscale-[0.3]" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-navy/20" />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2.5">
          <Link to="/" className="eyebrow text-[0.55rem] text-ivory/40 transition-colors hover:text-gold">
            Home
          </Link>
          <span aria-hidden className="text-ivory/25">/</span>
          <span className="eyebrow text-[0.55rem] text-gold/85">{breadcrumb ?? eyebrow}</span>
        </nav>

        <div className="mt-9 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <Eyebrow tone="light" className="rise-in">
              {eyebrow}
            </Eyebrow>
            <h1 className="display-xl mt-6 rise-in" style={{ animationDelay: "90ms" }}>
              {title}
            </h1>
            {lede && (
              <p className="lede mt-7 max-w-2xl text-ivory/65 rise-in" style={{ animationDelay: "180ms" }}>
                {lede}
              </p>
            )}
            {ctas && (
              <div className={cn("mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center rise-in")} style={{ animationDelay: "260ms" }}>
                {ctas}
              </div>
            )}
          </div>

          {meta && meta.length > 0 && (
            <dl className="grid gap-px overflow-hidden border border-ivory/14 bg-ivory/14 sm:grid-cols-2 lg:grid-cols-1 rise-in" style={{ animationDelay: "320ms", borderRadius: 5 }}>
              {meta.map((m) => (
                <div key={m.label} className="bg-navy-800/80 px-5 py-4">
                  <dt className="eyebrow text-[0.52rem] text-ivory/40">{m.label}</dt>
                  <dd className="mt-1.5 font-display text-[0.98rem] font-bold text-ivory">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="mt-14 flex items-center gap-4" aria-hidden>
          <span className="h-px flex-1 bg-ivory/12" />
          <span className="eyebrow text-[0.52rem] text-ivory/30">Idea to Funding</span>
          <IconArrow size={13} className="text-gold/60" />
        </div>
      </div>
    </section>
  );
}
