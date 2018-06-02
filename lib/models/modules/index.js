'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(modulesPath) {
  var dirs = (0, _utils.getDirs)(modulesPath);
  var namespaces = [];

  var modulesToLink = dirs.filter(function (dir) {
    if (dir.indexOf('@') > -1) {
      namespaces.push(dir);
    }
    return checkModule(modulesPath, dir);
  });

  if (namespaces.length > 0) {
    namespaces.forEach(function (namespace) {
      var submodules = get(_path2.default.join(modulesPath, namespace)).map(function (value, index) {
        return `${namespace}/${value}`;
      });
      if (submodules && submodules.length > 0) {
        modulesToLink = modulesToLink.concat(submodules);
      }
    });
  }

  return modulesToLink;
}

function checkModule(modulePath, moduleDirectory) {
  var modulePackage = void 0;

  try {
    modulePackage = require(`${modulePath}/${moduleDirectory}/package.json`);
  } catch (e) {
    return false;
  }

  if (modulePackage && (modulePackage.dependencies && modulePackage.dependencies['@syr/core'] || modulePackage.name.indexOf('@syr') > -1)) {
    return true;
  }

  return false;
}

exports.get = get;