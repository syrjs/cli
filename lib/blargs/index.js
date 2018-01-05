'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = blargs;

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function blargs(args) {
	args = args || process.argv.slice(2);
	if (typeof args == 'string') args = (0, _parser.parseString)(args);
	if (!args.length) return Object.defineProperty([{}, null, null], _parser.Symbols.BLARGS, { value: true });
	return (0, _parser2.default)(args);
}