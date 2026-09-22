import type { Metadata } from "next"
import { KnowledgeQuiz } from "@/components/knowledge-quiz"

export const metadata: Metadata = {
  title: "Mental Health Knowledge Quiz — Okay Tak Okay",
  description:
    "Test your knowledge of Malaysian mental health realities — stigma myths, national data, cultural barriers, and where to get help. Free, private, no account required.",
}

export default function QuizPage() {
  return <KnowledgeQuiz />
}
