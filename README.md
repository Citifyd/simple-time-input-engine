# simple-time-input-engine

Engine for implementing a time input field that accepts flexible inputs. It has support for 12 and 24 hours.

## Installation

`npm install simple-time-input-engine --save`

## API

### `parseInputChange`

Receives an input (`newValue`), a previous input (`previousTime`) and a `clockMode`, and outputs a time string in 24-hour format.

```js
import { parseInputChange } from 'simple-time-input-engine'

const { valid, time } = parseInputChange({ newValue: '6am', previousTime: '10:00', clockMode: 12 })

console.log(valid) // true
console.log(time)  // "06:00"
```

- The input (`newValue`) is flexible, you can pass different strings such as `06:00`, `6:30`, `630`, `630a`, `630p`, `6a`, `6p`, `6`, etc. If you pass an empty string, the result will be an empty string.
- The previous input (`previousTime`) must be in 24-hour format, or an empty string.
- If a non-supported time input is passed, it'll return an object `{ "valid": false }` with no `time` key.
- `clockMode` is used for activating inference of the period of day based on the previous value. So if you pass `630` and the previous time is `13:00` (1pm), the new value will be `18:30` (6:30pm). If the previous time is `01:00` (1am), it will infer the new time as `06:30` (6:30am).
- This library assumes your implementation of the input field stores the time internally in 24-hour format, so `parseInputChange` will always return in 24-hour despite the `clockMode` passed. `clockMode` is only used for activating the period inference described above.

### `formatTimeForDisplay`

Transforms the input time in 24-hour format to an output in 12 or 24-hour format, based on the `clockMode` passed.

```js
import { formatTimeForDisplay } from 'simple-time-input-engine'

console.log(formatTimeForDisplay({ time: '', clockMode })) // ""

console.log(formatTimeForDisplay({ time: '05:00', clockMode: 12 })) // "5:00am"
console.log(formatTimeForDisplay({ time: '17:00', clockMode: 12 })) // "5:00pm"

console.log(formatTimeForDisplay({ time: '05:00', clockMode: 24 })) // "05:00"
console.log(formatTimeForDisplay({ time: '17:00', clockMode: 24 })) // "17:00"
```
