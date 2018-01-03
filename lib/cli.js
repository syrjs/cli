#! /usr/bin/env node
var fs = require('fs');
var path = require('path');
var blargs = require('blargs').default;
var packageJSON = require('../package.json');
var eject = require('./eject');
var watch = require('./watch');
var init = require('./init');

global.cwd = process.cwd();
global.debug = false;

// get blargs
var ret = blargs();
var switches = ret[0] || {};
var positionals = ret[1] || [];

function main() {
  if (switches.version === true || switches.v === true) {
    console.log(packageJSON.version);
    return;
  }

  if (positionals.indexOf('init') > -1) {
    var projName = positionals[1];
    if (projName) {
      init(projName);
    } else {
      console.log('project name needed');
    }
  }

  if (positionals.indexOf('watch') > -1) {
    watch();
  }

  if (positionals.indexOf('eject') > -1) {
    eject();
  }
}

main();
