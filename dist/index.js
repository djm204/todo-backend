var hapi = require("hapi");
var log = require("./log");
var portFinder = require("portfinder");
var server = new hapi.Server();
var port;
portFinder.getPort(function (err, port) {
    port = port;
    startServer();
});
function startServer() {
    server.connection({
        port: port
    });
    server.start(function () {
        log.info("Server listening on port " + port);
    });
}
