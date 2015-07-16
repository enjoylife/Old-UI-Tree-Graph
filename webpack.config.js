'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  // Entry point for the bundle, path and filename to main module
  entry: {
    vendor: ["react"],
     tests: './Tests/test.jsx',
    chartcard: './ChartCard/test.jsx',
    ckangrid: './CKANGrid/test.jsx',
    chartselect: './ChartSelect/test.jsx',
    treeview: './TreeView/test.jsx'
     
  },
  devtool: 'inline-source-map',
  output: {
    // Output directory as an absolute path
     path: path.join(__dirname, './build'),
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
      },
      {
        test:/\.svg$/,
        loader:'url-loader'
      }
      
    ] // end loaders
  },

  externals: {
    jasmine :'jasmine',
    Velocity: 'Velocity',
    jquery: '$',
    spectrum: 'spectrum'
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
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    new ExtractTextPlugin("[name].css")
  ]

};