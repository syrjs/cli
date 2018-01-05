'use strict'

/*
Because we allow mulitple short-hand booleans to be defined we cannot allow short-hand assignment
without a space. This will allow context free parsing for this scenario with the greatest amount
of freedom to cover both scenarios. It also will support short-hand assignment with equal-sign even
though it probably shouldn't.

A positional argument following a short-hand argument will be assumed to be an assignment. This
merely means that the positional argument should be placed ahead of the boolean short-hand argument
to achieve the intended outcome without needing to know context.
*/

//
;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parse;
var short = /^-[^\-\s]/;
var shortmulti = /^-[^\-\s]{2,}$/;
var shortassign = /^-[^\-\s]=/;
var shortassignsub = /^-[^\-\s]=\[/;
var long = /^--\S/;
var longassign = /^--[^=\s]+=(?!\[)/;
var longassignsub = /^--(?!no)[^=\s]+=\[/;
var subclosed = /\](?:\s*)$/;
var noshort = /^-no-\S$/;
var noshortmulti = /^-no-\S{2,}$/;
var nolong = /^--no-\S+$/;
var subopen = /^\[/;
var subclose = /^\]$/;
var nextexpr = /^--\s*$/;

var Types = {
	SHORT: Symbol('SHORT'),
	SHORTASSIGN: Symbol('SHORTASSIGN'),
	SHORTASSIGNSUB: Symbol('SHORTASSIGNSUB'),
	SHORTMULTI: Symbol('SHORTMULTI'),
	SHORTNO: Symbol('SHORTNO'),
	SHORTNOMULTI: Symbol('SHORTNOMULTI'),
	LONG: Symbol('LONG'),
	LONGASSIGN: Symbol('LONGASSIGN'),
	LONGASSIGNSUB: Symbol('LONGASSIGNSUB'),
	LONGNO: Symbol('LONGNO'),
	POSITIONAL: Symbol('POSITIONAL'),
	NEXTEXPR: Symbol('NEXTEXPR'),
	UNKNOWN: Symbol('UNKNOWN')
};

var Symbols = {
	BLARGS: Symbol('BLARGS')
};

var debug = false;

function log() {
	var _console;

	if (debug) (_console = console).log.apply(_console, arguments);
}

function assign(target, key, value) {
	var exst = target[key];
	value = checkValue(value);
	if (exst) {
		if (!Array.isArray(exst) || exst[Symbols.BLARGS] === true) exst = target[key] = [exst];
		exst.push(value);
	} else target[key] = value;
}

function checkValue(value) {
	if (value == 'true') return true;else if (value == 'false') return false;else return value;
}

function parse(args, recursing) {

	// for sanity, if somehow an array gets passed in that is a result of a prior parse attempt
	// simply return it as-is
	if (Array.isArray(args) && args[Symbols.BLARGS] === true) return args;
	if (!recursing) args = sanitize(args);

	var assigned = {};
	var positionals = [];
	var nextexprs = null;

	if (recursing) log('parse() recursing', args.length);

	for (;;) {

		var arg = args.shift();
		var type = undefined,
		    next = undefined,
		    nexttype = undefined,
		    i = undefined,
		    end = undefined;

		if (arg == null) break;

		if (recursing) {
			if (subclose.test(arg)) {
				log('parse() found tail subargs bracket, ending', arg);
				break;
			} else if (subclosed.test(arg)) {
				log('parse() found tail subargs bracket in argument, will end', arg);
				end = true;
				arg = arg.trim().slice(0, -1);
			}
		}

		type = typeOf(arg);

		// @todo a more intelligent system to not waste work like this
		switch (type) {

			case Types.SHORT:
				// since a short can be an assignment with a space, we peek ahead to
				// determine if the next argument if any is a value
				nexttype = typeOf(args[0]);
				if (nexttype == Types.POSITIONAL) {
					next = args.shift();
					if (subopen.test(next)) {
						// convoluted case where there was a space and an open sub argument expression
						if (next == '[') next = parse(args, true);else {
							args.unshift(next.slice(1));
							next = parse(args, true);
						}
						assign(assigned, arg[1], next);
						// special case since we do lookahead here we want to make sure we interpret
						// subargs end bracket correctly
					} else if (recursing && subclose.test(next)) {
							// we can ignore it but the short that we found must be assigned as flag
							assign(assigned, arg[1], true);
							end = true;
						} else if (recursing && subclosed.test(next)) {
							end = true;
							assign(assigned, arg[1], next.trim().slice(0, -1));
						} else assign(assigned, arg[1], next);
				} else {
					assign(assigned, arg[1], true);
				}
				break;
			case Types.SHORTASSIGN:
				var _assignments = assignments(arg.slice(1));
				// the value being assigned should be included

				var _assignments2 = _slicedToArray(_assignments, 2);

				arg = _assignments2[0];
				next = _assignments2[1];

				assign(assigned, arg, next);
				break;
			case Types.SHORTASSIGNSUB:
				var _assignments3 = assignments(arg.slice(1));

				var _assignments4 = _slicedToArray(_assignments3, 2);

				arg = _assignments4[0];
				next = _assignments4[1];

				if (next == '[') next = parse(args, true);else {
					args.unshift(next.slice(1));
					next = parse(args, true);
				}
				assign(assigned, arg, next);
				break;
			case Types.SHORTMULTI:
				// each of these will be boolean true values
				for (i = 1; i < arg.length; ++i) {
					assign(assigned, arg[i], true);
				}break;
			case Types.SHORTNOMULTI:
				// each of these will be boolean false values
				for (i = 4; i < arg.length; ++i) {
					assign(assigned, arg[i], false);
				}break;
			case Types.SHORTNO:
				// will be boolean false
				assign(assigned, arg[4], false);
				break;
			case Types.LONG:
				assign(assigned, arg.slice(2), true);
				break;
			case Types.LONGASSIGNSUB:
				var _assignments5 = assignments(arg.slice(2));

				var _assignments6 = _slicedToArray(_assignments5, 2);

				arg = _assignments6[0];
				next = _assignments6[1];

				if (next == '[') next = parse(args, true);else {
					args.unshift(next.slice(1));
					next = parse(args, true);
				}
				assign(assigned, arg, next);
				break;
			case Types.LONGASSIGN:
				var _assignments7 = assignments(arg.slice(2));

				var _assignments8 = _slicedToArray(_assignments7, 2);

				arg = _assignments8[0];
				next = _assignments8[1];

				assign(assigned, arg, next);
				break;
			case Types.LONGNO:
				assign(assigned, arg.slice(5), false);
				break;
			case Types.NEXTEXPR:
				nextexprs = parse(args, recursing);
				end = true;
				break;
			case Types.POSITIONAL:
			case Types.UNKNOWN:
				positionals.push(arg);
				break;
		}
		if (end) {
			log('parse() ending marker, breaking loop');
			break;
		}
	}

	log('parse() returning');
	var result = [assigned, positionals.length ? positionals : null, nextexprs];
	// we mark the array as having been a parsed-value-return as there are circumstances where
	// this makes determining what type of array it is easier
	// note that the better solution would have been to change the return type but that has more
	// potential drawbacks by breaking compatibility, this should have no impact as it is a
	// symbol you have to be looking for and is not enumerable
	Object.defineProperty(result, Symbols.BLARGS, { value: true });
	Object.freeze(result);
	return result;
}

function typeOf(arg) {
	var type = undefined;
	if (arg && arg.charAt(0) == '-') {
		if (short.test(arg)) {
			if (noshortmulti.test(arg)) type = Types.SHORTNOMULTI;else if (noshort.test(arg)) type = Types.SHORTNO;else if (shortassignsub.test(arg)) type = Types.SHORTASSIGNSUB;else if (shortassign.test(arg)) type = Types.SHORTASSIGN;else if (shortmulti.test(arg)) type = Types.SHORTMULTI;else type = Types.SHORT;
		} else if (long.test(arg)) {
			if (nolong.test(arg)) type = Types.LONGNO;else if (longassignsub.test(arg)) type = Types.LONGASSIGNSUB;else if (longassign.test(arg)) type = Types.LONGASSIGN;else type = Types.LONG;
		} else if (nextexpr.test(arg)) type = Types.NEXTEXPR;else type = Types.UNKNOWN;
	} else if (arg) type = Types.POSITIONAL;else type = Types.UNKNOWN;
	log('typeOf', arg, type);
	return type;
}

function assignments(arg) {
	var idx = arg.indexOf('=');
	return [arg.slice(0, idx), arg.slice(idx + 1)];
}

function parseString(str) {
	if (typeof str != 'string' || !str) return [];

	var args = [];
	var input = str.split('');
	var arg = '';
	for (;;) {
		var ch = input.shift();
		if (ch == null) break;
		if (ch != ' ') {
			if (ch == '"') {
				for (;;) {
					ch = input.shift();
					if (ch == null) break;else if (ch == '"' && (!arg || arg && arg[arg.length - 1] != '\\')) break;else arg += ch;
				}
				if (arg.length) {
					args.push(arg);
					arg = '';
				}
			} else if (ch == '\'') {
				for (;;) {
					ch = input.shift();
					if (ch == null) break;else if (ch == '\'' && (!arg || arg && arg[arg.length - 1] != '\\')) break;else arg += ch;
				}
				if (arg.length) {
					args.push(arg);
					arg = '';
				}
			} else arg += ch;
		} else {
			args.push(arg);
			arg = '';
		}
	}
	if (arg.length) args.push(arg);

	return args;
}

function sanitize(args) {
	var sane = [];
	// because of the way the arguments will have been parsed it is possible to have really
	// tricky scenarios with the lookahead, so, for convenience, we attempt to avoid those
	// scenarios by splitting arguments where necessary
	for (var i = 0; i < args.length; ++i) {
		var arg = args[i];
		if (/\]{2,}/g.test(arg)) {
			var p = arg.indexOf(']');
			if (p === 0) {
				sane.push(']');
				p++;
			} else sane.push(arg.slice(0, p));
			for (; p < arg.length; ++p) {
				if (arg[p] == ']') {
					sane.push(']');
				} else break;
			}
			if (p < arg.length - 1) {
				sane.push(arg.slice(p));
			}
		} else {
			sane.push(arg);
		}
	}
	return sane;
}

exports.parseString = parseString;
exports.Symbols = Symbols;