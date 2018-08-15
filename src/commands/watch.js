import fs from 'fs';
import { exec, execSync } from 'child_process';
import localeStrings from 'strings';
import { log } from 'utils/logger';

const watchCommand = 'npm run serve';

const description = {
  short: localeStrings.get('Starts webpack development server'),
  usage: 'watch'
};

const api = {
  watch: () => {
    var tcpPortUsed = require('tcp-port-used');

    tcpPortUsed.check(8080, '127.0.0.1')
    .then(function(inUse) {
        if(!inUse) {
          if (fs.existsSync('package.json')) {
            console.log('Starting Webpack Dev Server');
            execSync(watchCommand, { stdio: 'inherit' });
          } else {
            //@TODO
          }
        } else {
          log.warn('Server already running on port 8080');
          log('todo: Make this more robust :D some cool feature to start more servers, or point native apps here');
        }
    }, function(err) {
        log.error('Error on check:', err.message);
    });
  }
};

function cmd(parameters, switches) {
  api.watch();
}

export { cmd, api, description };
