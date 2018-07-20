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
  getCurrentVersion: async () => {
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
    } else {
      if(npmProject.version != currentVersion.semver) {
        // this version is not the current version
        let isVersionAvailable = await api.checkForVersion(npmProject.version);
        if(!isVersionAvailable) {
          // new version
          log.info(`Creating new version ${npmProject.version}`)
          currentVersion = await VersionManager.createVersion(npmProject.version);
          VersionManager.setCurrentVersion(currentVersion);
        } else {
          log.error(`package.json version ${npmProject.version} does not match syr.json currentProject ${currentVersion.semver}.`)
          const shouldSwitchProjects = await inquirer.prompt([
            {
              type: 'list',
              name: 'result',
              message: `Switch current project in syr.json to ${npmProject.version}?`,
              choices: [{ name: 'Yes', value: true }, { name: 'No', value: false }]
            }
          ]);
          if(shouldSwitchProjects.result) {
            await api.switchVersion(npmProject.version);
          } else {
            log.warn('current syr project version, and current npm project version do not match, becareful.')
          }
        }
      }
    }
    return currentVersion;
  },
  switchVersion: async (versionTag) => {
    let version = await VersionManager.getVersion(versionTag);

    console.log('setting version to this >>> ', version.semver);
    VersionManager.setCurrentVersion(JSON.stringify(version));

    let currentVersion = await VersionManager.getCurrentVersion();
    console.log('version', currentVersion);
    log(`current version set to ${currentVersion}`);
  },
  checkForVersion: async (versionTag) => {
    let version = await VersionManager.getVersion(versionTag);

    if(version.meta) {
      return true;
    }

    return false;
  },
  displayAllVersions: async () => {
    let versionList = await VersionManager.getVersionList();

    if(versionList.length < 1) {
      let currentVersion = await api.getCurrentVersion();
      versionList = await VersionManager.getVersionList();
    }

    log(''); // blank space
    log.table(versionList);
  },
  displayVersionInfo: async () => {
    return new Promise(async resolve => {
      let currentVersion = await api.getCurrentVersion();
    });
  },
  debugInfo: async () => {
    log('debug information');
  }
};

async function cmd(parameters, switches) {
  if (switches.debug) {
    await api.debugInfo();
  } else if(switches.list) {
    await api.displayAllVersions();
  } else {
    // no switch provided just get version info
    await api.displayVersionInfo();
  }
}

export { cmd, api, description };