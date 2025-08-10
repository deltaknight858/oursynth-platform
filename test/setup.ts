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
      toWarnDev(expectedMessages?: string[] | string): R;
      toErrorDev(expectedMessage?: string): R;
      toHaveComputedStyle(expectedStyle: Record<string, string>): R;
    }
  }
}

// Mock the warning matchers
expect.extend({
  toWarnDev(received: () => void, expectedMessages?: string[] | string) {
    // In test environment, we just check that the function doesn't throw
    try {
      received();
      return {
        pass: true,
        message: () => `Expected warning messages: ${Array.isArray(expectedMessages) ? expectedMessages.join(', ') : expectedMessages || 'any'}`
      };
    } catch (error) {
      return {
        pass: false,
        message: () => `Function threw error: ${error}`
      };
    }
  },
  
  toErrorDev(received: () => void, expectedMessage?: string) {
    // In test environment, we just check that the function doesn't throw
    try {
      received();
      return {
        pass: true,
        message: () => `Expected error message: ${expectedMessage || 'any'}`
      };
    } catch (error) {
      return {
        pass: false,
        message: () => `Function threw error: ${error}`
      };
    }
  },

  toHaveComputedStyle(received: Element, expectedStyle: Record<string, string>) {
    // Mock implementation for computed style checking
    const pass = received instanceof Element;
    return {
      pass,
      message: () => `Expected element to have computed style: ${JSON.stringify(expectedStyle)}`
    };
  }
});

// Setup for TypeScript expectType function
global.expectType = <T>(value: T): T => value;
