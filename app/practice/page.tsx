import type { Metadata } from "next"

import { ScenarioLearner } from "@/components/scenario-learner"

export const metadata: Metadata = {
  title: "Peer Support Practice — Okay Tak Okay",
  description:
    "A deterministic educational activity for practising supportive peer responses and safe escalation. No account, free text, or personal health data required.",
}

export default function PracticePage() {
  return <ScenarioLearner />
}
