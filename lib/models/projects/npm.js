'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.info = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var info = {};
var packageJSONPath = _path2.default.join(process.cwd(), 'package.json');

try {
  exports.info = info = require(packageJSONPath);
} catch (e) {
  log.error(`No package.json found in the command directory. ${packageJSONPath}`);
}

exports.info = info;