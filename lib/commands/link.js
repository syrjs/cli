'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    }
  };
})();

var getProjectModules = (function() {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(modulesPath) {
      var _this = this;

      var modules, managediOSProject, nodeModulesPath, formattedModules;
      return regeneratorRuntime.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                modules = (0, _modules.get)(modulesPath);
                _context3.next = 3;
                return _ios.project.get(_syr.project.data.iosProject.path);

              case 3:
                managediOSProject = _context3.sent;
                nodeModulesPath = _path2.default.join(
                  process.cwd(),
                  'node_modules'
                );
                formattedModules = [];
                return _context3.abrupt(
                  'return',
                  new Promise(function(resolve) {
                    modules.forEach(
                      (function() {
                        var _ref3 = _asyncToGenerator(
                          /*#__PURE__*/ regeneratorRuntime.mark(
                            function _callee2(module) {
                              var modulePath,
                                modulePackage,
                                moduleKey,
                                iOSProjects;
                              return regeneratorRuntime.wrap(
                                function _callee2$(_context2) {
                                  while (1) {
                                    switch ((_context2.prev = _context2.next)) {
                                      case 0:
                                        modulePath = _path2.default.join(
                                          nodeModulesPath,
                                          module
                                        );
                                        modulePackage = require(_path2.default.join(
                                          modulePath,
                                          'package.json'
                                        ));
                                        moduleKey = _path2.default.relative(
                                          process.cwd(),
                                          modulePath
                                        );
                                        _context2.t0 = getLinkStatus;
                                        _context2.t1 = managediOSProject;
                                        _context2.t2 = resolveLinkableProject;
                                        _context2.t3 = modulePackage;
                                        _context2.next = 9;
                                        return _ios.project.findProjects(
                                          modulePath,
                                          ['node_modules']
                                        );

                                      case 9:
                                        _context2.t4 = _context2.sent;
                                        _context2.t5 = (0, _context2.t2)(
                                          _context2.t3,
                                          _context2.t4
                                        );
                                        iOSProjects = (0, _context2.t0)(
                                          _context2.t1,
                                          _context2.t5
                                        );

                                        areProjectsRemoved(
                                          modulePackage,
                                          iOSProjects
                                        );
                                        // console.log(iOSProjects);

                                        formattedModules.push({
                                          key: moduleKey,
                                          name: modulePackage.name,
                                          version: modulePackage.version,
                                          description:
                                            modulePackage.description,
                                          projects: {
                                            js: modulePackage,
                                            ios: iOSProjects
                                          }
                                        });

                                      case 14:
                                      case 'end':
                                        return _context2.stop();
                                    }
                                  }
                                },
                                _callee2,
                                _this
                              );
                            }
                          )
                        );

                        return function(_x3) {
                          return _ref3.apply(this, arguments);
                        };
                      })()
                    );

                    resolve(formattedModules);
                  })
                );

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        },
        _callee3,
        this
      );
    })
  );

  return function getProjectModules(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var cmd = (function() {
  var _ref4 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(
      parameters,
      switches
    ) {
      var _parameters, projectName, modulesPath;

      return regeneratorRuntime.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                (_parameters = _slicedToArray(parameters, 1)), (projectName =
                  _parameters[0]);
                modulesPath = _path2.default.join(
                  process.cwd(),
                  'node_modules'
                );

                if (projectName) {
                  // we didn't get here from the init command
                  modulesPath = _path2.default.join(
                    process.cwd(),
                    `${projectName}\node_modules`
                  );
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
        },
        _callee4,
        this
      );
    })
  );

  return function cmd(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
})();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _xcode = require('xcode');

var _xcode2 = _interopRequireDefault(_xcode);

var _logger = require('../utils/logger');

var _modules = require('../models/modules');

var _syr = require('../models/projects/syr');

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

var _ios = require('../models/projects/ios');

var _npm = require('../models/projects/npm');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * This module finds modules in node_modules that are referencing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * @syr/core as a dependency.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * It then attempts to import the native provides classes, into matching
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * local projects.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var description = {
  short: _strings2.default.get(
    'Links or Unlinks node_modules to the current project'
  ),
  usage: 'syr link'
};

var api = {
  link: (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(modulesPath) {
        var projectModules;
        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  if (_syr.project.data.currentVersion) {
                    _context.next = 3;
                    break;
                  }

                  _logger.log.error(
                    'No Current Version set. Run syr version before running syr link'
                  );
                  return _context.abrupt('return');

                case 3:
                  _context.next = 5;
                  return getProjectModules(modulesPath);

                case 5:
                  projectModules = _context.sent;

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          undefined
        );
      })
    );

    function link(_x) {
      return _ref.apply(this, arguments);
    }

    return link;
  })()
};

function getLinkStatus(baseProject, projects) {
  projects = areProjectsLinked(baseProject, projects);
  return projects;
}

function areProjectsRemoved(modulePackage, projects) {
  projects.forEach(function(project) {
    console.log(project);
  });
}

function areProjectsLinked(baseProject, projects) {
  var Libraries = baseProject.pbxGroupByName('Libraries');
  if (Libraries && Libraries.children) {
    projects.forEach(function(project) {
      var Library = Libraries.children.find(function(child) {
        return project.name == child.comment;
      });
      if (Library) {
        project.linkStatus = 'linked';
      }
    });
  }
  return projects;
}

function resolveLinkableProject(modulePackage, iOSProjects) {
  if (
    modulePackage.syr &&
    modulePackage.syr.ios &&
    modulePackage.syr.ios.project
  ) {
    iOSProjects.forEach(function(project, index) {
      if (project.value.indexOf(modulePackage.syr.ios.project) == -1) {
        iOSProjects.splice(index, 1);
      }
    });
  }
  return iOSProjects;
}

exports.cmd = cmd;
exports.api = api;
exports.description = description;
