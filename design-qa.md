# Design QA

source visual truth: `https://coddy.tech/visualize/sorting/counting-sort?view=bars&speed=2&size=14` and the user-supplied screenshot
implementation evidence: local Vite page at `http://127.0.0.1:5173/`, checked in the browser at desktop viewport
state checked: homepage, Counting Sort initial state, Bubble Sort step 4 SWAP state

## Comparison

- Reimplemented the frontend display layer from zero. The reference is used for information hierarchy and interaction rhythm: compact header, breadcrumb/title, left algorithm rail, dominant chart workspace, controls, custom input, and Python code panel.
- The implementation keeps its own product identity, bilingual toggle, algorithm set, trace model, colors, and explanatory copy instead of copying Coddy branding or content.
- The chart is stable-identity based. A SWAP step visibly marks both columns and updates their positions/values rather than shrinking the bars.

## Interaction checks

- Homepage → Start learning opens the visualization workspace.
- Step forward changes READY → COMPARE → SWAP, updates progress and comparison/swap counters, and highlights the active code line.
- Bubble, Insertion, Quick, and Counting Sort can be selected from the rail; input editing, size/speed sliders, play/pause, reset, shuffle, language toggle, and return-home controls are wired.

## Verification

- `npx tsc --noEmit` passed.
- `npm run build` passed.
- `bash scripts/verify.sh --instance` passed.

final result: passed
