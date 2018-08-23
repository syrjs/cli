import fs from 'fs';
import path from 'path';
import { getDirs } from 'utils';
import { project as iOSProject } from 'models/projects/ios';

function get(modulesPath) {
  let dirs = getDirs(modulesPath);
  let namespaces = [];

  let modulesToLink = dirs.filter(dir => {
    if (dir.indexOf('@') > -1) {
      namespaces.push(dir);
    }
    return isSyrModule(modulesPath, dir);
  });

  if (namespaces.length > 0) {
    namespaces.forEach(namespace => {
      let submodules = get(path.join(modulesPath, namespace)).map(
        (value, index) => `${namespace}/${value}`
      );
      if (submodules && submodules.length > 0) {
        modulesToLink = modulesToLink.concat(submodules);
      }
    });
  }

  return modulesToLink;
}

function compare() {}

function isSyrModule(modulePath, moduleDirectory) {
  let modulePackage;

  try {
    modulePackage = require(`${modulePath}/${moduleDirectory}/package.json`);
  } catch (e) {
    return false;
  }

  if (
    modulePackage &&
    ((modulePackage.dependencies && modulePackage.dependencies['@syr/core']) ||
      modulePackage.name.indexOf('@syr') > -1)
  ) {
    return true;
  }

  return false;
}

export { get, compare };

// if (
//   currentVersion.meta.ios &&
//   currentVersion.meta.ios.dependencies.length < 1
// ) {
//   inquirer
//     .prompt([
//       {
//         type: 'list',
//         name: 'ManageNativeProjects',
//         message: localeStrings.get(
//           'No dependencies found for iOS would you like to scan node_modules'
//         ),
//         choices: [
//           { name: 'Yes', value: true },
//           { name: 'No', value: false }
//         ]
//       }
//     ])
//     .then(answers => {
//       if (answers.ManageNativeProjects) linkCMD([], {});
//       resolve();
//     });
// }
