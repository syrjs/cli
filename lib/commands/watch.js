'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

var _logger = require('../utils/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watchCommand = 'npm run serve > log.txt';

var description = {
  short: _strings2.default.get('Starts webpack development server'),
  usage: 'watch'
};

var api = {
  watch: function watch() {
    var tcpPortUsed = require('tcp-port-used');

    tcpPortUsed.check(8080, '127.0.0.1').then(function (inUse) {
      if (!inUse) {
        if (_fs2.default.existsSync('package.json')) {
          console.log('👀 Starting Watch Server');
          (0, _child_process.execSync)(watchCommand, { stdio: 'inherit' });
          console.log(`yppppppp`);
        } else {
          //@TODO
        }
      } else {
        _logger.log.warn('Server already running on port 8080');
        (0, _logger.log)('todo: Make this more robust :D some cool feature to start more servers');
      }
    }, function (err) {
      _logger.log.error('Error on check:', err.message);
    });
  }
};

function cmd(parameters, switches) {
  api.watch();
}

exports.cmd = cmd;
exports.api = api;
exports.description = description;