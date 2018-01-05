#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var blargs = require('./blargs').default;
var packageJSON = require('../package.json');
var eject = require('./eject');
var watch = require('./watch');
var init = require('./init');
var link = require('./link');

global.cwd = process.cwd();
global.debug = false;

var projectPackage;

// get blargs
var ret = blargs();
var switches = ret[0] || {};
var positionals = ret[1] || [];

function main() {

  /**
   * Strapping CLI
   */
  if (fs.existsSync(global.cwd + '/package.json')) {
    projectPackage = require(global.cwd + '/package.json');
  }


  /**
   * Anywhere Commands
   */

  // check version
  if (switches.version === true || switches.v === true) {
    console.log('☑️    syr-cli: ' + packageJSON.version);
    if (fs.existsSync(global.cwd + '/package.json')) {
      projectPackage = require(global.cwd + '/package.json');
    }
    if (projectPackage) {
      console.log('☑️    syr: ' + projectPackage.devDependencies.syr);
      console.log('☑️    webpack: ' + projectPackage.devDependencies.webpack);
      console.log('☑️    babel-core: ' + projectPackage.devDependencies['babel-core']);
    }

    return;
  }

  // initialize a projec t
  if (positionals.indexOf('init') > -1) {
    const projName = positionals[1];
    if (projName) {
      init(projName);
    } else {
      console.log('🙁  Project name not provided.');
    }
    return;
  }

  // exit the project
  if (!projectPackage) {
    console.log('Syr project not found.');
    return;
  }

  /**
   * Project Commands
   */

  if (positionals.indexOf('watch') > -1) {
    watch();
    return;
  }

  if (positionals.indexOf('eject') > -1) {
    eject();
    return;
  }

  if (positionals.indexOf('link') > -1) {
    link();
    return;
  }

  return;
}

main();