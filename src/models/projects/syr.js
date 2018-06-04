const SYR_PROJECT_FILE = 'syr';
const SYR_PROJECT_PATH = path.join(process.cwd(), SYR_CONFIG_FILE);

class syrProject {
  constructor(projectPath) {
    console.log('load project');
  }
};

const project = new syrProject(SYR_PROJECT_PATH);

export {
  project
};