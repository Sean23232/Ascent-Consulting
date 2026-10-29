import { useState } from "react";
import { cn } from "@/utils/cn";
import { faqs } from "@/data/site";
import { Eyebrow, Reveal } from "@/components/ui";

export default function Faq({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";

  return (
    <section
      id="faq"
      className={cn(
        "relative overflow-hidden py-20 sm:py-24 lg:py-28",
        dark ? "bg-navy text-ivory" : "bg-paper text-charcoal"
      )}
    >
      {!dark && <div aria-hidden className="bg-hairline-light pointer-events-none absolute inset-0 opacity-60" />}
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow tone={dark ? "light" : "dark"}>Questions, answered plainly</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className={cn("display-md mt-5", dark ? "text-ivory" : "text-charcoal")}>
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className={cn("mt-5 max-w-sm text-[0.95rem] leading-relaxed", dark ? "text-ivory/58" : "text-slateink")}>
              Straight answers about scope, funding, and how to begin. If something is not covered here, it is worth
              asking directly.
            </p>
          </Reveal>
          <Reveal delay={190}>
            <div className={cn("mt-8 h-px w-24", dark ? "bg-gold/45" : "bg-gold/60")} aria-hidden />
          </Reveal>
        </div>

        <div className={cn("divide-y", dark ? "divide-ivory/12 border-ivory/12" : "divide-navy/10 border-navy/10", "border-y")}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={cn(
                      "group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300",
                      dark ? "text-ivory hover:text-gold-soft" : "text-charcoal hover:text-royal"
                    )}
                  >
                    <span className="flex items-start gap-5">
                      <span className={cn("mt-1 font-mono text-[0.68rem]", isOpen ? "text-gold" : dark ? "text-ivory/35" : "text-navy/30")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[1.06rem] font-bold leading-snug tracking-[-0.015em] sm:text-[1.16rem]">
                        {item.q}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative mt-1 flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-500",
                        isOpen
                          ? "rotate-180 border-gold bg-gold text-navy"
                          : dark
                            ? "border-ivory/22 text-ivory/60 group-hover:border-gold/60"
                            : "border-navy/18 text-navy/60 group-hover:border-gold"
                      )}
                      style={{ borderRadius: 999 }}
                    >
                      <span className="absolute h-px w-2.5 bg-current" />
                      <span className={cn("absolute h-2.5 w-px bg-current transition-opacity duration-400", isOpen ? "opacity-0" : "opacity-100")} />
                    </span>
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} className="acc-panel" data-open={isOpen}>
                  <div>
                    <p className={cn("max-w-2xl pb-7 pl-10 pr-8 text-[0.94rem] leading-relaxed", dark ? "text-ivory/62" : "text-slateink")}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
