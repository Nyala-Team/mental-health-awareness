import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Animated gradient background blobs */}
      <div
        className="animate-pulse-glow pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.12 178 / 0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="animate-pulse-glow pointer-events-none absolute -right-20 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.8 0.09 45 / 0.25) 0%, transparent 70%)",
          animationDelay: "1.5s",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-6 animate-fade-up">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/50 px-4 py-1.5 text-sm font-bold text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            Untuk anak muda Malaysia
          </span>

          <h1 className="text-balance font-display text-4xl font-extrabold leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
            It&apos;s okay to{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              not be okay
            </span>
            .
          </h1>

          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Stress exam, family, kerja, media sosial &mdash; a lot is going on. This educational
            platform offers simulations, coping exercises, and links to independent support
            services for Malaysian youth.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#helplines"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-emerald-500 px-6 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
            >
              Dapatkan Bantuan / Get Help
            </a>
            <Link
              href="/practice"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-secondary px-6 text-base font-bold text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <Sparkles className="h-4 w-4" />
              Mulakan Simulasi / Start Simulation
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Knowledge Quiz
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <p className="text-sm font-medium text-muted-foreground">
              No account &middot; No free-text answers &middot; Not a counselling service
            </p>
          </div>
        </div>

        <div className="relative animate-float" style={{ animationDuration: "5s" }}>
          <div
            className="animate-pulse-glow absolute -inset-4 -z-10 rounded-[2.5rem] blur-2xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.68 0.12 178 / 0.3), oklch(0.8 0.09 45 / 0.2))",
            }}
            aria-hidden="true"
          />
          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-xl shadow-primary/10">
            <Image
              src="/images/hero-youth.png"
              alt="Illustration of diverse Malaysian young people supporting each other under a tree"
              width={720}
              height={720}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Floating stat badge */}
          <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-xl" aria-hidden="true">
              📊
            </span>
            <div>
              <p className="font-display text-lg font-extrabold leading-none text-foreground">
                1 in 4
              </p>
              <p className="text-xs text-muted-foreground">Malaysian teens report depression</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
