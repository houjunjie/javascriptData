
/**
 * Array 
 * @param {*} x 
 */ 
let isEvent = function  (x) {
	// 如果x是2的倍数，就返回true
	console.log(x);
	return (x % 2 == 0) ? true : false;
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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

 numbers.forEach((x) => {
	 console.log('forEach', (x % 2 == 0));
 })

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
let iterator = numbers[Symbol.iterator]();
console.log('iterator', iterator.next().value); //1
console.log('iterator', iterator.next().value); //2
console.log('iterator', iterator.next().value); //3

/**
 * copyWithin 复制数组中一系列的元素到同一个数组中指定的起始位置
 */ 
let copyArray = [1, 2, 3, 4, 5, 6];
console.log('copyWithin', copyArray.copyWithin(0, 3));

/**
 * entries 返回包含数组所有键值对的@@iterator
 */ 
let entries = numbers.entries(); // 得到键值对的迭代器
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
let numberFill = Array.of(1, 2, 3, 4, 5, 6)
console.log('fill', numberFill.fill(0)) // [0, 0, 0, 0, 0, 0]

/**
 * from 根据已有的数组创建新的数组
 */
let numbers2 = Array.from(numbers);
console.log('from numbers2', numbers2);
let evens = Array.from(numbers, x => (x % 2 == 0))
console.log('from evens', numbers3);
/**
 * keys 返回包含数组所有索引的@@iterator
 */
let aKeys = numbers.keys(); //得到数组索引的迭代器
console.log('keys', aKeys.next()); //{value:0, done: false}
console.log('keys', aKeys.next()); //{value:1, done: false}
console.log('keys', aKeys.next()); //{value:2, done: false}


/**
 * of 根据传入的参数创建一个新的数组
 */
let numbers3 = Array.of(1); // == let number3 = [1]
let numbers4 = Array.of(1, 2, 3, 4, 5, 6); // == let number4 = [1, 2, 3, 4, 5, 6]
let numbersCopy = Array.of(...numbers4); //用这个方法进行复制

/**
 * values 返回包含数组所有值的@@iterator
 */
// console.log(numbers.values);
// let aValues = numbers.values(); //得到数组值的迭代器
// console.log('values:', aValues.next()); //{value:1, done: false}
// console.log('values:', aValues.next()); //{value:2, done: false}
// console.log('values:', aValues.next()); //{value:3, done: false}
