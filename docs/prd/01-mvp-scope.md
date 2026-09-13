# MVP Scope

## In Scope

- `A single-page learning workspace for arrays and sorting algorithms.`
- `Editable numeric input, generated examples, expected output, and validation feedback.`
- `Deterministic step playback with play, pause, previous, next, reset, speed, pseudocode highlighting, and explanations.`

## Out of Scope

- `Executing arbitrary user-authored JavaScript or Python in the browser.`
- `Accounts, cloud persistence, social sharing, and instructor grading.`
- `Trees, graphs, and advanced algorithm families before the array/sorting workflow is validated.`

## MVP Boundary

The first implementation should prove this loop:

```text
Edit or generate an input array
-> Choose a sorting algorithm and initialize its trace
-> Play or inspect one algorithm step at a time
-> Review the final output and explanation
```
