var chalk = require("chalk");
function debug(message) {
    log("DEBUG", message, chalk.gray);
}
function info(message) {
    log("INFO", message, chalk.blue);
}
function warning(message) {
    log("WARNING", message, chalk.yellow);
}
function error(message) {
    log("ERROR", message, chalk.red);
}
function log(prefix, message, color) {
    var now = new Date().toTimeString().slice(0, 8);
    console.log("[%s] %s: %s", now, color(prefix), message);
}
module.exports = {
    debug: debug,
    info: info,
    warning: warning,
    error: error
};
