import { nationalEvidenceFacts } from "@/lib/evidence-context"

export function StatsSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <p className="max-w-2xl text-balance font-display text-2xl font-bold leading-snug sm:text-3xl">
          What the national adolescent survey actually reports.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {nationalEvidenceFacts.map((fact) => (
            <div key={fact.id} className="flex flex-col gap-2 border-t border-primary-foreground/25 pt-5">
              <span className="font-display text-4xl font-extrabold sm:text-5xl">
                {fact.displayValue}
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
