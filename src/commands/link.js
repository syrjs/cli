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
import xcode from 'xcode';
import { log } from 'utils/logger';
import { get as getModules, compare as compareModules } from 'models/modules';
import { project as syrProject } from 'models/projects/syr';
import localeStrings from 'strings';
import { project as iOSProject } from 'models/projects/ios';
import { project as npmProject } from 'models/projects/npm';

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
      log.error(
        'No Current Version set. Run syr version before running syr link'
      );
      return;
    }

    // get all modules from node_modules
    let projectModules = await getProjectModules(modulesPath);
    // console.log('project modules >>> ', projectModules);
  }
};

async function getProjectModules(modulesPath) {
  let modules = getModules(modulesPath);
  let managediOSProject = await iOSProject.get(syrProject.data.iosProject.path);
  let nodeModulesPath = path.join(process.cwd(), 'node_modules');
  let formattedModules = [];

  return new Promise(resolve => {
    modules.forEach(async module => {
      let modulePath = path.join(nodeModulesPath, module);
      let modulePackage = require(path.join(modulePath, 'package.json'));
      let moduleKey = path.relative(process.cwd(), modulePath);

      let iOSProjects = getLinkStatus(
        managediOSProject,
        resolveLinkableProject(
          modulePackage,
          await iOSProject.findProjects(modulePath, ['node_modules'])
        )
      );

      areProjectsRemoved(modulePackage, iOSProjects);

      formattedModules.push({
        key: moduleKey,
        name: modulePackage.name,
        version: modulePackage.version,
        description: modulePackage.description,
        projects: {
          js: modulePackage,
          ios: iOSProjects
        }
      });
    });

    resolve(formattedModules);
  });
}

function getLinkStatus(baseProject, projects) {
  projects = areProjectsLinked(baseProject, projects);
  return projects;
}

function areProjectsRemoved(modulePackage, projects) {
  projects.forEach(project => {
    console.log(project);
  });
}

function areProjectsLinked(baseProject, projects) {
  let Libraries = baseProject.pbxGroupByName('Libraries');
  if (Libraries && Libraries.children) {
    projects.forEach(project => {
      let Library = Libraries.children.find(child => {
        return project.name == child.comment;
      });
      if (Library) {
        project.linkStatus = 'linked';
      }
    });
  }
  return projects;
}

function resolveLinkableProject(modulePackage, iOSProjects) {
  if (
    modulePackage.syr &&
    modulePackage.syr.ios &&
    modulePackage.syr.ios.project
  ) {
    iOSProjects.forEach((project, index) => {
      if (project.value.indexOf(modulePackage.syr.ios.project) == -1) {
        iOSProjects.splice(index, 1);
      }
    });
  }
  return iOSProjects;
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

export { cmd, api, description };
