export type AssessmentOption = {
  id: string
  label: string
}

export type AssessmentQuestion = {
  id: string
  prompt: string
  options: AssessmentOption[]
  correctOptionId: string
  explanation: string
}

export type ScenarioChoice = {
  id: string
  label: string
  isBest: boolean
  feedback: string
}

export type Scenario = {
  id: string
  title: string
  setting: string
  situation: string
  learningGoal: string
  requiresEscalation: boolean
  choices: ScenarioChoice[]
}

export type AnswerMap = Record<string, string>

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "first-response",
    prompt: "A friend has become withdrawn and says they feel overwhelmed. What is the best first response?",
    options: [
      { id: "listen", label: "Listen without judging and ask what support would feel helpful" },
      { id: "diagnose", label: "Tell them which mental-health condition they probably have" },
      { id: "dismiss", label: "Tell them everyone feels stressed and they should cheer up" },
    ],
    correctOptionId: "listen",
    explanation: "A supportive peer listens and encourages help. A peer does not diagnose or minimise distress.",
  },
  {
    id: "secrecy",
    prompt: "A friend says they may hurt themselves and asks you to keep it secret. What should you do?",
    options: [
      { id: "promise", label: "Promise secrecy so they continue trusting you" },
      { id: "escalate", label: "Stay with them and contact a trusted adult or emergency support now" },
      { id: "wait", label: "Wait until tomorrow to see whether they feel better" },
    ],
    correctOptionId: "escalate",
    explanation: "Immediate safety comes before secrecy. Involve a trusted adult or emergency support and do not leave the person alone.",
  },
  {
    id: "peer-role",
    prompt: "Which statement best describes a supportive peer's role?",
    options: [
      { id: "treat", label: "Provide treatment so professional help is unnecessary" },
      { id: "fix", label: "Solve the person's problems for them" },
      { id: "bridge", label: "Notice, listen, and help connect them with appropriate support" },
    ],
    correctOptionId: "bridge",
    explanation: "Peers can be a bridge to help, but they are not counsellors and are not responsible for treatment.",
  },
  {
    id: "urgent-risk",
    prompt: "Which situation needs urgent adult or emergency escalation?",
    options: [
      { id: "preference", label: "A friend prefers studying alone before an exam" },
      { id: "unsafe", label: "A friend says they cannot keep themselves safe tonight" },
      { id: "quiet", label: "A friend is quiet during one lunch break" },
    ],
    correctOptionId: "unsafe",
    explanation: "A statement about being unable to stay safe needs immediate escalation. Do not manage it alone.",
  },
  {
    id: "resource-recall",
    prompt: "Which Malaysian emotional-support line is free, confidential, and available 24 hours every day?",
    options: [
      { id: "befrienders", label: "Befrienders KL: 03-7627 2929" },
      { id: "school-only", label: "Only a school office during class hours" },
      { id: "social-feed", label: "An anonymous social-media account" },
    ],
    correctOptionId: "befrienders",
    explanation: "Befrienders KL provides free, confidential emotional support 24 hours every day at 03-7627 2929.",
  },
]

export const scenarios: Scenario[] = [
  {
    id: "withdrawal-and-worry",
    title: "Scene 1: Withdrawal and worry",
    setting: "After-school study group",
    situation:
      "Farid has stopped joining lunch, looks exhausted, and says worry keeps him awake. He tells you, “I don't want to make this a big deal.”",
    learningGoal: "Practise listening without judgement or amateur diagnosis, then offer a realistic bridge to support.",
    requiresEscalation: false,
    choices: [
      {
        id: "diagnose-farid",
        label: "Tell Farid he definitely has depression and needs treatment",
        isBest: false,
        feedback: "Concern is helpful, but diagnosing a peer is not. Describe what you noticed, listen, and help connect them with support.",
      },
      {
        id: "listen-and-bridge",
        label: "Say what you noticed, listen, and offer to approach a trusted adult together",
        isBest: true,
        feedback: "Good choice. It is specific, non-judgmental, and gives Farid control while making support easier to reach.",
      },
      {
        id: "minimise-farid",
        label: "Say everyone is stressed and suggest he distract himself",
        isBest: false,
        feedback: "Minimising can close the conversation. Start by listening and acknowledging that the experience sounds difficult.",
      },
    ],
  },
  {
    id: "immediate-safety",
    title: "Scene 2: Immediate safety",
    setting: "An evening message",
    situation:
      "Mei messages, “I don't think I can keep myself safe tonight. Please don't tell anyone.” You are not physically with her.",
    learningGoal: "Recognise an urgent safety signal and choose adult, professional, or emergency escalation instead of secrecy.",
    requiresEscalation: true,
    choices: [
      {
        id: "keep-secret",
        label: "Promise secrecy and try to handle the conversation alone",
        isBest: false,
        feedback: "Do not manage immediate risk alone or promise secrecy. Safety requires involving trusted adult or emergency support now.",
      },
      {
        id: "wait-until-school",
        label: "Suggest sleeping on it and speaking at school tomorrow",
        isBest: false,
        feedback: "Waiting is unsafe when someone says they cannot stay safe tonight. Escalate immediately.",
      },
      {
        id: "stay-and-escalate",
        label: "Keep contact, alert a trusted adult near Mei, and call 999 if danger is immediate",
        isBest: true,
        feedback: "Correct. Keep contact if safe, involve a trusted adult, and use emergency support for immediate danger. You are not betraying trust by protecting life.",
      },
    ],
  },
]

export function scoreAssessment(answers: AnswerMap) {
  const correct = assessmentQuestions.filter(
    (question) => answers[question.id] === question.correctOptionId,
  ).length
  const total = assessmentQuestions.length
  return {
    correct,
    total,
    percent: Math.round((correct / total) * 100),
  }
}

export function summarizeSession({
  baselineAnswers,
  postAnswers,
  scenarioChoices,
}: {
  baselineAnswers: AnswerMap
  postAnswers: AnswerMap
  scenarioChoices: AnswerMap
}) {
  const baseline = scoreAssessment(baselineAnswers)
  const post = scoreAssessment(postAnswers)
  const selectedChoices = scenarios.map((scenario) =>
    scenario.choices.find((choice) => choice.id === scenarioChoices[scenario.id]),
  )
  const bestChoiceCount = selectedChoices.filter((choice) => choice?.isBest).length
  const escalationScenario = scenarios.find((scenario) => scenario.requiresEscalation)
  const escalationChoice = escalationScenario?.choices.find(
    (choice) => choice.id === scenarioChoices[escalationScenario.id],
  )
  const resourceQuestion = assessmentQuestions.find((question) => question.id === "resource-recall")
  const completed =
    assessmentQuestions.every((question) =>
      question.options.some((option) => option.id === baselineAnswers[question.id]),
    ) &&
    assessmentQuestions.every((question) =>
      question.options.some((option) => option.id === postAnswers[question.id]),
    ) &&
    scenarios.every((scenario) =>
      scenario.choices.some((choice) => choice.id === scenarioChoices[scenario.id]),
    )

  return {
    baselineCorrect: baseline.correct,
    postCorrect: post.correct,
    improvement: post.correct - baseline.correct,
    supportiveResponseAccuracyPct: Math.round((bestChoiceCount / scenarios.length) * 100),
    safeEscalationSelected: Boolean(escalationChoice?.isBest),
    resourceRecallCorrect: Boolean(
      resourceQuestion && postAnswers[resourceQuestion.id] === resourceQuestion.correctOptionId,
    ),
    completed,
  }
}
