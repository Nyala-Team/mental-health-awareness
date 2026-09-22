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
  /** Malaysian cultural theme tag */
  culturalTag: "keluarga" | "akademik" | "kerja" | "sosial" | "krisis"
  /** 1 = introductory, 2 = moderate, 3 = challenging */
  difficulty: 1 | 2 | 3
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
    explanation:
      "Immediate safety comes before secrecy. Involve a trusted adult or emergency support and do not leave the person alone.",
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
    explanation:
      "Peers can be a bridge to help, but they are not counsellors and are not responsible for treatment.",
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
    explanation:
      "A statement about being unable to stay safe needs immediate escalation. Do not manage it alone.",
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
    explanation:
      "Befrienders KL provides free, confidential emotional support 24 hours every day at 03-7627 2929.",
  },
]

export const scenarios: Scenario[] = [
  {
    id: "withdrawal-and-worry",
    title: "Scene 1: Withdrawal and worry",
    setting: "After-school study group — Shah Alam",
    situation:
      "Farid has stopped joining lunch, looks exhausted, and says worry keeps him awake. He tells you, \"I don't want to make this a big deal.\"",
    learningGoal:
      "Practise listening without judgement or amateur diagnosis, then offer a realistic bridge to support.",
    requiresEscalation: false,
    culturalTag: "akademik",
    difficulty: 1,
    choices: [
      {
        id: "diagnose-farid",
        label: "Tell Farid he definitely has depression and needs treatment",
        isBest: false,
        feedback:
          "Concern is helpful, but diagnosing a peer is not. Describe what you noticed, listen, and help connect them with support.",
      },
      {
        id: "listen-and-bridge",
        label: "Say what you noticed, listen, and offer to approach a trusted adult together",
        isBest: true,
        feedback:
          "Good choice. It is specific, non-judgmental, and gives Farid control while making support easier to reach.",
      },
      {
        id: "minimise-farid",
        label: "Say everyone is stressed and suggest he distract himself",
        isBest: false,
        feedback:
          "Minimising can close the conversation. Start by listening and acknowledging that the experience sounds difficult.",
      },
    ],
  },
  {
    id: "immediate-safety",
    title: "Scene 2: Immediate safety",
    setting: "An evening message — Petaling Jaya",
    situation:
      "Mei messages, \"I don't think I can keep myself safe tonight. Please don't tell anyone.\" You are not physically with her.",
    learningGoal:
      "Recognise an urgent safety signal and choose adult, professional, or emergency escalation instead of secrecy.",
    requiresEscalation: true,
    culturalTag: "krisis",
    difficulty: 3,
    choices: [
      {
        id: "keep-secret",
        label: "Promise secrecy and try to handle the conversation alone",
        isBest: false,
        feedback:
          "Do not manage immediate risk alone or promise secrecy. Safety requires involving trusted adult or emergency support now.",
      },
      {
        id: "wait-until-school",
        label: "Suggest sleeping on it and speaking at school tomorrow",
        isBest: false,
        feedback:
          "Waiting is unsafe when someone says they cannot stay safe tonight. Escalate immediately.",
      },
      {
        id: "stay-and-escalate",
        label: "Keep contact, alert a trusted adult near Mei, and call 999 if danger is immediate",
        isBest: true,
        feedback:
          "Correct. Keep contact if safe, involve a trusted adult, and use emergency support for immediate danger. You are not betraying trust by protecting life.",
      },
    ],
  },
  {
    id: "spm-family-pressure",
    title: "Scene 3: SPM pressure and family expectations",
    setting: "Family home — Johor Bahru, one month before SPM",
    situation:
      "Your classmate Amirah tells you quietly after class: \"My parents say SPM results define my whole future. I haven't slept in days. I feel like I'm going to fail them no matter what.\" She looks close to tears.",
    learningGoal:
      "Acknowledge academic and family pressure specific to Malaysian context without minimising, and suggest a next step that respects family relationships.",
    requiresEscalation: false,
    culturalTag: "keluarga",
    difficulty: 2,
    choices: [
      {
        id: "dismiss-spm",
        label: "Tell her SPM isn't everything and she should relax — exams are not worth worrying about",
        isBest: false,
        feedback:
          "Minimising the pressure — even with good intent — can feel dismissive. Acknowledge how real and heavy the pressure feels for her before suggesting next steps.",
      },
      {
        id: "listen-and-school-counsellor",
        label:
          "Acknowledge that the pressure sounds exhausting, listen fully, then mention the school counsellor (Kaunselor) as a safe, confidential option",
        isBest: true,
        feedback:
          "Excellent. Validating her experience first builds trust. School counsellors are bound by confidentiality and can help with exam stress without alarming her parents unnecessarily.",
      },
      {
        id: "tell-parents-directly",
        label: "Tell her parents yourself that she is struggling and not coping",
        isBest: false,
        feedback:
          "Acting without her consent can damage trust and may escalate pressure from home. Help her choose who to involve and how, unless there is an immediate safety concern.",
      },
    ],
  },
  {
    id: "workplace-burnout",
    title: "Scene 4: First-job burnout",
    setting: "Office break room — Kuala Lumpur, fresh graduate context",
    situation:
      "Your colleague Darren, 23, who joined the same batch as you, tells you he's been crying in the bathroom before work and dreads every morning. \"I feel like everyone else is coping fine. Maybe I'm just too weak for this.\" He has not told HR or his manager.",
    learningGoal:
      "Challenge the 'weakness' stigma narrative in a workplace context and help connect to an employee or external resource.",
    requiresEscalation: false,
    culturalTag: "kerja",
    difficulty: 2,
    choices: [
      {
        id: "tell-hr-now",
        label: "Tell HR on his behalf without asking him — it's for his own good",
        isBest: false,
        feedback:
          "Acting on someone's behalf without consent erodes trust and may have unintended professional consequences for them. Explore what he would be comfortable with first.",
      },
      {
        id: "compare-others",
        label: "Tell him to look on the bright side — others have it worse",
        isBest: false,
        feedback:
          "Comparison dismisses his experience and reinforces the 'weakness' narrative. Acknowledge that burnout is a real workplace stressor, not a personal failing.",
      },
      {
        id: "validate-and-options",
        label:
          "Challenge the 'weakness' label, listen, and mention that Befrienders or Talian Kasih are confidential options he can explore privately",
        isBest: true,
        feedback:
          "Well done. Naming the stigma myth directly ('this is not weakness') is powerful. Offering confidential external options gives him agency without forcing a decision.",
      },
    ],
  },
  {
    id: "social-media-comparison",
    title: "Scene 5: Social comparison and self-worth",
    setting: "WhatsApp group chat — between Form 4 classmates, Penang",
    situation:
      "Priya DMs you: \"Everyone in our class looks so happy and successful on Instagram. I delete my posts because they're not good enough. I feel invisible and like I don't matter. What's the point?\" She ends with a laughing emoji.",
    learningGoal:
      "Recognise that deflecting humour (the laughing emoji) can mask serious distress, and respond to the emotional content rather than the emoji.",
    requiresEscalation: false,
    culturalTag: "sosial",
    difficulty: 2,
    choices: [
      {
        id: "laugh-it-off",
        label: "Reply with laughing emojis too — she used one so she's probably joking",
        isBest: false,
        feedback:
          "Humour is often used to mask distress, especially in text. The phrase 'I don't matter' carries weight. Respond to the emotional content, not just the tone.",
      },
      {
        id: "lecture-social-media",
        label: "Lecture her about how social media is fake and she should delete the apps",
        isBest: false,
        feedback:
          "Advice-first responses can feel dismissive. She needs to feel heard before being offered solutions. A lecture may make her regret opening up.",
      },
      {
        id: "acknowledge-and-check",
        label:
          "Acknowledge what she shared, set aside the emoji, and gently ask: 'When you say you don't matter — can you tell me more about that?'",
        isBest: true,
        feedback:
          "Excellent. Following up on 'I don't matter' directly, calmly, and without panic shows that you heard the real message. This opens the door for her to share more if she needs to.",
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
