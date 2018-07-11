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
  short: _strings2.default.get('Creates a native library from bundles'),
  usage: 'eject --prefix=MINE --namespace=com.all.mine'
};

var api = {
  eject: function eject() {
    console.log('Not yet implimented');
  }
};

function cmd(parameters, switches) {
  api.eject();
}

exports.cmd = cmd;
exports.api = api;
exports.description = description;