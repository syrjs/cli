import path from 'path';
import inquirer from 'inquirer';
import localeStrings from 'strings';
import { read, write } from 'utils/file';
import { project as iosProject } from 'models/projects/ios';
import { resolve } from 'dns';

const SYR_PROJECT_FILE = 'syr.json';
const SYR_PROJECT_PATH = path.join(process.cwd(), SYR_PROJECT_FILE);

let projectData = read(SYR_PROJECT_PATH);

const project = {
  data: projectData,
  write: () => {
    write(SYR_PROJECT_PATH, project.data);
  },
  read: async () => {
    project.data = read(SYR_PROJECT_PATH);
    await verifyProject();
  }
};

export { project };

async function verifyProject() {
  if (!project.data.iosProject) {
    // no ios project to manage
    return new Promise(async resolve => {
      const shouldManageNativeProjects = await inquirer.prompt([
        {
          type: 'list',
          name: 'result',
          message: localeStrings.get(
            'Do you want SyrCLI to manage native projects'
          ),
          choices: [{ name: 'Yes', value: true }, { name: 'No', value: false }]
        }
      ]);

      if (shouldManageNativeProjects.result) {
        // look for projects outside of node_modules to manage
        const projects = await iosProject.findProjects(process.cwd(), ['node_modules']);
        const whichBaseProject = await inquirer.prompt([
          {
            type: 'list',
            name: 'result',
            message: localeStrings.get(
              'Which base project should we use to manage modules for iOS'
            ),
            choices: projects,
            filter: function(val) {
              return val.toLowerCase();
            }
          }
        ]);

        project.data.iosProject = {
          path: whichBaseProject.result
        };

        project.write();
        resolve(project);
      } else {
        project.data.iosProject = {
          manage: false
        };
        project.write();
        resolve(project);
      }
    });
  }
}
