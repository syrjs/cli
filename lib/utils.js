'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDirs = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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

exports.getDirs = getDirs;