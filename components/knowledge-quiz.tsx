"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
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
  BookOpen,
} from "lucide-react"
import { quizQuestions, scoreQuiz, type QuizAnswerMap } from "@/lib/quiz-engine"

type Stage = "intro" | "quiz" | "results"

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>
          Question {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

export function KnowledgeQuiz() {
  const [stage, setStage] = useState<Stage>("intro")
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswerMap>({})
  const [revealed, setRevealed] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const question = quizQuestions[qIndex]
  const selectedId = answers[question?.id]
  const isCorrect = selectedId === question?.correctOptionId

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [stage, qIndex])

  function reset() {
    setStage("intro")
    setQIndex(0)
    setAnswers({})
    setRevealed(false)
  }

  function selectAnswer(optionId: string) {
    if (revealed) return
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }))
  }

  function reveal() {
    if (!selectedId) return
    setRevealed(true)
  }

  function next() {
    if (qIndex < quizQuestions.length - 1) {
      setQIndex((i) => i + 1)
      setRevealed(false)
    } else {
      setStage("results")
    }
  }

  const score = scoreQuiz(answers)

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display font-extrabold text-foreground"
          >
            <HeartHandshake className="h-6 w-6 text-primary" />
            Okay Tak Okay
          </Link>
          <a
            href="tel:15999"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-bold text-foreground hover:border-primary/50"
          >
            <Phone className="h-3.5 w-3.5" />
            Talian Kasih 15999
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
          Knowledge check only · no account · no personal data stored
        </div>

        {/* ── INTRO ── */}
        {stage === "intro" && (
          <section className="overflow-hidden rounded-[2.5rem] border border-border/70 bg-card">
            <div className="bg-primary/10 p-7 sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold text-primary">
                <BookOpen className="h-4 w-4" />
                {quizQuestions.length} questions · ~5 minutes
              </span>
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="mt-6 max-w-2xl text-balance font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl"
              >
                Malaysian Mental Health Knowledge Quiz
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Test your understanding of Malaysian mental health realities — stigma myths, national
                data, cultural barriers, and where to get help. Each question includes an explanation
                with local context.
              </p>
            </div>
            <div className="grid gap-5 p-7 sm:grid-cols-3 sm:p-10">
              {[
                ["🇲🇾", "Local Context", "Questions grounded in Malaysian data and culture"],
                ["💡", "Learn", "Explanations with every answer"],
                ["🔒", "Private", "Nothing is stored or submitted"],
              ].map(([icon, title, detail]) => (
                <div key={title} className="rounded-3xl border border-border/70 bg-background p-5">
                  <span className="text-2xl" aria-hidden="true">{icon}</span>
                  <h2 className="mt-2 font-display text-lg font-bold text-foreground">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 border-t border-border/70 p-7 sm:p-10">
              <button
                type="button"
                onClick={() => setStage("quiz")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-bold text-primary-foreground hover:opacity-90"
              >
                <Sparkles className="h-4 w-4" />
                Mula Kuiz / Start Quiz
              </button>
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/50"
              >
                Try the scenario practice instead
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* ── QUIZ ── */}
        {stage === "quiz" && question && (
          <section className="space-y-6">
            <ProgressBar current={qIndex + 1} total={quizQuestions.length} />

            <div className="rounded-[2rem] border border-border/70 bg-card p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Soalan {qIndex + 1} daripada {quizQuestions.length}
              </p>
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="mt-3 font-display text-2xl font-extrabold text-foreground sm:text-3xl"
              >
                {question.prompt}
              </h1>
              {question.source && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Source: {question.source}
                </p>
              )}
            </div>

            <fieldset className="space-y-3">
              <legend className="sr-only">Choose your answer</legend>
              {question.options.map((option) => {
                const isSelected = selectedId === option.id
                const isCorrectOption = option.id === question.correctOptionId
                let cls =
                  "flex w-full items-start gap-3 rounded-2xl border p-5 text-left leading-relaxed transition-all duration-200 "
                if (!revealed) {
                  cls += isSelected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "cursor-pointer border-border/70 bg-card hover:border-primary/50 hover:bg-primary/5"
                } else {
                  if (isCorrectOption) {
                    cls += "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
                  } else if (isSelected && !isCorrectOption) {
                    cls += "border-destructive/60 bg-destructive/5"
                  } else {
                    cls += "cursor-default border-border/50 bg-card opacity-50"
                  }
                }
                return (
                  <label key={option.id} className={cls}>
                    <input
                      type="radio"
                      name={`quiz-${question.id}`}
                      value={option.id}
                      checked={isSelected}
                      disabled={revealed}
                      onChange={() => selectAnswer(option.id)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]"
                    />
                    <span className="text-foreground">{option.label}</span>
                    {revealed && isCorrectOption && (
                      <CheckCircle2 className="ml-auto mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    )}
                    {revealed && isSelected && !isCorrectOption && (
                      <AlertTriangle className="ml-auto mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                    )}
                  </label>
                )
              })}
            </fieldset>

            {revealed && (
              <div
                className={`rounded-3xl border p-5 ${
                  isCorrect
                    ? "border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/30"
                    : "border-destructive/30 bg-destructive/5"
                }`}
                role="status"
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  )}
                  <div>
                    <h2 className="font-display font-bold text-foreground">
                      {isCorrect ? "Betul! / Correct!" : "Tak tepat / Not quite"}
                    </h2>
                    <p className="mt-1 leading-relaxed text-muted-foreground">
                      {question.explanation}
                    </p>
                    {question.culturalNote && (
                      <p className="mt-2 rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                        🇲🇾 {question.culturalNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {!revealed ? (
                <button
                  type="button"
                  disabled={!selectedId}
                  onClick={reveal}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-bold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Semak Jawapan / Check Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-bold text-primary-foreground hover:opacity-90"
                >
                  {qIndex === quizQuestions.length - 1
                    ? "Lihat Keputusan / See Results"
                    : "Soalan Seterusnya / Next Question"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </section>
        )}

        {/* ── RESULTS ── */}
        {stage === "results" && (
          <section className="space-y-7">
            <div className="overflow-hidden rounded-[2.5rem] border border-primary/30 bg-primary/10 p-7 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Keputusan / Results
              </p>
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="mt-2 font-display text-3xl font-extrabold text-foreground sm:text-4xl"
              >
                {score.pct >= 80
                  ? "Tahniah! Excellent awareness."
                  : score.pct >= 50
                    ? "Good effort — keep learning."
                    : "Every question is a learning opportunity."}
              </h1>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                You scored{" "}
                <strong className="text-foreground">
                  {score.correct} out of {score.total}
                </strong>{" "}
                ({score.pct}%). Nothing is stored or submitted — this is for your own learning only.
              </p>
            </div>

            {/* Score visual */}
            <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Score
                  </p>
                  <p className="mt-1 font-display text-5xl font-extrabold text-foreground">
                    {score.pct}
                    <span className="text-2xl text-primary">%</span>
                  </p>
                </div>
                <div className="flex-1">
                  <div className="h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-1000"
                      style={{ width: `${score.pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {score.correct} correct · {score.total - score.correct} to review
                  </p>
                </div>
              </div>
            </div>

            {/* Review wrong answers */}
            {score.wrongIds.length > 0 && (
              <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Questions to revisit
                </h2>
                <div className="mt-4 space-y-4">
                  {quizQuestions
                    .filter((q) => score.wrongIds.includes(q.id))
                    .map((q) => {
                      const correct = q.options.find((o) => o.id === q.correctOptionId)
                      return (
                        <div
                          key={q.id}
                          className="rounded-2xl border border-border/60 bg-background p-4"
                        >
                          <p className="font-semibold text-foreground">{q.prompt}</p>
                          <p className="mt-2 text-sm text-primary">
                            ✓ {correct?.label}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {q.explanation}
                          </p>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground hover:opacity-90"
              >
                <RefreshCcw className="h-4 w-4" />
                Cuba Lagi / Try Again
              </button>
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-bold text-foreground hover:border-primary/50"
              >
                <Sparkles className="h-4 w-4" />
                Try the scenario practice
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-bold text-foreground hover:border-primary/50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </div>
          </section>
        )}

        {/* Urgent support — always visible */}
        <aside className="rounded-3xl border border-destructive/30 bg-destructive/5 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" aria-hidden="true" />
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Need help now?</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                This quiz is for education only. For immediate support, call or WhatsApp a helpline.
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
                  <Phone className="h-4 w-4" /> Befrienders 03-7627 2929
                </a>
                <a
                  href="tel:15999"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground"
                >
                  <Phone className="h-4 w-4" /> Talian Kasih 15999
                </a>
              </div>
            </div>
          </div>
        </aside>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          Educational resource · NHMS 2022 · MOH Malaysia · Not a diagnostic or counselling service.
        </p>
      </div>
    </main>
  )
}
