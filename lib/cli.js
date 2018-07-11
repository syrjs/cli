#! /usr/bin/env node
'use strict';

require('regenerator-runtime/runtime');

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _syr = require('./models/projects/syr');

var _logger = require('./utils/logger');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentVersion = _syr.project.data && _syr.project.data.currentVersion;

(0, _logger.log)('');
(0, _logger.log)(`${_logger.log.chalk.yellow('Syr CLI')}`);
_logger.log.info(`[v${_package2.default.version}] [Current Version: ${_logger.log.chalk.magenta(currentVersion)}]`);

/**
 * !!! bin entry
 */


(0, _index.main)();