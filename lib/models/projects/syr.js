'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.project = undefined;

var verifyProject = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var _this = this;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (project.data.iosProject) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', new Promise(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
                var shouldManageNativeProjects, projects, whichBaseProject;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _inquirer2.default.prompt([{
                          type: 'list',
                          name: 'result',
                          message: _strings2.default.get('Do you want SyrCLI to manage native projects'),
                          choices: [{ name: 'Yes', value: true }, { name: 'No', value: false }]
                        }]);

                      case 2:
                        shouldManageNativeProjects = _context2.sent;

                        if (!shouldManageNativeProjects.result) {
                          _context2.next = 15;
                          break;
                        }

                        _context2.next = 6;
                        return _ios.project.findProjects(process.cwd(), ['node_modules']);

                      case 6:
                        projects = _context2.sent;
                        _context2.next = 9;
                        return _inquirer2.default.prompt([{
                          type: 'list',
                          name: 'result',
                          message: _strings2.default.get('Which base project should we use to manage modules for iOS'),
                          choices: projects,
                          filter: function filter(val) {
                            return val.toLowerCase();
                          }
                        }]);

                      case 9:
                        whichBaseProject = _context2.sent;


                        project.data.iosProject = {
                          path: whichBaseProject.result
                        };

                        project.write();
                        resolve(project);
                        _context2.next = 18;
                        break;

                      case 15:
                        project.data.iosProject = {
                          manage: false
                        };
                        project.write();
                        resolve(project);

                      case 18:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function verifyProject() {
    return _ref2.apply(this, arguments);
  };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _strings = require('../../../strings');

var _strings2 = _interopRequireDefault(_strings);

var _file = require('../../utils/file');

var _ios = require('./ios');

var _dns = require('dns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SYR_PROJECT_FILE = 'syr.json';
var SYR_PROJECT_PATH = _path2.default.join(process.cwd(), SYR_PROJECT_FILE);

var projectData = (0, _file.read)(SYR_PROJECT_PATH);

var project = {
  data: projectData,
  write: function write() {
    (0, _file.write)(SYR_PROJECT_PATH, project.data);
  },
  read: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              project.data = (0, _file.read)(SYR_PROJECT_PATH);
              _context.next = 3;
              return verifyProject();

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function read() {
      return _ref.apply(this, arguments);
    }

    return read;
  }()
};

exports.project = project;