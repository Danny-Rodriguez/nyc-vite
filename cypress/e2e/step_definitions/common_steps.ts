import { Given } from "@badeball/cypress-cucumber-preprocessor";

// Common steps used across multiple feature files
Given("I am on the products page", () => {
  cy.visit("/");
});

Given("I add a product to my cart", () => {
  // Click on the first product's "Add to Cart" button
  cy.get('[data-cy="add-to-cart-button"]').first().click();
});

Given("I navigate to the cart page", () => {
  cy.get('[data-cy="cart-link"]').click();
  cy.get('[data-cy="cart-title"]').should("be.visible");
});
