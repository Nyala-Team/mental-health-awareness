import assert from "node:assert/strict"
import test from "node:test"

import {
  assessmentQuestions,
  scenarios,
  scoreAssessment,
  summarizeSession,
} from "../lib/scenario-engine"


test("the bounded learning flow has five checks and exactly two deterministic scenarios", () => {
  assert.equal(assessmentQuestions.length, 5)
  assert.equal(scenarios.length, 2)
  for (const scenario of scenarios) {
    assert.equal(scenario.choices.length, 3)
    assert.equal(scenario.choices.filter((choice) => choice.isBest).length, 1)
  }
})

test("assessment scoring counts only the declared answer key", () => {
  const correct = Object.fromEntries(
    assessmentQuestions.map((question) => [question.id, question.correctOptionId]),
  )
  assert.deepEqual(scoreAssessment(correct), {
    correct: 5,
    total: 5,
    percent: 100,
  })

  assert.deepEqual(scoreAssessment({}), {
    correct: 0,
    total: 5,
    percent: 0,
  })
})

test("session summary reports learning change, response accuracy, escalation and recall", () => {
  const baselineAnswers = Object.fromEntries(
    assessmentQuestions.map((question, index) => [
      question.id,
      index < 2
        ? question.correctOptionId
        : question.options.find((option) => option.id !== question.correctOptionId)?.id ?? "",
    ]),
  )
  const postAnswers = Object.fromEntries(
    assessmentQuestions.map((question) => [question.id, question.correctOptionId]),
  )
  const scenarioChoices = Object.fromEntries(
    scenarios.map((scenario) => [
      scenario.id,
      scenario.choices.find((choice) => choice.isBest)?.id ?? "",
    ]),
  )

  assert.deepEqual(summarizeSession({ baselineAnswers, postAnswers, scenarioChoices }), {
    baselineCorrect: 2,
    postCorrect: 5,
    improvement: 3,
    supportiveResponseAccuracyPct: 100,
    safeEscalationSelected: true,
    resourceRecallCorrect: true,
    completed: true,
  })
})

test("unsafe crisis handling cannot count as safe escalation", () => {
  const safeScenario = scenarios.find((scenario) => scenario.requiresEscalation)
  assert.ok(safeScenario)
  const unsafe = safeScenario.choices.find((choice) => !choice.isBest)
  assert.ok(unsafe)

  const summary = summarizeSession({
    baselineAnswers: {},
    postAnswers: {},
    scenarioChoices: { [safeScenario.id]: unsafe.id },
  })

  assert.equal(summary.safeEscalationSelected, false)
  assert.equal(summary.completed, false)
})

test("session completion requires declared assessment option and scenario choice IDs", () => {
  const assessmentAnswers = Object.fromEntries(
    assessmentQuestions.map((question) => [question.id, question.options[0].id]),
  )
  const scenarioChoices = Object.fromEntries(
    scenarios.map((scenario) => [scenario.id, scenario.choices[0].id]),
  )
  const completeInput = {
    baselineAnswers: assessmentAnswers,
    postAnswers: assessmentAnswers,
    scenarioChoices,
  }

  assert.equal(
    summarizeSession({
      ...completeInput,
      baselineAnswers: { ...assessmentAnswers, [assessmentQuestions[0].id]: "not-an-option" },
    }).completed,
    false,
  )
  assert.equal(
    summarizeSession({
      ...completeInput,
      postAnswers: { ...assessmentAnswers, [assessmentQuestions[0].id]: "not-an-option" },
    }).completed,
    false,
  )
  assert.equal(
    summarizeSession({
      ...completeInput,
      scenarioChoices: { ...scenarioChoices, [scenarios[0].id]: "not-a-choice" },
    }).completed,
    false,
  )
})
