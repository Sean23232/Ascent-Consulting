import { Link } from "react-router-dom";
import { brand } from "@/data/site";
import { usePageMeta } from "@/lib/hooks";
import PageHero from "@/components/PageHero";
import { ButtonLink, Eyebrow, Reveal, Section } from "@/components/ui";
import { IconAlert, IconArrow } from "@/components/Icon";

type Clause = { heading: string; body: string[] };

function LegalLayout({
  eyebrow,
  title,
  intro,
  clauses,
  metaLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  clauses: Clause[];
  metaLabel: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        breadcrumb={eyebrow}
        title={title}
        lede={intro}
        meta={[
          { label: "Applies to", value: "This website" },
          { label: "Status", value: "Template — pending legal review" },
          { label: "Trading as", value: brand.dba },
        ]}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Contents</Eyebrow>
            <nav aria-label={`${metaLabel} contents`} className="mt-5">
              <ol className="space-y-1">
                {clauses.map((c, i) => (
                  <li key={c.heading}>
                    <Link
                      to={`/legal-anchor-${i}`}
                      replace
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(`clause-${i}`)
                          ?.scrollIntoView({
                            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                            block: "start",
                          });
                      }}
                      className="group flex items-baseline gap-3 py-1.5 text-[0.86rem] text-slateink transition-colors hover:text-navy"
                    >
                      <span className="font-mono text-[0.62rem] text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                      {c.heading}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-8 flex items-start gap-3 border border-gold/28 bg-gold/[0.06] p-5" style={{ borderRadius: 5 }}>
              <IconAlert size={16} className="mt-0.5 shrink-0 text-gold-deep" />
              <p className="text-[0.78rem] leading-relaxed text-charcoal/80">
                This document is a starting template. It must be reviewed and adapted for the company's actual
                services, data processing, and jurisdiction before launch.
              </p>
            </div>

            <ButtonLink to="/contact" tone="ghost-dark" size="sm" className="mt-5 w-full">
              Ask a question
            </ButtonLink>
          </aside>

          <div className="max-w-2xl">
            {clauses.map((c, i) => (
              <Reveal key={c.heading} delay={i * 40}>
                <section id={`clause-${i}`} className="scroll-mt-28 border-b border-navy/10 py-8 first:pt-0 last:border-b-0">
                  <h2 className="flex items-baseline gap-4 font-display text-[1.22rem] font-extrabold tracking-[-0.022em] text-charcoal">
                    <span className="font-mono text-[0.7rem] font-medium text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                    {c.heading}
                  </h2>
                  {c.body.map((p, j) => (
                    <p key={j} className="mt-3.5 text-[0.95rem] leading-[1.75] text-slateink">
                      {p}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}

            <div className="mt-10 flex flex-col gap-3 border border-navy/12 bg-ivory/60 p-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderRadius: 5 }}>
              <p className="max-w-sm text-[0.88rem] leading-relaxed text-slateink">
                Questions about how this applies to your enquiry? Ask directly and we will answer plainly.
              </p>
              <Link to="/contact" className="btn btn-navy sweep shrink-0">
                <span className="relative z-10">Contact us</span>
                <IconArrow size={15} className="relative z-10" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

const PRIVACY: Clause[] = [
  {
    heading: "What this notice covers",
    body: [
      `This notice explains how personal information submitted through this website is handled by ${brand.legalName}, trading as ${brand.dba}. It applies to the enquiry form, the consultation booking panel, and the “Find Your Next Step” assessment.`,
      "It does not cover information you provide to third-party services that may later be connected to this site, such as a scheduling provider or a form delivery service. Those services operate under their own notices.",
    ],
  },
  {
    heading: "Information collected",
    body: [
      "The enquiry form collects your name, email address, optional phone number, optional business name, your selected business stage, selected areas of support, the message you write, and your consent confirmation.",
      "The booking panel collects a consultation format preference, a preferred date and time of day, your name, email address, and any notes you add. The assessment tool stores your answers only for the duration of the session, in your browser.",
    ],
  },
  {
    heading: "Current build status",
    body: [
      "This website is currently a prototype. No form backend, CRM, or email delivery service is connected, so submissions are not transmitted or stored on any server. The enquiry form displays what would have been sent and offers a copy function; the booking panel records a preference locally and states clearly that no appointment has been made.",
      "When a delivery service is connected, this section will be updated to name that service, describe where data is stored, and state the retention period.",
    ],
  },
  {
    heading: "How information would be used",
    body: [
      "Submitted information would be used only to understand your enquiry, respond to it, arrange a consultation, and agree the scope of any engagement. It would not be sold, rented, or used for unrelated marketing without a separate, explicit consent step.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This prototype does not set advertising or tracking cookies and does not load third-party analytics. Fonts and imagery are retrieved from content delivery networks, which may log standard request data such as IP address.",
      "If analytics are introduced later, they will be disclosed here before use, and any consent-required processing will be gated behind an explicit choice.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on your jurisdiction, you may have rights to access, correct, delete, restrict, or port your personal information, and to object to certain processing. You may also withdraw consent at any time without affecting prior processing.",
      "Because no submissions are currently transmitted or stored, there is no personal data held by this prototype to exercise those rights against. Once a live system is connected, this section will set out how to make a request and the response timeframe that applies.",
    ],
  },
  {
    heading: "Retention and security",
    body: [
      "Retention periods, access controls, and any international data transfers will be documented here once a delivery service and storage location are confirmed. Credentials and API keys are never placed in client-side code.",
    ],
  },
  {
    heading: "Contact and review",
    body: [
      "Verified contact details for privacy questions are not yet published. Until they are, use the enquiry form route described on the contact page once a backend is connected.",
      "This notice will be reviewed before launch and whenever the site's data processing changes.",
    ],
  },
];

const TERMS: Clause[] = [
  {
    heading: "About this website",
    body: [
      `This website presents the services of ${brand.legalName}, trading as ${brand.dba}. It is provided for general information and to help prospective clients understand the support on offer.`,
      "Content is a working prototype in places. Sections describing services, audiences, and resources that are pending confirmation are labelled as such.",
    ],
  },
  {
    heading: "No advice, no guarantee",
    body: [
      "Nothing on this website constitutes legal, tax, accounting, investment, or regulated financial advice. Information is general in nature and does not take account of your individual circumstances.",
      `${brand.disclaimer}`,
      "No loan, investment, grant, or other funding outcome is promised, implied, or guaranteed anywhere on this site.",
    ],
  },
  {
    heading: "Scope of engagement",
    body: [
      "Any support provided is subject to a scope agreed in writing before work begins. Descriptions of services on this website outline proposed areas of support and do not by themselves form a contract or a commitment to deliver a particular task.",
    ],
  },
  {
    heading: "Prototype features",
    body: [
      "The enquiry form, consultation booking panel, and assessment tool are functional prototypes. The booking panel does not hold appointments, does not check real availability, and does not send confirmations. The enquiry form does not deliver messages until a backend is connected, and it states this clearly rather than showing a false success message.",
    ],
  },
  {
    heading: "Use of this website",
    body: [
      "You agree to use this website lawfully and not to attempt to disrupt its operation, submit automated or fraudulent enquiries, scrape content at scale, or misrepresent your identity when making an enquiry.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The brand identity, layout, written content, and custom iconography on this site are the property of the company. Photography is used under licence from its stock provider. Content may not be reproduced in whole or in part without permission.",
    ],
  },
  {
    heading: "Third-party links and services",
    body: [
      "Where external services are later integrated — for example a scheduling provider — their own terms apply to your use of them, and this site does not control or endorse their content.",
    ],
  },
  {
    heading: "Liability and changes",
    body: [
      "To the extent permitted by law, no liability is accepted for losses arising from reliance on general information published here. These terms may be updated as the site and its services develop; the current version will always be published on this page.",
    ],
  },
];

export function PrivacyPolicy() {
  usePageMeta(
    "Privacy Policy | Ascent Consulting",
    "How personal information submitted through the Ascent Consulting website is handled — including the current prototype status of forms and booking."
  );
  return (
    <LegalLayout
      eyebrow="Privacy policy"
      title="Privacy Notice"
      intro="A plain-language explanation of what this site collects, what it currently does with it, and what will change once a delivery service is connected."
      clauses={PRIVACY}
      metaLabel="Privacy notice"
    />
  );
}

export function TermsOfUse() {
  usePageMeta(
    "Terms of Use | Ascent Consulting",
    "Terms governing use of the Ascent Consulting website, including the limits of general information and prototype functionality."
  );
  return (
    <LegalLayout
      eyebrow="Terms of use"
      title="Terms of Use"
      intro="The conditions that apply when using this website, including clear statements about what is and is not promised."
      clauses={TERMS}
      metaLabel="Terms of use"
    />
  );
}
