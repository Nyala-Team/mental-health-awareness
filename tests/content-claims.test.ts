import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const publicContentFiles = [
  "app/layout.tsx",
  "app/practice/page.tsx",
  "components/feelings-section.tsx",
  "components/helplines-section.tsx",
  "components/hero.tsx",
  "components/practice-section.tsx",
  "components/resources-section.tsx",
  "components/scenario-learner.tsx",
  "components/site-footer.tsx",
  "components/site-header.tsx",
  "components/stories-section.tsx",
  "components/tools-section.tsx",
]

const publicContent = publicContentFiles
  .map((path) => readFileSync(resolve(path), "utf8"))
  .join("\n")

test("public content does not restore inherited unsupported service and research claims", () => {
  const forbiddenClaims = [
    "Real Stories",
    "Real stories",
    "young Malaysians tell us",
    "Most schools and universities have free counselling units",
    "Free &middot; Confidential &middot; Available in BM &amp; English",
    "These lines are free, confidential",
    "Mental Health Support for Malaysian Youth",
    "Calm your body in 60 seconds",
    "Rest is not lazy, it's healing",
    "Slow breathing calms your nervous system",
    "Practise being a safer first responder",
    "Private summary",
    '"Knowledge"',
    '"Responses"',
    "Best scenario choices",
  ]

  for (const claim of forbiddenClaims) {
    assert.equal(publicContent.includes(claim), false, `unsupported claim returned: ${claim}`)
  }
})

test("public content clearly labels the site's educational and illustrative scope", () => {
  assert.match(publicContent, /independent educational prototype/i)
  assert.match(publicContent, /Illustrative Stories/)
  assert.match(publicContent, /fictional composites/i)
  assert.match(publicContent, /not a counselling service/i)
  assert.match(publicContent, /They are not a diagnosis/i)
  assert.match(publicContent, /availability, cost, confidentiality, and response times differ by provider/i)
})
