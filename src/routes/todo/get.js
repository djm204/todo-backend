var items = require("./items");
module.exports = {
    method: "GET",
    path: "/todo",
    handler: function (request, reply) {
        reply(items.getItems());
    }
};
