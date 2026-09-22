export type MoodLevel = 1 | 2 | 3 | 4 | 5

export type MoodEntry = {
  level: MoodLevel
  /** ISO date string — date only, no time, to avoid identifying a precise moment */
  date: string
}

export type MoodEmoji = {
  level: MoodLevel
  emoji: string
  label: string
  color: string
}

export const MOOD_EMOJIS: MoodEmoji[] = [
  { level: 1, emoji: "😔", label: "Sangat sedih / Very low", color: "oklch(0.55 0.15 280)" },
  { level: 2, emoji: "😟", label: "Tak berapa baik / Low", color: "oklch(0.6 0.12 220)" },
  { level: 3, emoji: "😐", label: "Okay / Neutral", color: "oklch(0.65 0.09 90)" },
  { level: 4, emoji: "🙂", label: "Cukup baik / Good", color: "oklch(0.65 0.12 145)" },
  { level: 5, emoji: "😊", label: "Sangat baik / Great", color: "oklch(0.62 0.14 155)" },
]

const STORAGE_KEY = "oto-mood-log"
const MAX_ENTRIES = 30

function getTodayDateString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function getMoodHistory(): MoodEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as MoodEntry[]
    return []
  } catch {
    return []
  }
}

export function getTodaysMood(): MoodEntry | null {
  const history = getMoodHistory()
  const today = getTodayDateString()
  return history.find((e) => e.date === today) ?? null
}

export function saveMoodEntry(level: MoodLevel): MoodEntry {
  const entry: MoodEntry = { level, date: getTodayDateString() }
  const history = getMoodHistory().filter((e) => e.date !== entry.date)
  const updated = [entry, ...history].slice(0, MAX_ENTRIES)
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // localStorage unavailable — silently ignore
    }
  }
  return entry
}

export function clearMoodHistory(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY)
  }
}

/** Returns the last N entries ordered from oldest to newest */
export function getRecentMoodHistory(days = 7): MoodEntry[] {
  const history = getMoodHistory()
  return history.slice(0, days).reverse()
}
