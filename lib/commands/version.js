'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _logger = require('../utils/logger');

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var description = {
  short: _strings2.default.get('Manages versioning for the current project. Create and View version information'),
  usage: 'syr version'
};

var api = {
  getCurrentVersion: function getCurrentVersion() {},
  addVersion: function addVersion() {},
  removeVersion: function removeVersion() {},
  debugInfo: function debugInfo() {
    (0, _logger.log)('debug infoozzz');
  }
};

function cmd(parameters, switches) {
  console.log(parameters, switches);
  if (switches.debug) {
    api.debugInfo();
  }
}

exports.cmd = cmd;
exports.api = api;
exports.description = description;