/**
 * Created by Jan on 5.8.2016.
 */
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "source/index.jsx"),
    module: {
        loaders: [
            {
                test: /\.jsx$/,
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