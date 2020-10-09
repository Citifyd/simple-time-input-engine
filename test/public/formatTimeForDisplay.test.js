'use strict'

const { formatTimeForDisplay } = require('../../src/index')
const { assert } = require('chai')

describe('public api', () => {
  describe('formatTimeForDisplay', () => {
    it('should return empty string if input is empty string', () => {
      assert.equal(
        formatTimeForDisplay({ time: '', clockMode: 12 }),
        ''
      )
    })

    it('should throw an error if clickMode is not 12 or 24', () => {
      assert.throws(
        () => formatTimeForDisplay({ time: '15:00', clockMode: 'foo' }),
        'Unexpected clockMode "foo"'
      )
      assert.throws(
        () => formatTimeForDisplay({ time: '15:00' }),
        'Unexpected clockMode undefined'
      )
    })

    describe('when clockMode = 12', () => {
      it('should format hours properly', () => {
        assert.equal(formatTimeForDisplay({ time: '00:00', clockMode: 12 }), '12:00am')
        assert.equal(formatTimeForDisplay({ time: '01:00', clockMode: 12 }), '1:00am')
        assert.equal(formatTimeForDisplay({ time: '02:00', clockMode: 12 }), '2:00am')
        assert.equal(formatTimeForDisplay({ time: '03:00', clockMode: 12 }), '3:00am')
        assert.equal(formatTimeForDisplay({ time: '04:00', clockMode: 12 }), '4:00am')
        assert.equal(formatTimeForDisplay({ time: '05:00', clockMode: 12 }), '5:00am')
        assert.equal(formatTimeForDisplay({ time: '06:00', clockMode: 12 }), '6:00am')
        assert.equal(formatTimeForDisplay({ time: '07:00', clockMode: 12 }), '7:00am')
        assert.equal(formatTimeForDisplay({ time: '08:00', clockMode: 12 }), '8:00am')
        assert.equal(formatTimeForDisplay({ time: '09:00', clockMode: 12 }), '9:00am')
        assert.equal(formatTimeForDisplay({ time: '10:00', clockMode: 12 }), '10:00am')
        assert.equal(formatTimeForDisplay({ time: '11:00', clockMode: 12 }), '11:00am')
        assert.equal(formatTimeForDisplay({ time: '12:00', clockMode: 12 }), '12:00pm')
        assert.equal(formatTimeForDisplay({ time: '13:00', clockMode: 12 }), '1:00pm')
        assert.equal(formatTimeForDisplay({ time: '14:00', clockMode: 12 }), '2:00pm')
        assert.equal(formatTimeForDisplay({ time: '15:00', clockMode: 12 }), '3:00pm')
        assert.equal(formatTimeForDisplay({ time: '16:00', clockMode: 12 }), '4:00pm')
        assert.equal(formatTimeForDisplay({ time: '17:00', clockMode: 12 }), '5:00pm')
        assert.equal(formatTimeForDisplay({ time: '18:00', clockMode: 12 }), '6:00pm')
        assert.equal(formatTimeForDisplay({ time: '19:00', clockMode: 12 }), '7:00pm')
        assert.equal(formatTimeForDisplay({ time: '20:00', clockMode: 12 }), '8:00pm')
        assert.equal(formatTimeForDisplay({ time: '21:00', clockMode: 12 }), '9:00pm')
        assert.equal(formatTimeForDisplay({ time: '22:00', clockMode: 12 }), '10:00pm')
        assert.equal(formatTimeForDisplay({ time: '23:00', clockMode: 12 }), '11:00pm')
      })

      it('should format minutes properly', () => {
        assert.equal(formatTimeForDisplay({ time: '00:30', clockMode: 12 }), '12:30am')
      })
    })

    describe('when clockMode = 24', () => {
      it('should format hours properly', () => {
        assert.equal(formatTimeForDisplay({ time: '00:00', clockMode: 24 }), '00:00')
        assert.equal(formatTimeForDisplay({ time: '01:00', clockMode: 24 }), '01:00')
        assert.equal(formatTimeForDisplay({ time: '02:00', clockMode: 24 }), '02:00')
        assert.equal(formatTimeForDisplay({ time: '03:00', clockMode: 24 }), '03:00')
        assert.equal(formatTimeForDisplay({ time: '04:00', clockMode: 24 }), '04:00')
        assert.equal(formatTimeForDisplay({ time: '05:00', clockMode: 24 }), '05:00')
        assert.equal(formatTimeForDisplay({ time: '06:00', clockMode: 24 }), '06:00')
        assert.equal(formatTimeForDisplay({ time: '07:00', clockMode: 24 }), '07:00')
        assert.equal(formatTimeForDisplay({ time: '08:00', clockMode: 24 }), '08:00')
        assert.equal(formatTimeForDisplay({ time: '09:00', clockMode: 24 }), '09:00')
        assert.equal(formatTimeForDisplay({ time: '10:00', clockMode: 24 }), '10:00')
        assert.equal(formatTimeForDisplay({ time: '11:00', clockMode: 24 }), '11:00')
        assert.equal(formatTimeForDisplay({ time: '12:00', clockMode: 24 }), '12:00')
        assert.equal(formatTimeForDisplay({ time: '13:00', clockMode: 24 }), '13:00')
        assert.equal(formatTimeForDisplay({ time: '14:00', clockMode: 24 }), '14:00')
        assert.equal(formatTimeForDisplay({ time: '15:00', clockMode: 24 }), '15:00')
        assert.equal(formatTimeForDisplay({ time: '16:00', clockMode: 24 }), '16:00')
        assert.equal(formatTimeForDisplay({ time: '17:00', clockMode: 24 }), '17:00')
        assert.equal(formatTimeForDisplay({ time: '18:00', clockMode: 24 }), '18:00')
        assert.equal(formatTimeForDisplay({ time: '19:00', clockMode: 24 }), '19:00')
        assert.equal(formatTimeForDisplay({ time: '20:00', clockMode: 24 }), '20:00')
        assert.equal(formatTimeForDisplay({ time: '21:00', clockMode: 24 }), '21:00')
        assert.equal(formatTimeForDisplay({ time: '22:00', clockMode: 24 }), '22:00')
        assert.equal(formatTimeForDisplay({ time: '23:00', clockMode: 24 }), '23:00')
      })

      it('should format minutes properly', () => {
        assert.equal(formatTimeForDisplay({ time: '00:30', clockMode: 24 }), '00:30')
      })
    })
  })
})
