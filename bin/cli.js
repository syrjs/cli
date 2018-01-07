#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const packageJSON = require('../package.json');
const eject = require('../lib/eject');
const watch = require('../lib/watch');
const init = require('../lib/init');
const link = require('../lib/link');
const help = require('../lib/help');

global.cwd = process.cwd();
global.debug = false;

var projectPackage;

// get the args
var args = process.argv.slice(2);

/**
 * Strapping CLI
 */
if (fs.existsSync(global.cwd + '/package.json')) {
  projectPackage = require(global.cwd + '/package.json');
}

function ensurePackage() {
  // exit the project
  if (!projectPackage) {
    console.log('Syr project not found.');
    return false;
  }
  return true;
}

/**
 * Anywhere Commands
*/
let done = false;
args.forEach((arg) => {
  if(done) return; // don't continue checking if we are done

  switch(arg) {
    case '-v':
    case '--version':
    case 'version':
      console.log('☑️    syr-cli: ' + packageJSON.version);
      if (fs.existsSync(global.cwd + '/package.json')) {
        projectPackage = require(global.cwd + '/package.json');
      }
      if (projectPackage) {
        console.log('☑️    syr: ' + projectPackage.devDependencies.syr);
        console.log('☑️    webpack: ' + projectPackage.devDependencies.webpack);
        console.log('☑️    babel-core: ' + projectPackage.devDependencies['babel-core']);
      }
      done = true;
    break;
    case '-h':
    case '--help':
    case 'help':
      help();
      done = true;
    break;
    // initialize a project
    case 'init':
      const projName = positionals[1];
      if (projName) {
        init(projName);
      } else {
        console.log('🙁  Project name not provided.');
      }
      done = true;
    break;
    /**
     * Project Commands
     */
    case 'watch':
      if(!ensurePackage()) {
        done = true;
        break;
      }
      watch();
      done = true;
    break;
    case 'eject':
      if(!ensurePackage()) {
        done = true;
        break;
      }
      eject();
      done = true;
    break;
    case 'link':
      if(!ensurePackage()) {
        done = true;
        break;
      }
      link();
      done = true;
    break;
  }
});

// no command was run output help
if(!done) {
  help();
}
