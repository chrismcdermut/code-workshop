class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // puts new item on top of the stack
  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | null {
    // TODO: consolidate return
    if (!this.items.length) {
      return null;
    }
    return this.items.pop()!;
  }

  peep(): T | null {
    if (!this.items.length) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
}

export = Stack;