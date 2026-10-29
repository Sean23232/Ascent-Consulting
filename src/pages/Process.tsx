import { processSteps, px } from "@/data/site";
import { usePageMeta, useScrollProgress } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import PageHero from "@/components/PageHero";
import ConsultationCTABand from "@/components/ServiceCtaBand";
import { ButtonLink, Eyebrow, Reveal, Section } from "@/components/ui";
import { IconAlert, IconArrow } from "@/components/Icon";

const OUTCOMES = [
  "A shared picture of the business and its goals",
  "A ranked list of priorities and open questions",
  "A written proposed direction with sequence",
  "Agreed tasks completed to the engagement scope",
  "A refreshed plan reflecting current reality",
];

export default function Process() {
  usePageMeta(
    "Our Process | Ascent Consulting — How We Work Together",
    "Five stages of working with Ascent Consulting: initial conversation, understanding needs, outlining next steps, working through priorities, and reviewing as the business changes."
  );
  const { openBooking } = useStore();
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <>
      <PageHero
        eyebrow="Our process"
        breadcrumb="Our Process"
        title={
          <>
            A Clearer Way to <span className="text-gold">Move Forward</span>.
          </>
        }
        lede="Five stages, applied in order but never rigidly. Each one produces something concrete you can act on, and the scope of work is agreed with you before it begins."
        image={px(39205090, 1000, 900)}
        imageAlt="Team collaborating on business planning in a modern office"
        meta={[
          { label: "Stages", value: "Five, sequential" },
          { label: "Starting point", value: "Any stage" },
          { label: "Scope", value: "Agreed per engagement" },
        ]}
        ctas={
          <>
            <button type="button" onClick={() => openBooking("Process page")} className="btn btn-gold sweep">
              <span className="relative z-10">Let's Discuss Your Goals</span>
              <IconArrow size={16} className="relative z-10" />
            </button>
            <ButtonLink to="/services" tone="ghost-light">
              Review the services
            </ButtonLink>
          </>
        }
      />

      <Section tone="light" id="process-timeline">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Working together</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display-md mt-5 text-charcoal">
                Every stage ends with something you can use.
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-slateink">
                The process below describes how an engagement typically begins and develops. It is not a fixed-price
                package, and it is not identical for every business — the depth of each stage depends on where you
                start and what you need.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 border border-navy/12 bg-paper p-6" style={{ borderRadius: 5 }}>
                <p className="eyebrow text-[0.55rem] text-royal">Progress through the page</p>
                <div className="mt-4 h-[3px] w-full overflow-hidden bg-navy/8">
                  <div
                    className="h-full bg-gradient-to-r from-royal to-gold transition-[width] duration-300"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <p className="mt-3 font-mono text-[0.7rem] text-slateink">
                  Stage {Math.min(5, Math.max(1, Math.ceil(progress * 5)))} of 05
                </p>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-6 flex items-start gap-3 border border-gold/28 bg-gold/[0.06] p-5" style={{ borderRadius: 5 }}>
                <IconAlert size={16} className="mt-0.5 shrink-0 text-gold-deep" />
                <p className="text-[0.8rem] leading-relaxed text-charcoal/80">
                  Stage four covers only the tasks included in your agreed engagement scope. Nothing is assumed to be
                  included, and no funding outcome is promised at any stage.
                </p>
              </div>
            </Reveal>
          </div>

          <div ref={ref} className="relative">
            <div aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-navy/12">
              <div
                className="w-px bg-gradient-to-b from-gold to-royal transition-[height] duration-300"
                style={{ height: `${Math.min(100, progress * 130)}%` }}
              />
            </div>

            <ol className="space-y-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.n} delay={i * 90}>
                  <li className="group relative flex gap-7">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center border border-navy/14 bg-paper font-mono text-[0.82rem] text-royal transition-all duration-500 group-hover:border-gold group-hover:bg-navy group-hover:text-gold" style={{ borderRadius: 999 }}>
                      {step.n}
                    </span>
                    <div className="flex-1 border border-navy/10 bg-paper p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold/40 group-hover:shadow-[0_28px_64px_-46px_rgba(16,26,44,0.75)] sm:p-7" style={{ borderRadius: 5 }}>
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-display text-[1.2rem] font-extrabold tracking-[-0.022em] text-charcoal">
                          {step.title}
                        </h3>
                        <span className="eyebrow text-[0.5rem] text-slateink/70">Stage {step.n}</span>
                      </div>
                      <p className="mt-3 text-[0.93rem] leading-relaxed text-slateink">{step.body}</p>
                      <p className="mt-5 flex items-start gap-2.5 border-t border-navy/8 pt-4 text-[0.8rem] leading-snug text-charcoal/80">
                        <span className="eyebrow mt-0.5 shrink-0 text-[0.5rem] text-gold-deep">Outcome</span>
                        {OUTCOMES[i]}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <ConsultationCTABand />
    </>
  );
}
