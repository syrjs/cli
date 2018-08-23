import xcode from 'xcode';

import { recursiveDirectoriesByName } from 'utils';

const project = {
  write: () => {},
  get: async projectPath => {
    return new Promise(resolve => {
      let iOSProject = xcode.project(`${projectPath}/project.pbxproj`);
      iOSProject.parse(function(err) {
        if (err == null) {
          resolve(iOSProject);
        }
      });
    });
  },
  findProjects: async (basePath, excludes) => {
    return new Promise(resolve => {
      resolve(recursiveDirectoriesByName(basePath, 'xcodeproj', excludes));
    });
  }
};

export { project };
