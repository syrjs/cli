'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = exports.cmd = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _link = require('./link');

var _child_process = require('child_process');

var _logger = require('../logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var initInstallCommand = `npm install`;
var syrProjectPaths = {
  ios: '/node_modules/@syr/core/ios/SyrNativeSample'
};

var api = {
  init: function init(projectName) {
    // was a project name provided?
    if (!projectName) {
      _logger.log.error('No project name specified');
      (0, _logger.log)('usage: syr init ProjectName');
      return;
    }

    // get the fixtures
    var packageJson = require('../../fixtures/package.json');

    var _getFixtures = getFixtures(['index.js', '.babelrc', 'package.json', 'webpack.config.js']),
        _getFixtures2 = _toArray(_getFixtures),
        indexFixture = _getFixtures2[0],
        fixtures = _getFixtures2.slice(1);

    var projectPath = _path2.default.join(global.cwd, projectName);

    // check really quick if a user ran this in a project, warn
    checkForPackageJSON();

    // copy our fixtures (really need package.json to kick off install)
    copyFixtures(fixtures, projectPath, function () {
      // install node modules
      process.chdir(projectPath);
      (0, _child_process.execSync)(initInstallCommand, { stdio: 'inherit' });

      // copy index.js to src/
      copyFixtures([indexFixture], _path2.default.join(projectPath, 'src'), function () {
        // copy iOS project
        copyDir(_path2.default.join(projectPath, syrProjectPaths.ios), _path2.default.join(projectPath, 'ios'));
      });
    });
  }
};

function cmd(parameters, switches) {
  var _parameters = _slicedToArray(parameters, 1),
      projectName = _parameters[0];
  // init the folder


  api.init(projectName);
  // run the link command
  (0, _link.cmd)(parameters, switches);
}

exports.cmd = cmd;
exports.api = api;


function copyFixtures(fixtures, projectPath, callback) {
  if (!_fs2.default.existsSync(projectPath)) {
    _fs2.default.mkdirSync(projectPath);
    fixtures.forEach(function (meta) {
      _fs2.default.writeFileSync(_path2.default.join(projectPath, meta.name), meta.contents);
    });
    callback();
  } else {
    _logger.log.error('project path already exists');
    (0, _logger.log)(projectPath);
  }
}

function checkForPackageJSON() {
  var projectPackage = void 0;
  try {
    projectPackage = require(`${_path2.default.join(global.cwd, 'package.json')}`);
  } catch (e) {}
  if (projectPackage) {
    _logger.log.warn('performing this command from inside a project.');
  }
}

function getFixtures(files) {
  var fixturePath = _path2.default.join(__dirname, '../../fixtures');
  return files.map(function (name) {
    var filePath = _path2.default.join(fixturePath, name);
    return {
      name: name,
      contents: _fs2.default.readFileSync(filePath, 'utf8')
    };
  });
}

function mkdir(dir) {
  // making directory without exception if exists
  try {
    _fs2.default.mkdirSync(dir, '0755');
  } catch (e) {
    if (e.code != 'EEXIST') {
      throw e;
    }
  }
}

function copyDir(src, dest) {
  mkdir(dest);
  var files = _fs2.default.readdirSync(src);
  for (var i = 0; i < files.length; i++) {
    var current = _fs2.default.lstatSync(_path2.default.join(src, files[i]));
    if (current.isDirectory()) {
      copyDir(_path2.default.join(src, files[i]), _path2.default.join(dest, files[i]));
    } else if (current.isSymbolicLink()) {
      var symlink = _fs2.default.readlinkSync(_path2.default.join(src, files[i]));
      _fs2.default.symlinkSync(symlink, _path2.default.join(dest, files[i]));
    } else {
      copy(_path2.default.join(src, files[i]), _path2.default.join(dest, files[i]));
    }
  }
}

function copy(src, dest) {
  _fs2.default.writeFileSync(dest, _fs2.default.readFileSync(src));
}