'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.project = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../../utils/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var project = {};
var packageJSONPath = _path2.default.join(process.cwd(), 'package.json');

try {
  exports.project = project = require(packageJSONPath);
} catch (e) {
  _logger.log.error(`No package.json found in the command directory. Looking for ${packageJSONPath}`);
  process.exit(0);
}

exports.project = project;