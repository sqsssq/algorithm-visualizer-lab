# UI States

## Required States

- start state,
- active work state,
- success state,
- empty state,
- loading state,
- error state,
- invalid action state,
- completion state.

## Algorithm Workspace States

- `ready`: editable input is valid and a representative trace can be initialized.
- `playing`: the current comparison or swap animates automatically.
- `paused`: the current state remains visible without advancing.
- `stepping`: previous and next controls move through one comparison or swap at a time.
- `invalid-input`: non-numeric, empty, oversized, or Count Sort-incompatible input explains how to correct it.
- `complete`: final output, expected-output comparison, and a reset action are visible.

## Placeholder or Review State

If the product presents placeholder or unreviewed content, the UI or fixture should preserve that status.
