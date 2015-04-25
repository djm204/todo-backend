var path = require("path");
module.exports = {
    method: "GET",
    path: "/{param*}",
    handler: {
        directory: {
            path: path.join(__dirname, "../../../frontend/src")
        }
    }
};
