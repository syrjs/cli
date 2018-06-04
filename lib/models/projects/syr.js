'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SYR_PROJECT_FILE = 'syr';
var SYR_PROJECT_PATH = path.join(process.cwd(), SYR_CONFIG_FILE);

class syrProject {
  constructor(projectPath) {
    console.log('load project');
  }
};

var project = new syrProject(SYR_PROJECT_PATH);

exports.project = project;