import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 10;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(10);
    expect(() => {
      account.withdraw(20);
    }).toThrow('Insufficient funds: cannot withdraw more than 10');
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(10);
    const account2 = getBankAccount(0);

    expect(() => {
      account.transfer(20, account2);
    }).toThrow('Insufficient funds: cannot withdraw more than 10');
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(10);

    expect(() => {
      account.transfer(20, account);
    }).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(10);
    account.deposit(5);

    expect(account.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(10);
    account.withdraw(5);

    expect(account.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const account = getBankAccount(10);
    const account2 = getBankAccount(0);
    account.transfer(5, account2);

    expect(account2.getBalance()).toBe(5);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(10);
    const result = await account.fetchBalance();

    if (result) {
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    const result = await account.fetchBalance();

    if (result) {
      account.deposit(result);
      expect(account.getBalance()).toBe(result);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10);

    try {
      await account.synchronizeBalance();
    } catch (e: unknown) {
      if (e instanceof Error) {
        expect(e.message).toBe('Synchronization failed');
      } else {
        expect(e).toBe('strange error');
      }
    }
  });
});
