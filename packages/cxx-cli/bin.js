#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const init = require('./src/init');
const cwd = process.cwd();

program.command('init').description('cxx init').action(function(options) {
  init(options);
});

program.parse(process.argv);
