/// <reference types="cypress" />
/// <reference path="../../support/commands.ts" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";

// Common step definitions that can be reused across features

// Products page navigation and loading
Given("I am on the products page", () => {
  cy.visit("/products");

  // Wait for products to load
  cy.getByDataCy("page-title").should("be.visible");
  cy.getByDataCy("product-card").should("have.length.at.least", 1);
});
