'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versions = exports.dependencies = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load the rc file
var syrConfigPath = _path2.default.join(process.cwd(), '.syrrc');

var _data = {
  versions: {}
};

var syrConfig = {
  versions: {
    add: function add(tag, semVerString) {
      if (!semVerString) {
        _logger.log.error('Please provide a semVer for version');
      }
      _data.versions[semVerString] = {
        dependencies: {}
      };

      if (tag) {
        _data[tag] = semVerString;
      }
      write();
    },
    get: function get(tag) {
      tag = tag ? tag : 'latest';
      return _data[tag];
    }
  },
  dependencies: {
    get: function get(version) {
      return _data[version] && _data[version].dependencies || {};
    },
    add: function add(name, meta, version) {
      if (!version) {
        _logger.log.error('no version specified');
        return;
      }

      if (!_data.versions[version]) {
        _logger.log.info('adding version');
        versions.add(version);
      }

      _data.versions[version].dependencies[name] = meta;

      write();
    },
    remove: function remove(name) {
      delete _data.dependencies[name];
      write();
    }
  }
};

try {
  syrConfig = require(syrConfigPath);
} catch (e) {
  write();
}

var versions = syrConfig.versions;
var dependencies = syrConfig.dependencies;
exports.dependencies = dependencies;
exports.versions = versions;


function write() {
  _fs2.default.writeFileSync(syrConfigPath, JSON.stringify(_data));
}