const fs = require('fs');
const shell = require('shelljs');
const debug = require('debug')('cli');
const build = require('./build');

module.exports = function(cxx) {
  debug('start building');
  build(cxx, () => {
    debug('building done');
    debug('start deploying');
    const { name } = cxx;
    const remote = 'onepunch';

    fs.writeFileSync(
      'builds/process.config.js',
      `
      module.exports = {
        apps: [{
          name: '${name}',
          script: '/home/deploy/apps/${name}/server.js',
          instances: 2,
          max_memory_restart: '100M',
          env: {
            "NODE_ENV": "production"
          }
        }]
      }
    `
    );
    shell.exec(
      `ssh ${remote} -t 'mkdir -p /home/deploy/public/${name} /home/deploy/apps/${name}'`
    );
    shell.exec(`rsync -avz -e "ssh" builds/public/ ${remote}:public/${name}`);
    shell.exec(
      `scp builds/*.js builds/*.js.map yarn.lock package.json ${remote}:apps/${name}`
    );
    shell.exec(
      `ssh ${remote} -t 'cd /home/deploy/apps/${name}; yarn --prod; pm2 reload process.config.js'`
    );
    shell.exec(
      `rsync -avz -e "ssh" --delete builds/public/ ${remote}:public/${name}`
    );
    debug('deploying done');
  });
};
