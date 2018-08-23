'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var cmd = (function() {
  var _ref8 = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee8(
      parameters,
      switches
    ) {
      return regeneratorRuntime.wrap(
        function _callee8$(_context8) {
          while (1) {
            switch ((_context8.prev = _context8.next)) {
              case 0:
                if (!switches.debug) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 3;
                return api.debugInfo();

              case 3:
                _context8.next = 12;
                break;

              case 5:
                if (!switches.list) {
                  _context8.next = 10;
                  break;
                }

                _context8.next = 8;
                return api.displayAllVersions();

              case 8:
                _context8.next = 12;
                break;

              case 10:
                _context8.next = 12;
                return api.displayVersionInfo();

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        },
        _callee8,
        this
      );
    })
  );

  return function cmd(_x4, _x5) {
    return _ref8.apply(this, arguments);
  };
})();

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _modules = require('../models/modules');

var _logger = require('../utils/logger');

var _versions = require('../models/config/versions');

var _npm = require('../models/projects/npm');

var _link = require('./link');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

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
}

var description = {
  short: _strings2.default.get(
    'Manages versioning for the current project. Create and View version information'
  ),
  usage: 'version'
};

var api = {
  getCurrentVersion: (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
        var currentVersion, isVersionAvailable, shouldSwitchProjects;
        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2;
                  return _versions.Manager.getCurrentVersion();

                case 2:
                  currentVersion = _context.sent;

                  if (currentVersion.meta) {
                    _context.next = 12;
                    break;
                  }

                  _logger.log.warn(
                    _strings2.default.get('No current version set')
                  );
                  _logger.log.info(
                    `${_strings2.default.get(
                      'Setting current version'
                    )} -> ${_npm.project.version}`
                  );
                  _context.next = 8;
                  return _versions.Manager.createVersion(_npm.project.version);

                case 8:
                  currentVersion = _context.sent;

                  _versions.Manager.setCurrentVersion(currentVersion);
                  _context.next = 34;
                  break;

                case 12:
                  if (!(_npm.project.version != currentVersion.semver)) {
                    _context.next = 34;
                    break;
                  }

                  _context.next = 15;
                  return api.checkForVersion(_npm.project.version);

                case 15:
                  isVersionAvailable = _context.sent;

                  if (isVersionAvailable) {
                    _context.next = 24;
                    break;
                  }

                  // new version
                  _logger.log.info(
                    `Creating new version ${_npm.project.version}`
                  );
                  _context.next = 20;
                  return _versions.Manager.createVersion(_npm.project.version);

                case 20:
                  currentVersion = _context.sent;

                  _versions.Manager.setCurrentVersion(currentVersion);
                  _context.next = 34;
                  break;

                case 24:
                  _logger.log.error(
                    `package.json version ${_npm.project
                      .version} does not match syr.json currentProject ${currentVersion.semver}.`
                  );
                  _context.next = 27;
                  return _inquirer2.default.prompt([
                    {
                      type: 'list',
                      name: 'result',
                      message: `Switch current project in syr.json to ${_npm
                        .project.version}?`,
                      choices: [
                        { name: 'Yes', value: true },
                        { name: 'No', value: false }
                      ]
                    }
                  ]);

                case 27:
                  shouldSwitchProjects = _context.sent;

                  if (!shouldSwitchProjects.result) {
                    _context.next = 33;
                    break;
                  }

                  _context.next = 31;
                  return api.switchVersion(_npm.project.version);

                case 31:
                  _context.next = 34;
                  break;

                case 33:
                  _logger.log.warn(
                    'current syr project version, and current npm project version do not match, becareful.'
                  );

                case 34:
                  return _context.abrupt('return', currentVersion);

                case 35:
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

    function getCurrentVersion() {
      return _ref.apply(this, arguments);
    }

    return getCurrentVersion;
  })(),
  switchVersion: (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(versionTag) {
        var version, currentVersion;
        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.next = 2;
                  return _versions.Manager.getVersion(versionTag);

                case 2:
                  version = _context2.sent;

                  console.log('setting version to this >>> ', version.semver);
                  _versions.Manager.setCurrentVersion(JSON.stringify(version));

                  _context2.next = 7;
                  return _versions.Manager.getCurrentVersion();

                case 7:
                  currentVersion = _context2.sent;

                  console.log('version', currentVersion);
                  (0, _logger.log)(`current version set to ${currentVersion}`);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          },
          _callee2,
          undefined
        );
      })
    );

    function switchVersion(_x) {
      return _ref2.apply(this, arguments);
    }

    return switchVersion;
  })(),
  checkForVersion: (function() {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(versionTag) {
        var version;
        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.next = 2;
                  return _versions.Manager.getVersion(versionTag);

                case 2:
                  version = _context3.sent;

                  if (!version.meta) {
                    _context3.next = 5;
                    break;
                  }

                  return _context3.abrupt('return', true);

                case 5:
                  return _context3.abrupt('return', false);

                case 6:
                case 'end':
                  return _context3.stop();
              }
            }
          },
          _callee3,
          undefined
        );
      })
    );

    function checkForVersion(_x2) {
      return _ref3.apply(this, arguments);
    }

    return checkForVersion;
  })(),
  displayAllVersions: (function() {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
        var versionList, currentVersion;
        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return _versions.Manager.getVersionList();

                case 2:
                  versionList = _context4.sent;

                  if (!(versionList.length < 1)) {
                    _context4.next = 10;
                    break;
                  }

                  _context4.next = 6;
                  return api.getCurrentVersion();

                case 6:
                  currentVersion = _context4.sent;
                  _context4.next = 9;
                  return _versions.Manager.getVersionList();

                case 9:
                  versionList = _context4.sent;

                case 10:
                  (0, _logger.log)(''); // blank space
                  _logger.log.table(versionList);

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          },
          _callee4,
          undefined
        );
      })
    );

    function displayAllVersions() {
      return _ref4.apply(this, arguments);
    }

    return displayAllVersions;
  })(),
  displayVersionInfo: (function() {
    var _ref5 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(
          function _callee6$(_context6) {
            while (1) {
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  return _context6.abrupt(
                    'return',
                    new Promise(
                      (function() {
                        var _ref6 = _asyncToGenerator(
                          /*#__PURE__*/ regeneratorRuntime.mark(
                            function _callee5(resolve) {
                              var currentVersion;
                              return regeneratorRuntime.wrap(
                                function _callee5$(_context5) {
                                  while (1) {
                                    switch ((_context5.prev = _context5.next)) {
                                      case 0:
                                        _context5.next = 2;
                                        return api.getCurrentVersion();

                                      case 2:
                                        currentVersion = _context5.sent;

                                      case 3:
                                      case 'end':
                                        return _context5.stop();
                                    }
                                  }
                                },
                                _callee5,
                                undefined
                              );
                            }
                          )
                        );

                        return function(_x3) {
                          return _ref6.apply(this, arguments);
                        };
                      })()
                    )
                  );

                case 1:
                case 'end':
                  return _context6.stop();
              }
            }
          },
          _callee6,
          undefined
        );
      })
    );

    function displayVersionInfo() {
      return _ref5.apply(this, arguments);
    }

    return displayVersionInfo;
  })(),
  debugInfo: (function() {
    var _ref7 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(
          function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  (0, _logger.log)('debug information');

                case 1:
                case 'end':
                  return _context7.stop();
              }
            }
          },
          _callee7,
          undefined
        );
      })
    );

    function debugInfo() {
      return _ref7.apply(this, arguments);
    }

    return debugInfo;
  })()
};

exports.cmd = cmd;
exports.api = api;
exports.description = description;
