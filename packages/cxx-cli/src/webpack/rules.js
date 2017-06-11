const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-cxx')],
      cacheDirectory: true
    }
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            camelCase: true,
            importLoaders: 2
          }
        },
        {
          loader: require.resolve('postcss-loader'),
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
        require.resolve('sass-loader')
      ]
    })
  },
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    loader: require.resolve('file-loader'),
    options: {
      name: 'fonts/[name]-[hash].[ext]'
    }
  },
  {
    test: /\.(jpg|png|svg)$/,
    loader: require.resolve('file-loader'),
    options: {
      name: '[path][name]-[hash].[ext]'
    }
  }
];
