# Task 001: Build the sorting visualizer MVP

## Status

completed

## Goal

Give students a focused homepage workspace where they can edit an array and inspect sorting algorithms one comparison, shift, or swap at a time.

## In Scope

- React + TypeScript + Vite application shell.
- Bubble Sort, Insertion Sort, Quick Sort, and Counting Sort traces.
- Editable input and expected output fields with local input persistence.
- Play, pause, previous, next, reset, and speed controls.
- Bar visualization with values, indices, operation explanation, and pseudocode highlighting.
- Dedicated homepage with an algorithm library and a clear entry into the lab.
- Python code with synchronized line highlighting.
- Dark code-lab visual direction and bilingual labels.
- Stable item identity for position-based swap animation.
- Explicit return-to-home button and draggable trace progress control.
- Coddy-inspired visualization detail layout with algorithm navigation rail and dominant workspace card.

## Acceptance Criteria

- A user can open the homepage and immediately see a representative array trace.
- A user can edit an input array of up to 20 integers and reinitialize the trace.
- A user can switch between all four MVP algorithms.
- A user can move through deterministic steps and see the active operation and pseudocode line.
- A swap visibly moves the two participating bars to each other's positions.
- A user can drag the trace progress bar to inspect any generated step.
- Counting Sort rejects negative values with a specific correction message.
- A production build completes successfully.

## Verification

- `npm run build`
- `bash scripts/verify.sh --instance`
- Manual browser check at the local Vite preview: open homepage, edit input, switch to Counting Sort, and advance one step.
