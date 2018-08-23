'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.project = undefined;

var _xcode = require('xcode');

var _xcode2 = _interopRequireDefault(_xcode);

var _utils = require('../../utils');

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

var project = {
  write: function write() {},
  get: (function() {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(projectPath) {
        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  return _context.abrupt(
                    'return',
                    new Promise(function(resolve) {
                      var iOSProject = _xcode2.default.project(
                        `${projectPath}/project.pbxproj`
                      );
                      iOSProject.parse(function(err) {
                        if (err == null) {
                          resolve(iOSProject);
                        }
                      });
                    })
                  );

                case 1:
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

    function get(_x) {
      return _ref.apply(this, arguments);
    }

    return get;
  })(),
  findProjects: (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(
        basePath,
        excludes
      ) {
        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  return _context2.abrupt(
                    'return',
                    new Promise(function(resolve) {
                      resolve(
                        (0, _utils.recursiveDirectoriesByName)(
                          basePath,
                          'xcodeproj',
                          excludes
                        )
                      );
                    })
                  );

                case 1:
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

    function findProjects(_x2, _x3) {
      return _ref2.apply(this, arguments);
    }

    return findProjects;
  })()
};

exports.project = project;
