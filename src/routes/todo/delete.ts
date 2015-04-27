import items = require("./items");
import hapi = require("hapi");

export = {
    method: "DELETE",
    path: "/todo",
    handler: (request: hapi.Request, reply: hapi.IReply) => {
        if (!request.payload.item) {
            reply("400");
        }
        var result = items.deleteItem(request.payload.item);
        reply(result?"200":"422");
    }
}
