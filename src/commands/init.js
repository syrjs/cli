/**
 * This module takes care of initializing a project.
 * It copies files from fixtures, does an npm install
 * And then runs link to complete the setup
 *
 * todo: inline ProjectName into the package.json fixture
 */
import fs from 'fs';
import path from 'path';
import { cmd as link } from './link';
import { exec, execSync } from 'child_process';
import { log } from 'utils/logger';
import localeStrings from 'strings';

const initInstallCommand = `npm install`;
const syrProjectPaths = {
  ios: '/node_modules/@syr/core/ios/SyrNativeSample'
};

const description = {
  short: localeStrings.get(
    'Creates a new project using boilerplate. Includes native projects to get started'
  ),
  usage: 'syr init {project name}'
};

const api = {
  init: projectName => {
    // was a project name provided?
    if (!projectName) {
      log.error('No project name specified');
      log('usage: syr init ProjectName');
      return;
    }

    // get the fixtures
    const packageJson = require('../../fixtures/package.json');
    const [indexFixture, ...fixtures] = getFixtures([
      'index.js',
      '.babelrc',
      'package.json',
      'webpack.config.js'
    ]);
    const projectPath = path.join(process.cwd(), projectName);

    // check really quick if a user ran this in a project, warn
    checkForPackageJSON();

    // copy our fixtures (really need package.json to kick off install)
    copyFixtures(fixtures, projectPath, () => {
      // install node modules
      process.chdir(projectPath);
      execSync(initInstallCommand, { stdio: 'inherit' });

      // copy index.js to src/
      copyFixtures([indexFixture], path.join(projectPath, 'src'), () => {
        // copy iOS project
        copyDir(
          path.join(projectPath, syrProjectPaths.ios),
          path.join(projectPath, 'ios')
        );
      });
    });
  }
};

function cmd(parameters, switches) {
  const [projectName] = parameters;
  // init the folder
  api.init(projectName);
  // run the link command
  link(parameters, switches);
}

export { cmd, api, description };

function copyFixtures(fixtures, projectPath, callback) {
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
    fixtures.forEach(meta => {
      fs.writeFileSync(path.join(projectPath, meta.name), meta.contents);
    });
    callback();
  } else {
    log.error('project path already exists');
    log(projectPath);
  }
}

function checkForPackageJSON() {
  let projectPackage;
  try {
    projectPackage = require(`${path.join(process.cwd(), 'package.json')}`);
  } catch (e) {}
  if (projectPackage) {
    log.warn('performing this command from inside a project.');
  }
}

function getFixtures(files) {
  const fixturePath = path.join(__dirname, '../../fixtures');
  return files.map(name => {
    let filePath = path.join(fixturePath, name);
    return {
      name: name,
      contents: fs.readFileSync(filePath, 'utf8')
    };
  });
}

function mkdir(dir) {
  // making directory without exception if exists
  try {
    fs.mkdirSync(dir, '0755');
  } catch (e) {
    if (e.code != 'EEXIST') {
      throw e;
    }
  }
}

function copyDir(src, dest) {
  mkdir(dest);
  var files = fs.readdirSync(src);
  for (var i = 0; i < files.length; i++) {
    var current = fs.lstatSync(path.join(src, files[i]));
    if (current.isDirectory()) {
      copyDir(path.join(src, files[i]), path.join(dest, files[i]));
    } else if (current.isSymbolicLink()) {
      var symlink = fs.readlinkSync(path.join(src, files[i]));
      fs.symlinkSync(symlink, path.join(dest, files[i]));
    } else {
      copy(path.join(src, files[i]), path.join(dest, files[i]));
    }
  }
}

function copy(src, dest) {
  fs.writeFileSync(dest, fs.readFileSync(src));
}
