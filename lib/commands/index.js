'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function commands(command, optionals) {
  var module = void 0;
  try {
    module = require(`./${command}`);
  } catch (e) {
    if (e.message.indexOf('Cannot find module') > -1) {
      console.log(`Command Not Found: ${command}`);
    }
  }
  module.cmd.apply(this, optionals);
}

exports.commands = commands;