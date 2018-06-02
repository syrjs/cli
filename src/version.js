import path from 'path';
import { log } from 'utils/logger';
import { packageJSON as projectPackage, getProjects } from './project';
import { versions } from './rc';

const packageJSON = require('../package.json');

function version() {
  let appVersion = versions.get();
  if (!appVersion) {
    versions.add('latest', projectPackage.version);
  }

  var projectsPromise = Promise.resolve(getProjects());
  projectsPromise.then(function(projects) {
    // these are core things we want to surface to version info
    // specifically to help with debugging
    const coreVersions = getProjectVersions([
      '@syr/core',
      '@syr/jsx',
      'webpack'
    ]);
    coreVersions.unshift({
      module: '@syr/cli',
      version: packageJSON.version
    });
    log(
      `\n${projectPackage.name
        ? projectPackage.name
        : 'project is'} ${projectPackage.version}\n`
    );
    log.table(coreVersions);
  });
}

function getProjectVersions(modules) {
  let ret = [];

  if (projectPackage && projectPackage.devDependencies) {
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
