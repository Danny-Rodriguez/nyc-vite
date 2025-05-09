/// <reference types="cypress" />

// Import the network failures types
import { FailureType } from './network-failures';

// Extend the Cypress namespace to include custom commands
export {}; // This makes the file a module

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Custom command to select DOM element by data-cy attribute
       * @example cy.getByDataCy('greeting')
       */
      getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>
      
      /**
       * Custom command to mock network failures
       * @example cy.mockNetworkFailure('POST', '/api/checkout', { statusCode: 422, reason: 'Invalid Payment Method' }, 'failedCheckout')
       */
      mockNetworkFailure(method: string, url: string, failureType: FailureType, alias?: string): void
    }
  }
}

function getByDataCy(selector: string) {
  return cy.get(`[data-cy="${selector}"]`);
}

Cypress.Commands.add("getByDataCy", getByDataCy);

/**
 * Custom command to mock network failures
 * @param method HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param url URL pattern to intercept
 * @param failureType Type of failure to mock
 * @param alias Optional alias for the intercepted request
 */
function mockNetworkFailure(method: string, url: string, failureType: FailureType, alias?: string) {
  const interceptOptions = {
    method,
    url,
  };

  const handler = {
    statusCode: failureType.statusCode,
    body: failureType.body || { error: failureType.reason || 'Network failure' },
  };

  if (alias) {
    return cy.intercept(interceptOptions, handler).as(alias);
  } else {
    return cy.intercept(interceptOptions, handler);
  }
}

Cypress.Commands.add("mockNetworkFailure", mockNetworkFailure);
