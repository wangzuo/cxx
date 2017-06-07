const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const rules = require('./rules');

const aliases = modules => {
  const alias = {};
  modules.forEach(
    module =>
      (alias[module] = path.resolve(__dirname, '../..', 'node_modules', module))
  );
  return alias;
};

module.exports = {
  entry: {
    vendors: [
      'babel-polyfill',
      'isomorphic-fetch',
      'qs',
      'react',
      'react-dom',
      'classnames',
      'react-relay',
      'relay-runtime',
      'prop-types',
      // 'lodash',
      // 'date-fns',
      'history'
    ]
  },
  resolve: {
    alias: aliases([
      'babel-polyfill',
      'isomorphic-fetch',
      'qs',
      'react',
      'react-dom',
      'draft-js',
      'prop-types',
      'classnames',
      'react-relay',
      'relay-runtime',

      // 'date-fns',
      // 'lodash',
      'redux',
      'history'
    ])
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../..', 'node_modules')]
  },
  performance: { hints: false },
  module: { rules },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors', 'manifest']
    }),

    new Visualizer()
  ]
};
