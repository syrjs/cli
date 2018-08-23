'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.write = exports.read = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function read(filePath) {
  var data = {};
  try {
    data = JSON.parse(_fs2.default.readFileSync(filePath, 'utf8'));
  } catch (e) {
    write(filePath, data);
  }
  return data;
}

function write(filePath, data) {
  _fs2.default.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

exports.read = read;
exports.write = write;
