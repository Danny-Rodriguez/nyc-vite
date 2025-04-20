import { Given } from "@badeball/cypress-cucumber-preprocessor";

// Common step definitions that can be reused across features

// Products page navigation and loading
Given("I am on the products page", () => {
  cy.visit("/products");

  // Wait for products to load
  cy.contains("Latest Products").should("be.visible");
  cy.get(".card").should("have.length.at.least", 1);
});
