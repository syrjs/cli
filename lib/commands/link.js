'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.api = exports.cmd = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var cmd = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parameters, switches) {
    var _parameters, projectName, modulesPath;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _parameters = _slicedToArray(parameters, 1), projectName = _parameters[0];
            modulesPath = _path2.default.join(process.cwd(), 'node_modules');


            if (projectName) {
              // we didn't get here from the init command
              modulesPath = _path2.default.join(process.cwd(), `${projectName}\node_modules`);
            }

            if (_fs2.default.existsSync(modulesPath)) {
              _context2.next = 8;
              break;
            }

            _logger.log.error('no node_modules found!');
            return _context2.abrupt('return');

          case 8:
            api.link(modulesPath);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function cmd(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../utils/logger');

var _modules = require('../models/modules');

var _strings = require('../../strings');

var _strings2 = _interopRequireDefault(_strings);

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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(modulesPath) {
      var modules;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // modules in our node_modules directory
              modules = (0, _modules.get)(modulesPath);

              modules.forEach(function (module) {
                var nodeModulesPath = _path2.default.join(process.cwd(), 'node_modules');
                var modulePath = _path2.default.join(nodeModulesPath, module);
                var modulePackage = require(_path2.default.join(modulePath, 'package.json'));
                _logger.log.info(`Found module! ${module} .. Linking`);
              });

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
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