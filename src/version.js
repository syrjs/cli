import { log } from './logger';
import path from 'path';
const packageJSON = require('../package.json');

function version() {
  const versions = getProjectVersions(['@syr/core', '@syr/jsx', 'webpack']);
  versions.push({
    module: 'syr-cli',
    version: packageJSON.version
  });
  log.table(versions);
}

function getProjectVersions(modules) {
  let projectPackage;
  try {
    projectPackage = require(`${path.join(global.cwd, 'package.json')}`);
  } catch (e) {
    log.error('No package.json found in the command directory.');
  }
  let ret = [];

  if(projectPackage && projectPackage.devDependencies) {
    Object.keys(projectPackage.devDependencies).forEach(function(key, index) {
      if (modules.indexOf(key) > -1) {
        ret.push({
          module: key,
          version: projectPackage.devDependencies[key]
        });
      }
    });
  }

  return ret;
}

export { version };
