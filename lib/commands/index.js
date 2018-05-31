"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function commands(command, optionals) {
  var module = void 0;
  try {
    module = require(`./${command}`);
  } catch (e) {
    console.log(e);
  }
  module.cmd.apply(this, optionals);
}

exports.commands = commands;