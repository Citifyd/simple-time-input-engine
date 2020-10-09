'use strict'

const { parseInputChange } = require('../../src/index')
const { assert } = require('chai')

// Helper constants
const MORNING_TIME = '08:00' // use this when time must be in morning, but you don't care about the specific time
const AFTERNOON_TIME = '13:00' // use this when time must be in afternoon, but you don't care about the specific time
const ANY_TIME = '01:00' // use this when the time doesn't matter

const assertValidParseInputChangeResult = ({ input, expectedNewTime }) => {
  const { valid, time } = parseInputChange(input)
  assert.isTrue(valid, `Failed when ${JSON.stringify(input)}`)
  assert.equal(time, expectedNewTime, `Failed when ${JSON.stringify(input)}`)
}

const assertInvalidParseInputChangeResult = ({ input }) => {
  const { valid } = parseInputChange(input)
  assert.isFalse(valid, `Failed when ${JSON.stringify(input)}`)
}

describe('public api', () => {
  describe('parseInputChange', () => {
    describe('all modes', () => {
      it('should return time as empty string when newValue is empty', () => {
        for (const clockMode of [12, 24]) {
          assertValidParseInputChangeResult({
            input: { clockMode, newValue: '', previousTime: ANY_TIME },
            expectedNewTime: ''
          })
        }
      })

      it('should return object with valid = false when newValue is in invalid format', () => {
        for (const clockMode of [12, 24]) {
          for (const newValue of ['wat', '12345']) {
            assertInvalidParseInputChangeResult({
              input: { clockMode, newValue, previousTime: ANY_TIME }
            })
          }
        }
      })

      it("should use period informed on newValue to generate result if it's specified, no matter what period of day of the previousTime is", () => {
        for (const clockMode of [12, 24]) {
          // checks support for a variety of different inputs for 06:00 (6am)
          for (const newValue of ['6a', '6am', '06a', '06am', '6:00am', '06:00am', '600am', '0600am']) {
            assertValidParseInputChangeResult({
              input: { clockMode, newValue, previousTime: MORNING_TIME },
              expectedNewTime: '06:00'
            })
            assertValidParseInputChangeResult({
              input: { clockMode, newValue, previousTime: AFTERNOON_TIME },
              expectedNewTime: '06:00'
            })
          }

          // checks support for a variety of different inputs for 18:00 (6pm)
          for (const newValue of ['6p', '6pm', '06p', '06pm', '6:00pm', '06:00pm', '600pm', '0600pm', '18', '1800']) {
            assertValidParseInputChangeResult({
              input: { clockMode, newValue, previousTime: MORNING_TIME },
              expectedNewTime: '18:00'
            })
            assertValidParseInputChangeResult({
              input: { clockMode, newValue, previousTime: AFTERNOON_TIME },
              expectedNewTime: '18:00'
            })
          }

          // makes sure midnight is always returned if '0:00'-like time is provided
          for (const newValue of ['0:00', '00:00', '0', '000']) {
            assertValidParseInputChangeResult({
              input: { clockMode, newValue, previousTime: MORNING_TIME },
              expectedNewTime: '00:00'
            })
            assertValidParseInputChangeResult({
              input: { clockMode, newValue, previousTime: AFTERNOON_TIME },
              expectedNewTime: '00:00'
            })
          }
        }
      })
    })

    describe('when clockMode = 12', () => {
      it('should maintain same period of day of previousTime if period of day is not specified on newValue', () => {
        // AM
        for (const newValue of ['6:00', '06:00', '6', '06']) {
          assertValidParseInputChangeResult({
            input: { newValue, previousTime: MORNING_TIME, clockMode: 12 },
            expectedNewTime: '06:00'
          })
        }
        for (const newValue of ['06:35', '6:35', '0635', '635']) {
          assertValidParseInputChangeResult({
            input: { newValue, previousTime: MORNING_TIME, clockMode: 12 },
            expectedNewTime: '06:35'
          })
        }
        assertValidParseInputChangeResult({
          input: { newValue: '12:00', previousTime: MORNING_TIME, clockMode: 12 },
          expectedNewTime: '00:00'
        })

        // PM
        for (const newValue of ['06:00', '6:00', '6', '06']) {
          assertValidParseInputChangeResult({
            input: { newValue, previousTime: AFTERNOON_TIME, clockMode: 12 },
            expectedNewTime: '18:00'
          })
        }
        for (const newValue of ['06:35', '6:35', '0635', '635']) {
          assertValidParseInputChangeResult({
            input: { newValue, previousTime: AFTERNOON_TIME, clockMode: 12 },
            expectedNewTime: '18:35'
          })
        }
        assertValidParseInputChangeResult({
          input: { newValue: '12:00', previousTime: AFTERNOON_TIME, clockMode: 12 },
          expectedNewTime: '12:00'
        })
      })
    })

    describe('when clockMode = 24', () => {
      it('should not take period of day of previousTime into consideration', () => {
        // AM
        for (const newValue of ['6:00', '06:00', '6', '06']) {
          assertValidParseInputChangeResult({
            input: { newValue, previousTime: MORNING_TIME, clockMode: 24 },
            expectedNewTime: '06:00'
          })
        }
        for (const newValue of ['06:35', '6:35', '0635', '635']) {
          assertValidParseInputChangeResult({
            input: { newValue, previousTime: MORNING_TIME, clockMode: 24 },
            expectedNewTime: '06:35'
          })
        }
        assertValidParseInputChangeResult({
          input: { newValue: '12:00', previousTime: MORNING_TIME, clockMode: 24 },
          expectedNewTime: '12:00'
        })

        // PM
        for (const newValue of ['06:00', '6:00', '6', '06']) {
          assertValidParseInputChangeResult({
            input: { newValue, previousTime: AFTERNOON_TIME, clockMode: 24 },
            expectedNewTime: '06:00'
          })
        }
        for (const newValue of ['06:35', '6:35', '0635', '635']) {
          assertValidParseInputChangeResult({
            input: { newValue, previousTime: AFTERNOON_TIME, clockMode: 24 },
            expectedNewTime: '06:35'
          })
        }
        assertValidParseInputChangeResult({
          input: { newValue: '12:00', previousTime: AFTERNOON_TIME, clockMode: 24 },
          expectedNewTime: '12:00'
        })
      })
    })
  })
})
