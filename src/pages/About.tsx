import { brand, px } from "@/data/site";
import { usePageMeta } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import PageHero from "@/components/PageHero";
import ConsultationCTABand from "@/components/ServiceCtaBand";
import { ButtonLink, Eyebrow, Reveal, Section } from "@/components/ui";
import { IconArrow } from "@/components/Icon";

const PRINCIPLES = [
  {
    n: "01",
    title: "Clarity before commitment",
    body: "Every stage is explained in plain language — what is covered, what is not, and what you would need to prepare. If something cannot be answered confidently, it is flagged rather than glossed over.",
  },
  {
    n: "02",
    title: "Transparency about limits",
    body: "No outcome is guaranteed, and none is implied. Funding availability, eligibility, and approval sit with each provider; legal, tax, and regulated matters sit with qualified professionals.",
  },
  {
    n: "03",
    title: "Practical planning",
    body: "Work is organized into sequences you can follow, with dependencies made visible. A plan that cannot be acted on next week is treated as unfinished.",
  },
  {
    n: "04",
    title: "Goal alignment",
    body: "The starting point is always what the owner wants the business to become. Priorities are ranked against that goal, not against a generic template.",
  },
];

const JOURNEY = [
  { word: "Idea", note: "A concept, an ambition, a first customer conversation." },
  { word: "Structure", note: "The foundational setup decisions that make it a business." },
  { word: "Plan", note: "Direction, operations, and priorities written down." },
  { word: "Preparation", note: "Information organized for the conversations ahead." },
  { word: "Funding", note: "Routes explored realistically — never promised." },
];

export default function About() {
  usePageMeta(
    "About | Ascent Consulting — Idea to Funding, Explained",
    "How Ascent Consulting approaches business support: clarity, transparency, practical planning, and goal alignment — from foundational setup through funding preparation."
  );
  const { openBooking } = useStore();

  return (
    <>
      <PageHero
        eyebrow="About"
        breadcrumb="About"
        title={
          <>
            Helping Business Owners Navigate <span className="text-gold">What's Next</span>.
          </>
        }
        lede="Building a business involves a series of important decisions. Ascent Consulting is positioned around helping business owners bring structure to that journey — from foundational setup and planning to preparing for potential funding opportunities."
        image={px(15687370, 900, 1200)}
        imageAlt="Curved modern architectural facade at dusk"
        meta={[
          { label: "Positioning", value: brand.tagline },
          { label: "Trading as", value: `${brand.legalName} DBA ${brand.dba}` },
          { label: "Focus", value: "Setup → funding preparation" },
        ]}
      />

      {/* Company overview */}
      <Section tone="light">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Company overview</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-md mt-5 text-charcoal">
                A consulting practice built around a single journey.
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <div className="mt-6 space-y-5 text-[0.98rem] leading-relaxed text-slateink">
                <p>
                  Ascent Consulting operates as the trading name of {brand.legalName}. The practice exists to help
                  business owners move deliberately from one stage to the next — establishing the business, planning
                  its direction, and preparing the information a funding conversation would require.
                </p>
                <p>
                  Most owners do not need more information. They need order: which decision comes first, which depends
                  on another, and what would make the next conversation credible. That is the work this practice is
                  organized around.
                </p>
                <p>
                  Support is offered as a connected journey rather than isolated tasks, so setup decisions are made
                  with planning in view, and planning is done with preparation in view.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="relative">
            <div className="group relative overflow-hidden bg-navy" style={{ borderRadius: 5 }}>
              <img
                src={px(5717672, 900, 1000)}
                alt="Business owner reviewing planning documents at a desk"
                loading="lazy"
                width={900}
                height={1000}
                className="img-zoom h-full max-h-[520px] w-full object-cover opacity-90"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="eyebrow text-[0.55rem] text-gold/85">Operating belief</p>
                <p className="mt-3 font-display text-[1.15rem] font-bold leading-snug text-ivory">
                  Structure is what turns ambition into a business that can explain itself.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Idea to Funding meaning */}
      <Section tone="dark" className="bg-arc">
        <div aria-hidden className="bg-hairline absolute inset-0 opacity-30" />
        <div className="relative">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="light">The meaning behind “Idea to Funding”</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-md mt-5 text-ivory">
                A phrase about sequence — not a promise about outcome.
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="lede mt-5 text-ivory/62">
                “Idea to Funding” describes the span of the journey this practice supports. It is deliberately not a
                claim that funding follows automatically, or that every business travels the same route.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-ivory/14 bg-ivory/14 md:grid-cols-5" style={{ borderRadius: 5 }}>
            {JOURNEY.map((j, i) => (
              <Reveal key={j.word} delay={i * 90}>
                <div className="group h-full bg-navy-800/85 p-6 transition-colors duration-500 hover:bg-royal/40">
                  <span className="font-mono text-[0.62rem] text-gold/70">0{i + 1}</span>
                  <p className="mt-4 font-display text-[1.08rem] font-extrabold tracking-[-0.02em] text-ivory">{j.word}</p>
                  <p className="mt-2.5 text-[0.83rem] leading-relaxed text-ivory/55">{j.note}</p>
                  <span aria-hidden className="mt-5 block h-px w-6 bg-gold/60 transition-all duration-500 group-hover:w-12" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Approach / principles */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Our approach</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-md mt-5 text-charcoal">Four principles that shape the work.</h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-slateink">
                These are working principles, not marketing claims. They determine how conversations are structured,
                how scope is agreed, and how progress is reviewed.
              </p>
            </Reveal>
          </div>

          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <div className="group grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <span className="font-mono text-[0.72rem] text-gold-deep transition-transform duration-500 group-hover:-translate-y-0.5">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.22rem] font-extrabold tracking-[-0.022em] text-charcoal">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[0.94rem] leading-relaxed text-slateink">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Verified-information placeholders */}
      <Section tone="ivory">
        <Reveal>
          <Eyebrow>Pending verified information</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 className="display-md mt-5 max-w-2xl text-charcoal">
            Sections held open until confirmed details are supplied.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-slateink">
            Nothing on this page has been invented. Rather than publish unverified founder biographies, team
            profiles, credentials, milestones, or client results, those areas are left visibly open.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { title: "Founder & team", items: ["Biography and background", "Roles and responsibilities", "Photography"] },
            { title: "Credentials & registration", items: ["Business registration details", "Professional memberships", "Jurisdiction of operation"] },
            { title: "Proof & history", items: ["Client testimonials", "Engagement history", "Verified outcomes"] },
          ].map((block, i) => (
            <Reveal key={block.title} delay={i * 100}>
              <div
                className="h-full border border-dashed border-navy/25 bg-paper/60 p-6"
                style={{ borderRadius: 5 }}
              >
                <p className="eyebrow text-[0.55rem] text-gold-deep">Awaiting input</p>
                <h3 className="mt-3 font-display text-[1.05rem] font-bold text-charcoal">{block.title}</h3>
                <ul className="mt-4 space-y-2">
                  {block.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-slateink">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-navy/30" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-col gap-4 border-l-2 border-gold bg-paper p-7 sm:flex-row sm:items-center sm:justify-between" style={{ borderRadius: 4 }}>
            <p className="max-w-xl font-display text-[1.12rem] font-bold leading-snug tracking-[-0.02em] text-navy">
              Want to know how this approach would apply to your business?
            </p>
            <div className="flex shrink-0 gap-3">
              <button type="button" onClick={() => openBooking("About page")} className="btn btn-navy sweep">
                <span className="relative z-10">Discuss your business</span>
                <IconArrow size={15} className="relative z-10" />
              </button>
              <ButtonLink to="/resources" tone="ghost-dark" size="sm">
                Resources
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      <ConsultationCTABand />
    </>
  );
}
