const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const { graphql, introspectionQuery, printSchema } = require('graphql');

const cwd = process.cwd();

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

  const schema = require(`${cwd}/schema/index`).default;

  console.log(schema);
  // console.log(printSchema(schema));

  shell.exec('mkdir -p ./data');

  // fs.writeFileSync(
  //   path.join(cwd, './data/schema.graphql'),
  //   printSchema(schema)
  // );

  graphql(schema, introspectionQuery).then(result => {
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        path.join(cwd, './data/schema.json'),
        JSON.stringify(result, null, 2)
      );
    }
  });
};
