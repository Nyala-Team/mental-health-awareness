import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"

const outcomes = [
  "Listen without diagnosing",
  "Recognise urgent safety signals",
  "Connect a friend with appropriate help",
]

export function PracticeSection() {
  return (
    <section id="practice" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-border/70 bg-card lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <Sparkles className="h-4 w-4" /> New guided practice
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Knowing the words is different from choosing them in the moment.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Try two fictional peer-support scenes, see transparent feedback, and compare a private
              five-item baseline and post-check. Nothing is uploaded or stored.
            </p>
            <Link
              href="/practice"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start the 8–10 minute practice <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-secondary/70 p-7 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
              <ShieldCheck className="h-5 w-5" /> Safe by design
            </div>
            <ul className="mt-6 space-y-4">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="font-semibold">{outcome}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 rounded-2xl border border-border/70 bg-card p-4 text-sm leading-relaxed text-muted-foreground">
              Educational only. No diagnosis, open-ended crisis chat, account, or free-text health disclosure.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
