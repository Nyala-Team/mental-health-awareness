import { Wind, NotebookPen, Footprints, MessageCircleHeart, Users, MoonStar } from "lucide-react"
import { BreathingTool } from "@/components/breathing-tool"

const tips = [
  {
    icon: NotebookPen,
    title: "Write it out",
    desc: "If writing feels useful, note one worry and one good thing without judging either.",
  },
  {
    icon: Footprints,
    title: "Move a little",
    desc: "If it is safe and accessible, try a short walk, stretching, or another gentle movement.",
  },
  {
    icon: MessageCircleHeart,
    title: "Tell one person",
    desc: "A friend, sibling, cikgu, or ustaz. You don't have to carry it alone.",
  },
  {
    icon: Users,
    title: "Find your people",
    desc: "Consider a moderated support group or community with clear safety and privacy rules.",
  },
  {
    icon: MoonStar,
    title: "Protect your sleep",
    desc: "If practical, try a consistent wind-down routine and a little less screen time before bed.",
  },
  {
    icon: Wind,
    title: "Breathe on purpose",
    desc: "Optional paced breathing can feel grounding for some people. Stop if it feels uncomfortable.",
  },
]

export function ToolsSection() {
  return (
    <section id="tools" className="scroll-mt-20 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            Small, optional steps
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Coping exercises you can try right now.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            These are general educational suggestions, not treatment. Keep only what feels safe and
            useful for you.
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
