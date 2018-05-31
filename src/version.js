import path from 'path';
import { log } from './logger';
import { packageJSON as projectPackage } from './project';
import { dependencies, versions } from './rc';

const packageJSON = require('../package.json');

function version() {
  let appVersion = versions.get();
  if (!appVersion) {
    versions.add('latest', projectPackage.version);
  }

  // these are core things we want to surface to version info
  // specifically to help with debugging
  const coreVersions = getProjectVersions(['@syr/core', '@syr/jsx', 'webpack']);
  coreVersions.push({
    module: 'syr-cli',
    version: packageJSON.version
  });
  log(
    `\n${projectPackage.name
      ? projectPackage.name
      : 'project is'} ${projectPackage.version}\n`
  );
  log.table(coreVersions);
}

function getProjectVersions(modules) {
  let ret = [];

  if (projectPackage && projectPackage.devDependencies) {
    Object.keys(projectPackage.devDependencies).forEach(function(key, index) {
      if (modules.indexOf(key) > -1) {
        if (dependencies && !dependencies.get(projectPackage.version)[key]) {
          dependencies.add(
            key,
            projectPackage.devDependencies[key],
            projectPackage.version
          );
        }
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
