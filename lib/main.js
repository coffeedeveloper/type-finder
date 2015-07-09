const toString = (obj) => Object.prototype.toString.call(obj);

const isType = (obj, type) => toString(obj) === `[object ${type}]`;
const isArr  = (obj) => isType(obj, 'Array');
const isObj  = (obj) => isType(obj, 'Object');
const isStr  = (obj) => isType(obj, 'String');
const isBool = (obj) => isType(obj, 'Boolean');
const isNull = (obj) => isType(obj, 'Null');
const isNum  = (obj) => isType(obj, 'Number');
const isDate  = (obj) => isType(obj, 'Date');

const getType = (obj) => /\[object\s(\w*)\]/.exec(toString(obj))[1];
const getValue = (obj, s) => new Function('return this' + (s.charAt(0) === '[' ? s : `.${s}`)).apply(obj);
const output = (arr, type) => type === 'dot' ? arr.join('.') : arr.map((d) => `["${d}"]`).join('');

const hasChild = (obj) => ['Object'].indexOf(getType(obj)) !== -1;

const clone = (...args) => {
  var result = [];
  for (let arr of args) {
    result = result.concat(arr);
  }
  return result;
};

const extend = (...args) => {
  var result = {};
  for (let obj of args) {
    for (let p in obj) {
      result[p] = obj[p];
    }
  }
  return result;
};

const clear = () => {
  foundResult = [];
};

let foundResult = [];

const finder = (obj, type, selector) => {
  if (!selector.length) clear();
  for (var p in obj) {
    let curr = obj[p];
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

export function GetValue (obj, selector) {
  return getValue(obj, selector);
}

export function Finder (obj, type, options = {}) {
  const defaults = {
    full: false,
    format: '',
    deep: false
  };
  let opts = extend({}, defaults, options);
  
  return finder(obj, type, []).map((d) => {
    let name = output(d, opts.format);
    return opts.full ? { name, val: getValue(obj, name) } : name;
  });
}
