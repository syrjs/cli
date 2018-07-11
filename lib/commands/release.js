'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _logger = require('../utils/logger');

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simpleGit = require('simple-git')(process.cwd());
var description = {
  short: _strings2.default.get('Generates bundles from deterministic releases'),
  usage: 'release --tag=MyAwesomeRelease'
};

var api = {
  release: function release() {
    _logger.log.warn('Do you want to generate a release?');
    simpleGit.revparse(['HEAD'], function (err, result) {
      (0, _logger.log)(`current git hash: ${result.replace('\n', '')}`);
    });
  }
};

function cmd(parameters, switches) {
  api.release();
}

exports.cmd = cmd;
exports.api = api;
exports.description = description;