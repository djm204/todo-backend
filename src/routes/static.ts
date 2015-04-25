import path = require("path");
export = {
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: path.join(__dirname, "../../../front/src")
        }
    }
}
