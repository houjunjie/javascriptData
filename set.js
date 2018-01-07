// 创建集合
// set 骨架
function LinkedSet () {
	let items = {};

	/**
	 * 如果值存在寄合同，返回true，否则返回false
	 * @param {*} value 给定的值
	 */
	this.has = function (value) {
		// in 操作符，用以检查给定的value值是否是items的属性
		// return value in items;
		// 也可以使用 hasOwnProperty 这个方法返回一个表明对象是否具有特定属性的布尔值
		return items.hasOwnProperty(value);
	}

	/**
	 * 向集合添加一个新的项，最后返回一个布尔值，用以表示是否添加成功
	 * @param {*} value 添加的值
	 */
	this.add = function (value) {
		if(!this.has(value)) {
			items[value] = value; // 添加一个值的时候，把它同时作为键和值保存，这有利于之后的查找
			return true;
		}
		return false
	}

	/**
	 * 移除集合中某一项的值 返回一个布尔值，表示是否成功删除
	 * @param {*} value  要删除的值
	 */
	this.remove = function (value) {
		if(this.has(value)) {
			delete items[value]; // 因为集合是对象，所以可以直接使用delete 操作符进行删除
			return true;
		}
		return false;
	}

	/**
	 * 移除集合所有的值
	 */
	this.clear = function () {
		items = {};
	}

	/**
	 * 返回集合有多少项，有三种实现方法
	 * 1. 添加一个length变量，在add和remove的时候改变length的值
	 * 2. Object对象有一个keys方法，返回的是给定对象所有属性的数组
	 * 3. 使用for-in 进行遍历对象的属性，然后用hasOwnProperty检查是否是对象自身的值，然后累加
	 * 这里用的是第二种方法，但存在兼容问题，不兼容IE9以下等
	 */ 
	this.size = function () {
		return Object.keys(items).length;
	}

	/**
	 * 提取集合所有的值，以数组返回
	 */ 
	this.values = function () {
		let values = [];
		for (let i = 0, keys = Object.keys(items);i < keys.length; i++) {
			values.push(items[keys[i]])
		}
		return values;
	}

	/**
	 * 并集 给定两个集合，返回一个包含两个集合中所有元素的集合
	 * @param {Object} otherSet 
	 */ 
	this.union = function (otherSet) {
		let unionSet = new LinkedSet();

		let values = this.values();
		for(let i = 0; i<values.length; i++) {
			unionSet.add(values[i])
		}

		values = otherSet.values();
		for(let i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}

		return unionSet;
	}

	/**
	 * 交集 给定两个集合，返回两个集合共同有用的值，作为新的集合返回
	 * @param {Object} otherSet 
	 */ 
	this.intersection = function (otherSet) {
		let intersectionSet = new LinkedSet();
		let values = this.values();
		for(let i = 0; i< values.length; i++) {
			if(otherSet.has(values[i])) {
				intersectionSet.add(values[i]);
			}
		}
		return intersectionSet;
	}

	/**
	 * 差集，返回存在于A不存在于B的值，作为新的集合返回
	 * @param {Object} otherSet 
	 */ 
	this.difference = function (otherSet) {
		let differenceSet = new LinkedSet();
		let values = this.values();
		for(let i = 0; i< values.length; i++) {
			if(!otherSet.has(values[i])) {
				differenceSet.add(values[i]);
			}
		}
		return differenceSet;
	}

	/**
	 * 子集 集合A的元素，都存在于集合B 返回布尔值
	 * @param {Object} otherSet 
	 */ 
	this.subSet = function (otherSet) {
		if(this.size() > otherSet.size()) return false; // 先验证当前Set的大小。如果当前实例元素比otherSet大。那么就不是otherSrt的子集
		let values = this.values();
		for(let i = 0; i < values.length; i++) {
			if(!otherSet.has(values[i])) {
				return false
			}
		}
		return true;
	}
}

let setA = new LinkedSet();
setA.add(1);
setA.add(2);
setA.add(3);
console.log(setA.values());
console.log(setA.size());
console.log(setA.has(1));
// setObj.remove(1);
// console.log(setObj.values());

let setB = new LinkedSet();
setB.add(1)
setB.add(2)
setB.add(3)
setB.add(4)
setB.add(5)
setB.add(6)
console.log(setA.union(setB).values())
console.log(setA.intersection(setB).values())
console.log(setA.difference(setB).values())
console.log(setA.subSet(setB))