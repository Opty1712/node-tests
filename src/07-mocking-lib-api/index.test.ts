import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const get = jest.fn();

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');

  return {
    ...originalModule,
    create: (params: Record<string, string>) => ({ get, ...params }),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    get.mockReturnValue(Promise.resolve({ data: 'data' }));
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('url');
    jest.runAllTimers();

    expect(spy).toHaveReturnedWith({
      get,
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    get.mockImplementation((url: string) =>
      Promise.resolve({ data: 'data', url }),
    );

    await throttledGetDataFromApi('url');
    jest.runAllTimers();

    expect(get).toHaveBeenCalledWith('url');
  });

  test('should return response data', async () => {
    get.mockReturnValue(Promise.resolve({ data: 'data' }));
    expect(await throttledGetDataFromApi('')).toBe('data');
  });
});
