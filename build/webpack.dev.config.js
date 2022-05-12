/**
 * @intro: webpack配置开发.
 */
const merge = require('webpack-merge').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const utils = require('./utils');
const config = require('./config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  output: {
    publicPath: config.dev.assetsPublicPath,
  },

  // these devServer options should be customized in /config/index.js
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
    client: {
      overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
    },
    static: false,
  },
  plugins: [
    new DotEnvWebpackPlugin({
      path: '.env.development',
      silent: true, // hide any errors
      systemvars: true,
      defaults: '.env',
    }),
    new ReactRefreshPlugin({
      overlay: false,
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/index.ejs',
      inject: true,
    }),
  ],
  stats: false,
});
