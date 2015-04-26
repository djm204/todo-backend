var hapi = require("hapi");
var log = require("./log");
var allRoutes = require("./routes/all");
var todo = require("./routes/todo/items");
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
        seedData();
    });
}
function seedData() {
    var data = [
        { id: 1, message: "first item", isDone: 0 },
        { id: 2, message: "second item", isDone: 0 },
        { id: 3, message: "third item", isDone: 0 },
        { id: 4, message: "fourth item", isDone: 0 }];
    todo.postItems(JSON.stringify(data));
    log.info("Seeded dummy data to TodoList");
}
