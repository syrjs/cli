import { project as syrProject } from 'models/projects/syr';
import { log } from 'utils/logger';

class manager {
  async getCurrentVersion() {
    return new Promise(async resolve => {
      await syrProject.read();
      const versions = syrProject.data.versions || {};
      const version = versions[syrProject.data.currentVersion];
      resolve({ semver: syrProject.data.currentVersion, meta: version });
    });
  }
  async createVersion(version) {
    return new Promise(resolve => {
      let versions = syrProject.data.versions || {};

      if (versions[version]) {
        resolve({ semver: version, meta: versions[version] });
      }

      const projectTemplate = { dependencies: [], info: {} };
      versions[version] = { ios: projectTemplate, android: projectTemplate };
      syrProject.data.versions = versions;
      syrProject.write();
      resolve({ semver: version, meta: versions[version] });
    });
  }
  async setCurrentVersion(version) {
    syrProject.data.currentVersion = version.semver;
    await syrProject.write();
  }
}

const Manager = new manager();
export { Manager };
