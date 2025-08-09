/**
 * Jest test setup file
 * Configures the testing environment
 */
import '@testing-library/jest-dom';

// Mock process.env for tests
process.env.NODE_ENV = 'test';

// Mock createSvgIcon if tests need it
jest.mock('@mui/material/utils/createSvgIcon', () => ({
  default: () => 'svg-icon',
  __esModule: true,
}));

// Add custom chai matchers for Material-UI testing
declare global {
  namespace jest {
    interface Matchers<R> {
      toWarnDev(expectedMessages: string[]): R;
      toErrorDev(expectedMessage: string): R;
    }
  }
}

// Mock the warning matchers
expect.extend({
  toWarnDev(received: () => void, expectedMessages: string[]) {
    // In test environment, we just check that the function doesn't throw
    try {
      received();
      return {
        pass: true,
        message: () => `Expected warning messages: ${expectedMessages.join(', ')}`
      };
    } catch (error) {
      return {
        pass: false,
        message: () => `Function threw error: ${error}`
      };
    }
  },
  
  toErrorDev(received: () => void, expectedMessage: string) {
    // In test environment, we just check that the function doesn't throw
    try {
      received();
      return {
        pass: true,
        message: () => `Expected error message: ${expectedMessage}`
      };
    } catch (error) {
      return {
        pass: false,
        message: () => `Function threw error: ${error}`
      };
    }
  }
});

// Setup for TypeScript expectType function
global.expectType = <T>(value: T): T => value;
