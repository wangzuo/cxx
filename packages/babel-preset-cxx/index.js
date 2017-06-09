module.exports = {
  plugins: [
    require.resolve('babel-plugin-relay'),
    require.resolve('babel-plugin-transform-runtime')
  ],
  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-stage-0'),
    require.resolve('babel-preset-react')
  ]
};
