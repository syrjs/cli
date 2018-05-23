'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.log = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _console = require('console.table');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function log(message, level) {
  switch (level) {
    case 'warn':
      message = _chalk2.default.yellow(message);
      break;
    case 'error':
      message = _chalk2.default.red(message);
      break;
    case 'info':
      message = _chalk2.default.blue(message);
      break;
    case 'success':
      message = _chalk2.default.green(message);
      break;
    default:
      message = _chalk2.default.white(message);
  }
  console.log(message);
}

log.error = function(message) {
  log(message, 'error');
};

log.warn = function(message) {
  log(message, 'warn');
};

log.info = function(message) {
  log(message, 'info');
};

log.success = function(message) {
  log(message, 'success');
};

log.table = function(table) {
  console.table(table);
};

log.chalk = _chalk2.default;

exports.log = log;