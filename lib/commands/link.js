'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var cmd = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parameters, switches) {
    var _parameters, projectName, modulesPath;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _parameters = _slicedToArray(parameters, 1), projectName = _parameters[0];
            modulesPath = _path2.default.join(process.cwd(), 'node_modules');


            if (projectName) {
              // we didn't get here from the init command
              modulesPath = _path2.default.join(process.cwd(), `${projectName}\node_modules`);
            }

            if (_fs2.default.existsSync(modulesPath)) {
              _context3.next = 8;
              break;
            }

            _logger.log.error('no node_modules found!');
            return _context3.abrupt('return');

          case 8:
            api.link(modulesPath);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function cmd(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../utils/logger');

var _modules = require('../models/modules');

var _syr = require('../models/projects/syr');

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

var _ios = require('../models/projects/ios');

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
                  var nodeModulesPath, modulePath, modulePackage, linkAgainstVersion, dependencies, projects;
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

                          // save information before we attempt to alter the native linking
                          // check here for version changes when linking
                          dependencies.push({
                            path: _path2.default.relative(process.cwd(), modulePath),
                            meta: {
                              name: modulePackage.name,
                              version: modulePackage.version,
                              description: modulePackage.description,
                              main: modulePackage.main
                            },
                            nativeProjects: projects
                          });

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

                        case 13:
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