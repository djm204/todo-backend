import chalk = require("chalk");
export = {
    debug: debug,
    info: info,
    warning: warning,
    error: error
}

function debug(message: string) {
    log("DEBUG", message, chalk.gray);
}

function info(message: string) {
    log("INFO", message, chalk.blue);
}

function warning(message: string) {
    log("WARNING", message, chalk.yellow);
}

function error(message: string) {
    log("ERROR", message, chalk.red);
}

function log(prefix: string, message: string, color: Chalk.ChalkChain): void {
    var now = new Date().toTimeString().slice(0,8);
    console.log("[%s] %s: %s", now, color(prefix), message);
}
