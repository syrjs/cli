'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.commands = undefined;

var commands = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(command, optionals) {
      var module;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                module = void 0;
                _context.prev = 1;

                module = require(`./${command}`);
                _context.next = 5;
                return module.cmd.apply(this, optionals);

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);

                // if(e.message.indexOf('Cannot find module') > -1) {
                _logger.log.warn(`${_context.t0} command not found`);
              // }

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[1, 7]]
      );
    })
  );

  return function commands(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _logger = require('../utils/logger');

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
} // commands execute when called through the cli
// syr {command}

exports.commands = commands;
