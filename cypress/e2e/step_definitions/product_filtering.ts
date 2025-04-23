/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Background steps - use more specific step definition to avoid conflicts
Given("I am on the products page for filtering", () => {
  cy.visit("/products");

  // Wait for products to load
  cy.getByDataCy("page-title").should("be.visible");
  cy.getByDataCy("product-card").should("have.length.at.least", 1);
});

// Scenario: Display all products initially
When("I click the {string} category filter", (category: string) => {
  // Click the specified category filter button
  // Map category name to data-cy attribute
  const categoryMap = {
    All: "filter-all",
    "Men's Clothing": "filter-mens",
    "Women's Clothing": "filter-womens",
    Jewelry: "filter-jewelry",
    Electronics: "filter-electronics",
  };

  cy.getByDataCy(categoryMap[category]).click();

  // Store the current count of products for later comparison
  cy.getByDataCy("product-card").then(($cards) => {
    const count = $cards.length;
    cy.wrap(count).as("productCount");
  });
});

Then("all products should be displayed", () => {
  // Verify the same number of products is displayed after clicking "All"
  cy.get("@productCount").then((initialCount) => {
    cy.getByDataCy("product-card").should("have.length", Number(initialCount));
  });
});

// Scenario: Filter products by category
Then("products in the Men's Clothing category should be displayed", () => {
  // Check that at least one product is displayed
  cy.getByDataCy("product-card").should("have.length.at.least", 1);

  // Store the count of Men's Clothing products
  cy.getByDataCy("product-card").then(($cards) => {
    const mensCount = $cards.length;
    cy.wrap(mensCount).as("mensCount");
  });
});

Then(
  "the number of products should change when switching to Women's Clothing",
  () => {
    // Get the stored count of Men's Clothing products
    cy.get("@mensCount").then((mensCount) => {
      // Click Women's Clothing category
      cy.getByDataCy("filter-womens").click();
      cy.wait(500); // Wait for filtering to complete

      // Verify the number of products changed
      cy.getByDataCy("product-card").should(
        "not.have.length",
        Number(mensCount)
      );
    });
  }
);

Then("products in the Women's Clothing category should be displayed", () => {
  // Check that at least one product is displayed
  cy.getByDataCy("product-card").should("have.length.at.least", 1);
});

Then("products in the Jewelry category should be displayed", () => {
  // Check that at least one product is displayed
  cy.getByDataCy("product-card").should("have.length.at.least", 1);
});

Then("products in the Electronics category should be displayed", () => {
  // Check that at least one product is displayed
  cy.getByDataCy("product-card").should("have.length.at.least", 1);
});

// Scenario: Navigate to product detail
When("I click the Buy Now button on the first product", () => {
  // Click the Buy Now button on the first product
  cy.getByDataCy("product-card")
    .first()
    .within(() => {
      // Store the product title for later verification
      cy.getByDataCy("product-card-title").invoke("text").as("productTitle");

      // Click the Buy Now button
      cy.getByDataCy("buy-now-button").click();
    });
});

Then("I should be navigated to the product detail page", () => {
  // Verify we navigated to a product detail page
  cy.url().should("include", "/products/");
});
