/**
 * Network failure mocking utility for Cypress tests
 * 
 * This utility provides functions to mock network failures in Cypress tests
 * using cy.intercept(). It allows testing error handling and failure scenarios
 * without relying on actual server errors.
 */

/**
 * Types of network failures that can be mocked
 */
export type FailureType = {
  statusCode: number;
  body?: any;
  reason?: string;
};

/**
 * Mock a network failure for a specific endpoint
 * 
 * @param method HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param url URL pattern to intercept
 * @param failureType Type of failure to mock
 * @param alias Optional alias for the intercepted request
 */
export const mockNetworkFailure = (
  method: string,
  url: string,
  failureType: FailureType,
  alias?: string
): void => {
  const interceptOptions = {
    method,
    url,
  };

  const handler = {
    statusCode: failureType.statusCode,
    body: failureType.body || { error: failureType.reason || 'Network failure' },
  };

  if (alias) {
    cy.intercept(interceptOptions, handler).as(alias);
  } else {
    cy.intercept(interceptOptions, handler);
  }
};

/**
 * Predefined failure scenarios
 */
export const FailureScenarios = {
  // Payment failures
  INVALID_PAYMENT_METHOD: {
    statusCode: 422,
    body: {
      error: 'Invalid Payment Method',
      code: 'INVALID_PAYMENT_METHOD'
    },
    reason: 'Invalid Payment Method'
  },
  // Specific implementation for PostSchedulePayment 422 error
  POST_SCHEDULE_PAYMENT_INVALID_METHOD: {
    statusCode: 422,
    body: {
      error: 'Invalid Payment Method',
      code: 'INVALID_PAYMENT_METHOD',
      endpoint: 'PostSchedulePayment'
    },
    reason: 'Invalid Payment Method'
  },
  PAYMENT_DECLINED: {
    statusCode: 400,
    body: {
      error: 'Payment Declined',
      code: 'PAYMENT_DECLINED'
    },
    reason: 'Payment Declined'
  },
  PAYMENT_SERVER_ERROR: {
    statusCode: 500,
    body: {
      error: 'Payment Server Error',
      code: 'PAYMENT_SERVER_ERROR'
    },
    reason: 'Payment Server Error'
  },
  
  // General failures
  SERVER_DOWN: {
    statusCode: 503,
    body: {
      error: 'Service Unavailable',
      code: 'SERVICE_UNAVAILABLE'
    },
    reason: 'Service Unavailable'
  },
  UNAUTHORIZED: {
    statusCode: 401,
    body: {
      error: 'Unauthorized',
      code: 'UNAUTHORIZED'
    },
    reason: 'Unauthorized'
  },
  FORBIDDEN: {
    statusCode: 403,
    body: {
      error: 'Forbidden',
      code: 'FORBIDDEN'
    },
    reason: 'Forbidden'
  },
  NOT_FOUND: {
    statusCode: 404,
    body: {
      error: 'Not Found',
      code: 'NOT_FOUND'
    },
    reason: 'Not Found'
  }
};
