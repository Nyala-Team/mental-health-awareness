import assert from "node:assert/strict"
import test from "node:test"

import { evidenceToLearning, nationalEvidenceFacts } from "../lib/evidence-context"

test("homepage evidence facts match the verified NHMS 2022 national indicators", () => {
  assert.deepEqual(
    nationalEvidenceFacts.map(({ id, valuePct, referencePeriod }) => ({
      id,
      valuePct,
      referencePeriod,
    })),
    [
      {
        id: "depression",
        valuePct: 26.9,
        referencePeriod: "NHMS survey instrument definition",
      },
      {
        id: "peer-support",
        valuePct: 46.0,
        referencePeriod: "past 30 days",
      },
      {
        id: "suicidal-ideation",
        valuePct: 13.1,
        referencePeriod: "past 12 months",
      },
    ],
  )
})

test("every evidence fact carries year, population scope, official provenance and interpretation limits", () => {
  for (const fact of nationalEvidenceFacts) {
    assert.equal(fact.sourceYear, 2022)
    assert.match(fact.populationScope, /school-going adolescents/i)
    assert.match(fact.sourceUrl, /^https:\/\/iku\.gov\.my\//)
    assert.match(fact.interpretationLimit, /not.*diagnos|does not.*diagnos/i)
    assert.match(fact.interpretationLimit, /not.*caus|does not.*caus/i)
  }
})

test("the evidence-to-learning bridge stays descriptive and non-clinical", () => {
  assert.deepEqual(
    evidenceToLearning.map(({ evidenceId, learningObjective }) => ({
      evidenceId,
      learningObjective,
    })),
    [
      {
        evidenceId: "peer-support",
        learningObjective: "Listen without judgement and make support easier to reach.",
      },
      {
        evidenceId: "depression",
        learningObjective: "Notice changes without labelling or diagnosing a peer.",
      },
      {
        evidenceId: "suicidal-ideation",
        learningObjective: "Escalate an immediate safety concern to trusted adult or emergency help.",
      },
    ],
  )

  for (const item of evidenceToLearning) {
    assert.doesNotMatch(item.rationale, /proves|causes|treats|prevents suicide/i)
  }
})
