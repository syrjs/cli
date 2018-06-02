import { log } from 'utils/logger';
import localeStrings from 'strings';

const description = {
  short: localeStrings.get('Generates bundles from deterministic releases'),
  usage: 'syr bundle --release=1.2.3'
};

const api = {
  bundle: () => {}
};

function cmd(parameters, switches) {
  api.bundle();
}

export { cmd, api, description };
