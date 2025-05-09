# Network Failure Mocking in Cypress Tests

## Overview

This document explains how to use the network failure mocking functionality in Cypress tests, with a specific focus on the PostSchedulePayment 422 Invalid Payment Method error scenario.

## Implementation Details

The network failure mocking functionality is implemented in the following files:

- `cypress/support/network-failures.ts`: Contains the core functionality for mocking network failures
- `cypress/support/commands.ts`: Contains a custom Cypress command for mocking network failures
- `cypress/e2e/examples/network_failures_examples.spec.ts`: Contains examples of how to use the network failure mocking functionality
- `cypress/e2e/examples/post_schedule_payment_error.spec.ts`: Contains a specific example for the PostSchedulePayment 422 error

## PostSchedulePayment 422 Error Example

Here's how to mock the specific PostSchedulePayment 422 Invalid Payment Method error scenario:

```typescript
// Method 1: Using the custom command
cy.mockNetworkFailure(
  'POST',
  'http://localhost:3000/checkout', // Replace with your actual endpoint
  FailureScenarios.POST_SCHEDULE_PAYMENT_INVALID_METHOD,
  'postSchedulePaymentError'
);

// Method 2: Using direct cy.intercept
cy.intercept('POST', 'http://localhost:3000/checkout', {
  statusCode: 422,
  body: {
    error: 'Invalid Payment Method',
    code: 'INVALID_PAYMENT_METHOD',
    endpoint: 'PostSchedulePayment'
  }
}).as('postSchedulePaymentError');
```

## Usage Guidelines

1. Use Node server API for general 2xx API calls
2. For anything other than 2xx responses, use Cypress intercept as shown above
3. The implementation follows the requirement to mock network failures for testing error scenarios

## Running the Example

To run the specific PostSchedulePayment error example:

```bash
npx cypress open --e2e --browser edge
```

Then select the `post_schedule_payment_error.spec.ts` file to run the test.

## Notes

- This implementation is a temporary solution until the Node server can handle these scenarios natively
- When using Edge browser for Cypress tests, network interception works better with the local development server at http://localhost:5173
