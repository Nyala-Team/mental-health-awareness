"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import type { RefObject } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import {
  AnswerMap,
  assessmentQuestions,
  scenarios,
  summarizeSession,
} from "@/lib/scenario-engine"
import { evidenceToLearning, nationalEvidenceFacts } from "@/lib/evidence-context"

type Stage = "intro" | "baseline" | "scenario" | "post" | "summary"

type AssessmentFormProps = {
  label: string
  title: string
  description: string
  answers: AnswerMap
  headingRef: RefObject<HTMLHeadingElement | null>
  onChange: (questionId: string, optionId: string) => void
  onSubmit: () => void
  submitLabel: string
}

function AssessmentForm({
  label,
  title,
  description,
  answers,
  headingRef,
  onChange,
  onSubmit,
  submitLabel,
}: AssessmentFormProps) {
  const complete = assessmentQuestions.every((question) => answers[question.id])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (complete) onSubmit()
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{label}</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 font-display text-3xl font-extrabold text-foreground sm:text-4xl"
        >
          {title}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {assessmentQuestions.map((question, index) => (
        <fieldset key={question.id} className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6">
          <legend className="px-1 font-display text-base font-bold text-foreground sm:text-lg">
            {index + 1}. {question.prompt}
          </legend>
          <div className="mt-4 space-y-3">
            {question.options.map((option) => {
              const checked = answers[question.id] === option.id
              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                    checked
                      ? "border-primary bg-primary/10"
                      : "border-border/70 bg-background hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={checked}
                    onChange={() => onChange(question.id, option.id)}
                    className="mt-1 h-4 w-4 accent-[var(--primary)]"
                  />
                  <span className="leading-relaxed text-foreground">{option.label}</span>
                </label>
              )
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!complete}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {submitLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
        {!complete && (
          <p className="text-sm text-muted-foreground" role="status">
            Answer all five items to continue.
          </p>
        )}
      </div>
    </form>
  )
}

function EvidenceBridge() {
  return (
    <section className="border-t border-border/70 bg-background/55 p-7 sm:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Evidence → skill</p>
      <h2 className="mt-2 font-display text-2xl font-extrabold text-foreground">
        Why these three learning objectives?
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {evidenceToLearning.map((item) => {
          const fact = nationalEvidenceFacts.find((candidate) => candidate.id === item.evidenceId)
          if (!fact) return null
          return (
            <article key={item.evidenceId} className="rounded-3xl border border-border/70 bg-card p-5">
              <p className="text-sm font-bold text-primary">
                {fact.displayValue} {fact.label}
              </p>
              <p className="mt-2 font-display font-bold leading-snug text-foreground">
                {item.learningObjective}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.rationale}</p>
            </article>
          )
        })}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        National context: NHMS 2022, school-going adolescents in Malaysian secondary schools.
        Population estimates guide educational priorities; they do not predict an individual&apos;s risk.
      </p>
    </section>
  )
}

function SupportCard() {
  return (
    <aside id="urgent-support" className="rounded-3xl border border-destructive/30 bg-destructive/5 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" aria-hidden="true" />
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Need help now?</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            This activity cannot provide counselling. If someone may be in immediate danger, stay with
            them if it is safe and call emergency services or a trusted adult now.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="tel:999"
              className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4" /> Call 999
            </a>
            <a
              href="tel:0376272929"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground"
            >
              <Phone className="h-4 w-4" /> Befrienders: 03-7627 2929
            </a>
            <a
              href="tel:15999"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground"
            >
              <Phone className="h-4 w-4" /> Talian Kasih: 15999
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Befrienders KL and Talian Kasih are available 24 hours every day. Contacts checked against
            their official service pages on 21 August 2026.
          </p>
        </div>
      </div>
    </aside>
  )
}

export function ScenarioLearner() {
  const [stage, setStage] = useState<Stage>("intro")
  const [baselineAnswers, setBaselineAnswers] = useState<AnswerMap>({})
  const [postAnswers, setPostAnswers] = useState<AnswerMap>({})
  const [scenarioChoices, setScenarioChoices] = useState<AnswerMap>({})
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const stageHeadingRef = useRef<HTMLHeadingElement>(null)

  const currentScenario = scenarios[scenarioIndex]
  const selectedChoiceId = currentScenario ? scenarioChoices[currentScenario.id] : undefined
  const selectedChoice = currentScenario?.choices.find((choice) => choice.id === selectedChoiceId)
  const summary = useMemo(
    () => summarizeSession({ baselineAnswers, postAnswers, scenarioChoices }),
    [baselineAnswers, postAnswers, scenarioChoices],
  )

  useEffect(() => {
    stageHeadingRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [stage, scenarioIndex])

  function reset() {
    setStage("intro")
    setBaselineAnswers({})
    setPostAnswers({})
    setScenarioChoices({})
    setScenarioIndex(0)
  }

  function selectScenarioChoice(choiceId: string) {
    if (!currentScenario) return
    setScenarioChoices((choices) => {
      if (choices[currentScenario.id]) return choices
      return { ...choices, [currentScenario.id]: choiceId }
    })
  }

  function nextScenario() {
    if (!selectedChoiceId) return
    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex((index) => index + 1)
    } else {
      setStage("post")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 font-display font-extrabold text-foreground">
            <HeartHandshake className="h-6 w-6 text-primary" /> Okay Tak Okay
          </Link>
          <a href="#urgent-support" className="text-sm font-bold text-destructive hover:underline">
            Skip to urgent support
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
          Educational practice only · no account · no free text · no health data stored
        </div>

        {stage === "intro" && (
          <section className="overflow-hidden rounded-[2.5rem] border border-border/70 bg-card">
            <div className="bg-primary/10 p-7 sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold text-primary">
                <Sparkles className="h-4 w-4" /> 8–10 minute practice
              </span>
              <h1
                ref={stageHeadingRef}
                tabIndex={-1}
                className="mt-6 max-w-2xl text-balance font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl"
              >
                Practise supportive peer decisions for a friend.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Complete a short baseline check, make two fictional peer-support decisions, and see
                what changed. The goal is not to become a counsellor. It is to notice, listen, and
                connect someone with appropriate help.
              </p>
            </div>
            <div className="grid gap-5 p-7 sm:grid-cols-3 sm:p-10">
              {[
                ["1", "Check", "Five baseline decisions"],
                ["2", "Practise", "Two bounded scenarios"],
                ["3", "Reflect", "An on-screen summary"],
              ].map(([number, title, detail]) => (
                <div key={number} className="rounded-3xl border border-border/70 bg-background p-5">
                  <span className="text-sm font-extrabold text-primary">STEP {number}</span>
                  <h2 className="mt-2 font-display text-xl font-bold text-foreground">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
            <EvidenceBridge />
            <div className="flex flex-wrap items-center gap-4 border-t border-border/70 p-7 sm:p-10">
              <button
                type="button"
                onClick={() => setStage("baseline")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-bold text-primary-foreground hover:opacity-90"
              >
                Start the practice <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-sm text-muted-foreground">Fictional situations, deterministic feedback.</p>
            </div>
          </section>
        )}

        {stage === "baseline" && (
          <AssessmentForm
            label="Baseline · 1 of 4"
            title="What would you do before the practice?"
            description="Choose what you currently think is safest. Your answers stay in this browser tab and are not submitted anywhere."
            answers={baselineAnswers}
            headingRef={stageHeadingRef}
            onChange={(questionId, optionId) =>
              setBaselineAnswers((answers) => ({ ...answers, [questionId]: optionId }))
            }
            onSubmit={() => {
              setStage("scenario")
            }}
            submitLabel="Continue to scenarios"
          />
        )}

        {stage === "scenario" && currentScenario && (
          <section className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Practice · {scenarioIndex + 2} of 4
              </p>
              <h1
                ref={stageHeadingRef}
                tabIndex={-1}
                className="mt-2 font-display text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {currentScenario.title}
              </h1>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{currentScenario.setting}</p>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-card p-6 sm:p-8">
              <p className="text-lg leading-relaxed text-foreground">{currentScenario.situation}</p>
              <div className="mt-5 rounded-2xl bg-secondary/70 p-4 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Learning goal:</strong> {currentScenario.learningGoal}
              </div>
            </div>

            <fieldset className="space-y-3">
              <legend className="font-display text-xl font-bold text-foreground">What do you choose?</legend>
              {currentScenario.choices.map((choice) => {
                const selected = selectedChoiceId === choice.id
                return (
                  <label
                    key={choice.id}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-5 text-left leading-relaxed transition-colors ${
                      selected
                        ? choice.isBest
                          ? "border-primary bg-primary/10"
                          : "border-destructive/60 bg-destructive/5"
                        : selectedChoiceId
                          ? "cursor-default border-border/70 bg-card opacity-55"
                          : "cursor-pointer border-border/70 bg-card hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`scenario-${currentScenario.id}`}
                      value={choice.id}
                      checked={selected}
                      disabled={Boolean(selectedChoiceId)}
                      onChange={() => selectScenarioChoice(choice.id)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]"
                    />
                    <span>{choice.label}</span>
                  </label>
                )
              })}
            </fieldset>

            {selectedChoice && (
              <div
                className={`rounded-3xl border p-5 ${
                  selectedChoice.isBest
                    ? "border-primary/40 bg-primary/10"
                    : "border-destructive/30 bg-destructive/5"
                }`}
                role="status"
              >
                <div className="flex items-start gap-3">
                  {selectedChoice.isBest ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  )}
                  <div>
                    <h2 className="font-display font-bold text-foreground">
                      {selectedChoice.isBest ? "Supportive and safe" : "Try a safer response"}
                    </h2>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{selectedChoice.feedback}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={!selectedChoiceId}
              onClick={nextScenario}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-bold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {scenarioIndex === scenarios.length - 1 ? "Continue to post-check" : "Next scenario"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        )}

        {stage === "post" && (
          <AssessmentForm
            label="Post-check · 4 of 4"
            title="What would you choose now?"
            description="Answer the same five decisions again. The summary compares only this session and is not saved or sent."
            answers={postAnswers}
            headingRef={stageHeadingRef}
            onChange={(questionId, optionId) =>
              setPostAnswers((answers) => ({ ...answers, [questionId]: optionId }))
            }
            onSubmit={() => {
              setStage("summary")
            }}
            submitLabel="See my learning summary"
          />
        )}

        {stage === "summary" && (
          <section className="space-y-7">
            <div className="rounded-[2.5rem] border border-primary/30 bg-primary/10 p-7 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">On-screen summary</p>
              <h1
                ref={stageHeadingRef}
                tabIndex={-1}
                className="mt-2 font-display text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                Practice complete.
              </h1>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                These are learning measures, not a mental-health score or diagnosis. Nothing was uploaded or stored.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Answer key", `${summary.baselineCorrect}/5 → ${summary.postCorrect}/5`, `${summary.improvement >= 0 ? "+" : ""}${summary.improvement} same-session matches`],
                ["Choices", `${summary.supportiveResponseAccuracyPct}%`, "Draft-preferred scenario choices"],
                ["Escalation", summary.safeEscalationSelected ? "Selected" : "Review", "Urgent safety pathway"],
                ["Recall", summary.resourceRecallCorrect ? "Matched" : "Review", "24/7 support resource"],
              ].map(([label, value, detail]) => (
                <div key={label} className="rounded-3xl border border-border/70 bg-card p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
                  <p className="mt-2 font-display text-2xl font-extrabold text-foreground">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-foreground">Three things to keep</h2>
              <ol className="mt-5 space-y-4 text-muted-foreground">
                <li><strong className="text-foreground">1. Notice and listen.</strong> Be specific, calm, and non-judgmental.</li>
                <li><strong className="text-foreground">2. Be a bridge, not a clinician.</strong> Do not diagnose or carry the situation alone.</li>
                <li><strong className="text-foreground">3. Safety beats secrecy.</strong> Escalate immediately when someone cannot keep themselves safe.</li>
              </ol>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground"
              >
                <RefreshCcw className="h-4 w-4" /> Practise again
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-bold text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back to resources
              </Link>
            </div>
          </section>
        )}

        <SupportCard />

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          Draft educational prototype. Scenario language and escalation flow require external review by a
          qualified Malaysian youth mental-health professional before any school pilot.
        </p>
      </div>
    </main>
  )
}
