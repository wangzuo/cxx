const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rules = require('./rules');

module.exports = {
  entry: {},
  target: 'node',
  externals: [
    function(context, request, callback) {
      if (request[0] !== '/' && request[0] !== '.') {
        // if (request === 'react') {
        //   return callback(null, `commonjs cxx/react`);
        // }

        // if (request === 'react-dom') {
        //   return callback(null, `commonjs cxx/react-dom`);
        // }

        return callback(null, `commonjs ${request}`);
      }
      callback();
    }
  ],
  output: {
    // path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs-module'
  },
  performance: { hints: false },
  module: { rules: rules },
  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css' })
    // todo: banner on js only
    /*
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      // entryOnly: true,
      test: /\.js$/
    })
    */
  ]
};
