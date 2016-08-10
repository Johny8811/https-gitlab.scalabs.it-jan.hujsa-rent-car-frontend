/**
 * Created by Jan on 5.8.2016.
 */
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "source/index.js"),
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel"
            }
        ]
    },
    output: {
        path: "./",
        filename: "bundle.js"
    }
};