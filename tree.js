// 树的实现
// 二叉搜索树
function BinarySearchTree () {
	// <!-- 声明一个node类来表示树中的每个节点 -->
	let Node = function (key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
	/**
	 * 将节点插入到根节点以外的节点，我们需要一个辅助函数来实现
	 * @param {*} node 当前节点 
	 * @param {*} newNode 新节点
	 */  
	let insertNode = function (node, newNode) {
		if(newNode.key < node.key) { // 验证新节点是否小于当前节点
			if(node.left === null) { //小于当前节点 检查当前节点有没有左侧子节点 没就插入新节点
				node.left = newNode;
			} else {
				insertNode(node.left, newNode); // 如果有左侧子节点，就递归调用insertNode，继续找到树的下一层
			}
		}
		if (newNode.key > node.key){
			if(node.right === null) { // 如果新节点比当前节点大， 那么检查当前节点有没有右侧节点，没就插入新节点
				node.right = newNode;
			} else {
				insertNode(node.right, newNode);// 如果有右侧子节点，就递归调用insertNode，继续找到树的下一层
			}	
		}
	}
	// <!-- 根节点 -->
	let root = null;

	/**
	 * 向树中插入一个键
	 * @param {*} key 
	 */ 
	this.insert = function (key) {
		// 创建新节点的node实例
		let newNode = new Node(key);

		if(root === null) { //验证是否是根节点
			root = newNode;
		} else {
			insertNode(root, newNode);
		}
	}

	/**
	 * 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也是从最小到最大的顺序访问所有节点，中序遍历的一种应用就是对树进行排序
	 * @param {*} callback 回调函数，用来定义我们对遍历到的每个节点进行操作（这也叫访问者模式）
	 */ 
	this.inOrderTraverse = function (callback) {
		// 由于我们在BST中最常实现的算法是递归，这里使用了饿一个私有的辅助函数，来接收一个节点和对应的回调函数作为参数
		inOrderTraverseNode(root, callback);
	}

	/**
	 * 
	 * @param {*} node 当前节点
	 * @param {*} callback 回调函数，用来定义我们对遍历到的每个节点进行操作（这也叫访问者模式）
	 */ 
	let inOrderTraverseNode = function (node, callback) {
		if (node !== null) { // 验证传入的节点是否为空，这是递归算法的基本条件
			inOrderTraverseNode(node.left, callback); // 递归调用相同的函数来访问左侧子节点
			callback(node.key); // 对这个节点进行一些列的操作
			inOrderTraverseNode(node.right, callback); // 然后访问右侧子节点
		}
	}

	/**
	 * 先序遍历是优先于后代节点的顺序访问每个节点，先序遍历的一种应用是打印一个结构化的文档
	 * 先序遍历和中序遍历不同点是，先序遍历会先访问节点本身，然后再访问节点的左侧子节点，最后是访问右侧子节点
	 * @param {*} callback 
	 */ 
	this.preOrderTracerse = function (callback) {
		preOrderTracerseNode(root, callback)
	}

	let preOrderTracerseNode = function (node, callback) {
		if(node !== null) {
			callback(node.key);
			preOrderTracerseNode(node.left, callback);
			preOrderTracerseNode(node.right, callback);
		}
	}

	/**
	 * 后序遍历是先访问节点的后代，再访问节点本身。后序遍历的一种应用是计算一个目录和它子目录里中所有文件所占空间的大小
	 * 后序遍历会先访问左侧子节点，然后是右侧子节点，最后是节点本身
	 * @param {*} callback 
	 */ 
	this.postOrderTracerseNode = function (callback) {
		postOrderTracerseNode(root, callback);
	}

	let postOrderTracerseNode = function (node, callback) {
		if (node !== null) {
			postOrderTracerseNode(node.left, callback);
			postOrderTracerseNode(node.right, callback);
			callback(node.key);
		}
	}

	/**
	 * 搜索最小值 根据二叉搜索树的定义，我们知道该树的最小值就是最左侧的叶节点（外部节点）
	 */ 
	this.min = function () {
		return minNode(root);
	}

	let minNode = function (node) {
		if(node !== null) {
			while(node && node.left !== null) {
				node = node.left;
			}
			return node.key;
		}
		return null;
	}

	/**
	 * 搜索最大值，根据二叉搜索树的定义，我们知道该树的最大值就是最右侧的叶节点（外部节点）
	 */ 
	this.max = function () {
		return maxNode(root);
	}

	let maxNode = function (node) {
		if(node) {
			if(node && node.right !== null) {
				node = node.right;
			}
			return node.key;
		}
		return null;
	}

	/**
	 * 搜索一个特定的值， 如果树存在该值，则返回true，否则返回false
	 * @param {*} key 要搜索的键值
	 */ 
	this.search = function (key) {
		searchNode(root, key);
	}

	let searchNode = function (node, key) {
		if(node == null) { // 验证传入的参数node是否合法（是否是null），如果是的则返回false 说明没有我们要找的key
			return false;
		}
		if(key < node.key) { // 如果要找的键值，比当前节点的小，那么继续在左侧子节点上继续搜索
			return searchNode(node.left, key);
		} else if (key > node.key) { // 如果要找的键值，比当前的节点大，那么继续在右侧子节点上搜索
			return searchNode(node.right, key);
		} else { //否侧就说明要找的键值和当前的键值相等，就返回true
			return true;
		}
	}

	/**
	 * 从树中移除某个键
	 * @param {*} key 要移除的键值
	 */ 
	this.remove = function (key) {
		root = removeNode(root, key);
	}

	let removeNode = function (node, key) {
		if(node === null) { //检测节点是否为null 如果是，则说明键不存在于树中，所以返回null
			return null;
		}
		if(key < node.key) { // 检测要搜索的键是否小于当前节点的值小
			node.left = removeNode(node.left, key); // 沿着树的左侧找到下一个节点
			return node;
		} else if (key > node.key) { // 如果要搜索的键比当前节点的值大
			node.right = removeNode(node.right, key); //那么沿着树的右侧找到下一个节点
			return node;
		} else { // 那么要移除的键等于node.key
			// 我们找到了要找的键（键和node.key相等），就需要处理三种不同的情况
			// 第一种情况 当前节点是一个叶节点
			// 如果当前节点是一个叶节点的话，删除这个节点我们要做的就是给这个节点赋予null值来移除它
			// 学习了链表的实现之后，我们知道仅仅赋一个null值是不够的，还需要处理指针。
			// 因为这个节点没有任何的直接点，但是它有一个父节点，需要通过返回null来将对应的父节点指针赋予null值
			if(node.left === null && node.right === null) {
				node = null;
				return node;
			}

			// 第二种情况 当前节点只有一个子节点 那么就需要跳过当前节点。把父节点的引用指向它存在的子节点
			// 如果只存在右节点。那么把父节点的引用指向当前节点右侧子节点
			if(node.left === null) { // 没有左侧节点
				node = node.right;
				return node;
			}
			// 如果只存在左节点。那么把父节点的引用指向当前节点左侧子节点
			if(node.right === null) { // 没有右侧节点
				node = node.left;
				return node;
			}

			// 第三种情况 当前节点拥有两个子节点
			// 这种情况是最复杂的。我们需要找到当前节点右边子树中最小的子节点。作为当前的节点
			// 为什么要找右侧子树最小的值作为当前节点呢，
			// 因为我们根据二叉搜索树的定义，左侧子节点值一定比右侧节点的值小。
			// 所以右侧子树最小的值也要比当前节点左侧子树中的最大值要大。
			let aux = findMinNode(node.right);
			node.key = aux.key;
			// 当我们找到右侧子树最小节点的键去作为当前的值，但是这样有一个问题，就是有两个相同的键，
			// 所以我们需要把右侧子树最小的子节点删除。
			node.right = removeNode(node.right, aux.key);
			// 最后返回当前的新节点作为父节点的某一侧的引用
			return node;
		}
	}

	let findMinNode = function (node) {
		while (node && node.left !== null) {
			node = node.left;
		}
		return node;
	}
	this.print = function (){
		console.log(root);
	}
}

let tree = new BinarySearchTree();
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(11)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(13)
tree.insert(18)
tree.insert(25)
tree.print();

function printNode(value) {
	console.log(value);
}
tree.inOrderTraverse(printNode);

console.log(tree.search(1) ? 'key 1 found' : 'key 1 not found');
console.log(tree.search(8) ? 'key 8 found' : 'key 8 not found');


console.log('---------------- 我是分割线 233333 -----------------') 
function AVLBinarySearchTree () {
	// <!-- 声明一个node类来表示树中的每个节点 -->
	let Node = function (key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}

	let heightNode = function (node) {
		if (node === null) {
			return -1;
		} else {
			return Math.max(heightNode(node.left), heightNode(node.right)) + 1
		}
	}
	let rotationRR = function (node) {
		let tmp = node.right; //(1)
		node.right = temp.left; //(3)
		temp.left = node; // (4)
		return temp;
	}
	let rotationLL = function (node) {
		let tmp = node.left; 
		node.left = temp.right;
		temp.right = node; 
		return temp;
	}
	let rotationLR = function (node) {
		node.left = rotationRR(node.left);
		return rotationLL(node);
	}
	let rotationRL = function (node) {
		node.right = rotationLL(node.right);
		return rotationRR(node);
	}
	/**
	 * 将节点插入到根节点以外的节点，我们需要一个辅助函数来实现
	 * @param {*} node 当前节点 
	 * @param {*} newNode 新节点
	 */  
	let insertNode = function (node, element) {
		// if(newNode.key < node.key) { // 验证新节点是否小于当前节点
		// 	if(node.left === null) { //小于当前节点 检查当前节点有没有左侧子节点 没就插入新节点
		// 		node.left = newNode;
		// 	} else {
		// 		insertNode(node.left, newNode); // 如果有左侧子节点，就递归调用insertNode，继续找到树的下一层
		// 	}
		// } else{
		// 	if(node.right === null) { // 如果新节点比当前节点大， 那么检查当前节点有没有右侧节点，没就插入新节点
		// 		node.right = newNode;
		// 	} else {
		// 		insertNode(node.right, newNode);// 如果有右侧子节点，就递归调用insertNode，继续找到树的下一层
		// 	}	
		// }
		if (node === null) {
			node = new Node(element);
		} else if (element < node.key) {
			node.left = insertNode(node.left, element);

			if (node.left !== null) {
				// 确认是否需要平衡
				if ((heightNode(node.left) - heightNode(node.right)) > 1){
					// 旋转
					if (element < node.left.key) {
						node = rotationLL(node);
					} else {
						node = rotationLR(node);
					}
				}
			}
		} else if (element > node.key) {
			node.right = insertNode(node.right, element);

			if (node.right !== null) {
				// 确认是否需要平衡
				if ((heightNode(node.right) - heightNode(node.left)) > 1){
					// 旋转
					if (element > node.left.key) {
						node = rotationRR(node);
					} else {
						node = rotationRL(node)
					}
				}
			}
		}
		return node;
	}
	// <!-- 根节点 -->
	let root = null;

	/**
	 * 向树中插入一个键
	 * @param {*} key 
	 */ 
	this.insert = function (key) {
		// 创建新节点的node实例
		// let newNode = new Node(key);

		// if(root === null) { //验证是否是根节点
		// 	root = newNode;
		// } else {
		// 	insertNode(root, newNode);
		// }
		root = insertNode(root, key);
	}

	/**
	 * 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也是从最小到最大的顺序访问所有节点，中序遍历的一种应用就是对树进行排序
	 * @param {*} callback 回调函数，用来定义我们对遍历到的每个节点进行操作（这也叫访问者模式）
	 */ 
	this.inOrderTraverse = function (callback) {
		// 由于我们在BST中最常实现的算法是递归，这里使用了饿一个私有的辅助函数，来接收一个节点和对应的回调函数作为参数
		inOrderTraverseNode(root, callback);
	}

	/**
	 * 
	 * @param {*} node 当前节点
	 * @param {*} callback 回调函数，用来定义我们对遍历到的每个节点进行操作（这也叫访问者模式）
	 */ 
	let inOrderTraverseNode = function (node, callback) {
		if (node !== null) { // 验证传入的节点是否为空，这是递归算法的基本条件
			inOrderTraverseNode(node.left, callback); // 递归调用相同的函数来访问左侧子节点
			callback(node.key); // 对这个节点进行一些列的操作
			inOrderTraverseNode(node.right, callback); // 然后访问右侧子节点
		}
	}

	/**
	 * 先序遍历是优先于后代节点的顺序访问每个节点，先序遍历的一种应用是打印一个结构化的文档
	 * 先序遍历和中序遍历不同点是，先序遍历会先访问节点本身，然后再访问节点的左侧子节点，最后是访问右侧子节点
	 * @param {*} callback 
	 */ 
	this.preOrderTracerse = function (callback) {
		preOrderTracerseNode(root, callback)
	}

	let preOrderTracerseNode = function (node, callback) {
		if(node !== null) {
			callback(node.key);
			preOrderTracerseNode(node.left, callback);
			preOrderTracerseNode(node.right, callback);
		}
	}

	/**
	 * 后序遍历是先访问节点的后代，再访问节点本身。后序遍历的一种应用是计算一个目录和它子目录里中所有文件所占空间的大小
	 * 后序遍历会先访问左侧子节点，然后是右侧子节点，最后是节点本身
	 * @param {*} callback 
	 */ 
	this.postOrderTracerseNode = function (callback) {
		postOrderTracerseNode(root, callback);
	}

	let postOrderTracerseNode = function (node, callback) {
		if (node !== null) {
			postOrderTracerseNode(node.left, callback);
			postOrderTracerseNode(node.right, callback);
			callback(node.key);
		}
	}

	/**
	 * 搜索最小值 根据二叉搜索树的定义，我们知道该树的最小值就是最左侧的叶节点（外部节点）
	 */ 
	this.min = function () {
		return minNode(root);
	}

	let minNode = function (node) {
		if(node !== null) {
			while(node && node.left !== null) {
				node = node.left;
			}
			return node.key;
		}
		return null;
	}

	/**
	 * 搜索最大值，根据二叉搜索树的定义，我们知道该树的最大值就是最右侧的叶节点（外部节点）
	 */ 
	this.max = function () {
		return maxNode(root);
	}

	let maxNode = function (node) {
		if(node) {
			if(node && node.right !== null) {
				node = node.right;
			}
			return node.key;
		}
		return null;
	}

	/**
	 * 搜索一个特定的值， 如果树存在该值，则返回true，否则返回false
	 * @param {*} key 要搜索的键值
	 */ 
	this.search = function (key) {
		searchNode(node, key);
	}

	let searchNode = function (node, key) {
		if(node == null) { // 验证传入的参数node是否合法（是否是null），如果是的则返回false 说明没有我们要找的key
			return false;
		}
		if(key < node.key) { // 如果要找的键值，比当前节点的小，那么继续在左侧子节点上继续搜索
			return searchNode(node.left, key);
		} else if (key > node.key) { // 如果要找的键值，比当前的节点大，那么继续在右侧子节点上搜索
			return searchNode(node.right, key);
		} else { //否侧就说明要找的键值和当前的键值相等，就返回true
			return true;
		}
	}

	/**
	 * 从树中移除某个键
	 * @param {*} key 要移除的键值
	 */ 
	this.remove = function (key) {
		root = removeNode(root, key);
	}

	let removeNode = function (node, key) {
		if(node === null) { //检测节点是否为null 如果是，则说明键不存在于树中，所以返回null
			return null;
		}
		if(key < node.key) { // 检测要搜索的键是否小于当前节点的值小
			node.left = removeNode(node.left, key); // 沿着树的左侧找到下一个节点
			return node;
		} else if (key > node.key) { // 如果要搜索的键比当前节点的值大
			node.right = removeNode(node.right, key); //那么沿着树的右侧找到下一个节点
			return node;
		} else { // 那么要移除的键等于node.key
			// 我们找到了要找的键（键和node.key相等），就需要处理三种不同的情况
			// 第一种情况 当前节点是一个叶节点
			// 如果当前节点是一个叶节点的话，删除这个节点我们要做的就是给这个节点赋予null值来移除它
			// 学习了链表的实现之后，我们知道仅仅赋一个null值是不够的，还需要处理指针。
			// 因为这个节点没有任何的直接点，但是它有一个父节点，需要通过返回null来将对应的父节点指针赋予null值
			if(node.left === null && node.right === null) {
				node = null;
				return node;
			}

			// 第二种情况 当前节点只有一个子节点 那么就需要跳过当前节点。把父节点的引用指向它存在的子节点
			// 如果只存在右节点。那么把父节点的引用指向当前节点右侧子节点
			if(node.left === null) { // 没有左侧节点
				node = node.right;
				return node;
			}
			// 如果只存在左节点。那么把父节点的引用指向当前节点左侧子节点
			if(node.right === null) { // 没有右侧节点
				node = node.left;
				return node;
			}

			// 第三种情况 当前节点拥有两个子节点
			// 这种情况是最复杂的。我们需要找到当前节点右边子树中最小的子节点。作为当前的节点
			// 为什么要找右侧子树最小的值作为当前节点呢，
			// 因为我们根据二叉搜索树的定义，左侧子节点值一定比右侧节点的值小。
			// 所以右侧子树最小的值也要比当前节点左侧子树中的最大值要大。
			let aux = findMinNode(node.right);
			node.key = aux.key;
			// 当我们找到右侧子树最小节点的键去作为当前的值，但是这样有一个问题，就是有两个相同的键，
			// 所以我们需要把右侧子树最小的子节点删除。
			node.right = removeNode(node.right, aux.key);
			// 最后返回当前的新节点作为父节点的某一侧的引用
			return node;
		}
	}

	let findMinNode = function (node) {
		while (node && node.left !== null) {
			node = node.left;
		}
		return node;
	}
}