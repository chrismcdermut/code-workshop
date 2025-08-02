const Stack = require('./Stack');

describe('Stack Test', () => {
  const stack1 = new Stack();
  test('testOne', () => {
    const result = stack1.peep();
    const answer = null;
    expect(result).toEqual(answer);
  });

  test('testOne.5', () => {
    const result = stack1.pop();
    const answer = null;
    expect(result).toEqual(answer);
  });


  test('testTwo', () => {
    stack1.push(1);
    // Since items is private, we'll verify by peeking
    const result = stack1.peep();
    const answer = 1;
    expect(result).toEqual(answer);
  });
});

describe('Stack Peep Test', () => {
  const stack1 = new Stack();
  stack1.push(1);
  stack1.push(3);
  stack1.push(4);
  stack1.push(5);
  stack1.push(6);

  test('testOne', () => {
    const result = stack1.peep();
    const answer = 6;
    expect(result).toEqual(answer);
  });
});

describe('Stack Pop Test', () => {
  const stack1 = new Stack();
  stack1.push(1);
  stack1.push(3);
  stack1.push(4);
  stack1.push(5);
  stack1.push(6);

  test('testOne', () => {
    const result = stack1.pop();
    const answer = 6;
    expect(result).toEqual(answer);
  });
});