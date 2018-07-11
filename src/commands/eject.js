import { log } from 'utils/logger';
import localeStrings from 'strings';

const description = {
  short: localeStrings.get('Creates a native library from bundles'),
  usage: 'eject --prefix=MINE --namespace=com.all.mine'
};

const api = {
  eject: () => {
    console.log('Not yet implimented');
  }
};

function cmd(parameters, switches) {
  api.eject();
}

export { cmd, api, description };
