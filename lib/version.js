'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.version = undefined;

var _logger = require('./logger');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var packageJSON = require('../package.json');

function version() {
  var versions = getProjectVersions(['@syr/core', '@syr/jsx', 'webpack']);
  versions.push({
    module: 'syr-cli',
    version: packageJSON.version
  });
  _logger.log.table(versions);
}

function getProjectVersions(modules) {
  var projectPackage = void 0;
  try {
    projectPackage = require(`${_path2.default.join(
      global.cwd,
      'package.json'
    )}`);
  } catch (e) {
    _logger.log.error('No package.json found in the command directory.');
  }
  var ret = [];
  Object.keys(projectPackage.devDependencies).forEach(function(key, index) {
    if (modules.indexOf(key) > -1) {
      ret.push({
        module: key,
        version: projectPackage.devDependencies[key]
      });
    }
  });
  return ret;
}

exports.version = version;
