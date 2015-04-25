var hapi = require("hapi");
var log = require("./log");
var allRoutes = require("./routes/all");
var portFinder = require("portfinder");
var server = new hapi.Server();
portFinder.getPort(function (err, port) {
    log.debug("Fetched port: " + port);
    port = port;
    startServer(port);
});
function startServer(port) {
    server.connection({
        port: port
    });
    for (var route in allRoutes)
        server.route(allRoutes[route]);
    server.start(function () {
        log.info("Server listening on port " + port);
    });
}
