'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setPreference = exports.getPreferences = undefined;

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SYR_CONFIG_FILE = '.syrrc';
var SYR_CONFIG_PATH = path.join(_os2.default.homedir(), SYR_CONFIG_FILE);

var preferences = {};

function getPreferences() {
  return preferences;
}

function setPreference(key, value) {
  preferences[key] = value;
}

exports.getPreferences = getPreferences;
exports.setPreference = setPreference;
