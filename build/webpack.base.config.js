/**
 * @intro: webpack配置基类.
 */
const path = require('path');
const WebpackBarPlugin = require('webpackbar');
const utils = require('./utils');
const config = require('./config');

const resolve = (dir) => path.join(__dirname, '..', dir);

const createEslintRule = () => {
  const ESLintPlugin = require('eslint-webpack-plugin');

  return new ESLintPlugin({
    extensions: ['js', 'jsx'],
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay,
  });
};

const createStylelintRule = () => {
  const StylelintPlugin = require('stylelint-webpack-plugin');
  return new StylelintPlugin({
    extensions: ['css', 'scss'],
    emitWarning: false,
  });
};

module.exports = {
  context: resolve('/'),
  entry: {
    app: './client/main.jsx',
  },
  output: {
    filename: utils.assetsFilenames.app,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      client: resolve('client'),
      main: resolve('main'),
    },
  },
  module: {
    rules: [{
      test: /\.(jsx?)$/,
      loader: 'babel-loader',
      include: [resolve('client'), resolve('main')],
      options: {
        cacheDirectory: config.cacheDirectory('babel-loader'),
      },
    },
    ...utils.assetsLoaders,
    ],
  },
  plugins: [
    new WebpackBarPlugin(),
    config.dev.useEslint && createEslintRule(),
    config.dev.useStylelint && createStylelintRule(),
  ].filter(Boolean),
  performance: {
    hints: false,
  },
};
