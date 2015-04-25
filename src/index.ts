import hapi = require("hapi");
import Promise = require("bluebird");
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
}
