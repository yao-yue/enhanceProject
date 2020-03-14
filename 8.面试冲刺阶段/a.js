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
            thi.preOrderTraverseNode(node.left)
        }
    }
    
}

