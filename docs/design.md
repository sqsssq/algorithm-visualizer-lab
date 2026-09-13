# Design Standards

## Product direction

Algorithm Visualizer Lab is a focused learning tool for data structures and algorithm design. The main experience is a visualization detail page: the learner selects an algorithm, edits a small input, watches the array state change, and connects each state to runnable-looking Python code.

The layout is informed by the reference structure at `https://coddy.tech/visualize/sorting/counting-sort?view=bars&speed=2&size=14`: a compact global header, breadcrumb/title block, a narrow algorithm navigation rail, one dominant visualization workspace, playback controls, custom input, and a code panel. The reference is a layout and interaction model, not a request to copy its brand, content, or exact styling.

## Layout system

- Desktop canvas: centered content column with a compact top navigation.
- Detail header: breadcrumb, algorithm title, last-updated metadata, and a clear return-home action.
- Main grid: narrow algorithm navigation on the left; visualization content on the right.
- Visualization card: status summary, Array/Bars view toggle, bar chart, legend, progress scrubber, and playback controls.
- Input row: custom numbers field, Visualize action, and input constraints.
- Code panel: full-width Python code with line numbers and the current line highlighted.
- Below the first viewport, additional teaching content may include explanation, complexity, worked example, and step-by-step tables.

## Visual language

- Use a restrained charcoal/navy neutral surface with one clear blue primary action and distinct semantic states: amber for comparing, coral for swapping, green for sorted.
- Use a rounded, friendly sans-serif display face for UI and headings; use a readable monospace face for code and step metadata.
- Keep borders subtle, controls compact, and whitespace consistent. The visualization card is the visual anchor; secondary controls must not compete with it.
- Do not use decorative hero artwork on the detail page. The array and code are the primary visual content.

## Interaction standards

- Algorithm navigation changes the active trace without leaving the detail page.
- Input editing is visible and validates integer limits before a trace is built.
- Play, pause, step back, step forward, shuffle, reset, speed, and size controls must work.
- The progress bar is draggable and scrubbing pauses playback.
- Each array item keeps a stable identity so a swap animates two bars moving to each other's positions.
- Array/Bars is a view toggle; Bars is the default visualization view.
- The language toggle switches the UI between English and Chinese rather than showing both simultaneously.
- Code line highlighting follows the current trace step.

## Responsive behavior

- At desktop widths, keep the algorithm rail and visualization side by side.
- At narrow widths, move the algorithm rail above the visualization and allow control rows to wrap.
- Preserve the chart, progress control, primary playback action, input field, and code readability on mobile.

## Accessibility

- Every control has an accessible name and visible focus state.
- Color states are reinforced with labels and operation text, not color alone.
- Inputs expose validation messages and constraints.
- Motion should be smooth but non-essential; respect `prefers-reduced-motion` in a future refinement.
