/// <reference types="cypress" />
/// <reference path="../../support/commands.ts" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

// Common step definitions that can be reused across features

// Products page navigation and loading
Given("I am on the products page", () => {
  cy.visit("/products");

  // Wait for products to load
  cy.getByDataCy("page-title").should("be.visible");
  cy.getByDataCy("product-card").should("have.length.at.least", 1);
});

// Cart navigation and interaction
Given("I add a product to my cart", () => {
  // Click on the first product's "Add to Cart" button
  cy.get('[data-cy="add-to-cart-button"]').first().click();
});

Given("I navigate to the cart page", () => {
  cy.get('[data-cy="cart-link"]').click();
  cy.get('[data-cy="cart-title"]').should("be.visible");
});

// Common error message verification
Then("I should see an error message about invalid payment method", () => {
  // Check for alert message
  cy.on("window:alert", (text) => {
    expect(text).to.include("There was an error processing your checkout");
  });
});

Then("I should see an error message about payment server error", () => {
  // Check for alert message
  cy.on("window:alert", (text) => {
    expect(text).to.include("There was an error processing your checkout");
  });
});

Then("I should see an error message about network connection error", () => {
  // Check for alert message
  cy.on("window:alert", (text) => {
    expect(text).to.include("There was an error processing your checkout");
  });
});
