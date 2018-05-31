'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = exports.cmd = undefined;

var _logger = require('../logger');

var api = {
  eject: function eject() {}
};

function cmd(parameters, switches) {
  api.eject();
}

exports.cmd = cmd;
exports.api = api;