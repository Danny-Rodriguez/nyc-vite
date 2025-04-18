/// <reference types="cypress" />

describe("Product Detail Page", () => {
  beforeEach(() => {
    // Visit a specific product page
    cy.visit("/products/1");

    // Wait for product to load
    cy.contains("Add to Cart").should("be.visible");
  });

  it("displays product details correctly", () => {
    // Check that essential product elements are visible
    cy.get(".display-5").should("exist"); // Title
    cy.get(".display-6").should("exist"); // Price
    cy.get(".lead").should("exist"); // Description

    // Check that the product image is displayed
    cy.get(".card-img-top").should("be.visible");
    
    // Check that the rating is displayed
    cy.get(".fa-star").should("be.visible");
  });

  it("adds product to cart when button is clicked", () => {
    // Get initial cart count from navbar
    cy.get(".navbar")
      .contains(/cart/i)
      .then(($cart) => {
        const matches = $cart.text().match(/\d+/);
        const initialCount = parseInt(matches ? matches[0] : "0");

        // Click Add to Cart button
        cy.contains("Add to Cart").click();

        // Verify cart count increased
        cy.get(".navbar")
          .contains(/cart/i)
          .should(($cartAfter) => {
            const matches = $cartAfter.text().match(/\d+/);
            const newCount = parseInt(matches ? matches[0] : "0");
            expect(newCount).to.equal(initialCount + 1);
          });
      });
  });

  it("navigates to cart page when Go to Cart is clicked", () => {
    cy.contains("Go to Cart").click();
    cy.url().should("include", "/cart");
  });
  
  it("displays reviews section", () => {
    // Check that the reviews component is rendered
    cy.contains(/Reviews|Rating/i).should("be.visible");
    
    // Check that star ratings are displayed
    cy.get(".fa-star").should("be.visible");
  });

  it("handles 404 for non-existent product", () => {
    // Visit a product page with an ID that doesn't exist
    cy.visit("/products/9999", { failOnStatusCode: false });
    
    // Should eventually redirect to 404 page or show error message
    // This depends on how your app handles non-existent products
    cy.get('body').then(($body) => {
      // Wait a bit for any async operations to complete
      cy.wait(2000);
      
      if ($body.find('.display-1').length > 0) {
        // If redirected to 404 page
        cy.get('.display-1').should('contain', '404');
      } else if ($body.find('.loading').length > 0) {
        // If still loading, wait for it to finish
        cy.get('.loading', { timeout: 10000 }).should('not.exist');
        // Then check for error message
        cy.get('body').contains(/not found|error|unavailable/i);
      } else {
        // If showing error on product page
        cy.get('body').contains(/not found|error|unavailable/i);
      }
    });
  });
});
