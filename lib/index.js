'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = undefined;

var main = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var ret, switches, positionals;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // get blargs
            ret = (0, _blargs2.default)();
            switches = ret[0] || {};
            positionals = ret[1] || [];
            _context.next = 5;
            return run(positionals, switches);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var run = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(positionals, switches) {
    var _positionals, command, parameters;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _positionals = _toArray(positionals), command = _positionals[0], parameters = _positionals.slice(1);

            if (!command) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return (0, _commands.commands)(command, [parameters, switches]);

          case 4:
            _context2.next = 8;
            break;

          case 6:
            _context2.next = 8;
            return (0, _commands.commands)('help', [[], {}]);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function run(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _blargs = require('blargs');

var _blargs2 = _interopRequireDefault(_blargs);

var _updateNotifier = require('update-notifier');

var _updateNotifier2 = _interopRequireDefault(_updateNotifier);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _commands = require('./commands');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(0, _updateNotifier2.default)({ pkg: _package2.default }).notify();

exports.main = main;