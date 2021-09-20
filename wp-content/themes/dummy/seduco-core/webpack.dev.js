//! dev setup
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  //adds javascript maps
  devtool: 'source-map'
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [

          //STYLESHEETS processing
          //https://webpack.js.org/loaders/sass-loader/
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // niečo
          'resolve-url-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    // Specifying a host to use
    host: 'localhost',
    // Specifying a port number
    port: 8080,
    // This is the key to our approach
    // With a backend on http://localhost/PROJECTNAME/
    // we will use this to enable proxying
    proxy: {
      // Star(*) defines all the valid requests
      '*': {
        // Specifying the full path to the dist folder
        target: 'http://localhost/wordpress/',
        secure: false,
        changeOrigin: true
      }
    },

    // Bundle files will be available in the browser under this path
    //publicPath: path.resolve(__dirname, 'dist'),

    // Enable gzip compression for everything served:
    // compress: true,

    // It writes generated assets to the dist folder
    writeToDisk: true,
    hot: true
  }
});
