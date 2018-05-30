'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.api = exports.cmd = undefined;

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    }
  };
})(); /**
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

var _logger = require('../logger');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var api = {
  link: function link() {
    findModules();
  },
  unlink: function unlink() {}
};

function cmd(parameters, switches) {
  var _parameters = _slicedToArray(parameters, 1),
    projectName = _parameters[0];

  var modulePath = _path2.default.join(process.cwd(), 'node_modules');

  if (projectName) {
    // we didn't get here from the init command
    modulePath = _path2.default.join(
      process.cwd(),
      `${projectName}\node_modules`
    );
  }

  if (!_fs2.default.existsSync(modulePath)) {
    _logger.log.error('no node_modules found!');
    return;
  } else {
    getDirs(modulePath, function(dirs) {
      var modulesToLink = dirs.filter(function(dir) {
        return checkModule(modulePath, dir);
      });
    });
  }
  api.link();
}

exports.cmd = cmd;
exports.api = api;

function findModules(rootDir) {
  // getDirs(rootDir, ()=>{
  // });
}

function checkModule(modulePath, moduleDirectory) {
  var modulePackage = void 0;

  try {
    modulePackage = require(`${modulePath}/${moduleDirectory}/package.json`);
  } catch (e) {
    return false;
  }

  if (
    modulePackage &&
    modulePackage.dependencies &&
    modulePackage.dependencies['@syr/core']
  ) {
    return true;
  }

  return false;
}

function getDirs(rootDir, cb) {
  _fs2.default.readdir(rootDir, function(err, files) {
    var dirs = [];
    for (var index = 0; index < files.length; ++index) {
      var file = files[index];
      if (file[0] !== '.') {
        var filePath = rootDir + '/' + file;
        _fs2.default.stat(
          filePath,
          function(err, stat) {
            if (stat.isDirectory()) {
              dirs.push(this.file);
            }
            if (files.length === this.index + 1) {
              return cb(dirs);
            }
          }.bind({ index: index, file: file })
        );
      }
    }
  });
}
