#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const start = require('./cli/start');
const build = require('./cli/build');
const deploy = require('./cli/deploy');
const node = require('./cli/node');
const printSchema = require('./cli/print-schema');
const packageJSON = require('./package.json');
const cwd = process.cwd();
const cxx = fs.existsSync(`${cwd}/cxx.js`)
  ? require(`${cwd}/cxx.js`)
  : fs.existsSync(`${cwd}/cxx.json`) ? require(`${cwd}/cxx.js`) : {};

program.command('start').description('start server').action(function(options) {
  start(cxx);
});

program
  .command('build')
  .description('build server & client')
  .action(function(options) {
    build(cxx);
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

program.command('version').description('version').action(function() {
  console.log(packageJSON.version);
});

program.parse(process.argv);
