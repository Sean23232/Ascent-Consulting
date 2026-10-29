import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useBodyLock } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { BrandMark, IconAlert, IconArrow, IconCalendar, IconCheck, IconClock, IconClose } from "@/components/Icon";

/**
 * Booking integration point.
 * When a real scheduling URL (e.g. Calendly) is supplied, set BOOKING_URL and the
 * modal embeds it directly. Until then the prototype below runs — it never
 * fabricates availability or sends confirmations.
 */
const BOOKING_URL: string | null = null;

const CONSULT_TYPES = [
  {
    id: "discovery",
    title: "Discovery Conversation",
    length: "30 minutes",
    detail: "A first look at your idea or business, your goals, and what may need attention next.",
  },
  {
    id: "setup-planning",
    title: "Setup & Planning Session",
    length: "45 minutes",
    detail: "Focused on foundational steps, structure considerations, and organizing a working plan.",
  },
  {
    id: "funding-prep",
    title: "Funding Preparation Session",
    length: "45 minutes",
    detail: "Organizing business and financial information ahead of potential funding conversations.",
  },
];

const WINDOWS = ["Morning (09:00–12:00)", "Early afternoon (12:00–15:00)", "Late afternoon (15:00–17:30)"];

function nextDays(count: number) {
  const out: { key: string; dow: string; day: string; month: string; weekend: boolean }[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i += 1) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      key: d.toISOString().slice(0, 10),
      dow: d.toLocaleDateString(undefined, { weekday: "short" }),
      day: String(d.getDate()).padStart(2, "0"),
      month: d.toLocaleDateString(undefined, { month: "short" }),
      weekend: d.getDay() === 0 || d.getDay() === 6,
    });
  }
  return out;
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

export default function BookingModal() {
  const { bookingOpen, closeBooking, bookingContext, setPrefill } = useStore();
  const navigate = useNavigate();
  useBodyLock(bookingOpen);

  const [step, setStep] = useState(0);
  const [type, setType] = useState(CONSULT_TYPES[0].id);
  const [day, setDay] = useState<string | null>(null);
  const [window_, setWindow] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const days = useMemo(() => nextDays(12), []);
  const timezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "your local time zone";
    } catch {
      return "your local time zone";
    }
  }, []);

  useEffect(() => {
    if (bookingOpen) {
      // Reopened panel always starts clean — no stale selections or details
      setStep(0);
      setTouched(false);
      setSubmitting(false);
      setType(CONSULT_TYPES[0].id);
      setDay(null);
      setWindow(null);
      setName("");
      setEmail("");
      setNotes("");
      const t = window.setTimeout(() => dialogRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [bookingOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && bookingOpen) closeBooking();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bookingOpen, closeBooking]);

  if (!bookingOpen) return null;

  const stepValid = step === 0 ? Boolean(day && window_) : name.trim().length > 1 && emailOk(email);
  const errors = {
    name: touched && name.trim().length < 2 ? "Please enter your full name." : "",
    email: touched && !emailOk(email) ? "Please enter a valid email address." : "",
  };

  const finish = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setStep(2);
    }, 850);
  };

  const sendAsEnquiry = () => {
    const chosenType = CONSULT_TYPES.find((c) => c.id === type)?.title ?? "Consultation";
    setPrefill({
      stage: "Other",
      support: ["Not sure yet"],
      message: `Consultation request (${bookingContext ?? "site"}).\nType: ${chosenType}\nPreferred window: ${day} — ${window_} (${timezone})\nName: ${name}\n\n${notes}`.trim(),
      source: "booking",
    });
    closeBooking();
    navigate("/contact");
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
      <div className="absolute inset-0 bg-navy/72 backdrop-blur-[3px]" onClick={closeBooking} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden border border-gold/25 bg-ivory shadow-[0_50px_120px_-40px_rgba(10,16,28,0.8)] rise-in"
        style={{ borderRadius: 6 }}
      >
        {/* Header */}
        <div className="bg-arc relative shrink-0 px-6 py-6 text-ivory sm:px-9">
          <div aria-hidden className="bg-hairline absolute inset-0 opacity-30" />
          <div className="relative flex items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <BrandMark size={38} />
              <div>
                <p className="eyebrow text-[0.58rem] text-gold/85">Consultation request</p>
                <h2 id="booking-title" className="display-md mt-2 text-2xl sm:text-[1.85rem]">
                  Book a Consultation
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={closeBooking}
              aria-label="Close booking panel"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/20 text-ivory/75 transition-colors hover:border-gold hover:text-gold"
              style={{ borderRadius: 3 }}
            >
              <IconClose size={18} />
            </button>
          </div>

          {BOOKING_URL ? null : (
            <p className="relative mt-5 flex items-start gap-2.5 border border-gold/30 bg-gold/[0.09] px-4 py-3 text-[0.78rem] leading-relaxed text-ivory/80" style={{ borderRadius: 4 }}>
              <IconAlert size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>
                <strong className="font-semibold text-gold-soft">Prototype interface.</strong> No live scheduling
                service is connected to this build, so the windows below are your stated preference — not confirmed
                availability — and nothing is transmitted or booked.
              </span>
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="flex shrink-0 items-center gap-2 border-b border-navy/10 bg-paper px-6 py-3.5 sm:px-9">
          {["Format & time", "Your details", "Request captured"].map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-[0.6rem] transition-colors duration-400",
                  i < step
                    ? "border-gold bg-gold text-navy"
                    : i === step
                      ? "border-navy bg-navy text-ivory"
                      : "border-navy/20 text-slateink"
                )}
                style={{ borderRadius: 999 }}
              >
                {i < step ? <IconCheck size={12} /> : i + 1}
              </span>
              <span className={cn("eyebrow hidden text-[0.55rem] sm:block", i === step ? "text-navy" : "text-slateink/70")}>
                {label}
              </span>
              {i < 2 && <span aria-hidden className={cn("h-px flex-1 transition-colors duration-500", i < step ? "bg-gold" : "bg-navy/12")} />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-9">
          {BOOKING_URL ? (
            <iframe
              title="Consultation scheduling"
              src={BOOKING_URL}
              className="h-[560px] w-full border-0"
              style={{ borderRadius: 4 }}
            />
          ) : step === 0 ? (
            <div className="space-y-8">
              <fieldset>
                <legend className="eyebrow text-[0.6rem] text-royal">01 — Consultation type</legend>
                <div className="mt-4 grid gap-3">
                  {CONSULT_TYPES.map((c) => {
                    const active = type === c.id;
                    return (
                      <label
                        key={c.id}
                        className={cn(
                          "group flex cursor-pointer items-start gap-4 border p-4 transition-all duration-300",
                          active
                            ? "border-gold bg-gold/[0.07] shadow-[0_14px_34px_-24px_rgba(198,166,107,0.9)]"
                            : "border-navy/12 bg-paper hover:border-navy/30"
                        )}
                        style={{ borderRadius: 4 }}
                      >
                        <input
                          type="radio"
                          name="consult-type"
                          value={c.id}
                          checked={active}
                          onChange={() => setType(c.id)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                            active ? "border-gold bg-gold" : "border-navy/25 bg-paper"
                          )}
                        >
                          {active && <span className="h-2 w-2 rounded-full bg-navy" />}
                        </span>
                        <span className="flex-1">
                          <span className="flex flex-wrap items-baseline gap-x-3">
                            <span className="font-display text-[1.02rem] font-bold text-charcoal">{c.title}</span>
                            <span className="eyebrow inline-flex items-center gap-1.5 text-[0.55rem] text-slateink">
                              <IconClock size={12} /> {c.length}
                            </span>
                          </span>
                          <span className="mt-1.5 block text-[0.88rem] leading-relaxed text-slateink">{c.detail}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow flex items-center gap-2 text-[0.6rem] text-royal">
                  <IconCalendar size={14} /> 02 — Preferred date
                  <span className="ml-1 normal-case tracking-normal text-slateink/80">({timezone})</span>
                </legend>
                <div className="no-scrollbar -mx-1 mt-4 flex gap-2.5 overflow-x-auto px-1 pb-2">
                  {days.map((d) => {
                    const active = day === d.key;
                    return (
                      <button
                        key={d.key}
                        type="button"
                        disabled={d.weekend}
                        aria-pressed={active}
                        onClick={() => setDay(d.key)}
                        className={cn(
                          "flex min-w-[74px] shrink-0 flex-col items-center gap-1 border px-3 py-3 transition-all duration-300",
                          d.weekend && "cursor-not-allowed border-navy/8 bg-navy/[0.02] text-slateink/40",
                          !d.weekend && active && "border-gold bg-navy text-ivory shadow-[0_16px_34px_-24px_rgba(16,26,44,1)]",
                          !d.weekend && !active && "border-navy/12 bg-paper text-charcoal hover:-translate-y-0.5 hover:border-gold/60"
                        )}
                        style={{ borderRadius: 4 }}
                      >
                        <span className="eyebrow text-[0.52rem] opacity-70">{d.dow}</span>
                        <span className="font-display text-xl font-extrabold leading-none">{d.day}</span>
                        <span className="eyebrow text-[0.5rem] opacity-60">{d.month}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[0.75rem] text-slateink">
                  Weekend windows are unavailable in this prototype. Real availability is set by the connected
                  scheduling service.
                </p>
              </fieldset>

              <fieldset>
                <legend className="eyebrow text-[0.6rem] text-royal">03 — Preferred time of day</legend>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  {WINDOWS.map((w) => {
                    const active = window_ === w;
                    return (
                      <button
                        key={w}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setWindow(w)}
                        className={cn(
                          "border px-3 py-3 text-left text-[0.82rem] font-medium transition-all duration-300",
                          active
                            ? "border-gold bg-gold/[0.1] text-charcoal"
                            : "border-navy/12 bg-paper text-slateink hover:border-navy/30 hover:text-charcoal"
                        )}
                        style={{ borderRadius: 4 }}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          ) : step === 1 ? (
            <div className="space-y-6">
              <div className="border border-navy/10 bg-paper p-4" style={{ borderRadius: 4 }}>
                <p className="eyebrow text-[0.55rem] text-gold-deep">Your selection</p>
                <p className="mt-2 font-display text-[0.98rem] font-bold text-charcoal">
                  {CONSULT_TYPES.find((c) => c.id === type)?.title}
                </p>
                <p className="mt-1 text-[0.85rem] text-slateink">
                  {day} · {window_} · {timezone}
                </p>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="link-arrow mt-3 text-[0.8rem] text-royal"
                >
                  Change selection <IconArrow size={13} />
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className="eyebrow mb-2 block text-[0.58rem] text-royal">
                    Full name <span className="text-gold-deep">*</span>
                  </label>
                  <input
                    id="bk-name"
                    className="field"
                    data-invalid={Boolean(errors.name)}
                    value={name}
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched(true)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "bk-name-err" : undefined}
                  />
                  {errors.name && (
                    <p id="bk-name-err" role="alert" className="mt-1.5 text-[0.76rem] text-[#a3442e]">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="bk-email" className="eyebrow mb-2 block text-[0.58rem] text-royal">
                    Email address <span className="text-gold-deep">*</span>
                  </label>
                  <input
                    id="bk-email"
                    type="email"
                    className="field"
                    data-invalid={Boolean(errors.email)}
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "bk-email-err" : undefined}
                  />
                  {errors.email && (
                    <p id="bk-email-err" role="alert" className="mt-1.5 text-[0.76rem] text-[#a3442e]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="bk-notes" className="eyebrow mb-2 block text-[0.58rem] text-royal">
                  What would you like to cover? <span className="tracking-normal normal-case text-slateink">(optional)</span>
                </label>
                <textarea
                  id="bk-notes"
                  rows={4}
                  className="field resize-y"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="A sentence about your business and what you want clarity on."
                />
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-gold/12 text-gold-deep">
                <IconCheck size={26} />
              </span>
              <h3 className="display-md mt-6 text-charcoal">Request captured — locally</h3>
              <p className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-slateink">
                This prototype has recorded your preferred window in this browser session only. No confirmation email
                has been sent, no calendar entry exists, and no appointment is held.
              </p>

              <div className="mx-auto mt-7 max-w-md border border-navy/12 bg-paper p-5 text-left" style={{ borderRadius: 4 }}>
                <dl className="space-y-2.5 text-[0.88rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slateink">Format</dt>
                    <dd className="text-right font-medium text-charcoal">{CONSULT_TYPES.find((c) => c.id === type)?.title}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slateink">Preferred window</dt>
                    <dd className="text-right font-medium text-charcoal">{day}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slateink">Time of day</dt>
                    <dd className="text-right font-medium text-charcoal">{window_}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slateink">Time zone</dt>
                    <dd className="text-right font-medium text-charcoal">{timezone}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button type="button" onClick={sendAsEnquiry} className="btn btn-navy sweep">
                  <span className="relative z-10">Send this as an enquiry</span>
                  <IconArrow size={15} className="relative z-10" />
                </button>
                <Link to="/next-step" onClick={closeBooking} className="btn btn-ghost-dark">
                  Find Your Next Step
                </Link>
              </div>

              <p className="mt-6 text-[0.75rem] leading-relaxed text-slateink/80">
                To make bookings live, connect Calendly (or an agreed scheduling service) by supplying a valid booking
                URL — this panel then embeds the real calendar with confirmed availability and provider-sent
                confirmations.
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {(!BOOKING_URL && step < 2) && (
          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-navy/10 bg-paper px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-9">
            <p className="text-[0.75rem] text-slateink">
              {step === 0 ? "Select a date and time of day to continue." : "We'll use these details only to arrange this conversation."}
            </p>
            <div className="flex gap-3">
              {step === 1 && (
                <button type="button" onClick={() => setStep(0)} className="btn btn-ghost-dark !py-2.5">
                  Back
                </button>
              )}
              <button
                type="button"
                disabled={!stepValid || submitting}
                onClick={() => {
                  if (step === 0) setStep(1);
                  else finish();
                }}
                className="btn btn-gold sweep"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {submitting ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-navy/30 border-t-navy" />
                      Capturing
                    </>
                  ) : step === 0 ? (
                    "Continue"
                  ) : (
                    "Capture my request"
                  )}
                  {!submitting && <IconArrow size={15} />}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
