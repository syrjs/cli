'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Manager = undefined;

var _syr = require('../projects/syr');

var _logger = require('../../utils/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class manager {
  getCurrentVersion() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new Promise(function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                  var versions, version;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _syr.project.read();

                        case 2:
                          versions = _syr.project.data.versions || {};
                          version = versions[_syr.project.data.currentVersion];

                          resolve({ semver: _syr.project.data.currentVersion, meta: version });

                        case 5:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }))();
  }
  createVersion(version) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', new Promise(function (resolve) {
                var versions = _syr.project.data.versions || {};

                if (versions[version]) {
                  resolve({ semver: version, meta: versions[version] });
                }

                var projectTemplate = { dependencies: [], info: {} };
                versions[version] = { ios: projectTemplate, android: projectTemplate };
                _syr.project.data.versions = versions;
                _syr.project.write();
                resolve({ semver: version, meta: versions[version] });
              }));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }))();
  }
  setCurrentVersion(version) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _syr.project.data.currentVersion = version.semver;
              _context4.next = 3;
              return _syr.project.write();

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this3);
    }))();
  }
}

var Manager = new manager();
exports.Manager = Manager;