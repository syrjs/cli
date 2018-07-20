'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Manager = undefined;

var _syr = require('../projects/syr');

var _logger = require('../../utils/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class manager {
  getVersionList() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new Promise(function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                  var versions, versionList, version;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _syr.project.read();

                        case 2:
                          versions = _syr.project.data.versions || {};
                          versionList = [];


                          for (version in versions) {
                            if (versions.hasOwnProperty(version)) {
                              versionList.push({
                                version: version
                              });
                            }
                          }

                          resolve(versionList);

                        case 6:
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
  getVersion(versionTag) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', new Promise(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve) {
                  var versions, version;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _syr.project.read();

                        case 2:
                          versions = _syr.project.data.versions || {};
                          version = versions[versionTag];

                          resolve({ semver: versionTag, meta: version });

                        case 5:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this2);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this2);
    }))();
  }
  getCurrentVersion() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', new Promise(function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve) {
                  var versions, version;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _syr.project.read();

                        case 2:
                          versions = _syr.project.data.versions || {};
                          version = versions[_syr.project.data.currentVersion];

                          resolve({ semver: _syr.project.data.currentVersion, meta: version });

                        case 5:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this3);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this3);
    }))();
  }
  createVersion(version) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt('return', new Promise(function (resolve) {
                var versions = _syr.project.data.versions || {};

                if (versions[version]) {
                  resolve({ semver: version, meta: versions[version] });
                }

                var projectTemplate = { dependencies: [], info: {} };
                versions[version] = { ios: JSON.parse(JSON.stringify(projectTemplate)), android: JSON.parse(JSON.stringify(projectTemplate)) };
                _syr.project.data.versions = versions;
                _syr.project.write();
                resolve({ semver: version, meta: versions[version] });
              }));

            case 1:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this4);
    }))();
  }
  setCurrentVersion(version) {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _syr.project.data.currentVersion = version.semver;
              _context8.next = 3;
              return _syr.project.write();

            case 3:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this5);
    }))();
  }
}

var Manager = new manager();
exports.Manager = Manager;