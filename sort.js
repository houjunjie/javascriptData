// 冒泡排序实现
function ArrayList () {
	let items = [];
	this.insert = function (element) {
		items.push(element);
	}
	this.toString = function () {
		console.log(items.join());
	}
	/**
	 * 冒牌排序
	 */ 
	this.bubbleSort = function () {
		let length = items.length;
		for(let i = 0; i < length; i++) {
			for(let j = 0; j < length - 1 - i; j++) {
				if(items[j] > items[j+1]) {
					swap(j, j+1)
				}
			}
		}
	}
	/**
	 * 选择最大or最小的值放在第一位，然后选择第二大或第二小的排在第二位。以此内推
	 * 下面我选择大到小的排序，所以取最大的放第一位
	 * 选择排序
	 */ 
	this.selectSort = function () {
		let length = items.length,
				indexMax;
		for(let i = 0; i < length -1; i++) {
			indexMax = i;
			for(let j = i; j < length; j++) {
				if(items[indexMax] < items[j]) {
					indexMax = j;
				}
			}
			if(i !== indexMax) {
				swap(i, indexMax)
			}
		}
	}

	this.insertSort = function () {
		let length = items.length,
			j, temp;
		for (let i = 1; i < length; i++) {
			j = i;
			temp = items[i]; // 保留当前的值
			while(j > 0 && items[j-1] > temp) { // 判断前面的值是否比当前的值大
				items[j] = items[j - 1]; //如果是的话，就交换位置
				j--;
			}
			items[j] = temp; //最后把当前的值放到正确的位置上
		}
	}
	function swap (index1, index2 ) {
		let tmp = items[index1];
		items[index1] = items[index2];
		items[index2] = tmp;
		// 或者使用es6
		// [array[index1], array[index2]] = [array[index2], array[index1]]
	}

	this.mergeSort = function () {
		items = mergeSortRec(items);
	}

	let mergeSortRec = function (array) {
		let length = array.length;
		if(length === 1) {
			return array;
		}
		let mid = Math.floor(length / 2),
				left = array.slice(0, mid),
				right = array.slice(mid, length)
		return merge(mergeSortRec(left), mergeSortRec(right));
	}

	let merge = function (left, right) {
		let result = [],
				il = 0,
				ir = 0;

		while(il < left.length && ir < right.length) {
			console.log(left[il], right[ir], 1111);
			if(left[il] < right[ir]){
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}

		while(il < left.length) {
			console.log(left[il], 222);
			result.push(left[il++]);
		}
		while(ir < right.length) {
			console.log(right[ir], 333);
			result.push(right[ir++]);
		}
		console.log(result);
		return result;
	}

	this.quickSort = function () {
		quick(items, 0, items.lengt - 1)
	}
	let quick = function (array, left, right) {
		var index;
		if(array.length > 1) { //跳出递归
			index = partition(array, left, right);
		}
		if(left < index -1) { // 如果子数组存在较小值的元素，则重复这个过程
			quick(array, left, index -1)
		}
		if(index < right) { // 如果子数组存在较大值的元素，则重复这个过程
			quick(array, index, right)
		}
	}
	let partition = function (array, left, right) {
		var pivot = array[Math.floor((left + right) / 2)], // 选择中间元素作为主元
				i = left,
				j = right;
		while (i <= j) { // 只要left和right指针没有相互交错，就进行划分操作
			while (array[i] < pivot) { // 先移动left指针，直到找到一个元素不比主元小
				i++;
			}
			while (array[j] > pivot) { // 移动right指针，直到找到一个元素不比主元大
				j--;
			}
			if(i <= j) { // 当左指针指向的元素不比主元小，右指针指向的元素不比主元大，并且左指针索引没有右指针索引大，意思就是左项比右项大（值比较）
				swap(array, i, j);// 然后交换它们，再移动两个指针，重复这个过程
				i++;
				j--
			}
		}
		return i
	}
}

function createNonSortedArray (size) {
	let array = new ArrayList();
	for(let i = size; i > 0; i--) {
		array.insert(i);
	}
	return array
}
let array = createNonSortedArray(8);
array.toString()
array.mergeSort()
array.toString()
// array.selectSort()
// array.toString()
// array.insertSort()
// array.toString()
