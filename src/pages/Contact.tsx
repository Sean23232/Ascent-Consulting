import { Link } from "react-router-dom";
import { brand, px } from "@/data/site";
import { usePageMeta } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import Faq from "@/components/Faq";
import { ButtonLink, Eyebrow, Reveal, Section } from "@/components/ui";
import { IconAlert, IconArrow, IconCalendar, IconCheck, IconDoc } from "@/components/Icon";

const NEXT_STEPS = [
  {
    n: "01",
    title: "Your enquiry is reviewed",
    body: "The details you share are read against the stage you selected, so the response addresses your actual position rather than a generic list.",
  },
  {
    n: "02",
    title: "A conversation is arranged",
    body: "The next step is usually a consultation — either through the booking panel or by reply to the email address you provided.",
  },
  {
    n: "03",
    title: "Scope is agreed in writing",
    body: "Before any work begins, what is included, what is excluded, and what you would need to prepare are set out clearly.",
  },
];

export default function Contact() {
  usePageMeta(
    "Contact | Ascent Consulting — Tell Us About Your Business",
    "Share a few details about your business and what you want to accomplish. Validated enquiry form, consultation booking, and clear next steps."
  );
  const { openBooking } = useStore();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        breadcrumb="Contact"
        title={
          <>
            Tell Us About <span className="text-gold">Your Business</span>.
          </>
        }
        lede="Share a few details about your business and what you're looking to accomplish. We'll use this information to understand your enquiry and determine the appropriate next step."
        image={px(30092263, 900, 1100)}
        imageAlt="Modern illuminated building facade at night"
        meta={[
          { label: "Response route", value: "Enquiry form or booking" },
          { label: "Required fields", value: "Name, email, stage, message" },
          { label: "Form status", value: "Prototype — demo mode" },
        ]}
        ctas={
          <>
            <button type="button" onClick={() => openBooking("Contact page")} className="btn btn-gold sweep">
              <span className="relative z-10 inline-flex items-center gap-2">
                <IconCalendar size={16} /> Book a Consultation
              </span>
            </button>
            <ButtonLink to="/next-step" tone="ghost-light">
              Take the 3-step assessment
            </ButtonLink>
          </>
        }
      />

      <Section tone="light" id="enquiry">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={100}>
              <div className="border border-navy/12 bg-paper p-6" style={{ borderRadius: 5 }}>
                <Eyebrow>What happens next</Eyebrow>
                <ol className="mt-6 space-y-6">
                  {NEXT_STEPS.map((s) => (
                    <li key={s.n} className="group relative flex gap-4">
                      <span className="flex flex-col items-center">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-navy/15 font-mono text-[0.64rem] text-royal transition-colors duration-400 group-hover:border-gold group-hover:text-gold-deep" style={{ borderRadius: 999 }}>
                          {s.n}
                        </span>
                        <span aria-hidden className="mt-1.5 w-px flex-1 bg-navy/10" />
                      </span>
                      <span className="pb-1">
                        <span className="block font-display text-[1rem] font-bold tracking-[-0.015em] text-charcoal">{s.title}</span>
                        <span className="mt-1.5 block text-[0.86rem] leading-relaxed text-slateink">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="flex items-start gap-3 border border-[#dcc38f] bg-[#faf4e6] p-5" style={{ borderRadius: 5 }}>
                <IconAlert size={17} className="mt-0.5 shrink-0 text-[#8a6420]" />
                <div>
                  <p className="font-display text-[0.95rem] font-bold text-charcoal">This is a demo form</p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-charcoal/78">
                    No inbox, CRM, or email service is connected to this build, so submitting will not deliver your
                    enquiry. You will be shown exactly what would have been sent, with an option to copy it. Connection
                    details can be supplied at any point.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={210}>
              <div className="bg-arc relative overflow-hidden p-6 text-ivory" style={{ borderRadius: 5 }}>
                <div aria-hidden className="bg-hairline absolute inset-0 opacity-30" />
                <div className="relative">
                  <span className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold" style={{ borderRadius: 3 }}>
                    <IconCalendar size={19} />
                  </span>
                  <h2 className="mt-5 font-display text-[1.15rem] font-extrabold tracking-[-0.02em]">
                    Prefer a scheduled conversation?
                  </h2>
                  <p className="mt-2.5 text-[0.86rem] leading-relaxed text-ivory/60">
                    The booking panel lets you choose a consultation format and a preferred window. It runs as a
                    prototype until a live scheduling service is connected.
                  </p>
                  <button type="button" onClick={() => openBooking("Contact sidebar")} className="btn btn-gold sweep mt-5 w-full">
                    <span className="relative z-10">Open booking panel</span>
                    <IconArrow size={15} className="relative z-10" />
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <ul className="space-y-3 border border-navy/10 bg-ivory/60 p-5 text-[0.82rem] leading-relaxed text-slateink" style={{ borderRadius: 5 }}>
                <li className="flex items-start gap-2.5">
                  <IconCheck size={14} className="mt-0.5 shrink-0 text-gold-deep" />
                  Details are validated in your browser before submission.
                </li>
                <li className="flex items-start gap-2.5">
                  <IconDoc size={14} className="mt-0.5 shrink-0 text-gold-deep" />
                  <span>
                    Handled per the{" "}
                    <Link to="/privacy-policy" className="font-medium text-royal underline decoration-gold/50 underline-offset-4 hover:text-gold-deep">
                      privacy notice
                    </Link>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <IconAlert size={14} className="mt-0.5 shrink-0 text-gold-deep" />
                  Telephone, email, and office details are not published until verified.
                </li>
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <p className="px-1 text-[0.74rem] leading-relaxed text-slateink/85">{brand.disclaimer}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Faq />
    </>
  );
}
