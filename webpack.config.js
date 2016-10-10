/**
 * Created by Jan on 5.8.2016.
 */
const path = require('path');

module.exports = {
  entry: ['webpack-dev-server/client?http://localhost:8080/', path.join(__dirname, "source/index.jsx")],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    historyApiFallback: true
  }
};