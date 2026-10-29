import { px } from "@/data/site";
import { usePageMeta } from "@/lib/hooks";
import PageHero from "@/components/PageHero";
import ConsultationCTABand from "@/components/ServiceCtaBand";
import NextStepQuiz from "@/components/quiz/NextStepQuiz";
import { ButtonLink, Eyebrow, Reveal, Section } from "@/components/ui";
import { IconAlert, IconArrow } from "@/components/Icon";

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Three questions",
    body: "Where you are today, what you would like help with, and what your immediate priority is.",
  },
  {
    n: "02",
    title: "Fixed rules, not predictions",
    body: "Your selections are scored against a published set of weights. The same answers always produce the same result.",
  },
  {
    n: "03",
    title: "Answers carried forward",
    body: "Continue to the enquiry form and your responses arrive pre-filled — you never type them twice.",
  },
];

const NOT_INCLUDED = [
  "It does not assess creditworthiness or financial standing",
  "It does not confirm eligibility for any product or programme",
  "It does not guarantee funding, investment, loans, or grants",
  "It does not replace legal, tax, or regulated financial advice",
];

export default function NextStep() {
  usePageMeta(
    "Find Your Next Step | Ascent Consulting — Guided Assessment",
    "A three-question guided assessment that suggests where to start — business setup, planning, funding preparation, or growth — and carries your answers into the enquiry form."
  );

  return (
    <>
      <PageHero
        eyebrow="Interactive tool"
        breadcrumb="Find Your Next Step"
        title={
          <>
            Find Your <span className="text-gold">Next Step</span>.
          </>
        }
        lede="A short, guided assessment that suggests which part of the journey deserves attention first. Informational only — it does not assess creditworthiness, confirm eligibility, or guarantee funding."
        image={px(12748729, 900, 1100)}
        imageAlt="Modern building with blue lighting at night"
        meta={[
          { label: "Questions", value: "Three" },
          { label: "Time", value: "Around one minute" },
          { label: "Method", value: "Deterministic rules" },
        ]}
        ctas={
          <>
            <button
              type="button"
              onClick={() =>
                document.getElementById("assessment")?.scrollIntoView({
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                  block: "start",
                })
              }
              className="btn btn-gold sweep"
            >
              <span className="relative z-10">Start the assessment</span>
              <IconArrow size={16} className="relative z-10" />
            </button>
            <ButtonLink to="/services" tone="ghost-light">
              Browse services instead
            </ButtonLink>
          </>
        }
      />

      <Section tone="light" id="assessment" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <div className="scroll-mt-28">
            <Reveal>
              <NextStepQuiz />
            </Reveal>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={100}>
              <div>
                <Eyebrow>How it works</Eyebrow>
                <ol className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
                  {HOW_IT_WORKS.map((h) => (
                    <li key={h.n} className="group py-5">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[0.68rem] text-gold-deep transition-transform duration-400 group-hover:-translate-y-0.5">{h.n}</span>
                        <h2 className="font-display text-[1.02rem] font-bold tracking-[-0.015em] text-charcoal">{h.title}</h2>
                      </div>
                      <p className="mt-2 pl-9 text-[0.88rem] leading-relaxed text-slateink">{h.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={170}>
              <div className="border border-navy/12 bg-paper p-6" style={{ borderRadius: 5 }}>
                <p className="eyebrow flex items-center gap-2 text-[0.55rem] text-royal">
                  <IconAlert size={14} className="text-gold-deep" /> What this tool does not do
                </p>
                <ul className="mt-4 space-y-2.5">
                  {NOT_INCLUDED.map((n) => (
                    <li key={n} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-slateink">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-navy/35" />
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-navy/10 pt-4 text-[0.78rem] leading-relaxed text-slateink/90">
                  Results are suggestions about where to begin a conversation — not advice, not an assessment of your
                  business, and not a funding recommendation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="border-l-2 border-gold bg-ivory-deep/70 p-6" style={{ borderRadius: 4 }}>
                <p className="font-display text-[1.02rem] font-bold leading-snug text-navy">
                  Already know what you need?
                </p>
                <p className="mt-2.5 text-[0.86rem] leading-relaxed text-slateink">
                  Skip the assessment and go straight to the service that fits, or open the booking panel.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <ButtonLink to="/services" tone="navy" size="sm">
                    View services
                  </ButtonLink>
                  <ButtonLink to="/contact" tone="ghost-dark" size="sm">
                    Send an enquiry
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <ConsultationCTABand />
    </>
  );
}
