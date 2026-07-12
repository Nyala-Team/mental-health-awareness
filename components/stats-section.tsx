const stats = [
  {
    value: "1 in 2",
    label: "Malaysian teens aged 13–17 report feeling lonely or anxious at some point.",
  },
  {
    value: "424k+",
    label: "Youths in Malaysia live with symptoms of depression, per national health surveys.",
  },
  {
    value: "7 in 10",
    label: "Young people say stigma stops them from asking for help. You are not alone.",
  },
]

export function StatsSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <p className="max-w-2xl text-balance font-display text-2xl font-bold leading-snug sm:text-3xl">
          Mental health matters &mdash; and it&apos;s more common than you think.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col gap-2 border-t border-primary-foreground/25 pt-5">
              <span className="font-display text-4xl font-extrabold sm:text-5xl">{stat.value}</span>
              <span className="text-pretty text-sm leading-relaxed text-primary-foreground/85">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-primary-foreground/70">
          Figures are indicative, based on the National Health &amp; Morbidity Survey and public
          mental health reporting in Malaysia.
        </p>
      </div>
    </section>
  )
}
