import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: null, expected: null },
  { a: 3, b: null, action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return null for invalid arguments',
    ({ a, action, b, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
