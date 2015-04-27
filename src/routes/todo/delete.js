var items = require("./items");
module.exports = {
    method: "DELETE",
    path: "/todo",
    handler: function (request, reply) {
        if (!request.payload.item) {
            reply("400");
        }
        var result = items.deleteItem(request.payload.item);
        reply(result ? "200" : "422");
    }
};
