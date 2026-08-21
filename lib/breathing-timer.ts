export type BreathingPhase = {
  label: "Breathe in" | "Hold" | "Breathe out"
  seconds: number
}

export type BreathingState = {
  phaseIndex: number
  secondsRemaining: number
  cyclesCompleted: number
}

export const breathingPhases: readonly BreathingPhase[] = [
  { label: "Breathe in", seconds: 4 },
  { label: "Hold", seconds: 7 },
  { label: "Breathe out", seconds: 8 },
]

export function initialBreathingState(): BreathingState {
  return {
    phaseIndex: 0,
    secondsRemaining: breathingPhases[0].seconds,
    cyclesCompleted: 0,
  }
}

export function tickBreathing(state: BreathingState): BreathingState {
  if (state.secondsRemaining > 1) {
    return { ...state, secondsRemaining: state.secondsRemaining - 1 }
  }

  const nextPhaseIndex = (state.phaseIndex + 1) % breathingPhases.length
  return {
    phaseIndex: nextPhaseIndex,
    secondsRemaining: breathingPhases[nextPhaseIndex].seconds,
    cyclesCompleted:
      state.cyclesCompleted + (nextPhaseIndex === 0 ? 1 : 0),
  }
}
