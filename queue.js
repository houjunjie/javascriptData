// 队列

function Queue () {
	// 这里是属性和方法
	let items = [];
	this.enqueue = function (element) { //想队列添加元素
		items.push(element)
	}

	this.dequeue = function () { // 从队列中移除元素
		// 因为队列遵循先进先出原则，所以用数组的shift 不用pop
		return items.shift();
	}

	this.front = function () { //查看对列头部元素
		return items[0];
	}

	this.isEmpty = function () { //查看队列是否为空
		return items.length == 0;
	}

	this.size = function () { //获取队列的长度 也就是Array的length
		return items.length 
	}

	this.print = function () { //打印队列元素
		console.log(items.toString());
	}
}

let queue = new Queue();
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
let Queue2 = (function () {
	const items = new WeakMap();
	class Queue2 {
		constructor () {
			items.set(this, []);
			console.log(items);
		}
		enqueue (element) { //向队列添加元素
			let q = items.get(this);
			q.push(element);
		}
		// 从队列删除元素
		dequeue () {
			let q = items.get(this);
			return q.shift();
		}
		// 查看队列头元素
		front () {
			let q = items.get(this);
			return q[0];
		}
		// 查看队列是否为空
		isEmpty () {
			let q = items.get(this);
			return q.length == 0;
		}
		// 查看队列长度
		size () {
			let q = items.get(this);
			return q.length;
		}
		// 打印队列元素
		print () {
			let q = items.get(this);
			console.log(q.toString());
		}
	}
	return Queue2;
})();

let queue2 = new Queue2();
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
function PriorityQueue () {
	let items = [];
	// 创建一个特殊元素用来添加到队列，改元素包含了要添加到队列的元素（任意类型）还有它在队列中的优先级
	function QueueElement (element, priority) {
		this.element = element;
		this.priority = priority;
	}
	this.enqueue = function (element, priority) {
		let queueElement = new QueueElement(element, priority);

		let added = false;
		for (let i = 0; i < items.length; i++){
			// 比较该元素与其它元素的优先级，当找到一个元素的priority值更大（优先级更低），就把新元素插入到它之前
			if (queueElement.priority < items[i].priority) {
				items.splice(i, 0, queueElement);
				added = true;
				break;
			}
		}
		if (!added) {
			items.push(queueElement)
		}
	}
	// 从队列中删除元素
	this.dequeue = function () {
		return items.shift();
	}

	// 查看队列头元素
	this.front = function () {
		return items[0];
	}

	// 队列是否为空
	this.isEmpty = function () {
		return items.length == 0;
	}

	// 队列长度
	this.size = function () {
		return items.length;
	}

	// 打印队列元素
	this.print = function () { 
		for (let i = 0; i < items.length; i++) {
			console.log(`${items[i].element} - ${items[i].priority}`);
		}
	}
}
let priorityQueue = new PriorityQueue();
console.log('isEmpty', priorityQueue.isEmpty());
priorityQueue.enqueue('jun', 2);
priorityQueue.enqueue('hou', 1);
priorityQueue.enqueue('jie', 3);
priorityQueue.print()

console.log('---------- 循环队列-击鼓传花 hotPotato -----------');

/**
 * 击鼓传花 -- 孩子围成一个圆圈， 把花尽快地传递给旁边的人。某一时刻传花停止，
 * 这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子
 * 循环队列 -- 迭代一个列表，从开头移除一项，再将其添加到队列末尾。
 * 一旦传递次数到了给定的数字，就移除，直到最后一个元素
 * @param {*} nameList 
 * @param {*} num 
 */
function hotPotato (nameList, num) {
	// 借助一个之前实现的队列
	let queue = new Queue();
	for (let i = 0; i < nameList.length; i++) {
		// 把这个列表的元素加入队列
		queue.enqueue(nameList[i]);
	}

	let eliminated = '';
	while (queue.size() > 1) {
		for(let i = 0; i < num; i++) {
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

let names = ['john', 'jack', 'hou', 'jun', 'jie'];
let winner = hotPotato(names, 7)
console.log('the winner is: ' + winner);