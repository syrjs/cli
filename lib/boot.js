'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.boot = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _blargs = require('blargs');

var _blargs2 = _interopRequireDefault(_blargs);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function boot() {
  // get blargs
  var ret = (0, _blargs2.default)();
  var switches = ret[0] || {};
  var positionals = ret[1] || [];

  return {
    positionals,
    switches
  };
}

exports.boot = boot;
