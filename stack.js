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

let _items = Symbol();
class Stack {
	constructor() {
		this[_items] = [];
		console.log(_items, this[_items]);
	}
	push (element) {
		this[_items].push(element)
	}
	pop () {
		this[_items].pop()
	}
	isEmpty () {
		return this[_items].length == 0
	}
	print () {
		console.log(this[_items].toString());
	}
}

let stack = new Stack();
console.log(stack.isEmpty());
console.log(stack.push(1));
stack.print();
let objectSymbols = Object.getOwnPropertySymbols(stack)
console.log(objectSymbols, 1);