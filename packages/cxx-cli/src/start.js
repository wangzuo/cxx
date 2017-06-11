const _ = require('lodash');
const path = require('path');
const debug = require('debug')('cli');
const getPort = require('get-port');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { spawn } = require('child_process');
const serverConfig = require('./webpack/server.dev');
const clientConfig = require('./webpack/client.dev');

const cwd = process.cwd();

function spawnWithLog(file, args) {
  return spawn(file, args, { stdio: 'inherit' });
}

module.exports = function(cxx) {
  const { name, port } = cxx;
  debug('server', name, port);

  _.merge(serverConfig, {
    entry: { app: `${cwd}/app.js` },
    output: { path: `${cwd}/tmp` }
  });

  _.merge(clientConfig, {
    entry: { client: `${cwd}/client.js` },
    output: { path: `${cwd}/tmp` }
  });

  const clientCompiler = webpack(clientConfig);
  const webpackDevServer = new WebpackDevServer(clientCompiler, {
    quiet: true,
    clientLogLevel: 'none',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });

  spawnWithLog(path.join(__dirname, '../node_modules/.bin/relay-compiler'), [
    '--src',
    cwd,
    '--schema',
    path.join(cwd, 'schema.graphql'),
    '--watch'
  ]);

  getPort().then(webpackDevServerPort => {
    debug('webpackDevServer on', webpackDevServerPort);
    clientConfig.output.publicPath = `http://localhost:${webpackDevServerPort}/`;

    serverConfig.output.publicPath = `http://localhost:${webpackDevServerPort}/`;

    webpackDevServer.listen(webpackDevServerPort, '0.0.0.0');

    const serverCompiler = webpack(serverConfig);
    let serverProcess;

    function startServer() {
      const options = {
        port,
        webpackDevServerPort
      };
      return spawnWithLog('node', [
        '-e',
        `require('./tmp/app').default.start(${JSON.stringify(options)})`
      ]);
    }

    const serverCompilerWatching = serverCompiler.watch({}, (err, stats) => {
      if (stats.hasErrors()) {
        debug('server compiler failed');
      } else {
        if (serverProcess) {
          serverProcess.kill();
          serverProcess = startServer();
        } else {
          serverProcess = startServer();
        }
      }
    });
  });
};
