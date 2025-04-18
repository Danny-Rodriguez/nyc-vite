/// <reference types="cypress" />

describe("Product filtering functionality", () => {
  beforeEach(() => {
    // Visit the products page before each test
    cy.visit("/products");

    // Wait for products to load
    cy.contains("Latest Products").should("be.visible");
    cy.get(".card").should("have.length.at.least", 1);
  });

  it("displays all products initially", () => {
    // Store the initial count of products
    cy.get(".card").then(($cards) => {
      const initialCount = $cards.length;

      // Click the "All" button (should be already selected, but click again to be sure)
      cy.contains(".btn", "All").click();

      // Verify the same number of products is displayed
      cy.get(".card").should("have.length", initialCount);
    });
  });

  it("filters products by 'Men's Clothing' category", () => {
    // Click the Men's Clothing filter
    cy.contains(".btn", "Men's Clothing").click();

    // Optional if tests flake: Wait for filtering to complete
    // cy.wait(500);

    // Check that at least one product is displayed
    cy.get(".card").should("have.length.at.least", 1);

    // If we had access to the product data, we could verify each product is in the correct category
    // For now, we'll just check that clicking the filter changes the displayed products
    cy.get(".card").then(($cards) => {
      const mensCount = $cards.length;

      // Click a different category
      cy.contains(".btn", "Women's Clothing").click();
      cy.wait(500);

      // Verify the number of products changed
      cy.get(".card").should("not.have.length", mensCount);
    });
  });

  it("filters products by 'Women's Clothing' category", () => {
    // Click the Women's Clothing filter
    cy.contains(".btn", "Women's Clothing").click();

    // Check that at least one product is displayed
    cy.get(".card").should("have.length.at.least", 1);
  });

  it("filters products by 'Jewelry' category", () => {
    // Click the Jewelry filter
    cy.contains(".btn", "Jewelry").click();

    // Check that at least one product is displayed
    cy.get(".card").should("have.length.at.least", 1);
  });

  it("filters products by 'Electronics' category", () => {
    // Click the Electronics filter
    cy.contains(".btn", "Electronics").click();

    // Check that at least one product is displayed
    cy.get(".card").should("have.length.at.least", 1);
  });

  it("navigates to product detail when 'Buy Now' is clicked", () => {
    // Click the Buy Now button on the first product
    cy.get(".card")
      .first()
      .within(() => {
        // Store the product title for later verification
        cy.get(".card-title").invoke("text").as("productTitle");

        // Click the Buy Now button
        cy.contains(".btn", "Buy Now").click();
      });

    // Verify we navigated to a product detail page
    cy.url().should("include", "/products/");
  });
});
