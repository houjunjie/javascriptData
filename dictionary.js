// 实现字典
// 字典骨架

function Dictionary () {
	let items = {};

	/**
	 * has 查看键值是否存在字典中，返回布尔值，实现方法有3种，跟集合的has是一样的。具体可去看set.js
	 * @param {*} value 
	 */ 
	this.has = function (key) {
		// return key in items;
		return items.hasOwnProperty(key)
	}

	/**
	 * 接受一个key和value作为参数，value作为items对象的key属性的值。用于给字典添加一个新值。或者更新旧的值
	 * @param {*} key 
	 * @param {*} value 
	 */ 
	this.set = function (key, value) {
		items[key] = value;
	}

	/**
	 * 通过键值来移除字典中键值对应的值。与集合中的delete方法类似，不同的是字典先搜索key（而不是value）
	 * @param {*} key 
	 */ 
	this.delete = function (key) {
		if(this.has(key)) {
			delete items[key];
			return true;
		}
		return false;
	}

	/**
	 * 在字典中查找特定的项
	 * @param {*} key 
	 */ 
	this.get = function (key) {
		return this.has(key) ? items[key] : undefined;
	}

	/**
	 * 把字典中所有的value值以数组形式返回
	 */ 
	this.values = function () {
		let values = [];
		for(let key in items) {
			if(this.has(key)) {
				values.push(items[key])
			}
		}
		return values;
	}

	/**
	 * 返回这个字典所包含的所有元素的数量
	 */ 
	this.size = function () {
		return Object.keys(items).length;
	}

	/**
	 * 清除字典所有的元素
	 */ 
	this.clear = function () {
		items = {};
	}

	/**
	 * 获取字典所有用于标识值的键名
	 */ 
	this.keys = function () {
		return Object.keys(items);
	}

	/**
	 * 用于验证items属性的输出值，所以直接把定义的变量返回
	 */ 
	this.getItems = function () {
		return items;
	}
}

let dictionary = new Dictionary();
dictionary.set('name', 'jie');
dictionary.set('age', '26');
dictionary.set('address', 'GZ');
console.log(dictionary.has('name'));
console.log(dictionary.size());
console.log(dictionary.values());
console.time();
console.log(dictionary.get('name'));
console.timeEnd();
console.log(dictionary.getItems());

/**
 * 实现散列表 HashTable
 * 在实现散列表之前，先实现一个散列函数
 */ 
let loseloseHashCode = function (key) {
	let hash = 0;
	for (let i =0; i< key.length; i++) {
		hash += key.charCodeAt(i);
	}
	return hash % 37;
}
function HashTable () {
	let table = [];
	let valuePair = function (key, value) {
		this.key = key;
		this.value = value;

		this.toString = function () {
			return `[${this.key} - ${this.value}]`
		}
	}
	/**
	 * 添加一个新的项或更新列表
	 * @param {*} key 
	 * @param {*} value 
	 */ 
	this.put = function (key, value) {
		let postion = loseloseHashCode(key);
		// console.log(postion + '-' + key);
		// 分离链接 str
		// if(table[postion] == undefined) {
		// 	table[postion] = new LinkedList()
		// }
		// table[postion].append(new valuePair(key, value))
		// 分离链接 end

		// 线性探查 str
		if(table[postion] == undefined){
			table[postion] = new valuePair(key, value);
		} else {
			let index = ++postion;
			while(table[index] !== undefined) {
				index++;
			}
			table[index] = new valuePair(key, value);
		}
		// 线性探查 end
	}

	// 查找一个值
	this.get = function (key) {
		var postion = loseloseHashCode(key);
		// 分离链接 str
		// if(table[postion] !== undefined) {
		// 	// 遍历链表来寻找键/值
		// 	let current = table[postion].getHead();
		// 	while (current.next) {
		// 		if (current.element.key === key) {
		// 			return current.element.value;
		// 		}
		// 		current = current.next;
		// 	}
		// 	// 坚持元素在链表第一个或最后一个节点的情况
		// 	if(current.element.key === key) {
		// 		return current.element.value;
		// 	}
		// } 
		// 分离链接 end

		// 线性探查 str
		if(table[postion] !== undefined){
			if(table[postion].key === key) {
				return table[postion].value;
			} else {
				let index = ++postion;
				while(table[index] === undefined || table[index].key !== key ){
					index++;
				}
				if(table[index].key === key) {
					return table[index].value;
				}
			}
		}
		// 线性探查 end
		return undefined;
		// return table[loseloseHashCode(key)]
	}

	this.remove = function (key) {
		let postion = loseloseHashCode(key);
		// 分离链接 str
		// if(table[postion] !== undefined) {
		// 	let current = table[postion].getHead();
		// 	while(current.next) {
		// 		if(current.element.key === key) {
		// 			table[postion].remove(current.element)
		// 			if(table[postion].isEmpty()) {
		// 				table[postion] = undefined;
		// 			}
		// 			return true;
		// 		}
		// 		current = current.next;
		// 	}

		// 	if(current.element.key === key) {
		// 		table[postion].remove(current.element);
		// 		if(table[postion].isEmpty()) {
		// 			table[postion] = undefined;
		// 		}
		// 		return true;
		// 	}
		// }
		// return false;

		// 分离链接 end
		// 线性探查 str
		if(table[postion] !== undefined){
			if(table[postion].key === key) {
				table[postion] = undefined;
				return true;
			} else {
				let index = ++postion;
				while(table[index] === undefined || table[index].key !== key) {
					index++;
				}
				if(table[index].key === key) {
					table[index] = undefined;
					return true;
				}
			}
		}
		return false;
		// 线性探查 end

		// table[loseloseHashCode(key)] = undefined;
	}

	this.print = function () { //辅助方法
		for(let i = 0;i < table.length; i++) {
			if(table[i] !== undefined) {
				console.log(i + ': '+table[i])
			}
		}
	}
}

let hash = new HashTable();
hash.put('name', 'jie');
hash.put('age', '26');
hash.put('address', 'GZ');
hash.put('address', 'GZ1');
console.time();
console.log(hash.get('namewww'))
console.timeEnd();
hash.print();