'use strict'

const {
  buildTimeStringForInternalUsage,
  detectPeriodFromString,
  getPeriodOfTime,
  padStart,
  padEnd,
  parseTime,
  validateMilitaryTime
} = require('../src/internal')

const { assert } = require('chai')

describe('internal api', () => {
  describe('buildTimeStringForInternalUsage', () => {
    it('should generate padded time string correctly', () => {
      assert.equal(
        buildTimeStringForInternalUsage(5, 2),
        '05:02'
      )
      assert.equal(
        buildTimeStringForInternalUsage(5, 15),
        '05:15'
      )
      assert.equal(
        buildTimeStringForInternalUsage(13, 5),
        '13:05'
      )
      assert.equal(
        buildTimeStringForInternalUsage(13, 30),
        '13:30'
      )
    })
  })

  describe('detectPeriodFromString', () => {
    it("should detect 'am' properly", () => {
      assert.equal(detectPeriodFromString('a'), 'am')
      assert.equal(detectPeriodFromString('am'), 'am')
      assert.equal(detectPeriodFromString('A'), 'am')
      assert.equal(detectPeriodFromString('AM'), 'am')
    })

    it("should detect 'pm' properly", () => {
      assert.equal(detectPeriodFromString('p'), 'pm')
      assert.equal(detectPeriodFromString('pm'), 'pm')
      assert.equal(detectPeriodFromString('P'), 'pm')
      assert.equal(detectPeriodFromString('PM'), 'pm')
    })

    it("should return null if it can't be detected", () => {
      assert.equal(detectPeriodFromString(''), null)
    })
  })

  describe('getPeriodOfTime', () => {
    it('should get period of time correctly', () => {
      assert.equal(getPeriodOfTime('00:00'), 'am')
      assert.equal(getPeriodOfTime('01:00'), 'am')
      assert.equal(getPeriodOfTime('02:00'), 'am')
      assert.equal(getPeriodOfTime('03:00'), 'am')
      assert.equal(getPeriodOfTime('04:00'), 'am')
      assert.equal(getPeriodOfTime('05:00'), 'am')
      assert.equal(getPeriodOfTime('06:00'), 'am')
      assert.equal(getPeriodOfTime('07:00'), 'am')
      assert.equal(getPeriodOfTime('08:00'), 'am')
      assert.equal(getPeriodOfTime('09:00'), 'am')
      assert.equal(getPeriodOfTime('10:00'), 'am')
      assert.equal(getPeriodOfTime('11:00'), 'am')
      assert.equal(getPeriodOfTime('12:00'), 'pm')
      assert.equal(getPeriodOfTime('13:00'), 'pm')
      assert.equal(getPeriodOfTime('14:00'), 'pm')
      assert.equal(getPeriodOfTime('15:00'), 'pm')
      assert.equal(getPeriodOfTime('16:00'), 'pm')
      assert.equal(getPeriodOfTime('17:00'), 'pm')
      assert.equal(getPeriodOfTime('18:00'), 'pm')
      assert.equal(getPeriodOfTime('19:00'), 'pm')
      assert.equal(getPeriodOfTime('20:00'), 'pm')
      assert.equal(getPeriodOfTime('21:00'), 'pm')
      assert.equal(getPeriodOfTime('22:00'), 'pm')
      assert.equal(getPeriodOfTime('23:00'), 'pm')
    })
  })

  describe('padding', () => {
    describe('padStart', () => {
      it('should add padding to start of string if needed', () => {
        assert.equal(
          padStart('1', 2, '0'),
          '01'
        )
        assert.equal(
          padStart('15', 2, '0'),
          '15'
        )
        assert.equal(
          padStart('157', 2, '0'),
          '157'
        )
      })

      it('should accept numbers as input and convert to string', () => {
        assert.equal(
          padStart(1, 2, '0'),
          '01'
        )
      })
    })

    describe('padEnd', () => {
      it('should add padding to end of string if needed', () => {
        assert.equal(
          padEnd('1', 2, '0'),
          '10'
        )
        assert.equal(
          padEnd('15', 2, '0'),
          '15'
        )
        assert.equal(
          padEnd('157', 2, '0'),
          '157'
        )
      })

      it('should accept numbers as input and convert to string', () => {
        assert.equal(
          padEnd(1, 2, '0'),
          '10'
        )
      })
    })
  })

  describe('parseTime', () => {
    it('should get period of time correctly', () => {
      assert.equal(getPeriodOfTime('00:00'), 'am')
      assert.equal(getPeriodOfTime('01:00'), 'am')
      assert.equal(getPeriodOfTime('02:00'), 'am')
      assert.equal(getPeriodOfTime('03:00'), 'am')
      assert.equal(getPeriodOfTime('04:00'), 'am')
      assert.equal(getPeriodOfTime('05:00'), 'am')
      assert.equal(getPeriodOfTime('06:00'), 'am')
      assert.equal(getPeriodOfTime('07:00'), 'am')
      assert.equal(getPeriodOfTime('08:00'), 'am')
      assert.equal(getPeriodOfTime('09:00'), 'am')
      assert.equal(getPeriodOfTime('10:00'), 'am')
      assert.equal(getPeriodOfTime('11:00'), 'am')
      assert.equal(getPeriodOfTime('12:00'), 'pm')
      assert.equal(getPeriodOfTime('13:00'), 'pm')
      assert.equal(getPeriodOfTime('14:00'), 'pm')
      assert.equal(getPeriodOfTime('15:00'), 'pm')
      assert.equal(getPeriodOfTime('16:00'), 'pm')
      assert.equal(getPeriodOfTime('17:00'), 'pm')
      assert.equal(getPeriodOfTime('18:00'), 'pm')
      assert.equal(getPeriodOfTime('19:00'), 'pm')
      assert.equal(getPeriodOfTime('20:00'), 'pm')
      assert.equal(getPeriodOfTime('21:00'), 'pm')
      assert.equal(getPeriodOfTime('22:00'), 'pm')
      assert.equal(getPeriodOfTime('23:00'), 'pm')
    })
  })

  describe('parseTime', () => {
    it('should fail if input is not a string', () => {
      assert.throws(
        () => parseTime(123),
        /time must be a string/i
      )
    })

    it('should fail if input string is not in HH?:mm? format', () => {
      assert.throws(
        () => parseTime('wut'),
        /time passed is in invalid format/i
      )
      assert.throws(
        () => parseTime('1300'),
        /time passed is in invalid format/i
      )
      assert.throws(
        () => parseTime('145:00'),
        /time passed is in invalid format/i
      )
      assert.throws(
        () => parseTime('1:00pm'),
        /time passed is in invalid format/i
      )
    })

    it('should fail if input hour is invalid', () => {
      assert.throws(
        () => parseTime('13:60'),
        /error when parsing time/i
      )
      assert.throws(
        () => parseTime('24:05'),
        /error when parsing time/i
      )
    })

    it('should return array with hours and minutes when input is valid', () => {
      assert.deepEqual(
        parseTime('13:30'),
        [13, 30]
      )
      assert.deepEqual(
        parseTime('5:30'),
        [5, 30]
      )
      assert.deepEqual(
        parseTime('5:2'),
        [5, 2]
      )
    })
  })

  describe('validateMilitaryTime', () => {
    describe('hour verification', () => {
      it('should fail if hour is negative', () => {
        assert.deepEqual(
          validateMilitaryTime(-1, 0),
          { valid: false, reason: 'Hour cannot be less than 0' }
        )
      })

      it('should fail if hour is above 23', () => {
        assert.deepEqual(
          validateMilitaryTime(24, 0),
          { valid: false, reason: 'Hour cannot be more than 23' }
        )
      })

      it('should accept hours between 0 and 23', () => {
        for (let hour = 0; hour <= 23; hour++) {
          assert.deepEqual(
            validateMilitaryTime(hour, 0),
            { valid: true },
            `failed when hour = ${hour}`
          )
        }
      })
    })

    describe('minute verification', () => {
      it('should fail if minute is negative', () => {
        assert.deepEqual(
          validateMilitaryTime(0, -1),
          { valid: false, reason: 'Minute cannot be less than 0' }
        )
      })

      it('should fail if minute is above 59', () => {
        assert.deepEqual(
          validateMilitaryTime(0, 60),
          { valid: false, reason: 'Minute cannot be more than 59' }
        )
      })

      it('should accept minutes between 0 and 59', () => {
        for (let minute = 0; minute <= 59; minute++) {
          assert.deepEqual(
            validateMilitaryTime(0, minute),
            { valid: true },
            `failed when minute = ${minute}`
          )
        }
      })
    })
  })
})
