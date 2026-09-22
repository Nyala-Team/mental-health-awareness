export type QuizOption = {
  id: string
  label: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: QuizOption[]
  correctOptionId: string
  explanation: string
  culturalNote?: string
  source?: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "stigma-seeking",
    prompt: "In Malaysian culture, which phrase is often used to discourage someone from seeking mental health help?",
    options: [
      { id: "a", label: "\u201cAmbil mudah\u201d \u2014 don\u2019t overthink it" },
      { id: "b", label: "\u201cNanti orang ingat gila\u201d \u2014 people will think you\u2019re crazy" },
      { id: "c", label: "\u201cSuka hati\u201d \u2014 do as you please" },
    ],
    correctOptionId: "b",
    explanation:
      '"Nanti orang ingat gila" is a common stigma-driven phrase that discourages help-seeking by linking mental health care to shame or social judgment. Stigma is one of the top barriers to care in Malaysia.',
    culturalNote: "Recognising this phrase helps you support friends who hesitate to seek help.",
    source: "NHMS 2022 & Ministry of Health Malaysia (MOH)",
  },
  {
    id: "depression-prevalence",
    prompt: "According to the NHMS 2022 Adolescent Health Survey, what percentage of school-going Malaysian adolescents reported depression?",
    options: [
      { id: "a", label: "About 8%" },
      { id: "b", label: "About 18%" },
      { id: "c", label: "About 27%" },
    ],
    correctOptionId: "c",
    explanation:
      "26.9% — nearly 1 in 4 — school-going adolescents in Malaysian secondary schools reported depression according to the NHMS 2022 survey instrument. This underscores how widespread emotional distress is among Malaysian youth.",
    source: "NHMS 2022 Adolescent Health Survey (IKU, MOH Malaysia)",
  },
  {
    id: "bersyukur-myth",
    prompt: 'Someone says: "Just be bersyukur (grateful) — having problems means you\'re not grateful enough." What is wrong with this view?',
    options: [
      { id: "a", label: "Nothing — gratitude always cures mental distress" },
      { id: "b", label: "Mental health conditions are medical in nature and not a sign of weak faith or ingratitude" },
      { id: "c", label: "Only religious counselling can help, not Western psychology" },
    ],
    correctOptionId: "b",
    explanation:
      'Equating mental illness with ingratitude or weak faith is a harmful myth. Mental health conditions involve biological, psychological, and social factors. Being "bersyukur" is valuable but does not replace professional care when needed.',
    culturalNote: 'This myth is especially common in Malay-Muslim communities. Both faith and professional care can coexist.',
  },
  {
    id: "peer-support-stat",
    prompt: "The NHMS 2022 survey found that peer support is the most commonly reported protective factor for Malaysian adolescents. Approximately what percentage reported having peer support?",
    options: [
      { id: "a", label: "About 25%" },
      { id: "b", label: "About 46%" },
      { id: "c", label: "About 70%" },
    ],
    correctOptionId: "b",
    explanation:
      "46.0% of school-going Malaysian adolescents reported peer support in the past 30 days — making it the most reported protective factor. This highlights how powerful your role as a supportive friend can be.",
    source: "NHMS 2022 Adolescent Health Survey",
  },
  {
    id: "crisis-line",
    prompt: "You are worried about a friend. Which Malaysian line is FREE, CONFIDENTIAL, and available 24 hours every day for emotional support?",
    options: [
      { id: "a", label: "Befrienders KL: 03-7627 2929" },
      { id: "b", label: "A hospital emergency department" },
      { id: "c", label: "A private psychiatry clinic" },
    ],
    correctOptionId: "a",
    explanation:
      "Befrienders KL offers free, confidential, 24/7 emotional support at 03-7627 2929. For immediate danger, always call 999. Talian Kasih (15999) and Talian HEAL (15555) are also available Malaysian support lines.",
    culturalNote: "Knowing the right number can make all the difference in a moment of crisis.",
  },
  {
    id: "suicidal-ideation-stat",
    prompt: "What percentage of Malaysian school adolescents reported suicidal ideation in the past 12 months (NHMS 2022)?",
    options: [
      { id: "a", label: "About 2%" },
      { id: "b", label: "About 13%" },
      { id: "c", label: "About 30%" },
    ],
    correctOptionId: "b",
    explanation:
      "13.1% of school-going Malaysian adolescents reported suicidal ideation in the past 12 months. This statistic emphasises why recognising safety signals and knowing escalation steps matters for everyone, not just counsellors.",
    source: "NHMS 2022 Adolescent Health Survey",
  },
  {
    id: "peer-role",
    prompt: "As a supportive peer (bukan kaunselor), what is your primary role when a friend is struggling?",
    options: [
      { id: "a", label: "Diagnose their condition and recommend specific treatments" },
      { id: "b", label: "Tell them to snap out of it — stress is normal" },
      { id: "c", label: "Notice, listen without judgement, and help connect them to appropriate support" },
    ],
    correctOptionId: "c",
    explanation:
      'A peer\'s role is to be a "bridge to help" — not a counsellor or clinician. Noticing changes, listening with empathy, and helping connect someone with real support can be life-saving. You don\'t need to fix it alone.',
    culturalNote: 'In Malaysian culture, "jaga kawan" (look after your friends) is already practised — mental health awareness adds the skills to do it safely.',
  },
  {
    id: "care-seeking-barrier",
    prompt: "Research shows the most common barrier to mental health care in Malaysia is:",
    options: [
      { id: "a", label: "Lack of awareness that services exist" },
      { id: "b", label: "Social stigma and fear of judgment from family/community" },
      { id: "c", label: "All mental health services are too expensive" },
    ],
    correctOptionId: "b",
    explanation:
      "Social stigma — fear of being labelled, judged, or bringing shame (malu) to family — is consistently identified as the primary barrier to care-seeking in Malaysian research. Government Klinik Kesihatan also provide low-cost mental health screening and referrals.",
    source: "MOH Malaysia Mental Health Policy & NHMS findings",
  },
]

export type QuizAnswerMap = Record<string, string>

export function scoreQuiz(answers: QuizAnswerMap): {
  correct: number
  total: number
  pct: number
  wrongIds: string[]
} {
  const wrongIds: string[] = []
  let correct = 0
  for (const q of quizQuestions) {
    if (answers[q.id] === q.correctOptionId) {
      correct++
    } else {
      wrongIds.push(q.id)
    }
  }
  return {
    correct,
    total: quizQuestions.length,
    pct: Math.round((correct / quizQuestions.length) * 100),
    wrongIds,
  }
}
