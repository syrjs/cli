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
import { log } from '../logger';
import { findModules } from '../modules';

const api = {
  link: modulesPath => {
    let modules = findModules(modulesPath);
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

export { cmd, api };
