'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This module finds modules in node_modules that are referencing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @syr/core as a dependency.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * It then attempts to import the native provides classes, into matching
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * local projects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../utils/logger');

var _modules = require('../models/modules');

var _rc = require('../rc');

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var description = {
  short: _strings2.default.get('Links or Unlinks node_modules to the current project'),
  usage: 'syr link'
};

var api = {
  link: function link(modulesPath) {
    // modules in our node_modules directory
    var modules = (0, _modules.get)(modulesPath);
    var version = _rc.versions.get();
    var deps = version && version.dependencies;
    modules.forEach(function (module) {
      var nodeModulesPath = _path2.default.join(process.cwd(), 'node_modules');
      var modulePath = _path2.default.join(nodeModulesPath, module);
      var modulePackage = require(_path2.default.join(modulePath, 'package.json'));
      console.log(modulePackage);
      _rc.dependencies.add(module, {
        version: modulePackage.version,
        dependencies: modulePackage.dependencies
      }, version.version);
    });
  },
  unlink: function unlink() {}
};

function cmd(parameters, switches) {
  var _parameters = _slicedToArray(parameters, 1),
      projectName = _parameters[0];

  var modulesPath = _path2.default.join(process.cwd(), 'node_modules');

  if (projectName) {
    // we didn't get here from the init command
    modulesPath = _path2.default.join(process.cwd(), `${projectName}\node_modules`);
  }

  if (!_fs2.default.existsSync(modulesPath)) {
    _logger.log.error('no node_modules found!');
    return;
  } else {
    api.link(modulesPath);
  }
}

exports.cmd = cmd;
exports.api = api;
exports.description = description;