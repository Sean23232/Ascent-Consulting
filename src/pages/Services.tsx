import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { services, px, type Service } from "@/data/site";
import { usePageMeta } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import PageHero from "@/components/PageHero";
import { ButtonLink, Eyebrow, IconBox, Pill, Reveal, Section } from "@/components/ui";
import { IconArrow, IconCheck, IconDoc } from "@/components/Icon";
import ConsultationCTABand from "@/components/ServiceCtaBand";

function ServiceSection({ s, index }: { s: Service; index: number }) {
  const { openBooking } = useStore();
  const flipped = index % 2 === 1;

  return (
    <article id={s.slug} className="scroll-mt-28 border-t border-navy/10 py-16 first:border-t-0 first:pt-0 lg:py-20">
      <div className={cn("grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16", flipped && "lg:[direction:rtl]")}>
        <div className="lg:[direction:ltr]">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.72rem] text-gold-deep">{s.index}</span>
              <span aria-hidden className="h-px w-10 bg-gold/50" />
              <Eyebrow>Service</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="display-md mt-5 text-charcoal">{s.title}</h2>
          </Reveal>
          {s.status === "proposed" && (
            <Reveal delay={100}>
              <Pill tone="gold" className="mt-4">
                Proposed offering — scope pending confirmation
              </Pill>
            </Reveal>
          )}
          <Reveal delay={130}>
            <p className="lede mt-6 text-slateink">{s.overview}</p>
          </Reveal>

          <Reveal delay={190}>
            <div className="mt-9">
              <h3 className="eyebrow text-[0.56rem] text-royal">The challenges this addresses</h3>
              <ul className="mt-4 space-y-3">
                {s.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3 border-l border-navy/12 pl-4 text-[0.92rem] leading-relaxed text-charcoal/85">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9">
              <h3 className="eyebrow text-[0.56rem] text-royal">Potential areas of support</h3>
              <ul className="mt-4 grid gap-2.5">
                {s.scope.map((item) => (
                  <li key={item} className="group flex items-start gap-3 text-[0.92rem] leading-snug text-charcoal/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold/45 bg-gold/10 text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-navy" style={{ borderRadius: 999 }}>
                      <IconCheck size={11} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="lg:[direction:ltr]">
          <Reveal delay={120}>
            <div className="group relative overflow-hidden bg-navy" style={{ borderRadius: 5 }}>
              <img
                src={s.image}
                alt={s.imageAlt}
                loading="lazy"
                width={1100}
                height={700}
                className="img-zoom h-64 w-full object-cover opacity-85 sm:h-80"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                <IconBox name={s.icon} tone="light" size={22} className="h-10 w-10" />
                <p className="font-display text-[0.95rem] font-bold text-ivory">Service {s.index} — {s.title}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 border border-navy/12 bg-paper p-6" style={{ borderRadius: 5 }}>
              <h3 className="eyebrow text-[0.56rem] text-royal">How this service runs</h3>
              <ol className="mt-5 space-y-5">
                {s.process.map((p, i) => (
                  <li key={p.step} className="relative flex gap-4">
                    <span className="flex flex-col items-center">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-navy/15 font-mono text-[0.62rem] text-royal" style={{ borderRadius: 999 }}>
                        {i + 1}
                      </span>
                      {i < s.process.length - 1 && <span aria-hidden className="mt-1 w-px flex-1 bg-navy/12" />}
                    </span>
                    <span className="pb-1">
                      <span className="block font-display text-[0.98rem] font-bold text-charcoal">{p.step}</span>
                      <span className="mt-1.5 block text-[0.87rem] leading-relaxed text-slateink">{p.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-6 border border-gold/28 bg-gold/[0.06] p-6" style={{ borderRadius: 5 }}>
              <h3 className="eyebrow flex items-center gap-2 text-[0.56rem] text-gold-deep">
                <IconDoc size={15} /> Information you may need to prepare
              </h3>
              <ul className="mt-4 space-y-2.5">
                {s.prepare.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.88rem] leading-snug text-charcoal/85">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-gold/25 pt-3.5 text-[0.74rem] leading-relaxed text-slateink">
                Nothing needs to be complete before the first conversation — this list simply shows what makes the work
                move faster.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => openBooking(`Service — ${s.title}`)} className="btn btn-navy sweep">
                <span className="relative z-10">Start a conversation</span>
                <IconArrow size={15} className="relative z-10" />
              </button>
              <ButtonLink to="/contact" tone="ghost-dark" size="sm">
                Send an enquiry
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  usePageMeta(
    "Services | Ascent Consulting — Setup, Planning & Funding Preparation",
    "Business setup and formation, business planning and strategy, funding preparation, and business growth — explored in detail, with what to prepare for each."
  );
  const { hash } = useLocation();
  const [active, setActive] = useState(services[0].slug);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(s.slug))
      .filter((el): el is HTMLElement => Boolean(el));
    sections.forEach((el) => (refs.current[el.id] = el));

    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(
        () => el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
        120
      );
    }
  }, [hash]);

  const jump = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActive(slug);
  };

  return (
    <>
      <PageHero
        eyebrow="Services"
        breadcrumb="Services"
        title={
          <>
            The Support Behind Your <span className="text-gold">Business Journey</span>.
          </>
        }
        lede="Explore business setup, strategic planning, and funding preparation through a coordinated approach designed around your business goals."
        image={px(36765718, 1000, 900)}
        imageAlt="Professionals discussing business strategy in a corporate office"
        meta={[
          { label: "Service areas", value: "Four connected" },
          { label: "Journey covered", value: "Setup → Funding prep" },
          { label: "Engagement scope", value: "Agreed per client" },
        ]}
        ctas={
          <>
            <ButtonLink to="/contact" tone="gold" arrow>
              Discuss Your Needs
            </ButtonLink>
            <ButtonLink to="/process" tone="ghost-light">
              See how we work
            </ButtonLink>
          </>
        }
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Sidebar / mobile chips */}
          <aside aria-label="Service navigation" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow hidden text-[0.55rem] text-royal lg:block">On this page</p>
            <nav className="no-scrollbar -mx-5 mt-3 flex gap-2.5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:mt-5 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
              {services.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => jump(s.slug)}
                  aria-current={active === s.slug ? "true" : undefined}
                  className={cn(
                    "group flex shrink-0 items-center gap-3 border px-4 py-2.5 text-left transition-all duration-300 lg:w-full lg:border-0 lg:border-b lg:border-navy/10 lg:px-0 lg:py-4",
                    active === s.slug ? "border-gold bg-paper lg:bg-transparent" : "border-navy/12 bg-ivory/50 lg:bg-transparent",
                    "lg:hover:pl-1.5"
                  )}
                  style={{ borderRadius: 999 }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "hidden h-6 w-px transition-colors duration-400 lg:block",
                      active === s.slug ? "bg-gold" : "bg-navy/15"
                    )}
                  />
                  <span className="font-mono text-[0.62rem] text-gold-deep lg:text-[0.66rem]">{s.index}</span>
                  <span
                    className={cn(
                      "font-display text-[0.86rem] font-bold tracking-[-0.01em] lg:text-[0.95rem]",
                      active === s.slug ? "text-navy" : "text-slateink group-hover:text-charcoal"
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-8 hidden border border-navy/12 bg-paper p-5 lg:block" style={{ borderRadius: 4 }}>
              <p className="text-[0.8rem] leading-relaxed text-slateink">
                Unsure which area applies? The three-question assessment suggests a starting point.
              </p>
              <ButtonLink to="/next-step" tone="ghost-dark" size="sm" className="mt-4 w-full">
                Find Your Next Step
              </ButtonLink>
            </div>
          </aside>

          <div>
            {services.map((s, i) => (
              <ServiceSection key={s.slug} s={s} index={i} />
            ))}

            <div className="mt-14 border border-navy/12 bg-ivory-deep/70 p-6 sm:p-8" style={{ borderRadius: 5 }}>
              <h2 className="font-display text-[1.2rem] font-extrabold tracking-[-0.02em] text-charcoal">
                Scope, stated honestly
              </h2>
              <p className="mt-3 max-w-3xl text-[0.9rem] leading-relaxed text-slateink">
                The areas listed above describe proposed support. The actual scope of any engagement is agreed in
                writing before work begins. Legal, tax, registration, and regulated financial services are not implied
                unless explicitly confirmed, and no funding approval, investment, grant, or outcome is promised.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <ConsultationCTABand />
    </>
  );
}
