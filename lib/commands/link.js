'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var getAlreadyLinkedLibraries = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(subProjects, rootProject) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new Promise(function (resolve) {
              var alreadyLinkedLibraries = {};
              rootProject.parse(function (err) {
                if (err == null) {
                  subProjects.forEach(function (project) {
                    var Libraries = rootProject.pbxGroupByName('Libraries');
                    var Library = Libraries.children.find(function (library) {
                      return library.comment == project.name;
                    });
                    if (Library) {
                      alreadyLinkedLibraries[Library.comment] = Library.value;
                    }
                  });
                }
                resolve(alreadyLinkedLibraries);
              });
            }));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getAlreadyLinkedLibraries(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var cmd = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parameters, switches) {
    var _parameters, projectName, modulesPath;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _parameters = _slicedToArray(parameters, 1), projectName = _parameters[0];
            modulesPath = _path2.default.join(process.cwd(), 'node_modules');


            if (projectName) {
              // we didn't get here from the init command
              modulesPath = _path2.default.join(process.cwd(), `${projectName}\node_modules`);
            }

            if (_fs2.default.existsSync(modulesPath)) {
              _context4.next = 8;
              break;
            }

            _logger.log.error('no node_modules found!');
            return _context4.abrupt('return');

          case 8:
            _context4.next = 10;
            return api.link(modulesPath);

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function cmd(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _logger = require('../utils/logger');

var _modules = require('../models/modules');

var _syr = require('../models/projects/syr');

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

var _ios = require('../models/projects/ios');

var _npm = require('../models/projects/npm');

var _xcode = require('xcode');

var _xcode2 = _interopRequireDefault(_xcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * This module finds modules in node_modules that are referencing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @syr/core as a dependency.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * It then attempts to import the native provides classes, into matching
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * local projects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var description = {
  short: _strings2.default.get('Links or Unlinks node_modules to the current project'),
  usage: 'syr link'
};

var api = {
  link: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(modulesPath) {
      var modules, printModules;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_syr.project.data.currentVersion) {
                _context2.next = 3;
                break;
              }

              _logger.log.error('No Current Version set. Run syr version before running syr link');
              return _context2.abrupt('return');

            case 3:

              // modules in our node_modules directory
              modules = (0, _modules.get)(modulesPath);
              printModules = [];
              _context2.next = 7;
              return modules.forEach(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(module) {
                  var nodeModulesPath, modulePath, modulePackage, linkAgainstVersion, dependencies, projects, moduleKey, key, installedSatisfies, managedIOSProject, alreadyLinkedLibraries;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:

                          // get info on each module
                          nodeModulesPath = _path2.default.join(process.cwd(), 'node_modules');
                          modulePath = _path2.default.join(nodeModulesPath, module);
                          modulePackage = require(_path2.default.join(modulePath, 'package.json'));
                          linkAgainstVersion = _syr.project.data.currentVersion;
                          dependencies = _syr.project.data.versions[linkAgainstVersion].ios.dependencies || [];

                          // look for iOS Projects for this module

                          _context.next = 7;
                          return _ios.project.findProjects(modulePath);

                        case 7:
                          projects = _context.sent;


                          if (projects.length > 1) {
                            // to many iOS projects found for this module.
                            // check to see if the module author offered us
                            // a default module. Otherwise we may need to as user?
                            if (modulePackage.syr && modulePackage.syr.ios && modulePackage.syr.ios.project) {
                              projects.forEach(function (project, index) {
                                if (project.value.indexOf(modulePackage.syr.ios.project) == -1) {
                                  projects.splice(index, 1);
                                };
                              });
                            }
                          }

                          // get the modules key which is the relative path
                          moduleKey = _path2.default.relative(process.cwd(), modulePath);

                          if (!dependencies[moduleKey]) {
                            _context.next = 21;
                            break;
                          }

                          _context.t0 = regeneratorRuntime.keys(_npm.project.devDependencies);

                        case 12:
                          if ((_context.t1 = _context.t0()).done) {
                            _context.next = 21;
                            break;
                          }

                          key = _context.t1.value;

                          if (!_npm.project.devDependencies.hasOwnProperty(key)) {
                            _context.next = 19;
                            break;
                          }

                          if (!(moduleKey.indexOf(key) > -1)) {
                            _context.next = 19;
                            break;
                          }

                          installedSatisfies = _semver2.default.satisfies(dependencies[moduleKey].meta.version, _npm.project.devDependencies[key]);


                          if (!installedSatisfies) {
                            // version on disk, doesn't satisfy the version in syr.json
                          }

                          return _context.abrupt('break', 21);

                        case 19:
                          _context.next = 12;
                          break;

                        case 21:

                          // save information before we attempt to alter the native linking
                          // check here for version changes when linking
                          dependencies[moduleKey] = {
                            meta: {
                              name: modulePackage.name,
                              version: modulePackage.version,
                              description: modulePackage.description,
                              main: modulePackage.main
                            },
                            nativeProjects: projects
                          };

                          // now attempt to link those projects in the xcodeproj.
                          // first check to see if we have this module defined in xcodeproj already, if so, just update the linking path.

                          if (!(_syr.project.data.iosProject && _syr.project.data.iosProject.path)) {
                            _context.next = 29;
                            break;
                          }

                          managedIOSProject = _xcode2.default.project(`${_syr.project.data.iosProject.path}/project.pbxproj`);
                          _context.next = 26;
                          return getAlreadyLinkedLibraries(projects, managedIOSProject);

                        case 26:
                          alreadyLinkedLibraries = _context.sent;

                          if (Object.keys(alreadyLinkedLibraries).length > 0) {
                            // there are libraries already linked in the managed project
                            console.log('update link projects ----> ', alreadyLinkedLibraries);
                          };

                        case 29:

                          // add libraries to project to manage


                          // blank print
                          (0, _logger.log)('');

                          printModules.push({
                            "Module Name": modulePackage.name,
                            "Version": modulePackage.version,
                            "Description": modulePackage.description,
                            "Projects": `${modulePackage.main ? 'JS' : ''} ${projects.length > 0 ? 'iOS' : ''}`
                          });

                          // save project information
                          _syr.project.write();

                        case 32:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 7:

              // return to the user a list of linked modules
              _logger.log.table(printModules);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    function link(_x) {
      return _ref.apply(this, arguments);
    }

    return link;
  }()
};

exports.cmd = cmd;
exports.api = api;
exports.description = description;