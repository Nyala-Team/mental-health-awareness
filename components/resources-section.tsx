import { GraduationCap, HandHeart, Stethoscope, Globe, ArrowUpRight } from "lucide-react"

const resources = [
  {
    icon: GraduationCap,
    title: "For students",
    desc: "Most schools and universities have free counselling units. Ask your kaunselor or student services.",
    tag: "Free at your campus",
  },
  {
    icon: Stethoscope,
    title: "Klinik Kesihatan",
    desc: "Government health clinics offer mental health screening and referrals at low cost nationwide.",
    tag: "Nationwide",
  },
  {
    icon: HandHeart,
    title: "MIASA & NGOs",
    desc: "Peer support groups and community programmes run by mental health organisations across Malaysia.",
    tag: "Community support",
  },
  {
    icon: Globe,
    title: "Online support",
    desc: "Chat-based and telehealth options let you reach a listener or therapist from home.",
    tag: "From anywhere",
  },
]

export function ResourcesSection() {
  return (
    <section id="resources" className="scroll-mt-20 bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            Where to turn
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Support exists &mdash; and much of it is free.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Reaching out can feel scary. These are safe places to start, wherever you are in
            Malaysia.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {resources.map((r) => (
            <div
              key={r.title}
              className="group flex items-start gap-5 rounded-3xl border border-border/70 bg-card p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <r.icon className="h-6 w-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-foreground">{r.title}</h3>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{r.desc}</p>
                <span className="mt-3 inline-block rounded-full bg-accent/40 px-3 py-1 text-xs font-bold text-accent-foreground">
                  {r.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
