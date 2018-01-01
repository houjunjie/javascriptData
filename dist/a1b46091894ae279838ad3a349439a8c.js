// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({2:[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Array 
 * @param {*} x 
 */
var isEvent = function isEvent(x) {
  // 如果x是2的倍数，就返回true
  console.log(x);
  return x % 2 == 0 ? true : false;
};

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/**
 * every 对数组的每一项运行给定一个函数，如果该函数每一项都返回true，则返回true
 */
console.log('Array.every:', numbers.every(isEvent)); // false

/**
 * some 对数组的每一项运行给定一个函数，如果该函数有任意一项返回ture， 则返回true
 */

console.log('Array.some:', numbers.some(isEvent)); //true

/**
 * forEach 对数组的每一项运行给定一个函数，该方法没有返回值
 */

numbers.forEach(function (x) {
  console.log('forEach', x % 2 == 0);
});

/**
 * map 对数组的每一项运行给定一个函数，返回每次调用函数的结果组成的数组
 */

/**
 * filter 对数组的每一项运行给定一盒函数，返回该函数会返回true的项组成的数组
 */

/**
 * reduce
 */

//  ES6 ES7 数组新增的功能

/**
 * @@iterator 返回一个包含数组键值对的迭代器对象，可以通过同步调用得到数组元素的键值对
 */
var iterator = numbers[Symbol.iterator]();
console.log('iterator', iterator.next().value); //1
console.log('iterator', iterator.next().value); //2
console.log('iterator', iterator.next().value); //3

/**
 * copyWithin 复制数组中一系列的元素到同一个数组中指定的起始位置
 */
var copyArray = [1, 2, 3, 4, 5, 6];
console.log('copyWithin', copyArray.copyWithin(0, 3));

/**
 * entries 返回包含数组所有键值对的@@iterator
 */
var entries = numbers.entries(); // 得到键值对的迭代器
console.log('entries', entries.next().value); //[0, 1] - 位置0的值为1
console.log('entries', entries.next().value); //[1, 2] - 位置0的值为2
console.log('entries', entries.next().value); //[2, 3] - 位置0的值为3

/**
 * includes 如果数组中存在某个元素则返回true，否则返回false es7新增
 */

/**
 * find 根据回调函数给定的条件从数组中查找元素，如果存在则返回该元素
 */

/**
 * findIndex 根据回调函数给定的条件从数组中查找元素，如果存在则返回该元素在改数组中的索引
 */

/**
 * fill 用静态值填充数组
 */
var numberFill = Array.of(1, 2, 3, 4, 5, 6);
console.log('fill', numberFill.fill(0)); // [0, 0, 0, 0, 0, 0]

/**
 * from 根据已有的数组创建新的数组
 */
var numbers2 = Array.from(numbers);
console.log('from numbers2', numbers2);
var evens = Array.from(numbers, function (x) {
  return x % 2 == 0;
});
console.log('from evens', numbers3);
/**
 * keys 返回包含数组所有索引的@@iterator
 */
var aKeys = numbers.keys(); //得到数组索引的迭代器
console.log('keys', aKeys.next()); //{value:0, done: false}
console.log('keys', aKeys.next()); //{value:1, done: false}
console.log('keys', aKeys.next()); //{value:2, done: false}


/**
 * of 根据传入的参数创建一个新的数组
 */
var numbers3 = Array.of(1); // == let number3 = [1]
var numbers4 = Array.of(1, 2, 3, 4, 5, 6); // == let number4 = [1, 2, 3, 4, 5, 6]
var numbersCopy = Array.of.apply(Array, _toConsumableArray(numbers4)); //用这个方法进行复制

/**
 * values 返回包含数组所有值的@@iterator
 */
// console.log(numbers.values);
// let aValues = numbers.values(); //得到数组值的迭代器
// console.log('values:', aValues.next()); //{value:1, done: false}
// console.log('values:', aValues.next()); //{value:2, done: false}
// console.log('values:', aValues.next()); //{value:3, done: false}
},{}],0:[function(require,module,exports) {
var global = (1,eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:51462/');
  ws.onmessage = (e) => {
    var data = JSON.parse(e.data);

    if (data.type === 'update') {
      for (let asset of data.assets) {
        hmrApply(global.require, asset);
      }

      for (let asset of data.assets) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error(`[parcel] 🚨 ${data.error.message}\n${data.error.stack}`);
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  let parents = [];
  for (let k in modules) {
    for (let d in modules[k][1]) {
      let dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    let fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  let cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(id => hmrAccept(global.require, id));
}
},{}]},{},[0,2])