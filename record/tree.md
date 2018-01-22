####树

树是`一种分层数据的抽象模型`。现实中最常见的树的例子就是家谱，或者是公司的组织架构

一个树的结构包含了一系列存在父子关系的节点。每个节点都有一个父节点（除了`根节点`）以及零个或多个子节点

`根节点`位于树的最顶端，他没有父节点。树中的每一个元素，我们都称之为节点。节点又分为内部节点和外部节点

`至少`有一个子节点的节点我们称为`内部节点`，没有子节点的我们称为`外部节点`或者`叶节点`。

`子树`是由节点和它的后代构成的

节点的一个属性是`深度`,节点的深度取决于它的祖先节点的数量，比如`某个节点有3个祖先节点,那么它的深度就是3`

树的高度取决于所有节点`深度的最大值`。一棵树也可以被分解成层级。根节点在0层，它的子节点在1层，以此内推


####二叉树和二叉搜索树

`二叉树`中的节点最多只能有两个子节点，一个是左节点，一个是右节点。这样定义有助于我们写出`更高效的向/从树中插入、查找和删除节点`的算法

`二叉搜索树（BST）`是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值，在右节点存储（比父节点）大（或等于）的值。

创建我们的`二叉搜索树(BinarySearchTree)`

```
function BinarySearchTree () {
	<!-- 声明一个node类来表示树中的每个节点 -->
	let node = function (key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
	<!-- 根节点 -->
	let root = null;
}
```

然后我们需要实现一些方法，下面是我们将要实现的一些方法。

1. insert(key) 向树中插入一个新的键（键是树相关术语中对节点的称呼）
2. search(key) 向树中查找一个键，如果存在则返回true，否则返回false
3. inOrderTraverse 通过中序方法遍历所有节点
4. preOrderTraverse 通过先序遍历方式遍历所有节点
5. postOrderTraverse 通过后序遍历方式遍历所有节点
6. min 返回树中最少的值/键
7. max 返回树中最大的值/键
8. remove(key) 从树中移除某个键

方法具体实现，看`tree.js`

#### 自平衡树

我们在上面实现了一个二叉搜索树。
但是二叉搜索树存在一个问题，就是树的一边有可能会非常深，也就是说树的一条分支有可能会有很多层。而其它分支却只有几层。
为了解决这个问题，有一种树叫作`Adelson-Velskii-Landi树（AVL树）`。AVL树是一种`自平衡二叉搜索树`，
意思是任何一个节点左右两侧子树高度之差最多为1。在添加或移除节点时，AVL树会尽可能尝试转换为完全树

在AVL树种插入猴子移除节点和BST（上面实现的二叉搜索树）完全相同。不同之处在于我们需要检验它的`平衡因子`

下面代码是向AVL树插入新节点的例子
```
let insertNode = function (node, element) {
	if (node === null) {
		node = new Node(element);
	} else if (element < node.key) {
		node.left = insertNode(node.left, element);

		if (node.left !== null) {
			// 确认是否需要平衡
		}
	} else if (element > node.key) {
		node.right = insertNode(node.right, element);

		if (node.right !== null) {
			// 确认是否需要平衡
		}
	}
	return node;
}
```
然而，插入新节点的时候，还要检查是否要平衡树

######计算平衡因子
在AVL树种，需要对每个节点计算右子树高度（hr）和左子树高度（hl）的差值，该差值（hr - hl）应为0、1或-1
如果不是这三个值之一，则需要平衡该AVL树。这就是平衡因子的概念
计算节点高度的代码如下
```
let heightNode = function (node) {
	if (node === null) {
		return -1;
	} else {
		return Math.max(heightNode(node.left), heightNode(node.right)) + 1
	}
}
```
因此，向左子树插入新节点时，需要计算其高度；如果高度大于1（即不为-1、0或1），就需要平衡左子树
代码如下
```
if ((heightNode(node.left) - heightNode(node.right)) > 1){
	// 旋转
}
```
向右子树插入新节点时，应用同样的逻辑，
```
if ((heightNode(node.right) - heightNode(node.left)) > 1){
	// 旋转
}
```

######AVL旋转
向AVL插入节点时，可以执行`单旋转`或`双旋转`两种平衡操作。分别对应四种场景

	1. 右-右（RR）向左的单旋转
	2. 左-左（LL）向右的单旋转
	3. 左-右（LR）向右的双旋转
	4. 右-左（RL）向左的双旋转

1. 右-右（RR）：向左单旋转
	例如
	```
			Y
			50                          RR          70
		/		\																		/		\
	30     70 X                    ====》    50     80
				/  \															/	 \  		\
			60 Z  80    											30		60		 90
							\
							90（插入的值）  
	```

	假设向AVL树插入节点90，这样会造成树的失衡（节点50，左右两侧子树的差为-2），因此需要恢复树的平衡
	下面是我们要执行的操作

		1. 与平衡操作相关的节点有三个（X，Y，Z），将节点`X`置于节点`Y`（平衡因子为-2）所在的位置
		2. 节点`X`的右子树保持不变
		3. 将节点`Y`的右子节点置为节点`X`的左子节点`Z`
		4. 将节点`X`的左子节点置为节点`Y`
	实现代码如下
	```
	let rotationRR = function (node) {
		let tmp = node.right; //(1)
		node.right = temp.left; //(3)
		temp.left = node; // (4)
		return temp;
	}
	```
2. 左-左（LL）向右的单旋转
这个实现与`右-右`的实现一样，只是反过来，就不多描述。自行领悟
代码如下
```
let rotationLL = function (node) {
	let tmp = node.left; 
	node.left = temp.right;
	temp.right = node; 
	return temp;
}
```

3. 左-右（LR）向右的双旋转
```
					Y
					50                                   40
			Z	/		\								LR 								/	 \
			30     70            ====》           30    50
		 /	\																	/   \    \
	  10	40 X														10		 35
			 /		
			35(插入的值)
	```
假设向AVL树插入节点35，这样会造成树的失衡（节点50，左右两侧子树的差为+2），需要恢复树的平衡
操作如下
	1. 将节点X置于节点Y所在的位置
	2. 将节点Y的左子节点置为节点X的右子节点
	3. 将节点Z的右子节点置为节点X的左子节点
	4. 将节点X的右子节点置为节点Y
	5. 将节点X的左子节点置为节点Z

代码如下
```
let rotationLR = function (node) {
	node.left = rotationRR(node.left);
	return rotationLL(node);
}
```

4. 右-左（RL）向左的双旋转
这个实现与`左-右`的实现一样，只是反过来，就不多描述。自行领悟
代码如下
```
let rotationRL = function (node) {
	node.right = rotationLL(node.right);
	return rotationRR(node);
}
```
具体实现，看`tree.js`
