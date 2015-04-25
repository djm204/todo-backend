var hapi = require("hapi");
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
}
