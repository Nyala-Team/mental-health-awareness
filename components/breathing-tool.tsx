"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

type Phase = { label: string; seconds: number }

// 4-7-8 calming breath
const phases: Phase[] = [
  { label: "Breathe in", seconds: 4 },
  { label: "Hold", seconds: 7 },
  { label: "Breathe out", seconds: 8 },
]

export function BreathingTool() {
  const [running, setRunning] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [count, setCount] = useState(phases[0].seconds)
  const [cycles, setCycles] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) return prev - 1
        // move to next phase and start its countdown
        let nextSeconds = prev
        setPhaseIndex((pi) => {
          const next = (pi + 1) % phases.length
          if (next === 0) setCycles((c) => c + 1)
          nextSeconds = phases[next].seconds
          return next
        })
        return nextSeconds
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const reset = () => {
    setRunning(false)
    setPhaseIndex(0)
    setCount(phases[0].seconds)
    setCycles(0)
  }

  const current = phases[phaseIndex]
  const scale =
    current.label === "Breathe in" ? "scale-100" : current.label === "Hold" ? "scale-100" : "scale-75"

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-8 text-center">
      <h3 className="font-display text-2xl font-bold text-foreground">Calm your body in 60 seconds</h3>
      <p className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
        Try the 4-7-8 breathing technique. Follow the circle: breathe in, hold, and slowly let go.
      </p>

      <div className="relative mx-auto mt-10 flex h-56 w-56 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary/10"
        />
        <span
          aria-hidden="true"
          className={`absolute inset-6 rounded-full bg-primary/20 transition-transform duration-1000 ease-in-out ${scale}`}
        />
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-display text-lg font-bold text-primary">{current.label}</span>
          <span className="font-display text-5xl font-extrabold text-foreground tabular-nums">
            {count}
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Button
          onClick={() => setRunning((r) => !r)}
          size="lg"
          className="rounded-full font-bold"
        >
          {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={reset}
          size="lg"
          variant="secondary"
          className="rounded-full font-bold"
        >
          <RotateCcw className="h-5 w-5" />
          Reset
        </Button>
      </div>

      <p className="mt-4 text-sm font-medium text-muted-foreground">
        Cycles completed: <span className="font-bold text-foreground">{cycles}</span>
      </p>
    </div>
  )
}
