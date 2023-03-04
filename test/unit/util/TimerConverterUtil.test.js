const TimerConverterUtil = require('../../../lib/util/TimerConverterUtil')

describe('TimerConverterUtil', () => {

	describe('millisecondsToSeconds', () => {

		test('should convert the milliseconds to seconds with success', () => {
			expect(TimerConverterUtil.millisecondsToSeconds(1000)).toBe(1)
			expect(TimerConverterUtil.millisecondsToSeconds(2000)).toBe(2)
		})

	})

	describe('secondsToMilliseconds', () => {

		test('should convert the seconds to milliseconds with success', () => {
			expect(TimerConverterUtil.secondsToMilliseconds(1)).toBe(1000)
			expect(TimerConverterUtil.secondsToMilliseconds(2)).toBe(2000)
		})

	})

	describe('minutesToSeconds', () => {

		test('should convert the minutes to seconds with success', () => {
			expect(TimerConverterUtil.minutesToSeconds(1)).toBe(60)
			expect(TimerConverterUtil.minutesToSeconds(2)).toBe(120)
		})

	})

	describe('secondsToMinutes', () => {

		test('should convert the seconds to minutes with success', () => {
			expect(TimerConverterUtil.secondsToMinutes(60)).toBe(1)
			expect(TimerConverterUtil.secondsToMinutes(120)).toBe(2)
		})

	})

})