"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { breathingPhases, initialBreathingState, tickBreathing } from "@/lib/breathing-timer"

export function BreathingTool() {
  const [running, setRunning] = useState(false)
  const [timerState, setTimerState] = useState(initialBreathingState)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setTimerState(tickBreathing)
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const reset = () => {
    setRunning(false)
    setTimerState(initialBreathingState())
  }

  const current = breathingPhases[timerState.phaseIndex]
  const scale =
    current.label === "Breathe in" ? "scale-100" : current.label === "Hold" ? "scale-100" : "scale-75"

  return (
    <div className="rounded-[2rem] border border-border/70 bg-card p-8 text-center">
      <h3 className="font-display text-2xl font-bold text-foreground">Try a paced breathing exercise</h3>
      <p className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
        If it feels comfortable, follow the circle: breathe in, hold, and slowly let go. Stop if you
        feel dizzy, short of breath, or uncomfortable.
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
            {timerState.secondsRemaining}
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
        Cycles completed:{" "}
        <span className="font-bold text-foreground">{timerState.cyclesCompleted}</span>
      </p>
    </div>
  )
}
