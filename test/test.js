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
  },
  kao: [
    [1, 3, 4]
  ]
};

var config = {
  //format: 'dot'
  full: true
};

var result;

result = TypeFinder.Finder(test, 'Number', { full: true });
console.log(result);
result = TypeFinder.Finder(test, 'Number', { full: true, deep: true });
console.log(result);

result = TypeFinder.Finder(test, 'Array', { full: true });
console.log(result);
result = TypeFinder.Finder(test, 'Array', { full: true, deep: true });
console.log(result);
