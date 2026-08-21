# Okay Tak Okay

An independent Malaysian youth mental-health education prototype with a bounded peer-support practice flow supporting an ASEAN Data Science Explorers 2026 concept. It is not an organizer-endorsed service or SAC deliverable.

## What is implemented

- Educational content, explicitly illustrative stories, optional coping exercises, and external support contacts
- `/practice`: a deterministic 8–10 minute learner whose answers remain in page memory and are not transmitted or persisted by the application
- Five-item baseline and post-check
- Two fixed three-choice scenarios: everyday support and severe-distress escalation
- Immediate explanatory feedback
- On-device summary: same-session answer change, preferred-choice selection, safe escalation, resource recall, and completion
- Prominent support links in the page and practice header
- Homepage NHMS 2022 context with exact population, year, recall-period and interpretation limits
- Visible evidence → learning-objective bridge for peer support, recognition and safe escalation
- No login, free text, diagnosis, chatbot, cookies, analytics, or persistence

This is an educational prototype, **not** a screening, diagnostic, therapy, or crisis service. External Malaysian mental-health/safeguarding review is required before a school pilot.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/practice`.

## Quality gates

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

The deterministic scoring/content contract is in `tests/scenario-engine.test.ts`. Public evidence and claim boundaries are covered by `tests/evidence-context.test.ts` and `tests/content-claims.test.ts`. The paced-breathing transition contract is in `tests/breathing-timer.test.ts`. Content and metrics are defined in `lib/scenario-engine.ts`, verified national context is defined in `lib/evidence-context.ts`, and the learner UI is in `components/scenario-learner.tsx`.

## Safety sources

- [Institute for Public Health — NHMS 2022 Adolescent Health Survey](https://iku.gov.my/nhms-ahs-2022)
- [Ministry of Health Malaysia — Let’s TALK](https://www.moh.gov.my/en/program-inisiatif/lets-talk)
- [Befrienders KL — I’m Worried About Someone](https://befrienders.org.my/get-help/im-worried-about-someone/)
- [WHO — Helping Adolescents Thrive guidelines](https://www.who.int/publications/i/item/9789240011854)

For immediate danger in Malaysia, call **999** or go to the nearest hospital emergency department. Befrienders KL: **03-7627 2929**, free and available 24 hours every day.
