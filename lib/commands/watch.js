'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = exports.cmd = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watchCommand = 'npm run serve';

var api = {
  watch: function watch() {
    if (_fs2.default.existsSync('package.json')) {
      console.log('👀 Starting Watch Server');
      (0, _child_process.execSync)(watchCommand, { stdio: 'inherit' });
    } else {
      //@TODO
    }
  }
};

function cmd(parameters, switches) {
  api.watch();
}

exports.cmd = cmd;
exports.api = api;