import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import { quizResults, quizSteps, services } from "@/data/site";
import { useStore } from "@/lib/store";
import { Eyebrow, Reveal } from "@/components/ui";
import { IconAlert, IconArrow, IconCheck, IconCompass } from "@/components/Icon";

type ResultKey = keyof typeof quizResults;
type Answers = { stage?: string; help: string[]; priority?: string; context: string };

const STAGE_WEIGHTS: Record<string, Partial<Record<ResultKey, number>>> = {
  idea: { starting: 2 },
  "setting-up": { starting: 1, planning: 1 },
  operating: { planning: 1, preparation: 1 },
  growing: { growth: 2 },
};

const HELP_WEIGHTS: Record<string, ResultKey> = {
  setup: "starting",
  plan: "planning",
  organize: "preparation",
  explore: "preparation",
  next: "planning",
};

const PRIORITY_WEIGHTS: Record<string, Partial<Record<ResultKey, number>>> = {
  clarity: { starting: 2 },
  structure: { planning: 2 },
  readiness: { preparation: 2 },
  momentum: { growth: 2 },
};

const STAGE_TO_FORM: Record<string, string> = {
  idea: "Exploring an idea",
  "setting-up": "Setting up a business",
  operating: "Operating an existing business",
  growing: "Exploring growth opportunities",
};

const HELP_TO_FORM: Record<string, string> = {
  setup: "Business setup",
  plan: "Business planning",
  organize: "Funding preparation",
  explore: "Funding preparation",
  next: "Business development",
};

/** Deterministic, transparent scoring — no AI, no eligibility assessment. */
function resolveResult(a: Answers): ResultKey {
  const scores: Record<ResultKey, number> = { starting: 0, planning: 0, preparation: 0, growth: 0 };
  if (a.stage) {
    const w = STAGE_WEIGHTS[a.stage] ?? {};
    (Object.keys(w) as ResultKey[]).forEach((k) => (scores[k] += w[k] ?? 0));
  }
  a.help.forEach((h) => {
    const k = HELP_WEIGHTS[h];
    if (k) scores[k] += 1;
  });
  if (a.priority) {
    const w = PRIORITY_WEIGHTS[a.priority] ?? {};
    (Object.keys(w) as ResultKey[]).forEach((k) => (scores[k] += w[k] ?? 0));
  }
  const order: ResultKey[] = ["starting", "planning", "preparation", "growth"];
  return order.reduce((best, k) => (scores[k] > scores[best] ? k : best), order[0]);
}

export default function NextStepQuiz({ embedded = false }: { embedded?: boolean }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ help: [], context: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { setPrefill } = useStore();

  const totalSteps = quizSteps.length;
  const isMulti = Boolean(quizSteps[step]?.multi);
  const result = useMemo(() => resolveResult(answers), [answers]);
  const resultData = quizResults[result];
  const matchedService = services.find((s) => s.slug === resultData.serviceSlug);

  const select = (value: string) => {
    setError("");
    if (isMulti) {
      setAnswers((prev) => {
        const has = prev.help.includes(value);
        const next = has ? prev.help.filter((v) => v !== value) : [...prev.help, value];
        return { ...prev, help: next.slice(0, 3) };
      });
    } else if (step === 0) {
      setAnswers((prev) => ({ ...prev, stage: value }));
    } else {
      setAnswers((prev) => ({ ...prev, priority: value }));
    }
  };

  const selectedForStep = () => {
    if (step === 0) return answers.stage ? [answers.stage] : [];
    if (step === 1) return answers.help;
    return answers.priority ? [answers.priority] : [];
  };

  const canContinue = selectedForStep().length > 0;

  const next = () => {
    if (!canContinue) {
      setError(isMulti ? "Select at least one area." : "Select an option to continue.");
      return;
    }
    if (step < totalSteps - 1) setStep(step + 1);
    else setDone(true);
  };

  const back = () => {
    setError("");
    if (done) setDone(false);
    else if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setAnswers({ help: [], context: "" });
    setStep(0);
    setDone(false);
    setError("");
  };

  const carryToContact = () => {
    setPrefill({
      stage: STAGE_TO_FORM[answers.stage ?? ""] ?? "Other",
      support: answers.help.length
        ? Array.from(new Set(answers.help.map((h) => HELP_TO_FORM[h]).filter(Boolean)))
        : ["Not sure yet"],
      message: [
        `Next-step assessment result: ${resultData.stage}.`,
        `Current position: ${quizSteps[0].options.find((o) => o.value === answers.stage)?.label ?? "not stated"}.`,
        `Support wanted: ${answers.help.map((h) => quizSteps[1].options.find((o) => o.value === h)?.label).filter(Boolean).join(", ") || "not stated"}.`,
        `Immediate priority: ${quizSteps[2].options.find((o) => o.value === answers.priority)?.label ?? "not stated"}.`,
        answers.context.trim() ? `Context: ${answers.context.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      source: "quiz",
    });
    navigate("/contact");
  };

  const pct = done ? 100 : Math.round(((step + (canContinue ? 1 : 0)) / totalSteps) * 100);

  return (
    <div
      className={cn(
        "relative overflow-hidden border bg-paper",
        embedded ? "border-ivory/15 bg-navy-800/70" : "border-navy/12",
        "shadow-[0_40px_100px_-60px_rgba(16,26,44,0.85)]"
      )}
      style={{ borderRadius: 6 }}
    >
      {/* progress */}
      <div className={cn("border-b px-6 py-5 sm:px-9", embedded ? "border-ivory/12" : "border-navy/10")}>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className={cn("flex h-9 w-9 items-center justify-center border", embedded ? "border-gold/40 text-gold" : "border-gold/50 bg-gold/10 text-gold-deep")} style={{ borderRadius: 999 }}>
              <IconCompass size={18} />
            </span>
            <div>
              <p className={cn("eyebrow text-[0.55rem]", embedded ? "text-ivory/45" : "text-slateink")}>
                {done ? "Your result" : `Step ${step + 1} of ${totalSteps}`}
              </p>
              <p className={cn("mt-1 font-display text-[0.98rem] font-bold tracking-[-0.015em]", embedded ? "text-ivory" : "text-charcoal")}>
                {done ? resultData.stage : quizSteps[step].label}
              </p>
            </div>
          </div>
          <span className={cn("font-mono text-[0.7rem]", embedded ? "text-gold" : "text-gold-deep")}>{pct}%</span>
        </div>
        <div className={cn("mt-4 h-[3px] w-full overflow-hidden", embedded ? "bg-ivory/12" : "bg-navy/8")} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Assessment progress">
          <div className="h-full bg-gradient-to-r from-royal to-gold transition-[width] duration-600 ease-out" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="px-6 py-8 sm:px-9">
        {!done ? (
          <>
            <p className={cn("text-[0.88rem]", embedded ? "text-ivory/60" : "text-slateink")}>{quizSteps[step].hint}</p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {quizSteps[step].options.map((o) => {
                const active = selectedForStep().includes(o.value);
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => select(o.value)}
                    className={cn(
                      "group flex items-start gap-3.5 border p-4 text-left transition-all duration-300",
                      active
                        ? embedded
                          ? "border-gold bg-gold/12"
                          : "border-gold bg-gold/[0.08] shadow-[0_16px_36px_-28px_rgba(198,166,107,1)]"
                        : embedded
                          ? "border-ivory/15 hover:border-ivory/40 hover:bg-ivory/[0.04]"
                          : "border-navy/12 bg-ivory/40 hover:-translate-y-0.5 hover:border-navy/30 hover:bg-paper"
                    )}
                    style={{ borderRadius: 4 }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-300",
                        active ? "border-gold bg-gold text-navy" : embedded ? "border-ivory/30" : "border-navy/25"
                      )}
                      style={{ borderRadius: isMulti ? 3 : 999 }}
                    >
                      {active && <IconCheck size={12} />}
                    </span>
                    <span>
                      <span className={cn("block font-display text-[0.97rem] font-bold tracking-[-0.01em]", embedded ? "text-ivory" : "text-charcoal")}>
                        {o.label}
                      </span>
                      {o.detail && (
                        <span className={cn("mt-1 block text-[0.8rem] leading-relaxed", embedded ? "text-ivory/52" : "text-slateink")}>
                          {o.detail}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {step === 2 && (
              <div className="mt-6">
                <label htmlFor="quiz-context" className={cn("eyebrow mb-2 block text-[0.55rem]", embedded ? "text-ivory/50" : "text-royal")}>
                  Add context <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="quiz-context"
                  rows={3}
                  value={answers.context}
                  onChange={(e) => setAnswers((p) => ({ ...p, context: e.target.value }))}
                  className={cn("field resize-y", embedded && "field-dark")}
                  placeholder="A sentence about your situation — this carries into the enquiry form."
                />
              </div>
            )}

            {error && (
              <p role="alert" className="mt-5 flex items-center gap-2 text-[0.82rem] text-[#b4523a]">
                <IconAlert size={15} /> {error}
              </p>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: embedded ? "rgba(247,245,240,0.12)" : "rgba(16,26,44,0.1)" }}>
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className={cn("btn", embedded ? "btn-ghost-light" : "btn-ghost-dark", "self-start sm:self-auto")}
              >
                Back
              </button>
              <div className="flex items-center gap-4">
                <button type="button" onClick={restart} className={cn("text-[0.8rem] underline decoration-dotted underline-offset-4 transition-colors", embedded ? "text-ivory/45 hover:text-gold" : "text-slateink hover:text-navy")}>
                  Restart
                </button>
                <button type="button" onClick={next} className={cn("btn sweep", embedded || step === totalSteps - 1 ? "btn-gold" : "btn-navy")}>
                  <span className="relative z-10">{step === totalSteps - 1 ? "See my next step" : "Continue"}</span>
                  <IconArrow size={15} className="relative z-10" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="rise-in">
            <div className={cn("border p-6 sm:p-8", embedded ? "border-gold/30 bg-gold/[0.07]" : "border-navy/12 bg-ivory/50")} style={{ borderRadius: 5 }}>
              <p className={cn("eyebrow text-[0.55rem]", embedded ? "text-gold" : "text-gold-deep")}>Suggested starting point</p>
              <h3 className={cn("display-md mt-4", embedded ? "text-ivory" : "text-navy")}>{resultData.headline}</h3>
              <p className={cn("mt-4 max-w-xl text-[0.95rem] leading-relaxed", embedded ? "text-ivory/65" : "text-slateink")}>
                {resultData.body}
              </p>

              <div className="mt-7 grid gap-6 sm:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className={cn("eyebrow text-[0.52rem]", embedded ? "text-ivory/45" : "text-royal")}>Focus areas</p>
                  <ul className="mt-3 space-y-2.5">
                    {resultData.focus.map((f, i) => (
                      <li key={f} className={cn("flex items-start gap-3 text-[0.9rem] rise-in", embedded ? "text-ivory/80" : "text-charcoal")} style={{ animationDelay: `${100 + i * 90}ms` }}>
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold/50 bg-gold/12 text-gold-deep" style={{ borderRadius: 999 }}>
                          <IconCheck size={11} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cn("border-t pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0", embedded ? "border-ivory/12" : "border-navy/10")}>
                  <p className={cn("eyebrow text-[0.52rem]", embedded ? "text-ivory/45" : "text-royal")}>Most relevant service</p>
                  <p className={cn("mt-3 font-display text-[1.02rem] font-bold leading-snug", embedded ? "text-ivory" : "text-charcoal")}>
                    {matchedService?.title}
                  </p>
                  <Link to={`/services#${matchedService?.slug}`} className={cn("link-arrow mt-3 text-[0.82rem]", embedded ? "text-gold" : "text-royal")}>
                    Read the detail <IconArrow size={13} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={carryToContact} className="btn btn-navy sweep">
                <span className="relative z-10">Discuss My Next Steps</span>
                <IconArrow size={15} className="relative z-10" />
              </button>
              <button type="button" onClick={back} className={cn("btn", embedded ? "btn-ghost-light" : "btn-ghost-dark")}>
                Adjust my answers
              </button>
              <button type="button" onClick={restart} className={cn("btn", embedded ? "btn-ghost-light" : "btn-ghost-dark")}>
                Start over
              </button>
            </div>

            <p className={cn("mt-6 flex items-start gap-2.5 text-[0.76rem] leading-relaxed", embedded ? "text-ivory/45" : "text-slateink")}>
              <IconAlert size={15} className="mt-0.5 shrink-0 text-gold-deep" />
              Informational only. This questionnaire does not assess creditworthiness, confirm eligibility, or
              guarantee funding. Results are generated from fixed rules based on your selections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function QuizTeaser() {
  return (
    <section className="relative overflow-hidden bg-ivory-deep py-16 sm:py-20">
      <div aria-hidden className="bg-hairline-light absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
        <Reveal>
          <div>
            <Eyebrow>Interactive tool</Eyebrow>
            <h2 className="display-md mt-4 max-w-xl text-charcoal">
              Not sure which stage you're at? Answer three questions.
            </h2>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-slateink">
              “Find Your Next Step” uses fixed, transparent rules to suggest a starting point and carries your answers
              into the enquiry form — no credit assessment, no funding promises.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="#/next-step" className="btn btn-navy sweep">
              <span className="relative z-10">Find Your Next Step</span>
              <IconArrow size={15} className="relative z-10" />
            </a>
            <span className="eyebrow self-center text-[0.52rem] text-slateink/70 lg:mt-1">3 questions · ~1 minute</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
