import { Wind, NotebookPen, Footprints, MessageCircleHeart, Users, MoonStar } from "lucide-react"
import { BreathingTool } from "@/components/breathing-tool"

const tips = [
  {
    icon: NotebookPen,
    title: "Write it out",
    desc: "Journal one worry and one good thing each day. Getting it out of your head helps.",
  },
  {
    icon: Footprints,
    title: "Move a little",
    desc: "A short walk, stretching, or badminton with friends can shift a heavy mood.",
  },
  {
    icon: MessageCircleHeart,
    title: "Tell one person",
    desc: "A friend, sibling, cikgu, or ustaz. You don't have to carry it alone.",
  },
  {
    icon: Users,
    title: "Find your people",
    desc: "Join a support group or online community where you feel understood.",
  },
  {
    icon: MoonStar,
    title: "Protect your sleep",
    desc: "Put the phone down 30 minutes earlier. Rest is not lazy, it's healing.",
  },
  {
    icon: Wind,
    title: "Breathe on purpose",
    desc: "Slow breathing calms your nervous system when panic hits. Try the tool here.",
  },
]

export function ToolsSection() {
  return (
    <section id="tools" className="scroll-mt-20 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            Small steps, real relief
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Coping tools you can use right now.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            These won&apos;t fix everything &mdash; and that&apos;s okay. But they can help you get
            through the next hour, the next day.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <BreathingTool />

          <div className="grid gap-5 sm:grid-cols-2">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-3xl border border-border/70 bg-card p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/40 text-accent-foreground">
                  <tip.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{tip.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
