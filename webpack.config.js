'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  // Entry point for the bundle, path and filename to main module
  entry: {
    treetest: './TreeView/test.jsx'
  },
  devtool: 'inline-source-map',
  output: {
    // Output directory as an absolute path
    path: './',
    // Filename as relative path within output path
    filename: '[name].js',
    // Output path from the view of the JS/HTML
    publicPath: '/'
  },
 
  module: {
    loaders: [

      // Loader required for JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            // activate source maps via loader query
            'css?sourceMap!' + 
            'autoprefixer-loader?browsers=last 2 version!' +
            'sass?sourceMap'
        )
      }
      
    ] // end loaders
  },

  externals: {
    jasmine :'jasmine',
    Velocity: 'Velocity'
  },

  devServer: {
    noInfo: false, // Display no info to console (only warnings and errors)
    quiet: false, // Display nothing to the console
    lazy: false, // No watching, but recompilation on every request
  
  },

  stats: {
    cached: false
  },
  

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("styles.css")
  ]

};