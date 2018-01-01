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
})({4:[function(require,module,exports) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 队列

function Queue() {
  // 这里是属性和方法
  var items = [];
  this.enqueue = function (element) {
    //想队列添加元素
    items.push(element);
  };

  this.dequeue = function () {
    // 从队列中移除元素
    // 因为队列遵循先进先出原则，所以用数组的shift 不用pop
    return items.shift();
  };

  this.front = function () {
    //查看对列头部元素
    return items[0];
  };

  this.isEmpty = function () {
    //查看队列是否为空
    return items.length == 0;
  };

  this.size = function () {
    //获取队列的长度 也就是Array的length
    return items.length;
  };

  this.print = function () {
    //打印队列元素
    console.log(items.toString());
  };
}

var queue = new Queue();
console.log('isEmpty', queue.isEmpty());

queue.enqueue('hou');
queue.enqueue('jun');
queue.enqueue('jie');

queue.print();
console.log('size', queue.size());
console.log('isEmpty', queue.isEmpty());
queue.dequeue();
queue.dequeue();
queue.print();
console.log('----------------- es6 实现 ------------------');
// es6 实现
var Queue2 = function () {
  var items = new WeakMap();

  var Queue2 = function () {
    function Queue2() {
      _classCallCheck(this, Queue2);

      items.set(this, []);
      console.log(items);
    }

    _createClass(Queue2, [{
      key: "enqueue",
      value: function enqueue(element) {
        //向队列添加元素
        var q = items.get(this);
        q.push(element);
      }
      // 从队列删除元素

    }, {
      key: "dequeue",
      value: function dequeue() {
        var q = items.get(this);
        return q.shift();
      }
      // 查看队列头元素

    }, {
      key: "front",
      value: function front() {
        var q = items.get(this);
        return q[0];
      }
      // 查看队列是否为空

    }, {
      key: "isEmpty",
      value: function isEmpty() {
        var q = items.get(this);
        return q.length == 0;
      }
      // 查看队列长度

    }, {
      key: "size",
      value: function size() {
        var q = items.get(this);
        return q.length;
      }
      // 打印队列元素

    }, {
      key: "print",
      value: function print() {
        var q = items.get(this);
        console.log(q.toString());
      }
    }]);

    return Queue2;
  }();

  return Queue2;
}();

var queue2 = new Queue2();
console.log('isEmpty', queue2.isEmpty());

queue2.enqueue('hou');
queue2.enqueue('jun');
queue2.enqueue('jie');

queue2.print();
console.log('size', queue2.size());
console.log('isEmpty', queue2.isEmpty());
queue2.dequeue();
queue2.dequeue();
queue2.print();

console.log('-------------- 优先队列 PriorityQueue ---------------');

/**
 * 优先队列 有两种实现方式 
 * 1 设置优先级，然后在正确的位置添加元素
 * 2 或者用入列操作添加元素，然后按照优先级移除它们
 */
function PriorityQueue() {
  var items = [];
  // 创建一个特殊元素用来添加到队列，改元素包含了要添加到队列的元素（任意类型）还有它在队列中的优先级
  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }
  this.enqueue = function (element, priority) {
    var queueElement = new QueueElement(element, priority);

    var added = false;
    for (var i = 0; i < items.length; i++) {
      // 比较该元素与其它元素的优先级，当找到一个元素的priority值更大（优先级更低），就把新元素插入到它之前
      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      items.push(queueElement);
    }
  };
  // 从队列中删除元素
  this.dequeue = function () {
    return items.shift();
  };

  // 查看队列头元素
  this.front = function () {
    return items[0];
  };

  // 队列是否为空
  this.isEmpty = function () {
    return items.length == 0;
  };

  // 队列长度
  this.size = function () {
    return items.length;
  };

  // 打印队列元素
  this.print = function () {
    for (var i = 0; i < items.length; i++) {
      console.log(items[i].element + " - " + items[i].priority);
    }
  };
}
var priorityQueue = new PriorityQueue();
console.log('isEmpty', priorityQueue.isEmpty());
priorityQueue.enqueue('jun', 2);
priorityQueue.enqueue('hou', 1);
priorityQueue.enqueue('jie', 3);
priorityQueue.print();

console.log('---------- 循环队列-击鼓传花 hotPotato -----------');

/**
 * 击鼓传花 -- 孩子围成一个圆圈， 把花尽快地传递给旁边的人。某一时刻传花停止，
 * 这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子
 * 循环队列 -- 迭代一个列表，从开头移除一项，再将其添加到队列末尾。
 * 一旦传递次数到了给定的数字，就移除，直到最后一个元素
 * @param {*} nameList 
 * @param {*} num 
 */
function hotPotato(nameList, num) {
  // 借助一个之前实现的队列
  var queue = new Queue();
  for (var i = 0; i < nameList.length; i++) {
    // 把这个列表的元素加入队列
    queue.enqueue(nameList[i]);
  }

  var eliminated = '';
  while (queue.size() > 1) {
    for (var _i = 0; _i < num; _i++) {
      // 从队列开头移除一项，再将其添加到队列末尾
      queue.enqueue(queue.dequeue());
    }
    // 一旦传递次数达到给定数字， 从队列移除
    eliminated = queue.dequeue();
    console.log(eliminated + '在击鼓传花游戏中被淘汰');
  }
  // 胜者
  return queue.dequeue();
}

var names = ['john', 'jack', 'hou', 'jun', 'jie'];
var winner = hotPotato(names, 7);
console.log('the winner is: ' + winner);
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
  var ws = new WebSocket('ws://localhost:55668/');
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
},{}]},{},[0,4])