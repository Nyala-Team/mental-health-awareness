"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, FlipHorizontal } from "lucide-react"

type Myth = {
  bm: string
  en: string
  fact: string
  context: string
}

const myths: Myth[] = [
  {
    bm: "\"Nanti orang ingat gila\"",
    en: "\"People will think you're crazy\"",
    fact:
      "Seeking professional support is a sign of self-awareness and courage, not weakness or madness. More than 1 in 4 Malaysian adolescents reported depression in NHMS 2022.",
    context:
      "This fear of being labelled keeps many Malaysians from accessing care that could genuinely help them.",
  },
  {
    bm: "\"Bersyukur sahaja, masalah selesai\"",
    en: "\"Just be grateful and your problems will be solved\"",
    fact:
      "Gratitude is valuable, but mental health conditions involve biology, psychology, and environment — not a deficit of thankfulness. Both faith and professional care can coexist.",
    context:
      "This myth disproportionately affects Malay-Muslim communities and delays help-seeking.",
  },
  {
    bm: "\"Lelaki tak boleh nangis\"",
    en: "\"Men can't cry or show emotion\"",
    fact:
      "Suppressing emotions increases risk of serious mental health conditions. Boys and men benefit from expressing feelings and seeking support — vulnerability is human, not gendered.",
    context:
      "Malaysian men are significantly less likely to seek mental health support than women, often due to this expectation.",
  },
  {
    bm: "\"Masalah keluarga, simpan dalam rumah\"",
    en: "\"Family problems stay inside the house\"",
    fact:
      "Confidentiality in professional mental health care is legally protected. Counsellors and psychologists maintain strict privacy. Sharing with a professional is not 'airing dirty laundry'.",
    context:
      "Fear of community gossip often stops families from seeking early help, allowing problems to worsen.",
  },
  {
    bm: "\"Budak sekolah tak ada masalah besar\"",
    en: "\"School kids don't have real problems\"",
    fact:
      "The NHMS 2022 found 13.1% of Malaysian adolescents reported suicidal ideation in the past year. Academic pressure, family expectations, and social stress are real and serious.",
    context:
      "Dismissing youth distress as 'just teenage drama' delays intervention when it matters most.",
  },
  {
    bm: "\"Ubat jiwa buat orang jadi zombie\"",
    en: "\"Psychiatric medication turns you into a zombie\"",
    fact:
      "Modern psychiatric medication, when properly prescribed and monitored, helps many people live fuller lives. Side-effect concerns are valid topics to discuss openly with a doctor.",
    context:
      "Fear of medication side effects leads many to stop treatment early or avoid it entirely — a decision best made with professional guidance.",
  },
]

function MythCard({ myth, index }: { myth: Myth; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="group perspective-1000 cursor-pointer"
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Myth card ${index + 1}: ${flipped ? "showing fact" : "showing myth"}`}
    >
      <div
        className={`relative h-full min-h-[220px] transition-all duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front — Myth */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-destructive/30 bg-destructive/5 p-5 [backface-visibility:hidden]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-destructive">
              Mitos / Myth
            </span>
            <p className="mt-3 font-display text-lg font-bold leading-snug text-foreground">
              {myth.bm}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{myth.en}</p>
          </div>
          <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-muted-foreground">
            <FlipHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Klik untuk fakta / Click for fact
          </div>
        </div>

        {/* Back — Fact */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-primary/30 bg-primary/5 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              Fakta / Fact
            </span>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{myth.fact}</p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{myth.context}</p>
        </div>
      </div>
    </div>
  )
}

export function MythsSection() {
  const [showAll, setShowAll] = useState(false)
  const visibleMyths = showAll ? myths : myths.slice(0, 3)

  return (
    <section id="myths" className="scroll-mt-20 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            Pecahkan stigma / Break the stigma
          </span>
          <h2 className="mt-3 text-balance font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Mitos mental health yang sering didengar.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Common mental health myths in Malaysia — and the facts behind them. Click any card to
            flip it and reveal the reality.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleMyths.map((myth, i) => (
            <MythCard key={myth.bm} myth={myth} index={i} />
          ))}
        </div>

        {myths.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Lihat semua {myths.length} mitos / See all {myths.length} myths
                </>
              )}
            </button>
          </div>
        )}

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Sources: NHMS 2022 Adolescent Health Survey · MOH Malaysia Mental Health Policy · WHO
          Mental Health Action Plan. Individual circumstances vary; please seek professional advice
          for personal situations.
        </p>
      </div>
    </section>
  )
}
