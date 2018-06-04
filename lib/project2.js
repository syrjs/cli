'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjects = exports.packageJSON = undefined;

var getProjects = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var project;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return loadProject();

          case 2:
            project = _context.sent;
            return _context.abrupt('return', {
              android: null,
              ios: project
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getProjects() {
    return _ref.apply(this, arguments);
  };
}();

var _xcode = require('xcode');

var _xcode2 = _interopRequireDefault(_xcode);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./utils/logger');

var _utils = require('./utils');

var _rc = require('./rc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cliSelect = require('cli-select');
var chalk = require('chalk');

var packageJSON = {};
var packageJSONPath = _path2.default.join(process.cwd(), 'package.json');

try {
  exports.packageJSON = packageJSON = require(packageJSONPath);
} catch (e) {
  _logger.log.error(`No package.json found in the command directory. ${packageJSONPath}`);
}

function loadProject() {
  var projectVersion = _rc.versions.get('latest');
  var baseProjectPath = _path2.default.join(process.cwd(), 'ios');
  var projectsStuff = [];

  if (!projectVersion.iosBaseProject) {
    _logger.log.warn('No base project for iOS selected.');
    projectsStuff = (0, _utils.recursiveDirectoriesByName)(baseProjectPath, 'xcodeproj');
  } else {
    // more than one project, have user select
    return new Promise(function (resolve) {
      (0, _logger.log)(`iOS Base Project: ${projectVersion.iosBaseProject.name}`);
      resolve();
    });
  }

  if (projectsStuff.length > 1) {
    // more than one project, have user select
    return new Promise(function (resolve) {
      cliSelect({
        values: projectsStuff,
        valueRenderer: function valueRenderer(value, selected) {
          if (selected) {
            return chalk.underline(value.name);
          }
          return value.name;
        }
      }).then(function (response) {
        _logger.log.info(`Setting iOS Base Project: ${response.value}`);
        projectVersion.iosBaseProject = {
          name: response.value,
          path: response.path
        };
        _rc.versions.set(projectVersion.version, projectVersion);
        resolve();
      }).catch(function () {
        console.log('cancelled');
      });
    });
  } else if (projectsStuff.length == 1) {
    // select only project infer this is the project to use
  } else {
    _logger.log.error('No iOS projects found.');
  }
}

exports.packageJSON = packageJSON;
exports.getProjects = getProjects;