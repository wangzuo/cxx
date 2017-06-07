const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    test: /\.example.js$/,
    loader: 'example-loader',
    enforce: 'pre'
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      plugins: [require.resolve('babel-plugin-relay')],
      presets: [
        require.resolve('babel-preset-es2015'),
        require.resolve('babel-preset-stage-0'),
        require.resolve('babel-preset-react')
      ],
      cacheDirectory: true
    }
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            camelCase: true,
            importLoaders: 2
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9'
                ]
              })
            ]
          }
        },
        'sass-loader'
      ]
    })
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
  },
  {
    test: /\.(jpg|png|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name]-[hash].[ext]'
    }
  }
];
