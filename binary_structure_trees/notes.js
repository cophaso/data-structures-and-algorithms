//  a <= x < b

class Node {
  constructor(data, left = null, right = null){
      this.data = data;
      this.left = left;
      this.right = right;
  }
}

class BinarySearchTree {
  constructor() {
      this.root = null;
  }

  add(data) {
      const node = this.root;
      // if tree is empty
      if(!node) {
         this.root = new Node(data);
      } else {
          const traverse = (node) => {
              if (data < node.data) {
                  if(!node.left) {
                      node.left = new Node(data);
                  } else if (node.left) {
                      return traverse(node.left)
                  }
              } else if (data > node.data) {
                  if(!node.right) {
                      node.right = new Node(data);
                  } else if(node.right) {
                      return traverse(node.right);
                  }
              } else {
                  return null;
              }
          };
          return traverse(node);
      }
  }

  find(data) {
      let current  = this.root;
      while(current.data !== data) {
          if (data < current.data) {
              current = current.left;
          } else if(data > current.data) {
              current = current.right;
          }
          if(!current) {
              return;
          }
      }
      return current;
  }

  findMin() {
      let current = this.root;
      while (current.left !== null) {
          current = current.left;
      }
      return current.data;
  }


  findMax() {
      let current = this.root;
      while (current.right !== null) {
          current = current.right;
      }
      return current.data;
  }

  remove(data) {
      const removeNode = (node, data) => {
          if (node == null) {
              return null;
          }
          if (data === node.data) {
              // node has no children
              if (node.left == null && node.right == null) {
                  return null;
              }
              // node has no left child
              if (node.left == null) {
                  return node.right;
              }
              // node has no right child
              if (node.right == null) {
                  return node.left;
              }
              // node has two children
              let tempNode = node.right;
              while (tempNode.left !== null) {
                  tempNode = tempNode.left;
              }
              node.data = tempNode.data;
              node.right = removeNode(node.right, tempNode.data);
              return node;
          } else if (data < node.data) {
              node.left = removeNode(node.left, data);
              return node;
          } else {
              node.right = removeNode(node.right, data);
              return node;
          }
      };
      this.root = removeNode(this.root, data);
  }
}
