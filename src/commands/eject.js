import { log } from '../logger';

const api = {
  eject: () => {}
};

function cmd(parameters, switches) {
  api.eject();
}

export { cmd, api };
