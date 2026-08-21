# Okay Tak Okay

A Malaysian youth mental-health awareness site extended with a bounded peer-support practice flow for the ASEAN Data Science Explorers 2026 concept.

## What is implemented

- Existing awareness content, stories, coping tool, and verified helplines
- `/practice`: a private, deterministic 8–10 minute learner
- Five-item baseline and post-check
- Two fixed three-choice scenarios: everyday support and severe-distress escalation
- Immediate explanatory feedback
- On-device summary: knowledge change, response accuracy, safe escalation, resource recall, and completion
- Always-visible support route
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

The deterministic scoring/content contract is in `tests/scenario-engine.test.ts`. The public-evidence contract is in `tests/evidence-context.test.ts`. Content and metrics are defined in `lib/scenario-engine.ts`, verified national context is defined in `lib/evidence-context.ts`, and the learner UI is in `components/scenario-learner.tsx`.

## Safety sources

- [Institute for Public Health — NHMS 2022 Adolescent Health Survey](https://iku.gov.my/nhms-ahs-2022)
- [Ministry of Health Malaysia — Let’s TALK](https://www.moh.gov.my/en/program-inisiatif/lets-talk)
- [Befrienders KL — I’m Worried About Someone](https://befrienders.org.my/get-help/im-worried-about-someone/)
- [WHO — Helping Adolescents Thrive guidelines](https://www.who.int/publications/i/item/9789240011854)

For immediate danger in Malaysia, call **999** or go to the nearest hospital emergency department. Befrienders KL: **03-7627 2929**, free and available 24 hours every day.
