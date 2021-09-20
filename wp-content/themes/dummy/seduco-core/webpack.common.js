// BASIC
const path = require('path');
// Store path into variable
const dir = path.resolve(__dirname, '.');

// Dashboard
const webpackDashboard = require('webpack-dashboard/plugin');

// Automatically add files with hashes to out html
// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Analyze our bundles
// https://github.com/webpack-contrib/webpack-bundle-analyzer
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// MOTD
console.log('\x1b[36m%s\x1b[0m', 'SEDUCO CORE BUILD\nSamo smrdí\n\n');

const config = {
  //! BASIC
  entry: './src/js/index.js',
  output: {
    path: dir + '/dist',
    // content hash adds hash to the end to ensure the file name changes everytime we compile
    filename: '[name].[hash:8].js',
    // delete old files on build
    clean: true,
    // when something generate url path, defines
    // where it starts https://webpack.js.org/guides/public-path/

    //! working hrm option
    //publicPath: '/seduco-core/dist/',
    //! working with dev
    publicPath: 'wp-content/themes/dummy/seduco-core/dist/'
  },

  //! MODULES (specified in prod/dev)
  module: {
    rules: [
      // File loader
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: './images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /\.svg$/,
        exclude: path.resolve(__dirname, './src/fonts'),
        use: ['@svgr/webpack']
      }
    ]
  },

  //! PLUGINS
  plugins: [
    new webpackDashboard(), // Adding webpack-dashboard plugin.
    new HtmlWebpackPlugin({
      appMountId: 'app',
      filename: '../../header.php',
      template: dir + '/src/index.php'
      // chunks: ['index'],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],

  //! OPTIMALIZATION
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;

//TODO: aký hash by sme mali používať
