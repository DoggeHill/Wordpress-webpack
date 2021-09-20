//! prod setup
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: 'dummy/seduco-core/dist',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // Minify css and add to separate file
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          //Autoprefixer
          'postcss-loader',
          // Compiles Sass to CSS
          'resolve-url-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      // Code splitting
      chunkFilename: '[id].css',
    }),
  ],
});
