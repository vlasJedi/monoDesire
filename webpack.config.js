const path = require('path');
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "./tsCompiled/main"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.js"
    }
}