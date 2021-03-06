###栈
`栈`是一种遵从`后进先出(LIFO)`原则的有序集合。新添加或待删除的元素都保存在栈的同一端。即栈顶，另一端叫做栈底。在栈里。新元素都靠近栈顶，旧元素都靠近栈底。

#####创建栈
创建一个类来表示一个栈。
```
function stack () {
	// 各种属性和方法的声明
}
```
首先我们需要一种数据结构来保存栈里的元素，可以选择数组
```
let items = [];
```

接下来我们事先一些方法

	1. push(element) 添加一个或者几个新元素到栈顶
	2. pop() 移除栈顶的元素，同事返回被移除的元素
	3. peek() 返回栈顶元素，不会对栈做任何修改（不会删除栈的元素，仅仅返回它）
	4. isEmpty() 判断栈是否为空，返回布尔值
	5. clear() 移除栈里所有的元素
	6. size() 返回栈里的元素个数。

具体代码实现，看`stack.js`

使用es6重构了我们的`stack`类。看起来很美好
但是有一个问题，变量`items`是公共的。因为es6的类是基于原型的。所以不能声明私有属性（变量）或方法。在这种情况下我们希望Stack类的用户只能访问暴露给类的方法，否则，就有可能从栈的中间移除元素（因为我们用的是数组来存储），这不是我们希望看到的。
所以我们可以利用ES6的`Symbol`来实现。
因为新增的这个`Symbol`基础类型，它是不可变的，可以用作对象的属性。
看似很美好。但是ES6新增了一个`Object.getOwnPropertySymbols`方法可以取到类里声明的所有Symbols属性。
所以也是不可行的。
但es6还新增了一种数据类型可以确保属性是私有的。这就是`WeakMap`.

具体实现。看代码


#####用栈解决的问题
在回溯问题中，它可以存储访问过的任务或者路径，撤销的操作。java和c#用栈来存储变量和方法调用，特别是处理递归算法时，有可能抛出一个栈溢出异常（后面章节介绍）
一些用法，十进制转二进制，汉诺塔，平衡圆括号

