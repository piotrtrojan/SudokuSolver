class Logger {
    static logEnabled = true;
    static toggleLog() {
        Logger.logEnabled = !Logger.logEnabled;
        console.log(`Logs: ${Logger.logEnabled}`);
    }

    static log(data) {
        if (Logger.logEnabled) {
            console.log(data);
        }
    }

    static warn(data) {
        console.warn(data);
    }
}