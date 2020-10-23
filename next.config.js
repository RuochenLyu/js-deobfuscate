const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = {
  webpack(config) {
    const mergedConfig = merge(config, webpackConfig);
    return mergedConfig;
  },
};
