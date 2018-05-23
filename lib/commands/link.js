'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = exports.cmd = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = {
  link: function link() {},
  unlink: function unlink() {}
};

function cmd(parameters, switches) {
  console.log('link command');
}

exports.cmd = cmd;
exports.api = api;