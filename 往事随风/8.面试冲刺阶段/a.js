class Node {
    constructor(value) {
        this.value = value;
        this.left = null
        this.right = null
    }
    show() {
        console.log(this.value)
    }

    insert(value) {
        let newNode = new Node(value);
    
        if(this.root === null) {
            this.root = newNode;
        }else {
            this.insertNode(this.root, newNode)
        }
    }

    insertNode(node, newNode) {
        if(newNode < node.value) {
            if(node.left == null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if(node.right === null) {
                node.right = newNode
            }else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    preOrderTraverse() {
        this.preOrderTraverseNode(this.root)
    }

    preOrderTraverseNode(node) {
        if(node !== null) {
            node.show(node)
            this.preOrderTraverseNode(node.left)
            this.preOrderTraverseNode(node.left)
        }
    }

    inOrderTraverse() {
        this.inOrderTraverseNode(this.root)
    }

    inOrderTraverseNode(node) {
        if(node !== null) {
            this.inOrderTraverseNode(node.left)
            node.show()
            this.inOrderTraverseNode(node.right)
        }
    }

    postOrderTraverse() {
        this.postOrderTraverseNode(this.root);
      }
    
      postOrderTraverseNode(node) {
        if (node !== null) {
          this.postOrderTraverseNode(node.left);
          this.postOrderTraverseNode(node.right);
          node.show();
        }
    }

    //通过循环实现树的先序
    preOrderTraverseByStack() {
        let stack = []

        stack.push(this.root);

        while(stack.length > 0) {
            let node = stack.pop()
            node.shwo()
            if(node.right) {
                stack.push(node.right)
            }
            if(node.left) {
                stack.push(node.left)
            }
        }
    }
    
    //中序遍历
    inOrderTraverseByStack() {
        let stack = [],
            node = this.root
        while(stack.length > 0 || node){
            if(node) {
                stack.push(node)  
                node = node.left  //指向左节点继续,如果没有就为null,下一次循环就不会进上面的判断
            } else {
                node = stack.pop()
                node.shwo()
                node = node.right
            }
        }

    }

    //后序遍历要2个栈
    postOrderTraverseByStack() {
        let stack1 = [],stack2 = [],
            node = null
        stack1.push(this.root)
        while(stack1.length > 0) {
            node = stack1.pop()
            stack2.push(node)
            if(node.left) {
                stack1.push(node.left)
            }
            if(node.right) {
                stack1.push(node.left)
            }
        }
        //把stack2循环弹出即可
        while(stack2.length > 0) {
            stack2.pop().show()
        }
    }

    //寻找最大最小节点值
    findMinNode(root) {
        let node = root
        while(node && node.left) {
            node = node.left
        }
        return node;
    }
    findMaxNode(root) {
        let node = root;
        while (node && node.right) {
          node = node.right;
        }
        return node;
      }

    //寻找特定大小节点值
    find(value) {
        return this.findNode(this.root, value)
    }

    findNode(node, value) {
        if(node === null) {
            return node
        }
        if(value < node.value) {
            return this.findNode(node.left, value)
        }else if(value > node.right) {
            return this.findNode(node.right)
        }else {
            return node
        }
    }

    //移除一定值的节点 1. 没有子节点直接删除 2。只有一个，替换上来 3.2个页节点，右子树找最小节点来换
    //为什么是这种形式，为了其他节点调用方便
    remove(value) {
        this.removeNode(this.node, value)
    }
    removeNode(node, value) {
        if(node === null) {
            return node
        }
        //寻找指定节点
        if(value < node.value) {
            node.left = this.removeNode(node.left, value)  //return的节点替换了这个节点,返回的node是被删除了的node
            return node
        }else if(value > node.value) {
            node.right = this.removeNode(node.right, value) //node.right 删除后索引不
            return node   //走投无路 return null
        } else {  //找到节点
            if(node.left === null && node.right === null) {
                node = null
                return node
            }
            if(node.left === null) {
                node = node.right
                return node
            }else if(node.right === null) {
                node = node.right
                return node
            }

            let mNode = this.findMinNode(node.right)
            node.value = mNode.value
            node.right = this.removeNode(node.right, mNode.value)  //为什么用node.right 来保留
            return node
        }
    }

}


//链表翻转
function reverseList(head) {
    if(!head || !head.next) return head

    let pre = null,
        current = head,
        move = null   
    while(current) {
        move = current.next
        current.next = pre
        pre = current
        current = move  
    }
    return pre   //返回头节点
}


//动态规划 爬楼梯，把问题分解变小
// 转化成斐波那契
function getClimbingWays(n) {
    if( n < 1) {
        return 0
    }
    if( n = 1) {
        return 1
    }
    if(n = 2) {
        return 2
    }
    return getClimbingWays(n-1) + getClimbingWays(n-2)
}

// 优化： 用map缓存计算过的 , 增加了空间复杂度
let map = new Map()
function getClimbingWays2(n) {
    if( n < 1) {
        return 0
    }
    if( n = 1) {
        return 1
    }
    if(n = 2) {
        return 2
    }
    if(map.has(n)) {
        return map.get(n)
    } else {
        let value =  getClimbingWays(n-1) + getClimbingWays(n-2)
        map.set(n, value)
        return value
    }
}
//迭代法： 自底向上，因为都是1、2累算出来的
function getClimbingWays3(n) {
    if(n < 1) {
        return 0
    }
    if(n = 1) {
        return 1
    }
    if(n = 2) {
        return 2
    }
    let a = 1,b =2, acc = null
    for(let i = 3; i<=n; i++) {
        acc = a + b
        a= b
        b = acc
    }
    return acc
}