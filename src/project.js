import xcode from 'xcode';
import path from 'path';
import { log } from 'utils/logger';
import { recursiveDirectoriesByName } from './utils';
import { versions } from './rc';

const cliSelect = require('cli-select');
const chalk = require('chalk');

let packageJSON = {};
let packageJSONPath = path.join(process.cwd(), 'package.json');

try {
  packageJSON = require(packageJSONPath);
} catch (e) {
  log.error(
    `No package.json found in the command directory. ${packageJSONPath}`
  );
}

function loadProject() {
  let projectVersion = versions.get('latest');
  let baseProjectPath = path.join(process.cwd(), 'ios');
  let projectsStuff = [];

  if (!projectVersion.iosBaseProject) {
    log.warn('No base project for iOS selected.');
    projectsStuff = recursiveDirectoriesByName(baseProjectPath, 'xcodeproj');
  } else {
    // more than one project, have user select
    return new Promise(resolve => {
      log(`iOS Base Project: ${projectVersion.iosBaseProject.name}`);
      resolve();
    });
  }

  if (projectsStuff.length > 1) {
    // more than one project, have user select
    return new Promise(resolve => {
      cliSelect({
        values: projectsStuff,
        valueRenderer: (value, selected) => {
          if (selected) {
            return chalk.underline(value.name);
          }
          return value.name;
        }
      })
        .then(response => {
          log.info(`Setting iOS Base Project: ${response.value}`);
          projectVersion.iosBaseProject = {
            name: response.value,
            path: response.path
          };
          versions.set(projectVersion.version, projectVersion);
          resolve();
        })
        .catch(() => {
          console.log('cancelled');
        });
    });
  } else if (projectsStuff.length == 1) {
    // select only project infer this is the project to use
  } else {
    log.error('No iOS projects found.');
  }
}

async function getProjects() {
  var project = await loadProject();
  return {
    android: null,
    ios: project
  };
}

export { packageJSON, getProjects };
