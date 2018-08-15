/**
 *
 * This module finds modules in node_modules that are referencing
 * @syr/core as a dependency.
 *
 * It then attempts to import the native provides classes, into matching
 * local projects.
 */

import fs from 'fs';
import path from 'path';
import semver from 'semver';
import {
  log
} from 'utils/logger';
import {
  get as getModules,
  compare as compareModules
} from 'models/modules';
import {
  project as syrProject
} from 'models/projects/syr';
import localeStrings from 'strings';
import {
  project as iOSProject
} from 'models/projects/ios';
import {
  project as npmProject
} from 'models/projects/npm';


import xcode from 'xcode';

const description = {
  short: localeStrings.get(
    'Links or Unlinks node_modules to the current project'
  ),
  usage: 'syr link'
};

const api = {
  link: async modulesPath => {

    // for now, for ease, just return to the user to run syr version before running syr link
    if (!syrProject.data.currentVersion) {
      log.error('No Current Version set. Run syr version before running syr link');
      return;
    }

    // modules in our node_modules directory
    let modules = getModules(modulesPath);
    let printModules = [];

    await modules.forEach(async (module) => {

      // get info on each module
      let nodeModulesPath = path.join(process.cwd(), 'node_modules');
      let modulePath = path.join(nodeModulesPath, module);
      let modulePackage = require(path.join(modulePath, 'package.json'));
      let linkAgainstVersion = syrProject.data.currentVersion;
      let dependencies = syrProject.data.versions[linkAgainstVersion].ios.dependencies || [];


      // look for iOS Projects for this module
      let projects = await iOSProject.findProjects(modulePath);

      if (projects.length > 1) {
        // to many iOS projects found for this module.
        // check to see if the module author offered us
        // a default module. Otherwise we may need to as user?
        if (modulePackage.syr && modulePackage.syr.ios && modulePackage.syr.ios.project) {
          projects.forEach((project, index) => {
            if (project.value.indexOf(modulePackage.syr.ios.project) == -1) {
              projects.splice(index, 1);
            };
          });
        }
      }

      // get the modules key which is the relative path
      let moduleKey = path.relative(process.cwd(), modulePath);
      if (dependencies[moduleKey]) {
        for (var key in npmProject.devDependencies) {
          if (npmProject.devDependencies.hasOwnProperty(key)) {
            if (moduleKey.indexOf(key) > -1) {
              let installedSatisfies = semver.satisfies(dependencies[moduleKey].meta.version, npmProject.devDependencies[key]);

              if (!installedSatisfies) {
                // version on disk, doesn't satisfy the version in syr.json
              }

              break;
            }
          }
        }
      }

      // save information before we attempt to alter the native linking
      // check here for version changes when linking
      dependencies[moduleKey] = {
        meta: {
          name: modulePackage.name,
          version: modulePackage.version,
          description: modulePackage.description,
          main: modulePackage.main
        },
        nativeProjects: projects
      };


      // now attempt to link those projects in the xcodeproj.
      // first check to see if we have this module defined in xcodeproj already, if so, just update the linking path.
      if (syrProject.data.iosProject && syrProject.data.iosProject.path) {
        let managedIOSProject = xcode.project(`${syrProject.data.iosProject.path}/project.pbxproj`);
        let alreadyLinkedLibraries = await getAlreadyLinkedLibraries(projects, managedIOSProject);
        if (Object.keys(alreadyLinkedLibraries).length > 0) {
          // there are libraries already linked in the managed project
          console.log('update link projects ----> ', alreadyLinkedLibraries);
        };
      }

      // add libraries to project to manage


      // blank print
      log('');

      printModules.push({
        "Module Name": modulePackage.name,
        "Version": modulePackage.version,
        "Description": modulePackage.description,
        "Projects": `${modulePackage.main ? 'JS': ''} ${projects.length > 0 ?'iOS':''}`
      });

      // save project information
      syrProject.write();
    });

    // return to the user a list of linked modules
    log.table(printModules);
  }
};


async function getAlreadyLinkedLibraries(subProjects, rootProject) {
  return new Promise(resolve => {
      let alreadyLinkedLibraries = {};
      rootProject.parse(function (err) {
        if (err == null) {
          subProjects.forEach(project => {
            let Libraries = rootProject.pbxGroupByName('Libraries');
            let Library = Libraries.children.find(library => {
              return library.comment == project.name
            });
            if (Library) {
              alreadyLinkedLibraries[Library.comment] = Library.value;
            }
          });
        }
        resolve(alreadyLinkedLibraries);
      });
  });
}

async function cmd(parameters, switches) {
  const [projectName] = parameters;
  let modulesPath = path.join(process.cwd(), 'node_modules');

  if (projectName) {
    // we didn't get here from the init command
    modulesPath = path.join(process.cwd(), `${projectName}\node_modules`);
  }

  if (!fs.existsSync(modulesPath)) {
    log.error('no node_modules found!');
    return;
  } else {
    await api.link(modulesPath);
  }
}

export {
  cmd,
  api,
  description
};