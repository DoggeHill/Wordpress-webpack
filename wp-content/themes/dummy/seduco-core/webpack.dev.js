//! dev setup
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const dir = path.resolve(__dirname, '.');

// Automatically adds files with hashes to output index(html, php) file
// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: 'wp-content/themes/' + root + '/seduco-core/dist/'
  },
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
          // Resolve CSS URL paths
          'resolve-url-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      // Output
      filename: '../../header.php',
      // Template
      template: dir + '/src/index.php'
    })
  ],
  devServer: {
    // Specifying a host to use
    host: 'localhost',
    // Specifying a port number
    //? If not available free to change
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
    publicPath: '/seduco-core/dist/',

    // Enable gzip compression for everything served:
    // compress: true,

    // It writes generated assets to the dist folder
    writeToDisk: true,
    // Enables HMR
    hot: true
  }
});
