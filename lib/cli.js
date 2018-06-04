#! /usr/bin/env node
'use strict';

require('regenerator-runtime/runtime');

var _boot2 = require('./boot');

var _commands = require('./commands');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/**
 * !!! bin entry
 */


var _boot = (0, _boot2.boot)(),
    positionals = _boot.positionals,
    switches = _boot.switches;

function main() {
  var _positionals = _toArray(positionals),
      command = _positionals[0],
      parameters = _positionals.slice(1);

  if (command) {
    (0, _commands.commands)(command, [parameters, switches]);
  } else {
    // --version is passed, as in `syr --version`, send to `syr version --debug`
    if (switches.version || switches.v) {
      (0, _commands.commands)('version', [[], { debug: true }]);
    }
  }
}

main();