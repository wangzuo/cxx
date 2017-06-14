const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('cli');
const webpack = require('webpack');
const rimraf = require('rimraf');
const { spawnSync } = require('child_process');
const shell = require('shelljs');
const ManifestPlugin = require('webpack-manifest-plugin');
const clientConfig = require('./webpack/client.prod');
const serverConfig = require('./webpack/server.prod');

const cwd = process.cwd();

module.exports = function(cxx, cb) {
  process.env.NODE_ENV = 'production';
  const options = Object.assign({ publicPath: '/' }, cxx, cxx.production);
  const { name, port, publicPath } = options;

  _.merge(clientConfig, {
    entry: {
      client: `${cwd}/client.js`
    },
    output: {
      path: `${cwd}/builds/public`,
      publicPath
    }
  });

  clientConfig.plugins = clientConfig.plugins.concat([
    new ManifestPlugin({
      fileName: 'assets.json',
      publicPath
    })
  ]);

  _.merge(serverConfig, {
    entry: {
      app: `${cwd}/app.js`
    },
    output: {
      path: `${cwd}/builds`,
      publicPath
    }
  });

  rimraf.sync('./builds');

  shell.exec(
    [
      path.join(__dirname, '../node_modules/.bin/relay-compiler'),
      '--src',
      cwd,
      '--schema',
      path.join(cwd, 'schema.graphql')
    ].join(' ')
  );

  // todo: output build progress
  webpack([clientConfig, serverConfig], (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    // todo: better webpack error output
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
      return;
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    const assets = JSON.parse(
      fs.readFileSync('./builds/public/assets.json', 'utf8')
    );

    const options = { port, assets };

    spawnSync('rm', [
      '-rf',
      'builds/styles.css',
      'builds/styles.css.map',
      'builds/fonts',
      'builds/images'
    ]);

    fs.writeFileSync(
      'builds/server.js',
      `require('./app').default.start(${JSON.stringify(options)})`
    );

    if (cb) cb();
  });
};
