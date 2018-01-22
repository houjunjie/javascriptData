###排序和搜索算法

#####冒泡排序
> 冒泡排序是比较相邻的两个数，如果第一个比第二个大，则交换，元素项向上移动至正确的顺序，就好像气泡升至表面一样。冒泡排序因此得名

```
this.bubbleSort = function () {
	let length = items.length;
	for(let i = 0; i < length; i++) {
		for(let j = 0; j < length - 1; j++) {
			if(items[j] > items[j+1]) {
				swap(items, j, j+1)
			}
		}
	}
}
function swap (array,index1, index2 ) {
	let tmp = array[index1];
	array[index1] = array[index2];
	array[index2] = tmp;
	// 或者使用es6
	// [array[index1], array[index2]] = [array[index2], array[index1]]
}
```
这个实现有一个问题，就是有些已经排好序了，已经确定是在最顶层了，不需要在排序了。但是这样的写法依然会循环已经排好的项。
所以我们稍稍改进一下。从内循环中减去外循环的已经跑过的轮数，就可以避免这样的问题出现
```
this.bubbleSort = function () {
	let length = items.length;
	for(let i = 0; i < length; i++) {
		for(let j = 0; j < length - 1 - i; j++) {
			if(items[j] > items[j+1]) {
				swap(items, j, j+1)
			}
		}
	}
}
```

####选择排序
> 选择排序算法是一种原值比较排序法，选择排序大致的思路是找到数据中最小值并将其放在第一位，接找到第二小的值并将其放在第二位，以此内推

```
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
```

选择排序同样是一个复杂度为O(n^2)的算法。和冒泡排序一样，它包含嵌套的两个循环，这样导致了二次方的复杂度，
然而，接下来看下插入排序要比选择排序性能要好

####插入排序
> 插入排序内次排一个数组项，以此方式构建最后的排序数组。嘉定第一项已经排序了，接着，它和第二项进行比较，第二项是应该插入第一项还是留在原位，接着喝第三项比较（看第三项是插入第一，第二，还是留在原位）以此类推

小型数组排序，这个性能要比之前的冒泡还有选择排序要好

####归并排序
> 归并排序将一个大数组转化为多个小数组直到只有一个项，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组
具体实现，看`sort.js`