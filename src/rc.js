import path from 'path';
import fs from 'fs';
import { log } from './logger';

// load the rc file
const syrConfigPath = path.join(process.cwd(), '.syrrc');

let _data = {
  versions: {}
};

let syrConfig = {
  versions: {
    add: function(tag, semVerString) {
      if (!semVerString) {
        log.error('Please provide a semVer for version');
      }
      _data.versions[semVerString] = {
        dependencies: {}
      };

      if (tag) {
        _data[tag] = semVerString;
      }
      write();
    },
    get: function(tag) {
      tag = tag ? tag : 'latest';
      return _data[tag];
    }
  },
  dependencies: {
    get: function(version) {
      return (_data[version] && _data[version].dependencies) || {};
    },
    add: function(name, meta, version) {
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

try {
  syrConfig = require(syrConfigPath);
} catch (e) {
  write();
}

const versions = syrConfig.versions;
const dependencies = syrConfig.dependencies;
export { dependencies, versions };

function write() {
  fs.writeFileSync(syrConfigPath, JSON.stringify(_data));
}
