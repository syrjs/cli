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

const api = {
  link: () => {
    findModules();
  },
  unlink: () => {}
};

function cmd(parameters, switches) {
  const [projectName] = parameters;
  let modulePath = path.join(process.cwd(), 'node_modules');

  if (projectName) {
    // we didn't get here from the init command
    modulePath = path.join(process.cwd(), `${projectName}\node_modules`);
  }

  if (!fs.existsSync(modulePath)) {
    log.error('no node_modules found!');
    return;
  } else {
    getDirs(modulePath, dirs => {
      let modulesToLink = dirs.filter(dir => {
        return checkModule(modulePath, dir);
      });
    });
  }
  api.link();
}

export { cmd, api };

function findModules(rootDir) {
  // getDirs(rootDir, ()=>{
  // });
}

function checkModule(modulePath, moduleDirectory) {
  let modulePackage;

  try {
    modulePackage = require(`${modulePath}/${moduleDirectory}/package.json`);
  } catch (e) {
    return false;
  }

  if (
    modulePackage &&
    (modulePackage.dependencies && modulePackage.dependencies['@syr/core'])
  ) {
    return true;
  }

  return false;
}

function getDirs(rootDir, cb) {
  fs.readdir(rootDir, function(err, files) {
    var dirs = [];
    for (var index = 0; index < files.length; ++index) {
      var file = files[index];
      if (file[0] !== '.') {
        var filePath = rootDir + '/' + file;
        fs.stat(
          filePath,
          function(err, stat) {
            if (stat.isDirectory()) {
              dirs.push(this.file);
            }
            if (files.length === this.index + 1) {
              return cb(dirs);
            }
          }.bind({ index: index, file: file })
        );
      }
    }
  });
}
