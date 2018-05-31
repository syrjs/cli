'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.packageJSON = undefined;

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

            console.log(project);

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

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var packageJSON = {};
var packageJSONPath = _path2.default.join(process.cwd(), 'package.json');

try {
  exports.packageJSON = packageJSON = require(packageJSONPath);
} catch (e) {
  _logger.log.error(`No package.json found in the command directory. ${packageJSONPath}`);
}

function loadProject() {
  return new Promise(function (resolve) {
    // get the xcode project
    var iosProjectPath = _path2.default.join(process.cwd(), 'ios/sample.xcodeproj');
    var iosProject = _xcode2.default.project(iosProjectPath);
    iosProject.parse(function (err) {
      resolve(iosProject);
      console.log('project', iosProject);
    });
  });
}

getProjects();

exports.packageJSON = packageJSON;