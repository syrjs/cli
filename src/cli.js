#! /usr/bin/env node
import 'regenerator-runtime/runtime';

/**
 * !!! bin entry
 */
import { boot } from './boot';
import { commands } from './commands';

const { positionals, switches } = boot();

function main() {
  const [command, ...parameters] = positionals;
  if (command) {
    commands(command, [parameters, switches]);
  } else {
    // --version is passed, as in `syr --version`, send to `syr version --debug`
    if (switches.version || switches.v) {
      commands('version', [[], { debug: true }]);
    }
  }
}

main();
