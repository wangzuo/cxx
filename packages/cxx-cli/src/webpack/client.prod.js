const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = Object.assign({}, require('./client'));
const uglify = require('./uglify');

const cwd = process.cwd();

config.plugins = config.plugins.concat([
  new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
  new webpack.optimize.UglifyJsPlugin(uglify),
  new ExtractTextPlugin({ filename: '[name]-[contenthash].css' })
]);

config.output = {
  filename: '[name]-[chunkhash].js',
  chunkFilename: '[name]-[chunkhash].js'
};

config.devtool = 'source-map';

module.exports = config;
