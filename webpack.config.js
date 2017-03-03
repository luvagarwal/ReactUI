var path = require('path');
var pkg = require('./package.json')
var util = require('util');
var entry = {
  app: ['./app.jsx']
};

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: entry,
    target : 'web',
    output: {
        path: path.resolve(pkg.config.buildDir),
        publicPath: "/",
        filename: "bundle.js"
    },
    node: {
      fs: 'empty'
    },
    module: {
      loaders : [
        {
          test : /\.jsx?/,
          include : path.join(__dirname, 'app'),
          loader : 'babel',
          query:{presets:['es2015', 'react']}
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
      ]
        /*loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query:{presets:['es2015']}},
          { test: /\.html$/, exclude: /node_modules/, loader: "file-loader?name=[path][name].[ext]"}
        ]*/
    }
};
