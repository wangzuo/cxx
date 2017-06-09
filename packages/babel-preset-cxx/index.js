module.exports = {
  plugins: [
    require.resolve('babel-plugin-relay'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties')
  ],
  presets: [
    require.resolve('babel-preset-env'),
    require.resolve('babel-preset-react')
  ]
};
