"use client"

import { useEffect, useState } from "react"
import {
  getMoodHistory,
  getTodaysMood,
  MOOD_EMOJIS,
  saveMoodEntry,
  type MoodEntry,
  type MoodLevel,
} from "@/lib/mood-tracker"

function MoodDot({ entry }: { entry: MoodEntry }) {
  const emoji = MOOD_EMOJIS.find((e) => e.level === entry.level)
  const colors = [
    "bg-purple-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-emerald-500",
  ]
  return (
    <div
      className={`h-3 w-3 rounded-full ${colors[entry.level - 1]} opacity-80`}
      title={`${emoji?.label} — ${entry.date}`}
      aria-label={`${emoji?.label}`}
    />
  )
}

export function MoodTrackerWidget() {
  const [selected, setSelected] = useState<MoodLevel | null>(null)
  const [saved, setSaved] = useState(false)
  const [history, setHistory] = useState<MoodEntry[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const today = getTodaysMood()
    if (today) {
      setSelected(today.level)
      setSaved(true)
    }
    setHistory(getMoodHistory().slice(0, 7).reverse())
    setHydrated(true)
  }, [])

  function handleSelect(level: MoodLevel) {
    if (saved) return
    setSelected(level)
  }

  function handleSave() {
    if (!selected || saved) return
    saveMoodEntry(selected)
    setSaved(true)
    setHistory(getMoodHistory().slice(0, 7).reverse())
  }

  const selectedEmoji = MOOD_EMOJIS.find((e) => e.level === selected)

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 sm:p-7">
      {/* Decorative gradient blob */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ background: "oklch(0.72 0.14 155)" }}
        aria-hidden="true"
      />

      <p className="text-sm font-bold uppercase tracking-wide text-primary">Mood Check-In</p>
      <h3 className="mt-2 font-display text-xl font-bold text-foreground">
        Macam mana perasaan kamu hari ini?
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        How are you feeling today? Choose one.
      </p>

      {!hydrated ? (
        <div className="mt-5 h-16 animate-pulse rounded-2xl bg-muted" />
      ) : (
        <>
          <div
            className="mt-5 flex items-center justify-between gap-2"
            role="group"
            aria-label="Mood selection"
          >
            {MOOD_EMOJIS.map((m) => {
              const isSelected = selected === m.level
              return (
                <button
                  key={m.level}
                  type="button"
                  disabled={saved}
                  onClick={() => handleSelect(m.level)}
                  aria-label={m.label}
                  aria-pressed={isSelected}
                  className={`flex flex-1 flex-col items-center gap-1.5 rounded-2xl border py-3 transition-all duration-200 ${
                    isSelected
                      ? "scale-110 border-primary bg-primary/10 shadow-md"
                      : saved
                        ? "cursor-default border-border/50 bg-background opacity-40"
                        : "cursor-pointer border-border/60 bg-background hover:scale-105 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {m.emoji}
                  </span>
                </button>
              )
            })}
          </div>

          {selected && !saved && (
            <div className="mt-4 flex items-center gap-3">
              <p className="flex-1 text-sm text-muted-foreground">
                Perasaan:{" "}
                <span className="font-semibold text-foreground">{selectedEmoji?.label}</span>
              </p>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Simpan / Save
              </button>
            </div>
          )}

          {saved && selected && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-2.5">
              <span className="text-xl" aria-hidden="true">
                {selectedEmoji?.emoji}
              </span>
              <p className="text-sm font-semibold text-foreground">
                Saved for today · {selectedEmoji?.label}
              </p>
            </div>
          )}

          {/* 7-day history */}
          {history.length > 0 && (
            <div className="mt-5 border-t border-border/60 pt-4">
              <p className="text-xs font-semibold text-muted-foreground">Last {history.length} days</p>
              <div className="mt-2 flex items-center gap-2">
                {history.map((entry) => (
                  <MoodDot key={entry.date} entry={entry} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Saved only in this browser. Not a diagnostic tool — just a gentle daily check-in.
      </p>
    </div>
  )
}
