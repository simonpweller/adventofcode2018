function LinkedList(value) {
  const node = new Node(value);
  node.next = node;
  node.prev = node;
  this.current = node;
  this.head = node;
}

function Node(value, next = null, prev = null) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

LinkedList.prototype.insertAfterCurrent = function (value) {
  const node = new Node(value);
  node.next = this.current.next;
  this.current.next.prev = node;
  node.prev = this.current;
  this.current.next = node;
}

LinkedList.prototype.popCurrent = function () {
  this.current.prev.next = this.current.next;
  this.current.next.prev = this.current.prev;
  const value = this.current.value;
  this.current = this.current.next;
  return value;
}

LinkedList.prototype.step = function (steps = 1) {
  for (let i = 0; i < steps; i++) {
    this.current = this.current.next;
  }
}

LinkedList.prototype.back = function (steps = 1) {
  for (let i = 0; i < steps; i++) {
    this.current = this.current.prev;
  }
}

LinkedList.prototype.rewind = function () {
  while (this.current !== this.head) {
    this.back();
  }
}

LinkedList.prototype.printArray = function () {
  const startingNode = this.current;
  let currentNode = this.current;
  const result = [];
  do {
    result.push(currentNode.value);
    currentNode = currentNode.next;
  } while (currentNode !== startingNode);
  return result;
}

module.exports = LinkedList;