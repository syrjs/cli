import { log } from 'utils/logger';
import localeStrings from 'strings';

const description = {
  short: localeStrings.get('Manages versioning for the current project. Create and View version information'),
  usage: 'syr version'
};

const api = {
  getCurrentVersion: () => {},
  addVersion: () => {},
  removeVersion: () => {},
  debugInfo: () => {
    log('debug infoozzz');
  }
};

function cmd(parameters, switches) {
  console.log(parameters, switches);
  if (switches.debug) {
    api.debugInfo();
  }
}

export { cmd, api, description };
