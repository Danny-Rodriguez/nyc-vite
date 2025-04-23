import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getQuantityValue, getPriceValue, getTotalValue, getItemsCount } from "../../support/helpers";

// Background steps
Given("I am on the products page for cart testing", () => {
  cy.visit("/products");

  // Wait for products to load
  cy.getByDataCy("page-title")
    .should("be.visible")
    .and("contain", "Latest Products");
  cy.getByDataCy("product-card").should("have.length.at.least", 1);
});

When("I click Buy Now on the first product", () => {
  cy.getByDataCy("product-card")
    .first()
    .within(() => {
      cy.getByDataCy("buy-now-button").click();
    });
  // Verify we're on the product details page
  cy.getByDataCy("product-title").should("be.visible");
});

When("I add the product to my cart", () => {
  // Click the Add to Cart button on the product details page
  cy.getByDataCy("add-to-cart-button").click();
});

When("I go to the cart page", () => {
  // Click the Go to Cart button or navigate directly to cart
  cy.getByDataCy("go-to-cart-button").click();

  // Verify we're on the cart page
  cy.getByDataCy("cart-title").should("be.visible").and("contain", "Cart");
});

// Scenario: Display added products in the cart
Then("the cart should contain at least one product", () => {
  cy.getByDataCy("cart-row").should("have.length.at.least", 1);
});

Then("product details should be displayed correctly", () => {
  cy.getByDataCy("cart-image").should("be.visible");
  cy.getByDataCy("cart-title").should("be.visible");
  cy.getByDataCy("cart-price-qty").should("contain", "Price:");
  cy.getByDataCy("cart-price-qty").should("contain", "Quantity:");
});

// Helper functions are now imported from ../../support/helpers

// Scenario: Increase product quantity
When("I click the plus button to increase quantity", () => {
  // Store the initial quantity and click the plus button
  getQuantityValue("initialQuantity");
  cy.getByDataCy("increase-quantity-button").click();
});

Then("the product quantity should increase by 1", () => {
  cy.get("@initialQuantity").then(initialQuantity => {
    // Get the new quantity after clicking the plus button
    getQuantityValue("newQuantity");
    cy.get("@newQuantity").then(newQuantity => {
      expect(newQuantity).to.equal(Number(initialQuantity) + 1);
    });
  });
});

// Scenario: Decrease product quantity
Given("I have increased the product quantity", () => {
  cy.getByDataCy("increase-quantity-button").click();
  
  // Store the starting quantity in an alias
  getQuantityValue("startingQuantity");
});

When("I click the minus button to decrease quantity", () => {
  cy.getByDataCy("decrease-quantity-button").click();
});

Then("the product quantity should decrease by 1", () => {
  cy.get("@startingQuantity").then(startingQuantity => {
    // Get the new quantity after clicking the minus button
    getQuantityValue("newQuantity");
    cy.get("@newQuantity").then(newQuantity => {
      expect(newQuantity).to.equal(Number(startingQuantity) - 1);
    });
  });
});

// Scenario: Remove a product from cart
When("I click the trash button to remove the product", () => {
  // Get initial number of items in cart
  getItemsCount("initialItems");

  // Click the trash button to remove the product
  cy.getByDataCy("remove-product-button").click();
});

Then("the product should be removed from the cart", () => {
  cy.get("@initialItems").then((initialItems) => {
    // If this was the only item, check for empty cart message
    if (Number(initialItems) === 1) {
      cy.contains("Check out the shop and find your style!").should(
        "be.visible"
      );
    } else {
      // Otherwise verify item count decreased
      cy.getByDataCy("cart-items")
        .invoke("text")
        .then((newText) => {
          cy.log(`Items text: ${newText}`);
          // Extract just the number part
          const itemsMatch = newText.match(/(\d+)/);
          const newItems = itemsMatch ? parseInt(itemsMatch[0]) : 0;
          cy.log(`New items count: ${newItems}`);
          cy.log(`Initial items count: ${Number(initialItems)}`);
          expect(newItems).to.equal(Number(initialItems) - 1);
        });
    }
  });
});

// Scenario: Calculate correct total price
Then(
  "the total price should match the product price multiplied by quantity",
  function () {
    // Get price, quantity, and total values using our helper functions
    getPriceValue();
    getQuantityValue();
    getTotalValue();

    // Now use the aliases to perform the calculation and assertion
    cy.get('@price').then(price => {
      cy.get('@quantity').then(quantity => {
        cy.get('@total').then(total => {
          cy.log(`Price: ${price}`);
          cy.log(`Quantity: ${quantity}`);
          cy.log(`Total: ${total}`);
          cy.log(`Expected: ${Number(price) * Number(quantity)}`);
          
          // Use approximately equal due to potential floating point issues
          expect(Number(total)).to.be.closeTo(Number(price) * Number(quantity), 0.01);
        });
      });
    });
  }
);

// Scenario: Clear the entire cart
When("I click the clear cart button", () => {
  cy.getByDataCy("clear-cart-button").click();
});

Then("the cart should be empty", () => {
  cy.contains("Check out the shop and find your style!").should("be.visible");
  cy.getByDataCy("cart-row").should("not.exist");
});
