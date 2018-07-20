import xcode from 'xcode';

import { recursiveDirectoriesByName } from 'utils';

const project = {
  write: () => {},
  read: projectPath => {},
  findProjects: async (basePath, excludes) => {
    return new Promise(resolve => {
      resolve(recursiveDirectoriesByName(basePath, 'xcodeproj', excludes));
    });
  }
};

export { project };