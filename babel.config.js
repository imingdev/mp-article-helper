const config = require('./build/config');

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@pieced/babel-plugin-auto-css-modules',
    config.isDevelopment && 'react-refresh/babel',
  ].filter(Boolean),
};
