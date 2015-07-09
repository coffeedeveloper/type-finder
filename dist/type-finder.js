'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.GetValue = GetValue;
exports.Finder = Finder;
var toString = function toString(obj) {
  return Object.prototype.toString.call(obj);
};

var isType = function isType(obj, type) {
  return toString(obj) === '[object ' + type + ']';
};
var isArr = function isArr(obj) {
  return isType(obj, 'Array');
};
var isObj = function isObj(obj) {
  return isType(obj, 'Object');
};
var isStr = function isStr(obj) {
  return isType(obj, 'String');
};
var isBool = function isBool(obj) {
  return isType(obj, 'Boolean');
};
var isNull = function isNull(obj) {
  return isType(obj, 'Null');
};
var isNum = function isNum(obj) {
  return isType(obj, 'Number');
};
var isDate = function isDate(obj) {
  return isType(obj, 'Date');
};

var getType = function getType(obj) {
  return /\[object\s(\w*)\]/.exec(toString(obj))[1];
};
var getValue = function getValue(obj, s) {
  return new Function('return this' + (s.charAt(0) === '[' ? s : '.' + s)).apply(obj);
};
var output = function output(arr, type) {
  return type === 'dot' ? arr.join('.') : arr.map(function (d) {
    return '["' + d + '"]';
  }).join('');
};

var hasChild = function hasChild(obj) {
  return ['Object'].indexOf(getType(obj)) !== -1;
};

var clone = function clone() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var result = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arr = _step.value;

      result = result.concat(arr);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

var clear = function clear() {
  foundResult = [];
};

var foundResult = [];

var finder = function finder(obj, type, selector) {
  if (!selector.length) clear();
  for (var p in obj) {
    var curr = obj[p];
    var s = clone(selector, [p]);
    if (type === getType(curr)) {
      foundResult.push(s);
    }
    if (hasChild(curr)) {
      finder(curr, type, s);
    }
  }
  return foundResult;
};

function GetValue(obj, selector) {
  return getValue(obj, selector);
}

function Finder(obj, type) {
  var opts = arguments[2] === undefined ? {} : arguments[2];

  return finder(obj, type, []).map(function (d) {
    var name = output(d, opts.format);
    return opts.full ? { name: name, val: getValue(obj, name) } : name;
  });
}
