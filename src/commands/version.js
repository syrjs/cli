import localeStrings from 'strings';
import semver from 'semver';
import inquirer from 'inquirer';
import { get as getModules } from 'models/modules';
import { log } from 'utils/logger';
import { Manager as VersionManager } from 'models/config/versions';
import { project as npmProject } from 'models/projects/npm';
import { cmd as linkCMD } from './link';
import path from 'path';

const description = {
  short: localeStrings.get(
    'Manages versioning for the current project. Create and View version information'
  ),
  usage: 'version'
};

const api = {
  displayVersionInfo: async () => {
    return new Promise(async resolve => {
      let currentVersion = await VersionManager.getCurrentVersion();
      if (!currentVersion.meta) {
        log.warn(localeStrings.get('No current version set'));
        log.info(
          `${localeStrings.get(
            'Setting current version'
          )} -> ${npmProject.version}`
        );
        currentVersion = await VersionManager.createVersion(npmProject.version);
        VersionManager.setCurrentVersion(currentVersion);
      }

      if (
        currentVersion.meta.ios &&
        currentVersion.meta.ios.dependencies.length < 1
      ) {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'ManageNativeProjects',
              message: localeStrings.get(
                'No dependencies found for iOS would you like to scan node_modules'
              ),
              choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false }
              ]
            }
          ])
          .then(answers => {
            if (answers.ManageNativeProjects) linkCMD([], {});
            resolve();
          });
      }
    });
  },
  debugInfo: async () => {
    log('debug information');
  }
};

async function cmd(parameters, switches) {
  if (switches.debug) {
    await api.debugInfo();
  } else {
    // no switch provided just get version info
    await api.displayVersionInfo();
  }
}

export { cmd, api, description };
