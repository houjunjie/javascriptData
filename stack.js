// function Stack() {
// 	let items = [];
// 	this.push = function (element) { //向栈添加元素
// 		items.push(element);
// 	}

// 	this.pop = function () { //从栈移除元素
// 		return items.pop();;
// 	}

// 	this.peek = function () { //查看栈顶元素
// 		return items[items.length - 1]
// 	}

// 	this.isEmpty = function () { //检查栈是否为空
// 		return items.length == 0
// 	}

// 	this.size = function () { //返回栈的长度
// 		return items.length;
// 	}

// 	this.clear = function () { // 清空栈
// 		items = []
// 	}

// 	this.print = function () { //打印栈元素
// 		console.log(items.toString());
// 	}
// }

// let stack = new Stack();
// console.log(stack.isEmpty());

// let _items = Symbol();
// class Stack {
// 	constructor() {
// 		this[_items] = [];
// 		console.log(_items, this[_items]);
// 	}
// 	push (element) {
// 		this[_items].push(element)
// 	}
// 	pop () {
// 		this[_items].pop()
// 	}
// 	isEmpty () {
// 		return this[_items].length == 0
// 	}
// 	print () {
// 		console.log(this[_items].toString());
// 	}
// }

// let stack = new Stack();
// console.log(stack.isEmpty());
// stack.push(1)
// stack.print();
// let objectSymbols = Object.getOwnPropertySymbols(stack)
// console.log(objectSymbols, 1);

console.log('------------ WeakMap -------------')
let _itemsB = new WeakMap();
class StackB {
	constructor() {
		// this[_items] = [];
		// console.log(_items, this[_items]);
		_itemsB.set(this, [])
	}
	push (element) {
		let s = _itemsB.get(this)
		s.push(element)
	}
	pop () {
		let s = _itemsB.get(this)
		let r =  s.pop();
		return r
	}
	isEmpty () {
		let s = _itemsB.get(this)
		return s.length == 0
	}
	print () {
		let s = _itemsB.get(this)
		// console.log(s.toString(),s,_itemsB, 'print');
		console.log(s.toString());
	}
}

let stackb = new StackB();
console.log(stackb.isEmpty());
stackb.push(1)
stackb.print();
// let objectSymbols = Object.getOwnPropertySymbols(stackb)
// console.log(objectSymbols, 1);

// 闭包
let Stack = (function() {
	const _items = new WeakMap();
	class Stack {
		constructor() {
			// this[_items] = [];
			// console.log(_items, this[_items]);
			_items.set(this, [])
		}
		push (element) {
			let s = _items.get(this)
			s.push(element)
		}
		pop () {
			let s = _items.get(this)
			let r = s.pop();
			return r
		}
		isEmpty () {
			let s = _items.get(this)
			return s.length == 0
		}
		print () {
			let s = _items.get(this)
			// console.log(s.toString(),s,_itemsB, 'print');
			console.log(s.toString());
		}
	}
	return Stack
})()

function baseConverter(decNumber, base) {
	let remStack = new Stack(),
		rem,
		baseString = '',
		digits = '0123456789ABCDEF';

		while(decNumber > 0) {
			rem = Math.floor(decNumber % base);
			remStack.push(rem);
			decNumber = Math.floor(decNumber / base);
		}
		while (!remStack.isEmpty()) {
			baseString += digits[remStack.pop()]
		}

		return baseString;
}

console.log(baseConverter(100345, 2))
console.log(baseConverter(100345, 8))
console.log(baseConverter(100345, 16))