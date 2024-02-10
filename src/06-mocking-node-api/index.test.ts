import path from 'path';
import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from './index';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const cb = () => '';

    doStuffByTimeout(cb, 200);
    expect(spy).toHaveBeenLastCalledWith(cb, 200);
  });

  test('should call callback only after timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();

    expect(spy).not.toHaveBeenCalled();

    doStuffByTimeout(cb, 200);

    expect(spy).toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const cb = () => '';

    doStuffByInterval(cb, 200);
    expect(spy).toHaveBeenLastCalledWith(cb, 200);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const cb = jest.fn();

    expect(spy).not.toHaveBeenCalled();

    doStuffByInterval(cb, 200);
    expect(spy).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(2);

    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('2');

    expect(pathSpy).toHaveBeenCalledWith(__dirname, '2');
  });

  test('should return null if file does not exist', async () => {
    expect(await readFileAsynchronously('2')).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously('index.ts');

    expect(result?.startsWith("import { existsSync } from 'fs';")).toBe(true);
  });
});
