#!/usr/bin/env node

const program = require('commander');
const server = require('./src/server');
const build = require('./src/build');
const init = require('./src/init');
const deploy = require('./src/deploy');
const node = require('./src/node');
const updateSchema = require('./src/update-schema');
const cxx = require(`${process.cwd()}/cxx.json`);

program
  .command('server')
  .description('start server')
  .option('-p, --port <port>', 'which port to use')
  .action(function(options) {
    server(cxx);
  });

program
  .command('build')
  .description('build server & client')
  .option('-p, --port <port>', 'which port to use')
  .action(function(options) {
    build(cxx);
  });

program.command('init').description('cxx init').action(function(options) {
  init(options);
});

program
  .command('deploy')
  .description('deploy app to remote')
  .action(function(options) {
    deploy(cxx);
  });

program
  .command('update-schema')
  .description('update schema')
  .action(function() {
    updateSchema();
  });

program.command('node').description('babel-node').action(node);

program.parse(process.argv);
