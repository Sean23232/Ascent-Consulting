import { Link } from "react-router-dom";
import { brand, nav, services } from "@/data/site";
import { useStore } from "@/lib/store";
import { BrandMark, IconArrow } from "@/components/Icon";

export default function Footer() {
  const { openBooking } = useStore();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-arc relative overflow-hidden text-ivory">
      <div aria-hidden className="bg-hairline pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/[0.07] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* Top band */}
        <div className="grid gap-12 border-b border-ivory/10 py-16 lg:grid-cols-[1.15fr_2fr] lg:gap-16 lg:py-20">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Ascent Consulting — home">
              <BrandMark size={38} />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-extrabold tracking-[-0.02em]">ASCENT</span>
                <span className="eyebrow mt-1.5 text-[0.58rem] text-gold/85">Consulting</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ivory/62">{brand.positioning}</p>
            <p className="eyebrow mt-6 text-[0.6rem] text-ivory/35">
              {brand.legalName} <span className="text-gold/70">DBA</span> {brand.dba}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => openBooking("Footer")} className="btn btn-gold sweep">
                <span className="relative z-10">Book a Consultation</span>
                <IconArrow size={15} className="relative z-10" />
              </button>
              <Link to="/contact" className="btn btn-ghost-light">
                Send an Enquiry
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Footer navigation">
              <h2 className="eyebrow text-[0.6rem] text-gold/80">Navigate</h2>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="group inline-flex items-center gap-2 text-[0.92rem] text-ivory/65 transition-colors hover:text-ivory"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-gold transition-all duration-400 group-hover:w-4"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Services">
              <h2 className="eyebrow text-[0.6rem] text-gold/80">Services</h2>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services#${s.slug}`}
                      className="group inline-flex items-start gap-2 text-[0.92rem] leading-snug text-ivory/65 transition-colors hover:text-ivory"
                    >
                      <span aria-hidden className="mt-2 h-px w-0 shrink-0 bg-gold transition-all duration-400 group-hover:w-4" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="eyebrow text-[0.6rem] text-gold/80">Tools &amp; Policies</h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link to="/next-step" className="text-[0.92rem] text-ivory/65 transition-colors hover:text-ivory">
                    Find Your Next Step
                  </Link>
                </li>
                <li>
                  <Link to="/process" className="text-[0.92rem] text-ivory/65 transition-colors hover:text-ivory">
                    How We Work
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="text-[0.92rem] text-ivory/65 transition-colors hover:text-ivory">
                    Resource Centre
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-[0.92rem] text-ivory/65 transition-colors hover:text-ivory">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-use" className="text-[0.92rem] text-ivory/65 transition-colors hover:text-ivory">
                    Terms of Use
                  </Link>
                </li>
              </ul>

              <div className="mt-8 border border-ivory/12 bg-ivory/[0.03] p-4" style={{ borderRadius: 4 }}>
                <p className="eyebrow text-[0.55rem] text-ivory/40">Contact details</p>
                <p className="mt-2.5 text-[0.82rem] leading-relaxed text-ivory/58">
                  Direct telephone, email, and office details are not published until verified. Enquiries are handled
                  through the secure form.
                </p>
                <Link
                  to="/contact"
                  className="link-arrow mt-3 text-gold"
                >
                  Open the enquiry form
                  <IconArrow size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-b border-ivory/10 py-8">
          <p className="max-w-4xl text-[0.78rem] leading-relaxed text-ivory/45">
            <span className="eyebrow mr-2 text-[0.55rem] text-gold/70">Disclaimer</span>
            {brand.disclaimer} Ascent Consulting does not provide legal, tax, or regulated financial advice unless
            expressly confirmed within an agreed engagement scope.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.78rem] text-ivory/55">
            © {year} {brand.legalName} DBA {brand.dba}. All rights reserved.
          </p>
          <p className="eyebrow text-[0.58rem] text-ivory/45">
            {brand.tagline} — a conceptual journey, not a guaranteed outcome
          </p>
        </div>
      </div>

      {/* Watermark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p
          className="font-display -mb-[2.2vw] w-full text-center text-[19vw] font-extrabold leading-none tracking-[-0.05em] text-transparent"
          style={{ WebkitTextStroke: "1px rgba(198,166,107,0.14)" }}
        >
          ASCENT
        </p>
      </div>
    </footer>
  );
}
