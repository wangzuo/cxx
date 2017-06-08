#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const server = require('./src/server');
const build = require('./src/build');
const init = require('./src/init');
const deploy = require('./src/deploy');
const node = require('./src/node');
const printSchema = require('./src/print-schema');
const cwd = process.cwd();
const cxx = fs.existsSync(`${cwd}/cxx.js`)
  ? require(`${cwd}/cxx.js`)
  : fs.existsSync(`${cwd}/cxx.json`) ? require(`${cwd}/cxx.js`) : {};

program.command('server').description('start server').action(function(options) {
  server(cxx);
});

program
  .command('build')
  .description('build server & client')
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

program.command('print-schema').description('print schema').action(function() {
  printSchema();
});

program.command('node').description('babel-node').action(node);

program.parse(process.argv);
