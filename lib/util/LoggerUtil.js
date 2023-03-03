module.exports = class LoggerUtil {

    static info(...data) {
        console.info(`(${new Date().toISOString()}) [INFO]-> `, ...data)
    }

    static error(...data) {
        console.error(`(${new Date().toISOString()}) [ERROR]-> `, ...data)
    }

}