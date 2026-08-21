export type NationalEvidenceFact = {
  id: "depression" | "peer-support" | "suicidal-ideation"
  valuePct: number
  displayValue: string
  label: string
  referencePeriod: string
  sourceYear: number
  populationScope: string
  sourceLabel: string
  sourceUrl: string
  interpretationLimit: string
}

export type EvidenceToLearningItem = {
  evidenceId: NationalEvidenceFact["id"]
  learningObjective: string
  rationale: string
}

const populationScope = "School-going adolescents in Malaysian secondary schools"
const sourceUrl = "https://iku.gov.my/nhms-ahs-2022"
const interpretationLimit =
  "Descriptive population estimate with uncertainty; it does not diagnose an individual and does not establish causality."

export const nationalEvidenceFacts: NationalEvidenceFact[] = [
  {
    id: "depression",
    valuePct: 26.9,
    displayValue: "26.9%",
    label: "reported depression",
    referencePeriod: "NHMS survey instrument definition",
    sourceYear: 2022,
    populationScope,
    sourceLabel: "NHMS 2022 Adolescent Health Survey",
    sourceUrl,
    interpretationLimit,
  },
  {
    id: "peer-support",
    valuePct: 46.0,
    displayValue: "46.0%",
    label: "reported peer support",
    referencePeriod: "past 30 days",
    sourceYear: 2022,
    populationScope,
    sourceLabel: "NHMS 2022 Adolescent Health Survey",
    sourceUrl,
    interpretationLimit,
  },
  {
    id: "suicidal-ideation",
    valuePct: 13.1,
    displayValue: "13.1%",
    label: "reported suicidal ideation",
    referencePeriod: "past 12 months",
    sourceYear: 2022,
    populationScope,
    sourceLabel: "NHMS 2022 Adolescent Health Survey",
    sourceUrl,
    interpretationLimit,
  },
]

export const evidenceToLearning: EvidenceToLearningItem[] = [
  {
    evidenceId: "peer-support",
    learningObjective: "Listen without judgement and make support easier to reach.",
    rationale:
      "The protective-factor context supports practising supportive peer behaviour while keeping peers within a non-clinical role.",
  },
  {
    evidenceId: "depression",
    learningObjective: "Notice changes without labelling or diagnosing a peer.",
    rationale:
      "A population-level distress indicator supports recognition practice, not individual classification or treatment advice.",
  },
  {
    evidenceId: "suicidal-ideation",
    learningObjective: "Escalate an immediate safety concern to trusted adult or emergency help.",
    rationale:
      "The sensitive surveillance indicator supports a deterministic safety-learning objective, not individual risk prediction.",
  },
]
