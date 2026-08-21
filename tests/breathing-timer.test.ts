import assert from "node:assert/strict"
import test from "node:test"

import { initialBreathingState, tickBreathing } from "../lib/breathing-timer"

test("paced breathing advances from inhale to hold with the correct countdown", () => {
  let state = initialBreathingState()
  assert.deepEqual(state, { phaseIndex: 0, secondsRemaining: 4, cyclesCompleted: 0 })

  state = tickBreathing(state)
  assert.equal(state.secondsRemaining, 3)
  state = tickBreathing(state)
  assert.equal(state.secondsRemaining, 2)
  state = tickBreathing(state)
  assert.equal(state.secondsRemaining, 1)
  state = tickBreathing(state)

  assert.deepEqual(state, { phaseIndex: 1, secondsRemaining: 7, cyclesCompleted: 0 })
})

test("paced breathing completes inhale, hold and exhale as one cycle", () => {
  let state = initialBreathingState()
  for (let second = 0; second < 4 + 7 + 8; second += 1) {
    state = tickBreathing(state)
  }

  assert.deepEqual(state, { phaseIndex: 0, secondsRemaining: 4, cyclesCompleted: 1 })
})

test("paced breathing state transitions never emit invalid countdowns", () => {
  let state = initialBreathingState()
  for (let second = 0; second < 200; second += 1) {
    state = tickBreathing(state)
    assert.ok(state.phaseIndex >= 0 && state.phaseIndex <= 2)
    assert.ok(state.secondsRemaining >= 1 && state.secondsRemaining <= 8)
    assert.ok(state.cyclesCompleted >= 0)
  }
})
