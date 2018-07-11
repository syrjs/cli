'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var cmd = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parameters, switches) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!switches.debug) {
              _context4.next = 5;
              break;
            }

            _context4.next = 3;
            return api.debugInfo();

          case 3:
            _context4.next = 7;
            break;

          case 5:
            _context4.next = 7;
            return api.displayVersionInfo();

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function cmd(_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var description = {
  short: _strings2.default.get('Manages versioning for the current project. Create and View version information'),
  usage: 'version'
};

var api = {
  displayVersionInfo: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new Promise(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                  var currentVersion;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _versions.Manager.getCurrentVersion();

                        case 2:
                          currentVersion = _context.sent;

                          if (currentVersion.meta) {
                            _context.next = 10;
                            break;
                          }

                          _logger.log.warn(_strings2.default.get('No current version set'));
                          _logger.log.info(`${_strings2.default.get('Setting current version')} -> ${_npm.project.version}`);
                          _context.next = 8;
                          return _versions.Manager.createVersion(_npm.project.version);

                        case 8:
                          currentVersion = _context.sent;

                          _versions.Manager.setCurrentVersion(currentVersion);

                        case 10:

                          if (currentVersion.meta.ios && currentVersion.meta.ios.dependencies.length < 1) {
                            _inquirer2.default.prompt([{
                              type: 'list',
                              name: 'ManageNativeProjects',
                              message: _strings2.default.get('No dependencies found for iOS would you like to scan node_modules'),
                              choices: [{ name: 'Yes', value: true }, { name: 'No', value: false }]
                            }]).then(function (answers) {
                              if (answers.ManageNativeProjects) (0, _link.cmd)([], {});
                              resolve();
                            });
                          }

                        case 11:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    function displayVersionInfo() {
      return _ref.apply(this, arguments);
    }

    return displayVersionInfo;
  }(),
  debugInfo: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              (0, _logger.log)('debug information');

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    function debugInfo() {
      return _ref3.apply(this, arguments);
    }

    return debugInfo;
  }()
};

exports.cmd = cmd;
exports.api = api;
exports.description = description;