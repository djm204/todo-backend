import hapi = require("hapi");
import Promise = require("bluebird");
import log = require("./log");
import allRoutes = require("./routes/all");
var portFinder = require("portfinder");

var server = new hapi.Server();
portFinder.getPort((err, port) => {

    log.debug("Fetched port: " + port);
    port = port;
    startServer(port);
});

function startServer(port: number) {
    server.connection({
        port: port
    });

    for (var route in allRoutes) server.route(allRoutes[route]);

    server.start(() => {
        log.info("Server listening on port " + port);
    });
}
