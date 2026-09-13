# Project Rules

## Purpose

This file is the domain pack for `Algorithm Visualizer Lab`. Replace this placeholder content with project-specific rules before starting implementation.

Generic workflow belongs in `docs/meta/`. Reusable harness guidance belongs in `docs/harness/`. Project-specific product, content, safety, design, and architecture rules belong here.

## Project Identity

- Project name: `Algorithm Visualizer Lab`
- Domain: `interactive data structures and algorithms learning website`
- Primary user: `students learning data structures and algorithm design`
- MVP focus: `explore sorting and array algorithms with editable inputs and step-by-step visualization`

## Domain-Specific Quality Rules

- This project must not become `a generic algorithm demo without inspectable state`.
- Core user actions must support `understand one algorithm step at a time and connect code to visual state`.
- Content examples must follow `examples, explanations, and algorithm steps must be marked draft or reviewed` when applicable.
- Feedback should explain `every visual state should explain the operation and why it matters`.

## Domain-Specific Failure Modes

- Generic app drift.
- Overbuilding platform infrastructure before the MVP loop is clear.
- Treating placeholder content as final content.
- Adding integrations before the workflow needs them.

## Domain-Specific Verification

- Does the task support the MVP loop?
- Does the change preserve domain-specific rules?
- Does the task avoid known failure modes?
- Does the handoff identify domain-specific risks?
