import path from 'path';
import fs from 'fs';
import { log } from 'utils/logger';

// load the rc file
const syrConfigPath = path.join(process.cwd(), '.syrrc');

let _data = {
  versions: {}
};

let syrConfig = {
  versions: {
    add: function(tag, semVerString) {
      read();
      if (!semVerString) {
        log.error('Please provide a semVer for version');
      }
      _data.versions[semVerString] = {
        dependencies: {},
        version: semVerString
      };

      if (tag) {
        _data[tag] = semVerString;

        if (tag == 'latest') {
          log.info(`Tracking Version: ${tag} (${semVerString})`);
        }
      }

      write();
    },
    get: function(tag) {
      read();
      tag = tag ? tag : 'latest';
      tag = tag == 'latest' ? _data['latest'] : tag;
      if (_data.versions[tag]) {
        _data.versions[tag].version = tag;
      } else {
        log.info('Preparing .syrrc');
        write();
      }
      return _data.versions[tag];
    },
    set: function(tag, value) {
      _data.versions[tag] = value;
      write();
    }
  },
  dependencies: {
    get: function(version) {
      read();
      return (_data[version] && _data[version].dependencies) || {};
    },
    add: function(name, meta, version) {
      read();
      if (!version) {
        log.error('no version specified');
        return;
      }

      if (!_data.versions[version]) {
        log.info('adding version');
        versions.add(version);
      }

      _data.versions[version].dependencies[name] = meta;

      write();
    },
    remove: function(name) {
      delete _data.dependencies[name];
      write();
    }
  }
};

read();

const versions = syrConfig.versions;
const dependencies = syrConfig.dependencies;
export { dependencies, versions };

function read() {
  try {
    _data = JSON.parse(require('fs').readFileSync(syrConfigPath, 'utf8'));
  } catch (e) {
    write();
  }
}

function write() {
  fs.writeFileSync(syrConfigPath, JSON.stringify(_data, null, 4));
}
