const path = require('path');
const Module = require('module');

module.exports = () => {
  require('babel-polyfill');
  const register = require('babel-register');

  register({
    presets: [require.resolve('babel-preset-cxx')]
  });

  const args = process.argv.slice(3);
  const filename = args[0];
  if (!path.isAbsolute(filename)) args[0] = path.join(process.cwd(), filename);

  process.argv = ['node'].concat(args);
  process.execArgv.unshift(__filename);

  Module.runMain();
};
