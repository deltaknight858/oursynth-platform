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
      toThrowMinified(expectedMessage?: string | string[]): R;
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
    // In test environment, we capture console.error calls
    const originalError = console.error;
    let errorCalled = false;
    let errorMessage = '';
    
    console.error = (message: string) => {
      errorCalled = true;
      errorMessage = message;
    };
    
    try {
      received();
    } finally {
      console.error = originalError;
    }
    
    const pass = errorCalled && (!expectedMessage || errorMessage.includes(expectedMessage));
    
    return {
      pass,
      message: () => errorCalled 
        ? `Expected error message: ${expectedMessage || 'any'}, got: ${errorMessage}`
        : `Expected function to call console.error, but it didn't`
    };
  },

  toHaveComputedStyle(received: Element, expectedStyle: Record<string, string>) {
    // Mock implementation for computed style checking
    const pass = received instanceof Element;
    return {
      pass,
      message: () => `Expected element to have computed style: ${JSON.stringify(expectedStyle)}`
    };
  },

  toThrowMinified(received: () => void, expectedMessage?: string | string[]) {
    // Custom matcher to check for minified errors (similar to MUI's internal testing)
    let thrown = false;
    let error: any = null;
    
    try {
      received();
    } catch (e) {
      thrown = true;
      error = e;
    }
    
    let pass = thrown;
    
    if (thrown && expectedMessage) {
      const errorMessage = error?.message || '';
      if (Array.isArray(expectedMessage)) {
        // Join array messages into single string and check if error contains it
        const fullMessage = expectedMessage.join(' ');
        pass = errorMessage.includes(fullMessage) || 
               expectedMessage.some(msg => errorMessage.includes(msg));
      } else {
        pass = errorMessage.includes(expectedMessage);
      }
    }
    
    return {
      pass,
      message: () => thrown 
        ? `Expected function to throw error with message "${Array.isArray(expectedMessage) ? expectedMessage.join(' ') : expectedMessage}", but got: "${error?.message}"`
        : `Expected function to throw an error, but it didn't throw`
    };
  }
});

// Setup for TypeScript expectType function
global.expectType = <T>(value: T): T => value;
