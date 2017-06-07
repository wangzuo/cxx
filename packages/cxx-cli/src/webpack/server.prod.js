const _ = require('lodash');
const webpack = require('webpack');
const config = _.assign({}, require('./server'));
const uglify = require('./uglify');

config.plugins = config.plugins.concat([
  new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
  new webpack.optimize.UglifyJsPlugin(uglify)
]);

config.devtool = 'source-map';

module.exports = config;
