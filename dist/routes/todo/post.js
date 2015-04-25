var items = require("./items");
module.exports = {
    method: "POST",
    path: "/todo",
    handler: function (request, reply) {
        if (!request.payload.items) {
            reply("400");
        }
        items.postItems(request.payload.items);
        reply("200");
    }
};
