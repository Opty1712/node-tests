import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(['a'])).toStrictEqual({
      next: { next: null, value: null },
      value: 'a',
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const tree = generateLinkedList(['b']);

    expect(tree).toMatchSnapshot();
  });
});
