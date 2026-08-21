import { GraduationCap, HandHeart, Stethoscope, Phone } from "lucide-react"

const resources = [
  {
    icon: GraduationCap,
    title: "Your school or campus",
    desc: "Check the official student-services directory for any counselling or wellbeing contact available to you.",
    tag: "Availability varies",
  },
  {
    icon: Stethoscope,
    title: "Government health information",
    desc: "Use current Ministry of Health or facility information to check local services, eligibility, hours, and cost.",
    tag: "Verify locally",
  },
  {
    icon: HandHeart,
    title: "Community organisations",
    desc: "Check each organisation's official page for its current scope, safeguards, privacy terms, and opening hours.",
    tag: "Terms vary",
  },
  {
    icon: Phone,
    title: "Phone support",
    desc: "Use the verified contact cards below and choose a service that matches your situation. Call 999 for immediate danger.",
    tag: "See contact details",
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
            Check what support is actually available to you.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Availability, cost, confidentiality, and response times differ by provider. Verify the
            current details before relying on a service.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {resources.map((r) => (
            <div
              key={r.title}
              className="flex items-start gap-5 rounded-3xl border border-border/70 bg-card p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <r.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">{r.title}</h3>
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
