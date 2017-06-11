const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const rules = require('./rules');

module.exports = {
  entry: {},
  performance: { hints: false },
  module: { rules },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: module => {
        // lerna repo hack
        if (module.context && module.context.indexOf('packages/cxx') !== -1) {
          return true;
        }
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
