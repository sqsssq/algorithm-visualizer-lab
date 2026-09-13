# Decision Log

## Accepted Decisions

### 2026-09-12: Adopt HarnessWeaver workflow

This project uses PRD-first planning, small task files, verification before handoff, diff review, and human approval before commit.

### 2026-09-12: Define the first product slice

- Scope: arrays and sorting visualization only.
- Algorithms: bubble sort, insertion sort, quicksort, and counting sort.
- Input: editable text array plus random generation; maximum 20 elements.
- Output: compute the algorithm output automatically and allow editing an expected output for comparison.
- Debugging: every comparison and swap is a separate step; support play, pause, previous, next, reset, and speed control.
- Code view: show pseudocode first; defer editable code execution to a later phase.
- Visuals: bar chart with values and indices.
- Language: bilingual Chinese and English.
- Persistence: save input locally in the browser.
- Responsive scope: desktop-first; mobile adaptation is deferred.
- Delivery: local preview first, then deployment after experience review.
- Theme: dark code-lab visual direction.

### 2026-09-12: Choose implementation direction

Use React, TypeScript, Vite, and Motion for the first implementation. Keep algorithm execution deterministic and separate from rendering so each visual state can be inspected, replayed, and verified.

### 2026-09-12: Refine homepage and teaching presentation

- Add a dedicated homepage with an algorithm library and a clear entry into the lab.
- Switch between English and Chinese instead of displaying both languages simultaneously.
- Show Python code with synchronized line highlighting; defer editable code execution.

### 2026-09-13: Reframe visualization detail layout

- Use the Coddy counting-sort visualization page as a structural reference: compact header, breadcrumb/title, algorithm rail, dominant visualization card, controls, custom input, and code panel.
- Keep Algorithm Visualizer Lab's own algorithms, bilingual behavior, trace model, and visual tokens; do not copy Coddy branding or page content.
- Preserve stable identities for array items so swaps animate as horizontal position changes.
- Add an explicit return-to-home button and a draggable trace progress bar alongside playback controls.
