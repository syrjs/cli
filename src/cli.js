#! /usr/bin/env node
import { boot } from './boot';
import { commands } from './commands';
import { version } from './version';

const { positionals, switches } = boot();

global.cwd = process.cwd();
global.debug = false;

function main() {
  const [command, ...parameters] = positionals;
  if (command) {
    commands(command, [parameters, switches]);
  } else {
    if (switches.version) {
      version();
    }
  }
}

main();
