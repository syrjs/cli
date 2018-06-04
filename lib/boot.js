'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boot = undefined;

var _blargs = require('blargs');

var _blargs2 = _interopRequireDefault(_blargs);

var _updateNotifier = require('update-notifier');

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _updateNotifier2.default)({ pkg: _package2.default }).notify();

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