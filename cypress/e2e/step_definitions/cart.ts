import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

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

// Scenario: Increase product quantity
When("I click the plus button to increase quantity", () => {
  // Store the initial quantity in an alias
  cy.getByDataCy("cart-price-qty")
    .contains("Quantity:")
    .invoke("text")
    .then((text) => {
      const initialQuantity = parseInt(text.replace("Quantity: ", ""));
      cy.wrap(initialQuantity).as("initialQuantity");
    });

  // Click the plus button to increase quantity
  cy.getByDataCy("increase-quantity-button").click();
});

Then("the product quantity should increase by 1", () => {
  cy.get("@initialQuantity").then((initialQuantity) => {
    cy.getByDataCy("cart-price-qty")
      .contains("Quantity:")
      .invoke("text")
      .should((newText) => {
        const newQuantity = parseInt(newText.replace("Quantity: ", ""));
        expect(newQuantity).to.equal(Number(initialQuantity) + 1);
      });
  });
});

// Scenario: Decrease product quantity
Given("I have increased the product quantity", () => {
  cy.getByDataCy("increase-quantity-button").click();

  // Store the starting quantity in an alias
  cy.getByDataCy("cart-price-qty")
    .contains("Quantity:")
    .invoke("text")
    .then((text) => {
      const startingQuantity = parseInt(text.replace("Quantity: ", ""));
      cy.wrap(startingQuantity).as("startingQuantity");
    });
});

When("I click the minus button to decrease quantity", () => {
  cy.getByDataCy("decrease-quantity-button").click();
});

Then("the product quantity should decrease by 1", () => {
  cy.get("@startingQuantity").then((startingQuantity) => {
    cy.getByDataCy("cart-price-qty")
      .contains("Quantity:")
      .invoke("text")
      .should((newText) => {
        const newQuantity = parseInt(newText.replace("Quantity: ", ""));
        expect(newQuantity).to.equal(Number(startingQuantity) - 1);
      });
  });
});

// Scenario: Remove a product from cart
When("I click the trash button to remove the product", () => {
  // Get initial number of items in cart
  cy.getByDataCy("cart-items")
    .invoke("text")
    .then((text) => {
      const initialItems = parseInt(text.replace("Items: ", ""));
      cy.wrap(initialItems).as("initialItems");
    });

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
        .should((newText) => {
          const newItems = parseInt(newText.replace("Items: ", ""));
          expect(newItems).to.equal(Number(initialItems) - 1);
        });
    }
  });
});

// Scenario: Calculate correct total price
Then(
  "the total price should match the product price multiplied by quantity",
  () => {
    // Get price and quantity of the product
    let price;
    let quantity;

    cy.getByDataCy("cart-price-qty")
      .within(() => {
        cy.contains("Price:")
          .invoke("text")
          .then((text) => {
            price = parseFloat(text.replace("Price: ", ""));
          });

        cy.contains("Quantity:")
          .invoke("text")
          .then((text) => {
            quantity = parseInt(text.replace("Quantity: ", ""));
          });
      })
      .then(() => {
        // Verify the total matches price * quantity
        cy.getByDataCy("cart-total")
          .invoke("text")
          .then((text) => {
            const totalText = text.trim();
            const total = parseFloat(totalText.replace("Total: $", ""));

            // Use approximately equal due to potential floating point issues
            expect(total).to.be.closeTo(price * quantity, 0.01);
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
