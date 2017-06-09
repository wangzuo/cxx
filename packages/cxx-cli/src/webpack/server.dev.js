const _ = require('lodash');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = _.assign({}, require('./server')); // todo: webpack-merge

config.plugins = config.plugins.concat([
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new FriendlyErrorsWebpackPlugin(),
  new webpack.NoErrorsPlugin() // todo
]);

// todo: source map makes incr build slow
config.devtool = 'source-map';

module.exports = config;
