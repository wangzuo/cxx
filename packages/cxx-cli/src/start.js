const path = require('path');
const debug = require('debug')('cli');
const { spawn } = require('child_process');
const getPort = require('get-port');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const serverDevConfig = require('./webpack/server.dev');
const clientDevConfig = require('./webpack/client.dev');

const cwd = process.cwd();

function spawnWithLog(file, args) {
  return spawn(file, args, { stdio: 'inherit' });
}

module.exports = function() {
  getPort().then(webpackDevServerPort => {
    debug('webpackDevServer on', webpackDevServerPort);

    const publicPath = `http://localhost:${webpackDevServerPort}/`;

    const serverConfig = merge(
      {
        entry: { server: `${cwd}/src/server.js` },
        output: {
          path: `${cwd}/tmp`,
          publicPath
        },
        plugins: [
          new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            MANIFEST_PATH: path.join(cwd, 'tmp', 'manifest.json')
          })
        ]
      },
      serverDevConfig
    );

    const clientConfig = merge(
      {
        entry: { client: `${cwd}/src/client.js` },
        output: {
          path: `${cwd}/tmp`,
          publicPath
        },
        plugins: [
          new ManifestPlugin({
            fileName: 'manifest.json',
            writeToFileEmit: true,
            publicPath
          })
        ]
      },
      clientDevConfig
    );

    const clientCompiler = webpack(clientConfig);
    const webpackDevServer = new WebpackDevServer(clientCompiler, {
      quiet: true,
      clientLogLevel: 'none',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });

    webpackDevServer.listen(webpackDevServerPort, '0.0.0.0');

    const serverCompiler = webpack(serverConfig);
    let serverProcess;

    function startServer() {
      return spawn('node', ['./tmp/server.js'], {
        stdio: 'inherit'
      });
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
