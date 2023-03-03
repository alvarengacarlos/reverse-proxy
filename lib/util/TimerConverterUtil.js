const LoggerUtil = require("./LoggerUtil")

module.exports = class TimerConverterUtil {

    static millisecondsToSeconds(milliseconds) {
        LoggerUtil.info('TimerConverterUtil::millisecondsToSeconds::converting')
        
        const result = milliseconds / 1000

        LoggerUtil.info('TimerConverterUtil::millisecondsToSeconds::success')

        return result
    }

    static secondsToMilliseconds(milliseconds) {
        LoggerUtil.info('TimerConverterUtil::secondsToMilliseconds::converting')

        const result = milliseconds * 1000

        LoggerUtil.info('TimerConverterUtil::secondsToMilliseconds::success')

        return result
    }

    static minutesToSeconds(minutes) {
        LoggerUtil.info('TimerConverterUtil::minutesToSeconds::converting')
              
        const result = Number(minutes) * 60

        LoggerUtil.info('TimerConverterUtil::minutesToSeconds::success')

        return result
    }

    static secondsToMinutes(seconds) {
        LoggerUtil.info('TimerConverterUtil::secondsToMinutes::converting')

        const result = Number(seconds) / 60

        LoggerUtil.info('TimerConverterUtil::secondsToMinutes::success')

        return result
    }

}