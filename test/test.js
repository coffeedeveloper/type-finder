var TypeFinder = require('../dist/type-finder');

var test = {
  str0: 'wowowowow',
  obj0: {
    str1: 'i\'m name',
    arr0: [1, 2, 3],
    arr1: ['haha', 'ye']
  },
  obj1: {
    obj2: {
      num0: 123,
      arr2: ['- -']
    }
  },
  obj3: {
    arr3: ['ni mei']
  }
};

var config = {
  format: 'dot'
};

var result;

result = TypeFinder.Finder(test, 'Number', config);
console.log(result);
console.log(JSON.stringify(result));

result = TypeFinder.Finder(test, 'Array', config);
console.log(result);
console.log(JSON.stringify(result));
