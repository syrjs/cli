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
  short: _strings2.default.get('Generates bundles from deterministic releases'),
  usage: 'bundle --release=1.2.3'
};

var api = {
  bundle: function bundle() {}
};

function cmd(parameters, switches) {
  api.bundle();
}

exports.cmd = cmd;
exports.api = api;
exports.description = description;