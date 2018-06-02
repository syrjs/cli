'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versions = exports.dependencies = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _logger = require('./utils/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load the rc file
var syrConfigPath = _path2.default.join(process.cwd(), '.syrrc');

var _data = {
  versions: {}
};

var syrConfig = {
  versions: {
    add: function add(tag, semVerString) {
      read();
      if (!semVerString) {
        _logger.log.error('Please provide a semVer for version');
      }
      _data.versions[semVerString] = {
        dependencies: {},
        version: semVerString
      };

      if (tag) {
        _data[tag] = semVerString;

        if (tag == 'latest') {
          _logger.log.info(`Tracking Version: ${tag} (${semVerString})`);
        }
      }

      write();
    },
    get: function get(tag) {
      read();
      tag = tag ? tag : 'latest';
      tag = tag == 'latest' ? _data['latest'] : tag;
      if (_data.versions[tag]) {
        _data.versions[tag].version = tag;
      } else {
        _logger.log.info('Preparing .syrrc');
        write();
      }
      return _data.versions[tag];
    },
    set: function set(tag, value) {
      _data.versions[tag] = value;
      write();
    }
  },
  dependencies: {
    get: function get(version) {
      read();
      return _data[version] && _data[version].dependencies || {};
    },
    add: function add(name, meta, version) {
      read();
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

read();

var versions = syrConfig.versions;
var dependencies = syrConfig.dependencies;
exports.dependencies = dependencies;
exports.versions = versions;


function read() {
  try {
    _data = JSON.parse(require('fs').readFileSync(syrConfigPath, 'utf8'));
  } catch (e) {
    write();
  }
}

function write() {
  _fs2.default.writeFileSync(syrConfigPath, JSON.stringify(_data, null, 4));
}