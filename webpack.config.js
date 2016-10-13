/**
 * Created by Jan on 5.8.2016.
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        test: /\.sass$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css!sass")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ],
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    historyApiFallback: true
  }
};