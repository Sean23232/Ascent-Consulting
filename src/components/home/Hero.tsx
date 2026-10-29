import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroImages } from "@/data/site";
import { usePointerParallax, usePrefersReducedMotion, useReveal } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { cn } from "@/utils/cn";
import { IconArrow } from "@/components/Icon";

const MILESTONES = [
  { label: "Build", x: 52, y: 176, note: "Structure & setup" },
  { label: "Prepare", x: 152, y: 118, note: "Plan & organize" },
  { label: "Pursue Funding", x: 258, y: 58, note: "Explore routes" },
];

function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const { offset, onMouseMove, onMouseLeave } = usePointerParallax(16);
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const [tick, setTick] = useState(0);

  // Sequential check-in animation for the readiness card
  useEffect(() => {
    if (!visible || reduced) return;
    const id = window.setInterval(() => setTick((t) => (t >= 3 ? 3 : t + 1)), 620);
    return () => window.clearInterval(id);
  }, [visible, reduced]);

  return (
    <div
      ref={ref}
      data-visible={visible}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative aspect-[4/5.4] w-full sm:aspect-[16/13] lg:aspect-[4/4.75]"
    >
      {/* Architectural backdrop */}
      <div
        className="absolute inset-0 overflow-hidden border border-gold/20 bg-navy"
        style={{ borderRadius: 6, transform: `translate3d(${offset.x * 0.35}px, ${offset.y * 0.35}px, 0)` }}
      >
        <img
          src={heroImages.architecture}
          alt="Illuminated modern architecture, used as a tonal backdrop for the Ascent journey composition"
          width={900}
          height={1200}
          fetchPriority="high"
          className="h-full w-full object-cover opacity-[0.34] grayscale-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/82 to-royal/55" />
        <div aria-hidden className="bg-hairline absolute inset-0 opacity-45" />
        <div aria-hidden className="absolute -left-16 top-1/3 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Growth trajectory SVG */}
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-x-0 bottom-0 h-[78%] w-full"
        role="img"
        aria-label="An ascending journey line connecting three milestones: Build, Prepare, and Pursue Funding"
      >
        <defs>
          <linearGradient id="ascentStroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#233E68" />
            <stop offset="55%" stopColor="#C6A66B" />
            <stop offset="100%" stopColor="#DCC79E" />
          </linearGradient>
          <linearGradient id="ascentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C6A66B" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#C6A66B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        <g stroke="#F7F5F0" strokeOpacity="0.09">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`h${i}`} x1="0" x2="320" y1={40 + i * 44} y2={40 + i * 44} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={`v${i}`} y1="0" y2="240" x1={20 + i * 46} x2={20 + i * 46} />
          ))}
        </g>

        <path
          d="M14 214 C 66 208, 92 176, 130 150 S 206 96, 306 30"
          fill="none"
          stroke="url(#ascentFill)"
          strokeWidth="0"
        />
        <path
          d="M14 214 C 66 208, 92 176, 130 150 S 206 96, 306 30 L 306 240 L 14 240 Z"
          fill="url(#ascentFill)"
          opacity={visible ? 1 : 0}
          style={{ transition: "opacity 1.4s ease 0.6s" }}
        />
        <path
          d="M14 214 C 66 208, 92 176, 130 150 S 206 96, 306 30"
          fill="none"
          stroke="url(#ascentStroke)"
          strokeWidth="2"
          strokeLinecap="round"
          className="draw-line"
          style={{ ["--dash" as string]: "460" }}
        />
        {!reduced && visible && (
          <path
            d="M14 214 C 66 208, 92 176, 130 150 S 206 96, 306 30"
            fill="none"
            stroke="#DCC79E"
            strokeOpacity="0.75"
            strokeWidth="1.4"
            className="flow-dash"
          />
        )}

        {MILESTONES.map((m, i) => (
          <g key={m.label} style={{ transition: `opacity 700ms ease ${400 + i * 260}ms`, opacity: visible ? 1 : 0 }}>
            <circle cx={m.x} cy={m.y} r="16" fill="#C6A66B" fillOpacity="0.16" className={reduced ? "" : "pulse-ring"} style={{ transformOrigin: `${m.x}px ${m.y}px`, animationDelay: `${i * 1.1}s` }} />
            <circle cx={m.x} cy={m.y} r="6.5" fill="#101A2C" stroke="#C6A66B" strokeWidth="1.6" />
            <circle cx={m.x} cy={m.y} r="2.2" fill="#DCC79E" />
            <text
              x={m.x + 14}
              y={m.y - 8}
              fill="#F7F5F0"
              fontSize="10.5"
              fontWeight="700"
              fontFamily="Manrope, sans-serif"
              letterSpacing="0.02em"
            >
              {m.label}
            </text>
            <text x={m.x + 14} y={m.y + 5} fill="#F7F5F0" fillOpacity="0.5" fontSize="7.5" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.14em">
              {m.note.toUpperCase()}
            </text>
          </g>
        ))}

        <text x="14" y="232" fill="#F7F5F0" fillOpacity="0.35" fontSize="7.5" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.18em">
          IDEA
        </text>
        <text x="262" y="20" fill="#C6A66B" fillOpacity="0.75" fontSize="7.5" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.18em">
          FUNDING-READY
        </text>
      </svg>

      {/* Floating roadmap panel */}
      <div
        className={cn(
          "absolute -left-3 top-6 w-[62%] max-w-[290px] border border-gold/25 bg-navy-800/92 p-4 shadow-[0_36px_80px_-40px_rgba(6,10,20,0.95)] backdrop-blur-md sm:-left-6 sm:top-8",
          !reduced && "float-slow"
        )}
        style={{
          borderRadius: 5,
          transform: `translate3d(${offset.x * -0.7}px, ${offset.y * -0.7}px, 0)`,
          transition: "transform 500ms cubic-bezier(0.22,0.61,0.36,1)",
        }}
      >
        <div className="flex items-center justify-between">
          <p className="eyebrow text-[0.52rem] text-gold/85">Business roadmap</p>
          <span className="eyebrow text-[0.5rem] text-ivory/35">v1</span>
        </div>
        <p className="mt-2.5 font-display text-[0.98rem] font-bold leading-tight text-ivory">
          Five connected stages, one direction of travel.
        </p>
        <ul className="mt-3.5 space-y-2">
          {["Discover", "Establish", "Strategize", "Prepare", "Explore Funding"].map((s, i) => (
            <li key={s} className="flex items-center gap-2.5">
              <span className="h-px w-4 bg-gold/50" aria-hidden />
              <span className={cn("text-[0.74rem] transition-colors", i < 3 ? "text-ivory/85" : "text-ivory/40")}>{s}</span>
              <span className="ml-auto h-1 w-1 rounded-full bg-gold/60" aria-hidden />
            </li>
          ))}
        </ul>
        <Link to="/process" className="link-arrow mt-4 text-[0.74rem] text-gold">
          See the approach <IconArrow size={12} />
        </Link>
      </div>

      {/* Funding readiness card */}
      <div
        className="absolute -bottom-4 right-0 w-[64%] max-w-[286px] border border-navy/10 bg-ivory/97 p-4 shadow-[0_34px_70px_-34px_rgba(6,10,20,0.85)] sm:-right-4"
        style={{
          borderRadius: 5,
          transform: `translate3d(${offset.x * 0.8}px, ${offset.y * 0.8}px, 0)`,
          transition: "transform 500ms cubic-bezier(0.22,0.61,0.36,1)",
        }}
      >
        <div className="flex items-center justify-between">
          <p className="eyebrow text-[0.52rem] text-royal">Preparation checklist</p>
          <span className="font-mono text-[0.62rem] text-slateink">{Math.min(tick, 3)}/3</span>
        </div>
        <ul className="mt-3 space-y-2.5">
          {[
            "Business plan organized",
            "Financial information gathered",
            "Funding routes researched",
          ].map((item, i) => {
            const done = tick > i;
            return (
              <li key={item} className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center border transition-all duration-500",
                    done ? "border-gold bg-gold text-navy" : "border-navy/20 bg-transparent"
                  )}
                  style={{ borderRadius: 2 }}
                >
                  {done && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden>
                      <path d="M2 6.4 4.6 9 10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={cn("text-[0.76rem] transition-colors duration-500", done ? "text-charcoal" : "text-slateink/70")}>
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 border-t border-navy/10 pt-2.5 text-[0.66rem] leading-snug text-slateink">
          Preparation only. Approval and eligibility are decided by each provider.
        </p>
      </div>

      {/* Vertical accent */}
      <div aria-hidden className="absolute -right-1 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold/45 to-transparent lg:block" />
    </div>
  );
}

export default function Hero() {
  const { openBooking } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stagger = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="bg-arc relative overflow-hidden pb-24 pt-24 text-ivory sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-40">
      <div aria-hidden className="bg-hairline pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-royal/25 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-[12%] h-[380px] w-[380px] rounded-full bg-gold/[0.08] blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:px-12">
        <div className="max-w-2xl">
          <p
            className={cn("eyebrow flex items-center gap-3 text-gold/90", mounted && "rise-in")}
            style={stagger(80)}
          >
            <span aria-hidden className="h-px w-10 bg-gold/60" />
            Business strategy • Setup • Funding readiness
          </p>

          <h1 className="display-xl mt-7">
            <span className={cn("block", mounted && "rise-in")} style={stagger(180)}>
              From Business Idea
            </span>
            <span className={cn("block text-ivory/88", mounted && "rise-in")} style={stagger(280)}>
              to a{" "}
              <span className="relative inline-block text-gold">
                Funding-Ready
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-gold/55"
                >
                  <path
                    d="M2 8.5 C 70 3.5, 150 2.5, 298 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    className="draw-line"
                    data-visible={mounted}
                    style={{ ["--dash" as string]: "320", transitionDelay: "900ms" }}
                  />
                </svg>
              </span>
            </span>
            <span className={cn("block", mounted && "rise-in")} style={stagger(380)}>
              Future.
            </span>
          </h1>

          <p
            className={cn("lede mt-8 max-w-xl text-ivory/68", mounted && "rise-in")}
            style={stagger(500)}
          >
            Building a business takes more than a great idea. Ascent Consulting helps you navigate the journey from
            business setup to funding preparation with a clearer plan, practical guidance, and support aligned with
            your goals.
          </p>

          <div className={cn("mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center", mounted && "rise-in")} style={stagger(620)}>
            <button type="button" onClick={() => openBooking("Hero")} className="btn btn-gold sweep">
              <span className="relative z-10">Book a Consultation</span>
              <IconArrow size={16} className="relative z-10" />
            </button>
            <Link to="/services" className="btn btn-ghost-light">
              Explore Our Services
            </Link>
          </div>

          <p className={cn("mt-5 text-[0.83rem] text-ivory/48", mounted && "rise-in")} style={stagger(720)}>
            Start with a conversation about your business goals.
          </p>

          <div
            className={cn("mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-ivory/10 pt-6", mounted && "rise-in")}
            style={stagger(820)}
          >
            <Link to="/next-step" className="link-arrow text-[0.83rem] text-ivory/80 hover:text-gold-soft">
              Find Your Next Step
              <IconArrow size={14} />
            </Link>
            <span className="hidden h-4 w-px bg-ivory/15 sm:block" aria-hidden />
            <p className="max-w-xs text-[0.72rem] leading-relaxed text-ivory/55">
              A conceptual journey — steps vary by business, and no funding outcome is guaranteed.
            </p>
          </div>
        </div>

        <div className={cn("relative", mounted && "rise-in")} style={stagger(340)}>
          <HeroVisual />
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="relative mx-auto mt-16 hidden w-full max-w-[1240px] px-12 lg:block">
        <div className="flex items-center gap-4">
          <span className="eyebrow text-[0.55rem] text-ivory/35">Scroll</span>
          <span className="relative h-px flex-1 overflow-hidden bg-ivory/12">
            <span className="absolute inset-y-0 left-0 w-1/4 animate-[sweep_3.6s_ease-in-out_infinite] bg-gold/60" />
          </span>
        </div>
      </div>
    </section>
  );
}
