import hapi = require("hapi");
import Promise = require("bluebird");
import log = require("./log");
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

    server.start(() => {
        log.info("Server listening on port " + port);
    });
}
