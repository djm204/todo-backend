import hapi = require("hapi");
import items = require("./items");

export = {
    method: "GET",
    path: "/todo",
    handler: (request: hapi.Request, reply: hapi.IReply) => {
        reply(items.getItems());
    }
}
