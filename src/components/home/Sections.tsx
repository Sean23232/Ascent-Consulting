import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { audiences, challenges, principles, px, services, values } from "@/data/site";
import { useStore } from "@/lib/store";
import { ArrowLink, ButtonLink, Eyebrow, IconBox, Pill, Reveal, Section } from "@/components/ui";
import { Icon, IconArrow } from "@/components/Icon";

/* ---------------------------- Positioning strip ---------------------------- */

const MARQUEE = [
  "Idea",
  "Formation",
  "Strategy",
  "Preparation",
  "Funding conversations",
  "Growth",
];

export function PositioningStrip() {
  return (
    <div className="relative border-b border-navy/10 bg-paper">
      {/* Tagline marquee */}
      <div aria-hidden className="overflow-hidden border-b border-navy/8 bg-navy py-2.5">
        <div className="marquee-track flex w-max items-center whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-10 pr-10">
              {MARQUEE.map((word) => (
                <span key={word} className="eyebrow flex items-center gap-10 text-[0.6rem] text-ivory/50">
                  {word}
                  <span className="text-gold/60">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 divide-y divide-navy/8 px-5 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:px-12">
        {principles.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 90}
            className={cn(
              "group flex items-center gap-4 py-7 lg:px-8",
              i === 0 && "lg:pl-0",
              i >= 2 && "sm:border-t sm:border-navy/8 lg:border-t-0",
              i % 2 === 1 && "sm:border-l sm:border-navy/8 sm:pl-8"
            )}
          >
            <IconBox name={p.icon} size={24} className="h-11 w-11" />
            <div>
              <p className="font-display text-[0.98rem] font-bold tracking-[-0.01em] text-charcoal">{p.title}</p>
              <p className="mt-1 text-[0.78rem] text-slateink">{p.note}</p>
            </div>
            <span aria-hidden className="ml-auto hidden font-mono text-[0.62rem] text-navy/20 lg:block">
              0{i + 1}
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Challenge -------------------------------- */

export function Challenge() {
  return (
    <Section tone="light" id="journey-starts-here">
      <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <Reveal className="relative">
          <div className="group relative overflow-hidden bg-navy" style={{ borderRadius: 5 }}>
            <img
              src={px(5668489, 900, 1100)}
              alt="An entrepreneur writing structured notes while planning a new business"
              loading="lazy"
              width={900}
              height={1100}
              className="img-zoom h-full max-h-[560px] w-full object-cover opacity-92"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="eyebrow text-[0.55rem] text-gold/85">Where most owners start</p>
              <p className="mt-3 max-w-sm font-display text-lg font-bold leading-snug text-ivory">
                “The idea is clear. The sequence of steps behind it usually isn't.”
              </p>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -bottom-6 -right-4 hidden h-32 w-32 border border-gold/35 sm:block"
            style={{ borderRadius: 4 }}
          />
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>The journey starts here</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="display-lg mt-5">A Great Idea Deserves a Clearer Path Forward.</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="lede mt-6 max-w-xl text-slateink">
              Launching a business involves a series of decisions made close together — choosing how to set up,
              organizing what the business actually does, and preparing the information needed for the next stage.
              Taken one at a time, each is manageable. Taken all at once, they stall each other.
            </p>
          </Reveal>

          <div className="mt-10 space-y-3">
            {challenges.map((c, i) => (
              <Reveal key={c.n} delay={180 + i * 100}>
                <article className="group relative flex gap-5 border border-navy/10 bg-paper p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_26px_60px_-40px_rgba(16,26,44,0.6)]" style={{ borderRadius: 4 }}>
                  <span aria-hidden className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100" />
                  <span className="font-mono text-[0.72rem] font-medium text-gold-deep">{c.n}</span>
                  <div>
                    <h3 className="font-display text-[1.1rem] font-bold tracking-[-0.015em] text-charcoal">{c.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-slateink">{c.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div className="mt-10 border-l-2 border-gold bg-ivory-deep/70 py-6 pl-6 pr-4">
              <p className="font-display text-[1.28rem] font-bold leading-snug tracking-[-0.02em] text-navy sm:text-[1.45rem]">
                “You don't have to figure out every step at once. Start with where you are and identify what comes
                next.”
              </p>
              <div className="mt-6">
                <ArrowLink to="/services" tone="dark">
                  Discover How We Help
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------ Services grid ------------------------------ */

const spanClass = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <Section tone="paper" id="services-overview">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>How we support your journey</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="display-lg mt-5">Business Support Designed Around Your Next Move.</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="lede mt-5 text-slateink">
              Four connected areas of support — each usable on its own, each stronger as part of the same journey.
            </p>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <ButtonLink to="/services" tone="ghost-dark" arrow>
            All services in detail
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 110} className={cn("lg:col-span-6", spanClass[i])}>
            <article
              className={cn(
                "group card-hover relative flex h-full flex-col overflow-hidden border border-navy/10 bg-ivory/60",
                "hover:border-gold/45 hover:bg-paper"
              )}
              style={{ borderRadius: 5 }}
            >
              {(i === 0 || i === 3) && !compact && (
                <div className="relative h-52 overflow-hidden bg-navy">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    width={1100}
                    height={500}
                    className="img-zoom h-full w-full object-cover opacity-70"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/45 to-transparent" />
                  <div aria-hidden className="bg-hairline absolute inset-0 opacity-30" />
                  <span className="eyebrow absolute left-6 top-6 text-[0.55rem] text-gold/90">Service {s.index}</span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <IconBox name={s.icon} />
                  <span className="font-mono text-[2.1rem] font-medium leading-none text-navy/10 transition-colors duration-500 group-hover:text-gold/35">
                    {s.index}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[1.35rem] font-extrabold leading-tight tracking-[-0.025em] text-charcoal">
                  <Link to={`/services#${s.slug}`} className="transition-colors duration-300 hover:text-royal">
                    <span className="absolute inset-0 z-0" aria-hidden />
                    <span className="relative z-10">{s.title}</span>
                  </Link>
                </h3>

                <p className="mt-3.5 max-w-md text-[0.93rem] leading-relaxed text-slateink">{s.short}</p>

                {s.status === "proposed" && (
                  <Pill tone="gold" className="mt-4 self-start">
                    Proposed service — pending confirmation
                  </Pill>
                )}

                <ul className="mt-6 space-y-2 border-t border-navy/8 pt-5">
                  {s.scope.slice(0, compact ? 2 : 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-charcoal/85">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Link
                    to={`/services#${s.slug}`}
                    className="link-arrow relative z-20 text-[0.86rem] text-royal group-hover:text-gold-deep"
                  >
                    Explore Service
                    <IconArrow size={15} />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-8 max-w-3xl text-[0.78rem] leading-relaxed text-slateink/85">
          Service descriptions outline proposed areas of support. Specific scope is agreed per engagement; legal, tax,
          registration, and regulated financial services are only included where explicitly confirmed.
        </p>
      </Reveal>
    </Section>
  );
}

/* -------------------------------- Why Ascent ------------------------------- */

export function WhyAscent() {
  return (
    <Section tone="dark" id="why-ascent" className="bg-arc">
      <div aria-hidden className="bg-hairline pointer-events-none absolute inset-0 opacity-30" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      {/* decorative concentric arcs */}
      <svg aria-hidden className="pointer-events-none absolute -right-40 top-1/2 hidden h-[640px] w-[640px] -translate-y-1/2 text-gold/12 lg:block" viewBox="0 0 400 400" fill="none">
        {[60, 100, 140, 180].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth="0.8" />
        ))}
        <path d="M200 20 v360 M20 200 h360" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6" />
        <path d="M200 200 L340 90" stroke="#C6A66B" strokeOpacity="0.5" strokeWidth="1" />
        <circle cx="340" cy="90" r="4" fill="#C6A66B" />
      </svg>

      <div className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="light">Why Ascent Consulting</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="display-lg mt-5 text-ivory">Clarity for the Decisions That Move You Forward.</h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="lede mt-5 text-ivory/62">
              Credibility here is built on how clearly things are explained — what is covered, what is not, and what
              happens next.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-ivory/12 bg-ivory/12 sm:grid-cols-2" style={{ borderRadius: 5 }}>
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <article className="group relative h-full bg-navy-800/85 p-8 transition-colors duration-500 hover:bg-royal/45 sm:p-9">
                <span aria-hidden className="absolute right-7 top-7 font-mono text-[0.66rem] text-ivory/22">0{i + 1}</span>
                <IconBox name={v.icon} tone="light" size={24} />
                <h3 className="mt-6 max-w-[16ch] font-display text-[1.22rem] font-bold leading-snug tracking-[-0.02em] text-ivory">
                  {v.title}
                </h3>
                <p className="mt-3.5 max-w-sm text-[0.92rem] leading-relaxed text-ivory/58">{v.body}</p>
                <span aria-hidden className="mt-6 block h-px w-10 origin-left bg-gold/70 transition-transform duration-500 group-hover:scale-x-[3.2]" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 max-w-3xl text-[0.78rem] leading-relaxed text-ivory/58">
            No testimonials, success rates, funding totals, or credentials are claimed on this site until verified
            information has been supplied.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------------------- Who we help ------------------------------ */

export function WhoWeHelp() {
  return (
    <Section tone="ivory" id="who-we-help">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Who we help</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="display-lg mt-5">Wherever You Are in Your Business Journey.</h2>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <p className="max-w-sm text-[0.92rem] leading-relaxed text-slateink">
            Three starting points we see most often. Each links to the service that usually fits it best.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {audiences.map((a, i) => (
          <Reveal key={a.title} delay={i * 120}>
            <article className="group card-hover relative flex h-full flex-col overflow-hidden border border-navy/10 bg-paper" style={{ borderRadius: 5 }}>
              <div className="relative h-64 overflow-hidden bg-navy">
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="img-zoom h-full w-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/12 to-transparent" />
                <span className="eyebrow absolute bottom-4 left-5 text-[0.52rem] text-gold/90">0{i + 1}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.18rem] font-extrabold tracking-[-0.02em] text-charcoal">{a.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-slateink">{a.body}</p>
                <div className="mt-auto pt-6">
                  <ArrowLink to={`/services#${a.serviceSlug}`} tone="dark">
                    {a.linkLabel}
                  </ArrowLink>
                </div>
                <p className="mt-4 border-t border-navy/8 pt-3 text-[0.68rem] text-slateink/70">{a.note}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------ Consultation CTA ---------------------------- */

export function ConsultationCTA() {
  const { openBooking } = useStore();
  return (
    <section className="bg-arc relative overflow-hidden py-20 text-ivory sm:py-24 lg:py-28">
      <div aria-hidden className="bg-hairline absolute inset-0 opacity-25" />
      <div aria-hidden className="grain absolute inset-0" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div aria-hidden className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold/[0.09] blur-[100px]" />

      {/* abstract line illustration */}
      <svg aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 text-gold/18 lg:block" viewBox="0 0 600 400" fill="none" preserveAspectRatio="xMaxYMid slice">
        {Array.from({ length: 11 }).map((_, i) => (
          <path
            key={i}
            d={`M${600 - i * 12} 400 C ${420 - i * 22} ${320 - i * 14}, ${300 + i * 18} ${180 + i * 10}, ${120 + i * 26} ${20 + i * 8}`}
            stroke="currentColor"
            strokeWidth="0.7"
          />
        ))}
        <circle cx="196" cy="96" r="5" fill="#C6A66B" fillOpacity="0.7" />
      </svg>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <Reveal>
              <Eyebrow tone="gold">Featured consultation</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-lg mt-5 text-ivory">Let's Map Out Your Next Move.</h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="lede mt-5 max-w-xl text-ivory/62">
                Whether you're starting with an idea or preparing for the next stage of your business, a conversation
                can help clarify your priorities and identify the steps worth exploring.
              </p>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="flex flex-col gap-3.5 border-l border-gold/25 pl-7 lg:pl-9">
              <button type="button" onClick={() => openBooking("Featured CTA")} className="btn btn-gold sweep w-full">
                <span className="relative z-10">Book a Consultation</span>
                <IconArrow size={16} className="relative z-10" />
              </button>
              <Link to="/contact" className="btn btn-ghost-light w-full">
                Tell Us About Your Business
              </Link>
              <p className="mt-1 text-[0.76rem] leading-relaxed text-ivory/45">
                Consultation format, availability, and any cost are confirmed with the team before booking.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Final CTA -------------------------------- */

export function FinalCTA() {
  const { openBooking } = useStore();
  return (
    <Section tone="light" className="bg-ivory-wash">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Begin</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-5 text-charcoal">
              Your Next Chapter Starts <span className="relative inline-block text-royal">
                With a Conversation
                <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full bg-gold/70" />
              </span>.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede mt-6 max-w-lg text-slateink">
              Tell us where you are today and where you want your business to go. Let's explore the next steps
              together.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="border border-navy/12 bg-paper p-8 shadow-[0_34px_80px_-58px_rgba(16,26,44,0.8)] sm:p-10" style={{ borderRadius: 5 }}>
            <span className="flex items-center gap-3">
              <Icon name="compass" size={22} className="text-gold-deep" />
              <span className="eyebrow text-[0.56rem] text-royal">Two ways in</span>
            </span>
            <div className="mt-6 flex flex-col gap-3">
              <button type="button" onClick={() => openBooking("Final CTA")} className="btn btn-navy sweep w-full">
                <span className="relative z-10">Start Your Conversation</span>
                <IconArrow size={16} className="relative z-10" />
              </button>
              <Link to="/next-step" className="btn btn-ghost-dark w-full">
                Take the 3-step assessment
              </Link>
            </div>
            <div className="rule-gold mt-8" aria-hidden />
            <p className="mt-6 text-center font-display text-[0.92rem] font-semibold tracking-[-0.01em] text-charcoal">
              Clear conversations. Practical direction. A focus on your goals.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
