// commands execute when called through the cli
// syr {command}
import { log } from 'utils/logger';

async function commands(command, optionals) {
  let module;
  try {
    module = require(`./${command}`);
    await module.cmd.apply(this, optionals);
  } catch (e) {
    if(e.message.indexOf('Cannot find module') > -1) {
      log.warn(`${command} command not found`);
    }
  }
}

export { commands };
