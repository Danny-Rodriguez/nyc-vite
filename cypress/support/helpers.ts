/// <reference types="cypress" />

// Make TypeScript recognize the custom getByDataCy command
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>
    }
  }
}

// Helper functions for Cypress tests

/**
 * Extracts the quantity value from the cart price/quantity element
 * and creates a Cypress alias for it
 * @param aliasName The alias name to use for the quantity value
 */
export function getQuantityValue(aliasName = 'quantity') {
  cy.getByDataCy("cart-price-qty")
    .contains("Quantity:")
    .invoke("text")
    .then(text => {
      cy.log(`Quantity text: ${text}`);
      const quantityMatch = text.match(/(\d+)/);
      const quantity = quantityMatch ? parseInt(quantityMatch[0]) : 0;
      cy.log(`Extracted quantity: ${quantity}`);
      cy.wrap(quantity).as(aliasName);
    });
}

/**
 * Extracts the price value from the cart price/quantity element
 * and creates a Cypress alias for it
 * @param aliasName The alias name to use for the price value
 */
export function getPriceValue(aliasName = 'price') {
  cy.getByDataCy("cart-price-qty")
    .contains("Price:")
    .invoke("text")
    .then(text => {
      cy.log(`Price text: ${text}`);
      const priceMatch = text.match(/(\d+(\.\d+)?)/);
      const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
      cy.log(`Extracted price: ${price}`);
      cy.wrap(price).as(aliasName);
    });
}

/**
 * Extracts the total value from the cart total element
 * and creates a Cypress alias for it
 * @param aliasName The alias name to use for the total value
 */
export function getTotalValue(aliasName = 'total') {
  cy.getByDataCy("cart-total")
    .invoke("text")
    .then(text => {
      cy.log(`Total text: ${text}`);
      const totalMatch = text.match(/(\d+(\.\d+)?)/);
      const total = totalMatch ? parseFloat(totalMatch[0]) : 0;
      cy.log(`Extracted total: ${total}`);
      cy.wrap(total).as(aliasName);
    });
}

/**
 * Extracts the number of items from the cart items element
 * and creates a Cypress alias for it
 * @param aliasName The alias name to use for the items count
 */
export function getItemsCount(aliasName = 'itemsCount') {
  cy.getByDataCy("cart-items")
    .invoke("text")
    .then(text => {
      cy.log(`Items text: ${text}`);
      const itemsMatch = text.match(/(\d+)/);
      const itemsCount = itemsMatch ? parseInt(itemsMatch[0]) : 0;
      cy.log(`Extracted items count: ${itemsCount}`);
      cy.wrap(itemsCount).as(aliasName);
    });
}
