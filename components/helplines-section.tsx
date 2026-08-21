import { Phone, MessageCircle, Clock, AlertCircle } from "lucide-react"

const helplines = [
  {
    name: "Talian Kasih",
    number: "15999",
    tel: "15999",
    detail: "National welfare & crisis line. WhatsApp 019-261 5999.",
    hours: "24 hours, every day",
  },
  {
    name: "Befrienders KL",
    number: "03-7627 2929",
    tel: "0376272929",
    detail: "Free, confidential emotional support and a listening ear.",
    hours: "24 hours, every day",
  },
  {
    name: "Talian HEAL",
    number: "15555",
    tel: "15555",
    detail: "Ministry of Health mental health & psychosocial support line.",
    hours: "Check the provider's current operating hours",
  },
  {
    name: "MIASA Helpline",
    number: "1-800-180-066",
    tel: "1800180066",
    detail: "Mental illness awareness & peer support association.",
    hours: "Check the provider's current operating hours",
  },
]

export function HelplinesSection() {
  return (
    <section id="helplines" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="rounded-[2.5rem] border border-border/70 bg-card p-6 sm:p-10">
          <div className="flex flex-col gap-4 border-b border-border/60 pb-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-bold text-destructive">
                <AlertCircle className="h-4 w-4" />
                Need help right now?
              </span>
              <h2 className="mt-4 text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                Support contacts for urgent moments.
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                If you or someone you know may be in immediate danger, call 999. Service scope,
                cost, confidentiality, availability, and response times vary by provider; verify
                current details when possible.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-destructive/10 p-4 text-destructive">
              <Phone className="h-6 w-6 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">Emergency</p>
                <a href="tel:999" className="font-display text-2xl font-extrabold leading-none">
                  Call 999
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {helplines.map((line) => (
              <div
                key={line.name}
                className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-background p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-foreground">{line.name}</h3>
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {line.detail}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {line.hours}
                </div>
                <a
                  href={`tel:${line.tel}`}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-display font-bold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Phone className="h-4 w-4" />
                  {line.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
