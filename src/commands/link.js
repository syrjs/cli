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
import { log } from 'utils/logger';
import { get as getModules } from 'models/modules';
import { dependencies, versions } from '../rc';
import localeStrings from 'strings';

const description = {
  short:localeStrings.get('Links or Unlinks node_modules to the current project'),
  usage: 'syr link'
};

const api = {
  link: modulesPath => {
    // modules in our node_modules directory
    let modules = getModules(modulesPath);
    let version = versions.get();
    let deps = version && version.dependencies;
    modules.forEach(module => {
      let nodeModulesPath = path.join(process.cwd(), 'node_modules');
      let modulePath = path.join(nodeModulesPath, module);
      let modulePackage = require(path.join(modulePath, 'package.json'));
      console.log(modulePackage);
      dependencies.add(
        module,
        {
          version: modulePackage.version,
          dependencies: modulePackage.dependencies
        },
        version.version
      );
    });
  },
  unlink: () => {}
};

function cmd(parameters, switches) {
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
    api.link(modulesPath);
  }
}

export { cmd, api, description };
