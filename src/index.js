import blargs from 'blargs';
import updateNotifier from 'update-notifier';
import packageJSON from '../package.json';
import { commands } from './commands';

updateNotifier({ pkg: packageJSON }).notify();

async function main() {
  // get blargs
  let ret = blargs();
  let switches = ret[0] || {};
  let positionals = ret[1] || [];
  await run(positionals, switches);
}

async function run(positionals, switches) {
  const [command, ...parameters] = positionals;
  if (command) {
    await commands(command, [parameters, switches]);
  } else {
    await commands('help', [[], {}]);
  }
}

export { main };
