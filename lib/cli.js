#! /usr/bin/env node
'use strict';

var _boot2 = require('./boot');

var _commands = require('./commands');

var _version = require('./version');

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

/**
 * This is the bin link
 */
global.debug = false;

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
    if (switches.version) {
      (0, _version.version)();
    }
  }
}

main();
