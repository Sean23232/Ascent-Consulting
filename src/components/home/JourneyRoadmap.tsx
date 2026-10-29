import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { stages } from "@/data/site";
import { useReveal, useScrollProgress } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { Eyebrow, Reveal } from "@/components/ui";
import { IconArrow, IconCheck } from "@/components/Icon";

export default function JourneyRoadmap() {
  const [active, setActive] = useState(0);
  const { ref: progressRef, progress } = useScrollProgress<HTMLDivElement>();
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.18 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { openBooking } = useStore();

  const stageProgress = (active + 1) / stages.length;
  const lineProgress = Math.max(progress * 1.25, stageProgress, visible ? 0.06 : 0);
  const current = stages[active];

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const last = stages.length - 1;
      let next = active;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = last;
      else return;
      e.preventDefault();
      setActive(next);
      tabsRef.current[next]?.focus();
    },
    [active]
  );

  return (
    <section id="journey" className="relative overflow-hidden bg-ivory-deep py-20 text-charcoal sm:py-24 lg:py-32">
      <div aria-hidden className="bg-hairline-light pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>The Ascent Approach</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-lg mt-5">
                One Journey. <span className="text-royal">Clearer Milestones.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="lede mt-5 text-slateink">
                Every business starts somewhere. We help you identify your current stage, understand the work ahead,
                and explore the next practical steps toward your goals.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="hidden lg:block">
            <div className="border border-navy/12 bg-paper px-5 py-4 text-right" style={{ borderRadius: 4 }}>
              <p className="eyebrow text-[0.55rem] text-slateink">Stage selected</p>
              <p className="mt-1.5 font-mono text-2xl font-medium text-gold-deep">
                {current.n}
                <span className="text-navy/25">/05</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Roadmap */}
        <div ref={progressRef} className="mt-16 lg:mt-24">
          <div ref={revealRef} data-visible={visible} className="relative">
            {/* Connecting line (desktop) */}
            <svg
              aria-hidden
              viewBox="0 0 1000 220"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-0 hidden h-[220px] w-full lg:block"
            >
              <path d="M100 174 L300 136 L500 98 L700 60 L900 22" fill="none" stroke="#101A2C" strokeOpacity="0.13" strokeWidth="1.5" />
              <path
                d="M100 174 L300 136 L500 98 L700 60 L900 22"
                fill="none"
                stroke="#C6A66B"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - Math.min(1, lineProgress)}
                style={{ transition: "stroke-dashoffset 600ms cubic-bezier(0.22,0.61,0.36,1)" }}
              />
            </svg>

            {/* Mobile rail */}
            <div aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-navy/12 lg:hidden">
              <div
                className="w-px bg-gold transition-[height] duration-500"
                style={{ height: `${Math.min(100, lineProgress * 100)}%` }}
              />
            </div>

            <div
              role="tablist"
              aria-label="The Ascent journey stages"
              aria-orientation="horizontal"
              onKeyDown={onKeyDown}
              className="relative grid gap-4 lg:grid-cols-5 lg:gap-5"
            >
              {stages.map((s, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <div key={s.n} role="presentation">
                    <button
                      ref={(el) => {
                        tabsRef.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`stage-tab-${s.n}`}
                      aria-selected={isActive}
                      aria-controls="stage-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActive(i)}
                      className="group h-full w-full text-left lg:pt-[var(--lift)]"
                      style={{ ["--lift" as string]: `${(4 - i) * 38}px` }}
                    >
                      <span className="flex items-start gap-4 lg:block">
                        <span
                          className={cn(
                            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border font-mono text-[0.7rem] transition-all duration-500 lg:h-11 lg:w-11",
                            isActive
                              ? "border-gold bg-navy text-gold shadow-[0_16px_34px_-20px_rgba(16,26,44,1)]"
                              : isPast
                                ? "border-gold/50 bg-gold/15 text-gold-deep"
                                : "border-navy/15 bg-paper text-slateink group-hover:border-gold/60 group-hover:text-charcoal"
                          )}
                          style={{ borderRadius: 999 }}
                        >
                          {s.n}
                          {isActive && <span aria-hidden className="pulse-ring absolute inset-0 rounded-full border border-gold/50" />}
                        </span>

                        <span className="lg:mt-6 lg:block">
                          <span
                            className={cn(
                              "block font-display text-[1.22rem] font-extrabold tracking-[-0.02em] transition-colors duration-400",
                              isActive ? "text-navy" : "text-charcoal group-hover:text-royal"
                            )}
                          >
                            {s.title}
                          </span>
                          <span className="mt-2 hidden text-[0.84rem] leading-relaxed text-slateink lg:block">
                            {s.summary}
                          </span>
                          <span
                            aria-hidden
                            className={cn(
                              "mt-3 hidden h-px w-full origin-left bg-gold transition-transform duration-500 lg:block",
                              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                            )}
                          />
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div
            id="stage-panel"
            role="tabpanel"
            aria-labelledby={`stage-tab-${current.n}`}
            className="relative mt-8 grid gap-8 border border-navy/12 bg-paper p-6 shadow-[0_30px_70px_-52px_rgba(16,26,44,0.75)] sm:p-9 lg:mt-14 lg:grid-cols-[1.35fr_1fr]"
            style={{ borderRadius: 5 }}
          >
            <div key={current.n} className="rise-in">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-[0.58rem] text-gold-deep">Stage {current.n}</span>
                <span aria-hidden className="h-px w-8 bg-navy/15" />
                <span className="eyebrow text-[0.55rem] text-slateink/70">{current.title}</span>
              </div>
              <h3 className="display-md mt-4 text-navy">{current.summary}</h3>
              <p className="mt-5 max-w-xl text-[0.97rem] leading-relaxed text-slateink">{current.detail}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => openBooking(`Roadmap — ${current.title}`)} className="btn btn-navy sweep">
                  <span className="relative z-10">Discuss Your Business Journey</span>
                  <IconArrow size={15} className="relative z-10" />
                </button>
                {active < stages.length - 1 ? (
                  <button type="button" onClick={() => setActive(active + 1)} className="link-arrow text-royal">
                    Next stage: {stages[active + 1].title}
                    <IconArrow size={14} />
                  </button>
                ) : (
                  <Link to="/services" className="link-arrow text-royal">
                    Match a service to this stage
                    <IconArrow size={14} />
                  </Link>
                )}
              </div>
            </div>

            <div className="border-t border-navy/10 pt-6 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
              <p className="eyebrow text-[0.55rem] text-royal">What this stage produces</p>
              <ul className="mt-4 space-y-3">
                {current.outputs.map((o, i) => (
                  <li
                    key={o}
                    className="flex items-start gap-3 text-[0.9rem] leading-snug text-charcoal rise-in"
                    style={{ animationDelay: `${120 + i * 90}ms` }}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold/45 bg-gold/10 text-gold-deep" style={{ borderRadius: 999 }}>
                      <IconCheck size={11} />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border border-gold/25 bg-gold/[0.06] p-4" style={{ borderRadius: 4 }}>
                <p className="text-[0.76rem] leading-relaxed text-charcoal/80">
                  This is a conceptual journey, not a guaranteed linear process. Actual steps vary by business,
                  circumstances, and funding requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
