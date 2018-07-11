import xcode from 'xcode';

import { recursiveDirectoriesByName } from 'utils';

const project = {
  write: () => {},
  read: projectPath => {},
  findProjects: async basePath => {
    return new Promise(resolve => {
      resolve(recursiveDirectoriesByName(basePath, 'xcodeproj'));
    });
  }
};

export { project };
