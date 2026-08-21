import Image from "next/image"
import { Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/50 px-4 py-1.5 text-sm font-bold text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            Untuk anak muda Malaysia
          </span>

          <h1 className="text-balance font-display text-4xl font-extrabold leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
            It&apos;s okay to <span className="text-primary">not be okay</span>.
          </h1>

          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Stress exam, family, kerja, media sosial &mdash; a lot is going on. This educational
            prototype offers examples, optional coping exercises, and links to independent support
            services.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#helplines"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Talk to someone now
            </a>
            <a
              href="#tools"
              className="inline-flex h-11 items-center justify-center rounded-full bg-secondary px-5 text-base font-bold text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              Explore coping tools
            </a>
          </div>

          <p className="text-sm font-medium text-muted-foreground">
            No account &middot; No free-text answers &middot; Not a counselling service
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-primary/10 blur-2xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-sm">
            <Image
              src="/images/hero-youth.png"
              alt="Illustration of diverse Malaysian young people supporting each other under a tree"
              width={720}
              height={720}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
