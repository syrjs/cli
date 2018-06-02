import { log } from 'utils/logger';
import localeStrings from 'strings';

const description = {
  short: localeStrings.get('Delivers syr native libraries reworked into a prefix or namespace'),
  usage: 'syr eject --prefix=MINE --namespace=com.all.mine'
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
