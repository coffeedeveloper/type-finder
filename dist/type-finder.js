(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.main = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.GetFinderValue = GetFinderValue;
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

  var hasChild = function hasChild(obj, deep) {
    return ((deep ? 'Array' : '') + 'Object').indexOf(getType(obj)) !== -1;
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

  var extend = function extend() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var result = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var obj = _step2.value;

        for (var p in obj) {
          result[p] = obj[p];
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return result;
  };

  var clear = function clear() {
    foundResult = [];
  };

  var foundResult = [];

  var finder = function finder(obj, type, selector, opts) {
    if (!selector.length) clear();
    for (var p in obj) {
      var curr = obj[p];
      var s = clone(selector, [p]);
      if (type === getType(curr)) {
        foundResult.push(s);
      }
      if (hasChild(curr, opts.deep)) {
        finder(curr, type, s, opts);
      }
    }
    return foundResult;
  };

  function GetFinderValue(obj, selector) {
    return getValue(obj, selector);
  }

  function Finder(obj, type) {
    var options = arguments[2] === undefined ? {} : arguments[2];

    var defaults = {
      full: false,
      format: '',
      deep: false
    };
    var opts = extend({}, defaults, options);

    if (opts.deep) opts.format = '';

    return finder(obj, type, [], opts).map(function (d) {
      var name = output(d, opts.format);
      return opts.full ? { name: name, val: getValue(obj, name) } : name;
    });
  }
});
