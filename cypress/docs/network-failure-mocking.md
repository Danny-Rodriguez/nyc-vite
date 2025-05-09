# Network Failure Mocking in Cypress Tests

## Overview

This document explains how to use the network failure mocking functionality in Cypress tests. This feature allows you to simulate various network failure scenarios, such as server errors, invalid requests, and network connectivity issues, without relying on actual server errors.

## Implementation Details

The network failure mocking functionality is implemented in the following files:

- `cypress/support/network-failures.ts`: Contains the core functionality for mocking network failures
- `cypress/support/commands.ts`: Contains a custom Cypress command for mocking network failures
- `cypress/e2e/examples/network_failures_examples.spec.ts`: Contains examples of how to use the network failure mocking functionality

## Usage

### Method 1: Using the Custom Command

```typescript
cy.mockNetworkFailure(
  'POST',                                 // HTTP method
  'http://localhost:3000/checkout',       // URL to intercept
  FailureScenarios.INVALID_PAYMENT_METHOD, // Predefined failure scenario
  'invalidPaymentMethod'                  // Alias for the intercepted request
);

// Wait for the intercepted request to complete
cy.wait('@invalidPaymentMethod');
```

### Method 2: Using Direct cy.intercept

```typescript
cy.intercept('POST', 'http://localhost:3000/checkout', {
  statusCode: 422,
  body: {
    error: 'Invalid Payment Method',
    code: 'INVALID_PAYMENT_METHOD'
  }
}).as('invalidPaymentMethod');

// Wait for the intercepted request to complete
cy.wait('@invalidPaymentMethod');
```

### Method 3: Using Cucumber Step Definitions

In your feature file:

```gherkin
Scenario: Invalid Payment Method Error
  When I attempt to checkout with an invalid payment method
  Then I should see an error message about invalid payment method
```

In your step definitions file:

```typescript
When("I attempt to checkout with an invalid payment method", () => {
  cy.mockNetworkFailure(
    "POST",
    "http://localhost:3000/checkout",
    FailureScenarios.INVALID_PAYMENT_METHOD,
    "invalidPaymentMethod"
  );
  
  cy.get('[data-cy="checkout-button"]').click();
  cy.wait("@invalidPaymentMethod");
});
```

## Predefined Failure Scenarios

The `FailureScenarios` object in `cypress/support/network-failures.ts` contains predefined failure scenarios that you can use in your tests:

- `INVALID_PAYMENT_METHOD`: 422 error with "Invalid Payment Method" message
- `PAYMENT_DECLINED`: 400 error with "Payment Declined" message
- `PAYMENT_SERVER_ERROR`: 500 error with "Payment Server Error" message
- `SERVER_DOWN`: 503 error with "Service Unavailable" message
- `UNAUTHORIZED`: 401 error with "Unauthorized" message
- `FORBIDDEN`: 403 error with "Forbidden" message
- `NOT_FOUND`: 404 error with "Not Found" message

## Custom Failure Scenarios

You can also create custom failure scenarios:

```typescript
const customFailure = {
  statusCode: 429,
  body: {
    error: 'Too Many Requests',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  reason: 'Rate Limit Exceeded'
};

cy.mockNetworkFailure('GET', '/api/data', customFailure, 'rateLimitExceeded');
```

## Testing Guidelines

1. Use Node server API for general 2xx API calls
2. Use Cypress intercept for non-2xx error scenarios
3. Always include assertions to verify that the application handles the error appropriately
4. Use descriptive aliases for intercepted requests to make tests more readable
5. Remember to wait for intercepted requests to complete using `cy.wait('@aliasName')`

## Notes

- This implementation is a temporary solution until the Node server can handle these scenarios natively
- When using Edge browser for Cypress tests, network interception works better with the local development server at http://localhost:5173
