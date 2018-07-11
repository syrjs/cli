import { log } from 'utils/logger';
import localeStrings from 'strings';

const simpleGit = require('simple-git')(process.cwd());
const description = {
  short: localeStrings.get('Generates bundles from deterministic releases'),
  usage: 'release --tag=MyAwesomeRelease'
};

const api = {
  release: () => {
    log.warn('Do you want to generate a release?');
    simpleGit.revparse(['HEAD'], (err, result) => {
      log(`current git hash: ${result.replace('\n', '')}`);
    });
  }
};

function cmd(parameters, switches) {
  api.release();
}

export { cmd, api, description };
