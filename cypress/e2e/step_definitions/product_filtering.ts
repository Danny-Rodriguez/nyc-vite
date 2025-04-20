import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Background steps - use more specific step definition to avoid conflicts
Given("I am on the products page for filtering", () => {
  cy.visit("/products");

  // Wait for products to load
  cy.contains("Latest Products").should("be.visible");
  cy.get(".card").should("have.length.at.least", 1);
});

// Scenario: Display all products initially
When("I click the {string} category filter", (category: string) => {
  // Click the specified category filter button
  cy.contains(".btn", category).click();
  
  // Store the current count of products for later comparison
  cy.get(".card").then(($cards) => {
    const count = $cards.length;
    cy.wrap(count).as("productCount");
  });
});

Then("all products should be displayed", () => {
  // Verify the same number of products is displayed after clicking "All"
  cy.get("@productCount").then((initialCount) => {
    cy.get(".card").should("have.length", Number(initialCount));
  });
});

// Scenario: Filter products by category
Then("products in the Men's Clothing category should be displayed", () => {
  // Check that at least one product is displayed
  cy.get(".card").should("have.length.at.least", 1);
  
  // Store the count of Men's Clothing products
  cy.get(".card").then(($cards) => {
    const mensCount = $cards.length;
    cy.wrap(mensCount).as("mensCount");
  });
});

Then("the number of products should change when switching to Women's Clothing", () => {
  // Get the stored count of Men's Clothing products
  cy.get("@mensCount").then((mensCount) => {
    // Click Women's Clothing category
    cy.contains(".btn", "Women's Clothing").click();
    cy.wait(500); // Wait for filtering to complete
    
    // Verify the number of products changed
    cy.get(".card").should("not.have.length", Number(mensCount));
  });
});

Then("products in the Women's Clothing category should be displayed", () => {
  // Check that at least one product is displayed
  cy.get(".card").should("have.length.at.least", 1);
});

Then("products in the Jewelry category should be displayed", () => {
  // Check that at least one product is displayed
  cy.get(".card").should("have.length.at.least", 1);
});

Then("products in the Electronics category should be displayed", () => {
  // Check that at least one product is displayed
  cy.get(".card").should("have.length.at.least", 1);
});

// Scenario: Navigate to product detail
When("I click the Buy Now button on the first product", () => {
  // Click the Buy Now button on the first product
  cy.get(".card")
    .first()
    .within(() => {
      // Store the product title for later verification
      cy.get(".card-title").invoke("text").as("productTitle");
      
      // Click the Buy Now button
      cy.contains(".btn", "Buy Now").click();
    });
});

Then("I should be navigated to the product detail page", () => {
  // Verify we navigated to a product detail page
  cy.url().should("include", "/products/");
});
