const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const { printSchema } = require(`${cwd}/node_modules/cxx/graphql`); // todo

module.exports = () => {
  require('babel-polyfill');
  const register = require('babel-register');
  register({
    presets: [require.resolve('babel-preset-cxx')]
  });
  const schema = require(`${cwd}/schema`).default;
  fs.writeFileSync(path.join(cwd, './schema.graphql'), printSchema(schema));
};
