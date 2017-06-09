const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const rules = require('./rules');
const cwd = process.cwd();

module.exports = {
  entry: {},
  resolveLoader: {
    modules: [path.resolve(__dirname, '../..', 'node_modules')]
  },
  performance: { hints: false },
  module: { rules },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: module => {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })

    // new Visualizer()
  ]
};
