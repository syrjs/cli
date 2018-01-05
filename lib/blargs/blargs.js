#!/usr/bin/env node
'use strict';

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exec(args) {
	console.log(_util2.default.inspect((0, _2.default)(args), null, 10));
}

if (process.argv.length < 3) {
	(function () {
		var stdin = process.stdin;
		var data = '';
		stdin.setEncoding('utf8');
		stdin.resume();
		stdin.on('data', function (d) {
			data += d;
		});
		stdin.on('end', function () {
			exec(data.trim());
		});
	})();
} else exec();