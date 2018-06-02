'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recursiveDirectoriesByName = exports.recursiveFilesByExt = exports.getDirs = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDirs(rootDir, cb) {
  var files = _fs2.default.readdirSync(rootDir);
  var dirs = [];
  for (var index = 0; index < files.length; ++index) {
    var file = files[index];
    if (file[0] !== '.') {
      var filePath = rootDir + '/' + file;
      var stat = _fs2.default.statSync(filePath);
      if (stat.isDirectory()) {
        dirs.push(file);
      }
    }
  }
  return dirs;
}

function recursiveDirectoriesByName(base, name) {
  var dirs = getDirs(base);
  var ret = [];

  dirs.forEach(function (dir) {
    if (dir.indexOf(name) > -1) {
      ret.push({
        name: dir,
        path: base
      });
    } else {
      var subdirs = recursiveDirectoriesByName(_path2.default.join(base, dir), name);
      ret = ret.concat(subdirs);
    }
  });

  return ret;
}

function recursiveFilesByExt(base, ext, files, result) {
  files = files || _fs2.default.readdirSync(base);
  result = result || [];

  files.forEach(function (file) {
    var newbase = _path2.default.join(base, file);
    if (_fs2.default.statSync(newbase).isDirectory()) {
      result = recursiveFilesByExt(newbase, ext, _fs2.default.readdirSync(newbase), result);
    } else {
      if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
        result.push(newbase);
      }
    }
  });
  return result;
}

exports.getDirs = getDirs;
exports.recursiveFilesByExt = recursiveFilesByExt;
exports.recursiveDirectoriesByName = recursiveDirectoriesByName;