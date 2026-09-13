# User Flows

## Primary Flow

```text
Open the learning workspace with a representative array
-> Edit the array or generate a new example
-> Select an algorithm and start its deterministic trace
-> Step, pause, or play while reading the highlighted operation
```

## Edge Flows

- `Invalid input is rejected with a specific correction message.`
- `Changing the input or algorithm resets the current trace and playback position.`
- `A trace reaches its final state and disables forward playback until reset or rerun.`
