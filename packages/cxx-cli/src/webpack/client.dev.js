const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = _.assign({}, require('./client'));

config.plugins = config.plugins.concat([
  new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  new ExtractTextPlugin({ filename: '[name].css' })
]);

config.output = {
  filename: '[name].js',
  chunkFilename: '[name].js'
};

config.devtool = 'source-map';

module.exports = config;
