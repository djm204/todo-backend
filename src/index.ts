import hapi = require("hapi");
import Promise = require("bluebird");
import log = require("./log");
var portFinder = require("portfinder");

var server = new hapi.Server();
var port: number;

portFinder.getPort((err, port) => {
    port = port;
    startServer();
});

function startServer() {
    server.connection({
        port: port
    });

    server.start(() => {
        log.info("Server listening on port " + port);
    });
}
