'use strict'

export function buildTimeStringForInternalUsage (hours, minutes) {
  return `${padStart(hours, 2, '0')}:${padStart(minutes, 2, '0')}`
}

export function detectPeriodFromString (str) {
  str = (str || '').toLowerCase()
  switch (str[0]) {
    case 'a': return 'am'
    case 'p': return 'pm'
    default: return null
  }
}

export function getPeriodOfTime (time) {
  const [hours] = parseTime(time)
  return hours >= 12 ? 'pm' : 'am'
}

export function parseTime (time) {
  if (typeof time !== 'string') {
    throw new Error(`Time must be a string, received ${typeof time}`)
  }

  const match = time.match(/^([0-9]{1,2}):([0-9]{1,2})$/)
  if (!match) {
    throw new Error(`Time passed is in invalid format, must be HH:mm, received ${time}`)
  }

  const hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)

  const { valid, reason } = validateMilitaryTime(hours, minutes)
  if (!valid) {
    throw new Error(`Error when parsing time '${time}': ${reason}`)
  }

  return [hours, minutes]
}

export function validateMilitaryTime (hours, minutes) {
  if (hours < 0) return { valid: false, reason: 'Hour cannot be less than 0' }
  if (hours > 23) return { valid: false, reason: 'Hour cannot be more than 23' }
  if (minutes < 0) return { valid: false, reason: 'Minute cannot be less than 0' }
  if (minutes > 59) return { valid: false, reason: 'Minute cannot be more than 59' }
  return { valid: true }
}

export function padStart (string, length, char) {
  string = String(string)
  return makePadding(length - string.length, char) + string
}

export function padEnd (string, length, char) {
  string = String(string)
  return string + makePadding(length - string.length, char)
}

function makePadding (size, char) {
  return [...Array(Math.max(size, 0))].map(() => char).join('')
}
