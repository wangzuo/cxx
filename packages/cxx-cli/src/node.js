const path = require('path');
const Module = require('module');

module.exports = () => {
  require('babel-polyfill');
  const register = require('babel-register');

  register({
    plugins: [require.resolve('babel-plugin-relay')],
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-stage-0'),
      require.resolve('babel-preset-react')
    ]
  });

  const args = process.argv.slice(3);
  const filename = args[0];
  if (!path.isAbsolute(filename)) args[0] = path.join(process.cwd(), filename);

  process.argv = ['node'].concat(args);
  process.execArgv.unshift(__filename);

  Module.runMain();
};
