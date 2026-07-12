import { CloudRain, Flame, Waves, Moon, HeartCrack, Zap } from "lucide-react"

const feelings = [
  {
    icon: CloudRain,
    title: "Down or empty",
    desc: "Losing interest in things you used to enjoy, or feeling flat for weeks.",
  },
  {
    icon: Zap,
    title: "Anxious",
    desc: "Racing thoughts, worry, or a tight chest before exams or social situations.",
  },
  {
    icon: Flame,
    title: "Burnt out",
    desc: "Exhausted by school, work, or expectations from family and society.",
  },
  {
    icon: Moon,
    title: "Can't sleep",
    desc: "Lying awake overthinking, or sleeping too much to escape.",
  },
  {
    icon: HeartCrack,
    title: "Overwhelmed",
    desc: "Everything feels like too much, all at once, and hard to explain.",
  },
  {
    icon: Waves,
    title: "Numb",
    desc: "Feeling disconnected, like you're just going through the motions.",
  },
]

export function FeelingsSection() {
  return (
    <section id="feelings" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            You&apos;re not overreacting
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Whatever you&apos;re feeling, it&apos;s valid.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Naming what you feel is the first step. Here are some things young Malaysians tell us
            they go through. Recognise any of these?
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {feelings.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-border/70 bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
