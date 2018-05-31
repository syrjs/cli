#! /usr/bin/env node
import "regenerator-runtime/runtime";

/**
 * This is the bin link
 */
global.debug = false;

import { boot } from './boot';
import { commands } from './commands';
import { version } from './version';

const { positionals, switches } = boot();

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
