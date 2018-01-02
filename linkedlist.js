/**
 * 链表 链表存储是一个有序的元素集合，但不同于数组，链表中的元素在内存中不是连续放置的。
 * 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称之为指针或链接）组成
 */

function LinkedList () {
	// 辅助类，表示要加入列表的项
	let Node = function (element) {
		this.element = element;
		this.next = null;
	}

	let length = 0; // 存储列表数量的length属性
	let head = null; // 存储第一个节点的引用，为此可以把这个引用存储在一个称为head的变量中
	
	/**
	 * 向列表尾部添加一个新的项
	 * @param {*} element 
	 */ 
	this.append = function (element) {
		// 创建Node项
		let node = new Node(element),
			current;
		if (head == null) { //列表中的第一个节点
			head = node;
		} else {
			current = head;
			// 循环列表，直到找到最后一项
			while (current.next) {
				console.log(head, current,element, 'current');
				current = current.next;
			}
			// 找到最后一项，将其next赋为node，建立连接
			current.next = node;
		}
		length++;//更新链表的长度
	}
	/**
	 * 向列表的任意位置插入一个新的值
	 */
	this.insert = function (position, element) {
		// 检查越界值
		if (postion >= 0 && postion <= length) {
			let node = new Node(element),
			current = head,
			previous,
			index = 0;

			if (postion === 0) {
				node.next = current;
				head = node;
			} else {
				while (index++ < postion) { // 迭代列表，找到目标位置
					previous = current;
					current = current.next;
				}
				// 跳出循环时，current变量将是对想要插入新元素的位置之后一个元素的引用
				// 而previous将是对想要插入新元素的位置之前一个元素的引用
				// 在这种情况下，我们要遭previous和current之前见添加新项，
				// 因此首先需要把新项(node)和当前项链接起来
				// 然后改变previous和current之间的链接，
				// 还需要让previous.next指向node
				node.next = current;
				previous.next = node;
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
		
			let current = head,
			previous, //前一个元素的引用
			index = 0;

			// 移除第一项 
			
			if (position === 0) {
				//  如果把head赋为current，就会移除第一个元素
				head = current.next;
			} else {
				// 迭代列表（使用一个用于内部控制和递增的index变量），直到到达指定位置
				while (index++ < position) {
					// 当前元素的前一个元素的引用
					previous = current;
					// current 变量总是为对所循环列表的当前元素的引用
					current = current.next;
				}

				// 将previous与current的下一项连接起来，跳过current，从而删除它
				previous.next = current.next;
			}
			length--;
			return current.element;
		} else {
			return null;
		}
	};
	/**
	 * 从列表中移除一项
	 * @param {*} element 
	 */ 
	this.remove = function (element) {
		let index = this.indexOf(element);
		return this.removeAt(index);
	};
	/**
	 * 返回元素在列表中的索引，如果列表中没有改元素，则返回-1
	 * @param {*} element 
	 */ 
	this.indexOf = function (element) {
		let current = head,
		index = 0;
		while (current) {
			if(element === current.element) {
				return index
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
		return length === 0
	};
	/**
	 * 返回链表中包含元素的个数，与数组的length类似
	 */ 
	this.size = function () {
		return length
	};
	/**
	 * 
	 */ 
	this.getHead = function () {
		return head
	};
	/**
	 * 由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值
	 * toString把链接对象转换成一个字符串
	 */ 
	this.toString = function () {
		let current = head,
		string = '';
		while (current) {
			string += current.element + (current.next ? 'n' : '');
			current = current.next;
		}
		return string;
	};
	this.print = function () {};
}

let list = new LinkedList();
list.append(15);
list.append(10);
list.append(20);
console.log(list.indexOf(15));
console.log(list.size());


console.log('---------- 双向链表 DoublyLinkedList -------------');

function DoublyLinkedList () {
	let Node = function (element) {
		this.element = element;
		this.next = null;
		this.prev = null;
	}

	let index = 0;
	let length = 0;
	let head = null;
	let tail = null; // 最后的元素指针
	/**
	 * 向列表尾部添加一个新的项
	 * @param {*} element 
	 */ 
	this.append = function (element) {
		let node = new Node(element)
		let current = tail;
		if (head == null) {
			head = node;
			tail = node;
		} else {
			current.next = node;
			node.prev = current;
			tail = node
		}
		length++;
	}	
	
	/**
	 * 在任意位置插入新元素
	 */ 
	this.insert = function (postion, element) {
		// 检查越界值
		if (postion >= 0 && position <= length) {
			let node = new Node(element);
			current = head,
			previous,
			index = 0;

			if (postion === 0) {
				if (!head) { //新增的
					head = node;
					tail = node;
				} else {
					node.next = current;
					current.prev = node; //新增的
					head = node;
				}
			} else if (postion === length) { // 最后一项 //新增的
				current = tail; 
				current.next = node;
				node.prev = current;
				tail = node;
			} else {
				// 迭代列表，找到指定位置的元素
				while (index++ < postion) {
					previous = current;
					current = current.next;
				}
				node.next = current;
				previous.next = node;

				current.prev = node; //
				node.prev = previous;
			}
			length++;

			return true;
		} else {
			return false;
		}
	}

	this.removeAt = function (postion) {
		// 检查越界值
		if (postion > -1 && position < length) {
			let current = head,
			previous,
			index = 0;

			// 移除第一项
			if (postion === 0) {
				head = current.next;

				// 如果只有一项，更新tail（最后一项）
				if (length === 1) {
					tail = null;
				} else {
					head.prev = null;
				}
			} else if (postion === length-1) { // 最后一项
				current = tail;
				tail = current.prev;
				tail.next = null;
			} else {
				while (index++ < postion) {
					previous = current;
					current = current.next;
				}
				// 将previous与current的下一项链接起来--跳过current
				previous.next = current.next;
				current.next.prev = previous;
			}
			length--;

			return current.element;
		} else {
			return null;
		}
	}

	this.remove = function () {
		
	}

	this.isEmpty = function () {
		return length === 0;
	}

	this.size = function () {
		return length
	}

	this.indexOf = function (element) {
		let currrent = head;
		index = 0;
		while(current) {
			if(element == currrent.element) {
				return index
			}
			index++;
			currrent = currrent.next;
		}
		return -1
	}

	this.getHead = function () {
		return head
	}

	this.getTail = function () {
		return tail
	}
}

let doublyLinks = new DoublyLinkedList();
doublyLinks.append(15);
doublyLinks.append(10);
doublyLinks.append(20);
// console.log(doublyLinks.indexOf(15));
console.log(doublyLinks.size());