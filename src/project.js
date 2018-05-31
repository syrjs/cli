import xcode from 'xcode';
import path from 'path';
import { log } from './logger';


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
  return new Promise(resolve => {
    // get the xcode project
    let iosProjectPath = path.join(process.cwd(),'ios/sample.xcodeproj');
    let iosProject = xcode.project(iosProjectPath);
    iosProject.parse(function (err) {
      resolve(iosProject);
      console.log('project', iosProject);
    });
  });

}

async function getProjects() {
  var project = await loadProject();
  console.log(project);
}

getProjects();

export { packageJSON };
