/// <reference types="cypress" />

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
    }
  }
}

function getByDataCy(selector: string) {
  return cy.get(`[data-cy="${selector}"]`);
}

Cypress.Commands.add("getByDataCy", getByDataCy);
