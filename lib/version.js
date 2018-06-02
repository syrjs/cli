'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.version = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./utils/logger');

var _project = require('./project');

var _rc = require('./rc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packageJSON = require('../package.json');

function version() {
  var appVersion = _rc.versions.get();
  if (!appVersion) {
    _rc.versions.add('latest', _project.packageJSON.version);
  }

  var projectsPromise = Promise.resolve((0, _project.getProjects)());
  projectsPromise.then(function (projects) {
    // these are core things we want to surface to version info
    // specifically to help with debugging
    var coreVersions = getProjectVersions(['@syr/core', '@syr/jsx', 'webpack']);
    coreVersions.unshift({
      module: '@syr/cli',
      version: packageJSON.version
    });
    (0, _logger.log)(`\n${_project.packageJSON.name ? _project.packageJSON.name : 'project is'} ${_project.packageJSON.version}\n`);
    _logger.log.table(coreVersions);
  });
}

function getProjectVersions(modules) {
  var ret = [];

  if (_project.packageJSON && _project.packageJSON.devDependencies) {
    Object.keys(_project.packageJSON.devDependencies).forEach(function (key, index) {
      if (modules.indexOf(key) > -1) {
        ret.push({
          module: key,
          version: _project.packageJSON.devDependencies[key]
        });
      }
    });
  }

  return ret;
}

exports.version = version;