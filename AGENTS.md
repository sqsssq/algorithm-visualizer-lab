# AGENTS.md

`Algorithm Visualizer Lab` uses a PRD-first, task-based, harness-oriented AI development workflow with Codex.

Customize project-specific rules and PRD files before starting implementation.

## Project Context

- Project name: `Algorithm Visualizer Lab`
- Domain: `interactive data structures and algorithms learning website`
- Primary user: `students learning data structures and algorithm design`
- Current MVP focus: `explore sorting and array algorithms with editable inputs and step-by-step visualization`
- Explicit non-goals: `user-authored arbitrary code execution, persistent multi-user accounts, grading workflows, and broad coverage of every data structure in the first release`

Do not treat this project as a generic app. Read `docs/domain/PROJECT_RULES.md` for project-specific quality rules and failure modes.

## Core Workflow

```text
Idea / PRD
-> Task breakdown
-> Implement one small task
-> Run verification
-> Review diff
-> Human handoff
-> Human approval
-> Commit only after approval
```

## Workflow Modules

| Situation | Required Guide |
| --- | --- |
| User gives a vague product idea | `docs/meta/PRD_GENERATOR.md` |
| User asks to split PRD into tasks | `docs/meta/TASK_BREAKDOWN_GUIDE.md` |
| User asks to implement a task | `docs/meta/TASK_EXECUTION_GUIDE.md` |
| User changes or expands scope | `docs/meta/CHANGE_REQUEST_GUIDE.md` |
| User asks to verify implementation | `docs/meta/VERIFICATION_GUIDE.md` |
| User asks to review changed diff | `docs/meta/DIFF_REVIEW_GUIDE.md` |
| User asks for review-ready summary | `docs/meta/HUMAN_HANDOFF_GUIDE.md` |
| User approves and asks to commit | `docs/meta/COMMIT_GUIDE.md` |

## Repository Map

```text
docs/prd/       product direction and MVP boundaries
docs/tasks/     small implementation tasks
docs/meta/      reusable AI development workflow
docs/harness/   harness maturity, sensors, and failure patterns
docs/domain/    project-specific guardrails
docs/design.md  project-specific design standards
config/         initialization config examples
scripts/        verification entry points
```

## Working Agreements

- Keep the MVP focused on `explore sorting and array algorithms with editable inputs and step-by-step visualization`.
- Keep project-specific quality rules in `docs/domain/PROJECT_RULES.md`.
- Keep project-specific design standards in `docs/design.md`.
- Implement one small complete task at a time.
- Track task status using `docs/tasks/README.md`; do not call work done just because implementation is complete.
- Every task must have acceptance criteria and a verification method.
- If a task changes product behavior, update the relevant PRD or decision log in the same change set.
- If a user request changes scope, classify it with `docs/meta/CHANGE_REQUEST_GUIDE.md` before absorbing it into the current task.
- Run available verification before handoff.
- Do not commit without human approval.
- After the user approves a change or asks to commit, commit the relevant verified change set and push it to the current remote branch unless the user explicitly says not to push.

## Before Implementation

Before implementing a task, the agent must:

1. Read the relevant task file in `docs/tasks/`.
2. Read the PRD files referenced by the task.
3. Read relevant domain rules in `docs/domain/`.
4. Read relevant design standards in `docs/design.md` when UI or experience is affected.
5. Read relevant harness rules in `docs/harness/`.
6. Restate the task scope.
7. Confirm what is out of scope.
8. Implement the smallest complete slice.

## Verification

Prefer using:

```bash
bash scripts/verify.sh
```

Do not claim verification passed unless it actually ran or the relevant acceptance criteria were manually checked.
