import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { nationalEvidenceFacts } from "@/lib/evidence-context"
import { AnimatedCounter } from "@/components/animated-counter"

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Decorative background rings */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-primary-foreground/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full border border-primary-foreground/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground/70">
              NHMS 2022 · Malaysian Secondary Schools
            </p>
            <p className="mt-2 max-w-2xl text-balance font-display text-2xl font-bold leading-snug sm:text-3xl">
              What the national adolescent survey actually reports.
            </p>
          </div>
          <Link
            href="/quiz"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-foreground/20"
          >
            Take the Knowledge Quiz
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {nationalEvidenceFacts.map((fact) => (
            <div
              key={fact.id}
              className="group flex flex-col gap-2 border-t border-primary-foreground/25 pt-5 transition-all"
            >
              <span className="font-display text-4xl font-extrabold sm:text-5xl">
                <AnimatedCounter
                  value={fact.valuePct}
                  suffix="%"
                  decimals={1}
                  duration={2000}
                />
              </span>
              <span className="text-pretty text-sm leading-relaxed text-primary-foreground/90">
                {fact.label} ({fact.referencePeriod}).
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-primary-foreground/75">
          <a
            href="https://iku.gov.my/nhms-ahs-2022"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline underline-offset-2"
          >
            NHMS 2022 Adolescent Health Survey
          </a>{" "}
          · school-going adolescents in Malaysian secondary schools. These descriptive estimates
          do not diagnose an individual or establish causality; state estimates and confidence
          intervals remain important.
        </p>
      </div>
    </section>
  )
}
