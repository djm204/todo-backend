import items = require("./items");
import hapi = require("hapi");

export = {
    method: "POST",
    path: "/todo",
    handler: (request: hapi.Request, reply: hapi.IReply) => {
        if (!request.payload.items) {
            reply("400");
        }
        items.postItems(request.payload.items);
        reply("200");
    }
}