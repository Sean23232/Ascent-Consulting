import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useStore } from "@/lib/store";
import { IconAlert, IconArrow, IconCheck } from "@/components/Icon";

/**
 * Submission endpoint.
 * Supply a form backend / CRM / email API URL (Formspree, Resend, HubSpot, custom)
 * and this component posts to it for real. Server-side validation and spam
 * filtering must be configured on that service. Until then the form runs in
 * clearly-labelled demo mode and never claims a message was delivered.
 */
const SUBMIT_ENDPOINT: string | null = null;
/** Minimum completion time — skipped when the form arrived pre-filled from the assessment or booking flow. */
const MIN_TIME_MS = 1500;

const STAGES = [
  "Exploring an idea",
  "Setting up a business",
  "Operating an existing business",
  "Exploring growth opportunities",
  "Preparing for potential funding",
  "Other",
];

const SUPPORT_AREAS = [
  "Business setup",
  "Business planning",
  "Funding preparation",
  "Business development",
  "Not sure yet",
];

type Values = {
  name: string;
  email: string;
  phone: string;
  business: string;
  stage: string;
  support: string[];
  message: string;
  consent: boolean;
  website: string; // honeypot
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  business: "",
  stage: "",
  support: [],
  message: "",
  consent: false,
  website: "",
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!emailOk(v.email)) e.email = "Enter a valid email address, e.g. name@company.com.";
  if (v.phone.trim() && v.phone.replace(/[^\d]/g, "").length < 7) e.phone = "That phone number looks incomplete.";
  if (!v.stage) e.stage = "Select the option closest to your current stage.";
  if (v.support.length === 0) e.support = "Select at least one area of support.";
  if (v.message.trim().length < 12) e.message = "Please add a little more detail (at least 12 characters).";
  if (!v.consent) e.consent = "Please confirm you have read the privacy notice.";
  return e;
}

type Status = "idle" | "sending" | "demo" | "sent" | "error" | "spam";

export default function ContactForm() {
  const { prefill, clearPrefill } = useStore();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const [copied, setCopied] = useState(false);
  const mountedAt = useRef(Date.now());
  const wasPrefilled = useRef(Object.keys(prefill ?? {}).length > 0);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Carry answers from the assessment / booking prototype into the form
  useEffect(() => {
    if (!prefill || Object.keys(prefill).length === 0) return;
    setValues((prev) => ({
      ...prev,
      stage: prefill.stage && STAGES.includes(prefill.stage) ? prefill.stage : prev.stage,
      support: prefill.support?.filter((s) => SUPPORT_AREAS.includes(s)) ?? prev.support,
      message: prefill.message ?? prev.message,
    }));
  }, [prefill]);

  const errorCount = useMemo(() => Object.keys(errors).length, [errors]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (touched[key as string]) {
      setErrors(validate({ ...values, [key]: value }));
    }
  };

  const blur = (key: keyof Values) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const toggleSupport = (area: string) => {
    const next = values.support.includes(area)
      ? values.support.filter((a) => a !== area)
      : [...values.support, area];
    set("support", next);
  };

  const composed = useMemo(
    () =>
      [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.phone ? `Phone: ${values.phone}` : "",
        values.business ? `Business: ${values.business}` : "",
        values.stage ? `Current stage: ${values.stage}` : "",
        values.support.length ? `Area of support: ${values.support.join(", ")}` : "",
        "",
        values.message,
      ]
        .filter((l) => l !== "")
        .join("\n"),
    [values]
  );

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(composed);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  const runSubmit = async () => {
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      window.setTimeout(() => summaryRef.current?.focus(), 30);
      return;
    }

    // Spam protection: honeypot + minimum completion time (waived for pre-filled enquiries)
    const tooFast = !wasPrefilled.current && Date.now() - mountedAt.current < MIN_TIME_MS;
    if (values.website.trim() !== "" || tooFast) {
      setStatus("spam");
      window.setTimeout(() => summaryRef.current?.focus(), 30);
      return;
    }

    setStatus("sending");
    setFailure("");

    if (!SUBMIT_ENDPOINT) {
      window.setTimeout(() => {
        setStatus("demo");
        clearPrefill();
        window.setTimeout(() => summaryRef.current?.focus(), 30);
      }, 900);
      return;
    }

    try {
      const res = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          business: values.business.trim(),
          stage: values.stage,
          support: values.support,
          message: values.message.trim(),
          consent: values.consent,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setStatus("sent");
      clearPrefill();
    } catch (err) {
      setStatus("error");
      setFailure(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runSubmit();
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setFailure("");
    mountedAt.current = Date.now();
  };

  const show = (key: keyof Values) => Boolean(touched[key as string] && errors[key]);

  return (
    <div className="relative">
      <form onSubmit={onSubmit} noValidate className="border border-navy/12 bg-paper p-6 sm:p-9" style={{ borderRadius: 6 }}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 pb-6">
          <div>
            <p className="eyebrow text-[0.55rem] text-royal">Enquiry form</p>
            <h2 className="mt-2 font-display text-[1.4rem] font-extrabold tracking-[-0.025em] text-charcoal">
              Tell us about your business
            </h2>
          </div>
          <span
            className={cn(
              "eyebrow inline-flex items-center gap-2 border px-3 py-1.5 text-[0.52rem]",
              SUBMIT_ENDPOINT ? "border-gold/45 bg-gold/10 text-gold-deep" : "border-[#b8862f]/40 bg-[#f6edda] text-[#8a6420]"
            )}
            style={{ borderRadius: 999 }}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", SUBMIT_ENDPOINT ? "bg-gold-deep" : "bg-[#b8862f]")} aria-hidden />
            {SUBMIT_ENDPOINT ? "Live delivery" : "Demo mode — not connected"}
          </span>
        </div>

        {/* honeypot */}
        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setValues((p) => ({ ...p, website: e.target.value }))}
          />
        </div>

        {/* Status region */}
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={cn("mt-6 outline-none", (errorCount > 0 || status !== "idle") && "block")}
        >
          {errorCount > 0 && Object.keys(touched).length > 0 && (
            <div className="flex items-start gap-3 border border-[#d9b3a6] bg-[#fdf4f1] px-4 py-3.5" style={{ borderRadius: 4 }}>
              <IconAlert size={17} className="mt-0.5 shrink-0 text-[#a3442e]" />
              <p className="text-[0.85rem] leading-relaxed text-[#8d3a26]">
                {errorCount} {errorCount === 1 ? "field needs" : "fields need"} attention before this enquiry can be
                reviewed. Errors are listed beside each field.
              </p>
            </div>
          )}

          {status === "spam" && (
            <div className="flex items-start gap-3 border border-[#d9b3a6] bg-[#fdf4f1] px-4 py-3.5" style={{ borderRadius: 4 }}>
              <IconAlert size={17} className="mt-0.5 shrink-0 text-[#a3442e]" />
              <p className="text-[0.85rem] leading-relaxed text-[#8d3a26]">
                This submission was flagged by spam protection and has not been recorded. If this was you, please wait a
                moment and complete the form normally.
              </p>
            </div>
          )}

          {status === "demo" && (
            <div className="border border-[#dcc38f] bg-[#faf4e6] p-5" style={{ borderRadius: 4 }}>
              <p className="eyebrow flex items-center gap-2 text-[0.55rem] text-[#8a6420]">
                <IconCheck size={14} /> Demo receipt — nothing was transmitted
              </p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal/85">
                This build has no connected inbox, CRM, or email service, so your enquiry has <strong>not</strong> been
                sent anywhere. The details below are exactly what would be delivered once an endpoint is configured.
              </p>
              <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap border border-navy/10 bg-paper p-4 font-mono text-[0.76rem] leading-relaxed text-charcoal/85" style={{ borderRadius: 3 }}>
                {composed}
              </pre>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={copyEnquiry} className="btn btn-navy !py-2.5 !text-[0.8rem]">
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {copied ? <IconCheck size={14} /> : null}
                    {copied ? "Copied to clipboard" : "Copy my enquiry"}
                  </span>
                </button>
                <button type="button" onClick={reset} className="btn btn-ghost-dark !py-2.5 !text-[0.8rem]">
                  Clear and start again
                </button>
              </div>
              <p className="mt-4 text-[0.75rem] leading-relaxed text-slateink">
                To go live: set <code className="font-mono text-[0.72rem] text-gold-deep">SUBMIT_ENDPOINT</code> in{" "}
                <code className="font-mono text-[0.72rem] text-gold-deep">src/components/contact/ContactForm.tsx</code>{" "}
                to your form backend URL and configure server-side validation, rate limiting, and spam filtering there.
                Never place API keys in client-side code.
              </p>
            </div>
          )}

          {status === "sent" && (
            <div className="flex items-start gap-3 border border-gold/45 bg-gold/[0.09] px-5 py-4" style={{ borderRadius: 4 }}>
              <IconCheck size={18} className="mt-0.5 shrink-0 text-gold-deep" />
              <div>
                <p className="font-display text-[1rem] font-bold text-charcoal">Enquiry delivered</p>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-slateink">
                  The connected service confirmed receipt. You will hear back through the email address you provided.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-start gap-3 border border-[#d9b3a6] bg-[#fdf4f1] px-5 py-4" style={{ borderRadius: 4 }}>
              <IconAlert size={18} className="mt-0.5 shrink-0 text-[#a3442e]" />
              <div>
                <p className="font-display text-[1rem] font-bold text-[#8d3a26]">We couldn't send that</p>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-[#8d3a26]/85">
                  The submission service reported a problem{failure ? ` (${failure})` : ""}. Your answers are still on
                  this page — please try again.
                </p>
                <button type="button" onClick={() => void runSubmit()} className="btn btn-navy mt-4 !py-2.5 !text-[0.8rem]">
                  <span className="relative z-10">Retry submission</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <fieldset disabled={status === "sending"} className="mt-7 space-y-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="name" required error={show("name") ? errors.name : undefined}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                className="field"
                data-invalid={show("name") || undefined}
                aria-invalid={show("name") || undefined}
                aria-describedby={show("name") ? "name-err" : undefined}
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                onBlur={() => blur("name")}
                placeholder="Jordan Ellis"
              />
            </Field>

            <Field label="Email address" htmlFor="email" required error={show("email") ? errors.email : undefined}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="field"
                data-invalid={show("email") || undefined}
                aria-invalid={show("email") || undefined}
                aria-describedby={show("email") ? "email-err" : undefined}
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => blur("email")}
                placeholder="you@business.com"
              />
            </Field>

            <Field label="Phone number" htmlFor="phone" error={show("phone") ? errors.phone : undefined} optional>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="field"
                data-invalid={show("phone") || undefined}
                aria-invalid={show("phone") || undefined}
                aria-describedby={show("phone") ? "phone-err" : undefined}
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                onBlur={() => blur("phone")}
                placeholder="Optional"
              />
            </Field>

            <Field label="Business name" htmlFor="business" optional>
              <input
                id="business"
                name="business"
                autoComplete="organization"
                className="field"
                value={values.business}
                onChange={(e) => set("business", e.target.value)}
                placeholder="Optional"
              />
            </Field>
          </div>

          <Field label="Current business stage" htmlFor="stage" required error={show("stage") ? errors.stage : undefined}>
            <select
              id="stage"
              name="stage"
              className={cn("field appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10", values.stage === "" && "text-[#9aa4b2]")}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none' stroke='%23647184' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m8 13 8 8 8-8'/%3E%3C/svg%3E\")",
              }}
              data-invalid={show("stage") || undefined}
              aria-invalid={show("stage") || undefined}
              aria-describedby={show("stage") ? "stage-err" : undefined}
              value={values.stage}
              onChange={(e) => set("stage", e.target.value)}
              onBlur={() => blur("stage")}
            >
              <option value="">Select your current stage…</option>
              {STAGES.map((s) => (
                <option key={s} value={s} className="text-charcoal">
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <fieldset aria-describedby={show("support") ? "support-err" : "support-hint"}>
            <legend className="eyebrow mb-1 flex items-center gap-2 text-[0.58rem] text-royal">
              Area of support <span className="text-gold-deep">*</span>
            </legend>
            <p id="support-hint" className="mb-3.5 text-[0.78rem] text-slateink">
              Select every area you would like to discuss.
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {SUPPORT_AREAS.map((area) => {
                const active = values.support.includes(area);
                return (
                  <label
                    key={area}
                    htmlFor={`support-${area.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 border px-4 py-3 text-[0.88rem] transition-all duration-300",
                      active
                        ? "border-gold bg-gold/[0.08] text-charcoal"
                        : "border-navy/12 bg-ivory/40 text-slateink hover:border-navy/30 hover:text-charcoal"
                    )}
                    style={{ borderRadius: 4 }}
                  >
                    <input
                      id={`support-${area.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      type="checkbox"
                      name="support"
                      value={area}
                      checked={active}
                      onChange={() => toggleSupport(area)}
                      onBlur={() => blur("support")}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "flex h-4.5 w-4.5 shrink-0 items-center justify-center border transition-all duration-300",
                        active ? "border-gold bg-gold text-navy" : "border-navy/28 bg-paper"
                      )}
                      style={{ borderRadius: 3, height: 18, width: 18 }}
                    >
                      {active && <IconCheck size={11} />}
                    </span>
                    {area}
                  </label>
                );
              })}
            </div>
            {show("support") && (
              <p id="support-err" className="mt-2 text-[0.78rem] text-[#a3442e]">
                {errors.support}
              </p>
            )}
          </fieldset>

          <Field label="Message" htmlFor="message" required error={show("message") ? errors.message : undefined}>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="field resize-y"
              data-invalid={show("message") || undefined}
              aria-invalid={show("message") || undefined}
              aria-describedby={show("message") ? "message-err" : "message-hint"}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              onBlur={() => blur("message")}
              placeholder="What are you working on, and what would you like clarity about?"
            />
            <p id="message-hint" className="mt-1.5 text-right font-mono text-[0.68rem] text-slateink/80">
              {values.message.trim().length} characters
            </p>
          </Field>

          <div>
            <label htmlFor="consent" className="flex cursor-pointer items-start gap-3.5">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={(e) => set("consent", e.target.checked)}
                onBlur={() => blur("consent")}
                aria-describedby={show("consent") ? "consent-err" : undefined}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-300",
                  values.consent ? "border-gold bg-gold text-navy" : show("consent") ? "border-[#a3442e] bg-[#fdf4f1]" : "border-navy/25 bg-paper"
                )}
                style={{ borderRadius: 3 }}
              >
                {values.consent && <IconCheck size={12} />}
              </span>
              <span className="text-[0.85rem] leading-relaxed text-slateink">
                I have read the{" "}
                <Link to="/privacy-policy" className="font-medium text-royal underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
                  privacy notice
                </Link>{" "}
                and agree that the details I submit may be used to respond to this enquiry. <span className="text-gold-deep">*</span>
              </span>
            </label>
            {show("consent") && (
              <p id="consent-err" className="mt-2 pl-9 text-[0.78rem] text-[#a3442e]">
                {errors.consent}
              </p>
            )}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-col gap-4 border-t border-navy/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-[0.76rem] leading-relaxed text-slateink">
            Fields marked <span className="text-gold-deep">*</span> are required. Answers are validated in your browser
            before anything is sent.
          </p>
          <button type="submit" disabled={status === "sending"} className={cn("btn btn-gold sweep", status === "sending" && "opacity-80")}>
            <span className="relative z-10 inline-flex items-center gap-2">
              {status === "sending" && (
                <span aria-hidden className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-navy/25 border-t-navy" />
              )}
              {status === "sending" ? "Preparing…" : "Send My Enquiry"}
              {status !== "sending" && <IconArrow size={16} />}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow mb-2 flex items-center gap-2 text-[0.58rem] text-royal">
        {label}
        {required && <span className="text-gold-deep">*</span>}
        {optional && <span className="normal-case tracking-normal text-slateink/80">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] text-[#a3442e]">
          <IconAlert size={13} /> {error}
        </p>
      )}
    </div>
  );
}
