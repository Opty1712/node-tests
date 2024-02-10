import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Subtract })).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Multiply })).toBe(6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
  });

  test.each<[unknown, unknown, unknown]>([
    [1, 2, ''],
    [1, 2, undefined],
    [1, 2, null],
    [1, 2, false],
    [1, 2, 'cap'],
    [1, 2, true],
  ])('should return null for invalid action', (a, b, action) => {
    expect(simpleCalculator({ a, b, action })).toBe(null);
  });

  test.each<[unknown, unknown, unknown]>([
    [false, 2, Action.Subtract],
    ['5', 2, Action.Subtract],
    [true, 2, Action.Subtract],
    [{}, 2, Action.Subtract],
    [[], 2, Action.Subtract],
    [null, 2, Action.Subtract],
    [undefined, 2, Action.Subtract],
  ])('should return null for invalid arguments', (a, b, action) => {
    expect(simpleCalculator({ a, b, action })).toBe(null);
  });
});
