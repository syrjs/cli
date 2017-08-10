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
var args = ret[0];

function main() {
  if (args.version === true || args.v === true) {
    console.log(packageJSON.version);
    return;
  }

  if (args.init === true || args.i === true) {
    init();
  }

  if (args.watch === true || args.w === true) {
    watch();
  }

  if (args.eject === true || args.e === true) {
    eject();
  }
}

main();
