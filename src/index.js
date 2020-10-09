'use strict'

import {
  buildTimeStringForInternalUsage,
  detectPeriodFromString,
  getPeriodOfTime,
  padStart,
  padEnd,
  parseTime
} from './internal'

export function formatTimeForDisplay ({ time, clockMode }) {
  if (time === '') {
    return ''
  }

  if (clockMode === 12) {
    const [hours, minutes] = parseTime(time)
    const period = hours >= 12 ? 'pm' : 'am'
    const twelveHourClockHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours)
    return `${twelveHourClockHours}:${padStart(minutes, 2, '0')}${period}`
  }

  if (clockMode === 24) {
    const [hours, minutes] = parseTime(time)
    return `${padStart(hours, 2, '0')}:${padStart(minutes, 2, '0')}`
  }

  throw new Error(`Unexpected clockMode ${JSON.stringify(clockMode)}`)
}

export function parseInputChange ({ newValue, previousTime, clockMode }) {
  newValue = newValue.replace(/\s/g, '').toLowerCase()

  if (newValue === '') {
    return { valid: true, time: '' }
  }

  const match = newValue.match(/^([0-9]{1,2}:[0-9]{0,2}|[0-9]{1,4})([a-z]*)$/)
  if (!match) {
    return { valid: false }
  }

  let timePart = match[1]
  const textPart = match[2]
  let detectedPeriod = detectPeriodFromString(textPart)

  if (timePart.indexOf(':') === -1) {
    if (timePart.length === 1) {
      // '1' -> '1:'
      timePart = `${timePart}:`
    } else if (timePart.length === 3) {
      // '105' -> '1:05'
      timePart = `${timePart[0]}:${timePart.slice(1)}`
    } else {
      // '10' -> '10:'
      // '1055' -> '10:55'
      timePart = `${timePart.slice(0, 2)}:${timePart.slice(2)}`
    }
  }

  // for timePart = '10:55' => hoursString = '10', minutesString = '55'
  // for timePart = '10:5'  => hoursString = '10', minutesString = '5' -> minute should later be converted to 50
  // for timePart = '1:'    => hoursString = '1',  minutesString = ''  -> minute should later be converted to 0
  let [hoursString, minutesString] = timePart.split(':')

  // '10' -> '10'
  // '05' -> '05'
  // '5'  -> '50'
  // ''   -> '00'
  minutesString = padEnd(minutesString, 2, '0')

  let hours = parseInt(hoursString, 10)
  const minutes = parseInt(minutesString, 10)

  if (hours === 24) {
    hours = 0
  }

  // hours > 24 can happen if newValue = '25:00' or '60'
  if (hours > 24 || minutes > 59) {
    return { valid: false }
  }

  // If user types any hour such as 13am, 14am, 15am, etc... we should never convert it to 'am' as it doesn't make sense.
  // make sure it's detected as PM
  if (hours > 12 && detectedPeriod === 'am') {
    detectedPeriod = 'pm'
  }

  if (clockMode === 12 && !detectedPeriod && previousTime && hours > 0 && hours <= 12) {
    detectedPeriod = getPeriodOfTime(previousTime)
  }

  if (detectedPeriod === 'pm' && hours >= 0 && hours < 12) {
    hours += 12
  } else if (detectedPeriod === 'am' && hours === 12) {
    hours = 0
  }

  return {
    valid: true,
    time: buildTimeStringForInternalUsage(hours, minutes)
  }
}
