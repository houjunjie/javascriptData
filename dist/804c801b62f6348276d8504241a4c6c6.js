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

/**
 * 链表 链表存储是一个有序的元素集合，但不同于数组，链表中的元素在内存中不是连续放置的。
 * 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称之为指针或链接）组成
 */

function LinkedList() {
  // 辅助类，表示要加入列表的项
  var Node = function Node(element) {
    this.element = element;
    this.next = null;
  };

  var length = 0; // 存储列表数量的length属性
  var head = null; // 存储第一个节点的引用，为此可以把这个引用存储在一个称为head的变量中

  /**
   * 向列表尾部添加一个新的项
   * @param {*} element 
   */
  this.append = function (element) {
    // 创建Node项
    var node = new Node(element),
        current = void 0;
    if (head == null) {
      //列表中的第一个节点
      head = node;
    } else {
      current = head;
      // 循环列表，直到找到最后一项
      while (current.next) {
        console.log(head, current, element, 'current');
        current = current.next;
      }
      // 找到最后一项，将其next赋为node，建立连接
      current.next = node;
    }
    length++; //更新链表的长度
  };
  /**
   * 向列表的任意位置插入一个新的值
   */
  this.insert = function (position, element) {
    // 检查越界值
    if (postion >= 0 && postion <= length) {
      var node = new Node(element),
          _current = head,
          _previous = void 0,
          index = 0;

      if (postion === 0) {
        node.next = _current;
        head = node;
      } else {
        while (index++ < postion) {
          // 迭代列表，找到目标位置
          _previous = _current;
          _current = _current.next;
        }
        // 跳出循环时，current变量将是对想要插入新元素的位置之后一个元素的引用
        // 而previous将是对想要插入新元素的位置之前一个元素的引用
        // 在这种情况下，我们要遭previous和current之前见添加新项，
        // 因此首先需要把新项(node)和当前项链接起来
        // 然后改变previous和current之间的链接，
        // 还需要让previous.next指向node
        node.next = _current;
        _previous.next = node;
      }

      length++; // 更新列表长度
      return true;
    } else {
      return false;
    }
  };
  /**
   * 从列表的特定位置移除一项
   * @param {*} position 
   */
  this.removeAt = function (position) {
    // 检查越界值 验证这个位置是否有效
    if (postion > -1 && postion < length) {
      // 创建一个对列表中第一个元素的引用，这样current变量就是对列表中第一个元素的引用。

      var _current2 = head,
          _previous2 = void 0,
          //前一个元素的引用
      index = 0;

      // 移除第一项 

      if (position === 0) {
        //  如果把head赋为current，就会移除第一个元素
        head = _current2.next;
      } else {
        // 迭代列表（使用一个用于内部控制和递增的index变量），直到到达指定位置
        while (index++ < position) {
          // 当前元素的前一个元素的引用
          _previous2 = _current2;
          // current 变量总是为对所循环列表的当前元素的引用
          _current2 = _current2.next;
        }

        // 将previous与current的下一项连接起来，跳过current，从而删除它
        _previous2.next = _current2.next;
      }
      length--;
      return _current2.element;
    } else {
      return null;
    }
  };
  /**
   * 从列表中移除一项
   * @param {*} element 
   */
  this.remove = function (element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };
  /**
   * 返回元素在列表中的索引，如果列表中没有改元素，则返回-1
   * @param {*} element 
   */
  this.indexOf = function (element) {
    var current = head,
        index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };
  /**
   * 如果链表中不包含任何的元素，返回true，链表length长度大于0，返回false
   */
  this.isEmpty = function () {
    return length === 0;
  };
  /**
   * 返回链表中包含元素的个数，与数组的length类似
   */
  this.size = function () {
    return length;
  };
  /**
   * 
   */
  this.getHead = function () {
    return head;
  };
  /**
   * 由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值
   * toString把链接对象转换成一个字符串
   */
  this.toString = function () {
    var current = head,
        string = '';
    while (current) {
      string += current.element + (current.next ? 'n' : '');
      current = current.next;
    }
    return string;
  };
  this.print = function () {};
}

var list = new LinkedList();
list.append(15);
list.append(10);
list.append(20);
console.log(list.indexOf(15));
console.log(list.size());

console.log('---------- 双向链表 DoublyLinkedList -------------');

function DoublyLinkedList() {
  var node = function node(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  };

  var index = 0;
  var head = null;
  var tail = null; // 最后的元素指针


  /**
   * 在任意位置插入新元素
   */
  this.insert = function (postion, element) {
    // 检查越界值
    if (postion >= 0 && position <= length) {
      var _node = new Node(element);
      current = head, previous, index = 0;

      if (postion === 0) {
        if (!head) {
          //新增的
          head = _node;
          tail = _node;
        } else {
          _node.next = current;
          current.prev = _node; //新增的
          head = _node;
        }
      } else if (postion === length) {
        // 最后一项 //新增的
        current = tail;
        current.next = _node;
        _node.prev = current;
        tail = _node;
      } else {
        // 迭代列表，找到指定位置的元素
        while (index++ < postion) {
          previous = current;
          current = current.next;
        }
        _node.next = current;
        previous.next = _node;

        current.prev = _node; //
        _node.prev = previous;
      }
      length++;

      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function (postion) {
    // 检查越界值
    if (postion > -1 && position < length) {
      var _current3 = head,
          _previous3 = void 0,
          _index = 0;

      // 移除第一项
      if (postion === 0) {
        head = _current3.next;

        // 如果只有一项，更新tail（最后一项）
        if (length === 1) {
          tail = null;
        } else {
          head.prev = null;
        }
      } else if (postion === length - 1) {
        // 最后一项
        _current3 = tail;
        tail = _current3.prev;
        tail.next = null;
      } else {
        while (_index++ < postion) {
          _previous3 = _current3;
          _current3 = _current3.next;
        }
        // 将previous与current的下一项链接起来--跳过current
        _previous3.next = _current3.next;
        _current3.next.prev = _previous3;
      }
      length--;

      return _current3.element;
    } else {
      return null;
    }
  };
}
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
  var ws = new WebSocket('ws://localhost:57848/');
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