import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Background steps
Given("I am on the products page", () => {
  cy.visit("/products");

  // Wait for products to load
  cy.contains("Latest Products").should("be.visible");
  cy.get(".card").should("have.length.at.least", 1);
});

When("I click Buy Now on the first product", () => {
  cy.get(".card")
    .first()
    .within(() => {
      cy.contains("Buy Now").click();
    });
  // Verify we're on the product details page
  cy.get("h1").should("be.visible");
});

When("I add the product to my cart", () => {
  // Click the Add to Cart button on the product details page
  cy.contains("Add to Cart").click();
});

When("I go to the cart page", () => {
  // Click the Go to Cart button or navigate directly to cart
  cy.contains("Go to Cart").click();
  
  // Verify we're on the cart page
  cy.contains("Cart").should("be.visible");
});

// Scenario: Display added products in the cart
Then("the cart should contain at least one product", () => {
  cy.get(".cartRow").should("have.length.at.least", 1);
});

Then("product details should be displayed correctly", () => {
  cy.get(".cartImg").should("be.visible");
  cy.get(".cartTitle").should("be.visible");
  cy.get(".cartPriceQty").should("contain", "Price:");
  cy.get(".cartPriceQty").should("contain", "Quantity:");
});

// Scenario: Increase product quantity
When("I click the plus button to increase quantity", () => {
  // Store the initial quantity in an alias
  cy.get(".cartPriceQty")
    .contains("Quantity:")
    .invoke("text")
    .then((text) => {
      const initialQuantity = parseInt(text.replace("Quantity: ", ""));
      cy.wrap(initialQuantity).as("initialQuantity");
    });

  // Click the plus button to increase quantity
  cy.get(".countBtns").find(".btn").find(".fa-plus").parent().click();
});

Then("the product quantity should increase by 1", () => {
  cy.get("@initialQuantity").then((initialQuantity) => {
    cy.get(".cartPriceQty")
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
  cy.get(".countBtns").find(".btn").find(".fa-plus").parent().click();

  // Store the starting quantity in an alias
  cy.get(".cartPriceQty")
    .contains("Quantity:")
    .invoke("text")
    .then((text) => {
      const startingQuantity = parseInt(text.replace("Quantity: ", ""));
      cy.wrap(startingQuantity).as("startingQuantity");
    });
});

When("I click the minus button to decrease quantity", () => {
  cy.get(".countBtns").find(".btn").find(".fa-minus").parent().click();
});

Then("the product quantity should decrease by 1", () => {
  cy.get("@startingQuantity").then((startingQuantity) => {
    cy.get(".cartPriceQty")
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
  cy.get(".items")
    .invoke("text")
    .then((text) => {
      const initialItems = parseInt(text.replace("Items: ", ""));
      cy.wrap(initialItems).as("initialItems");
    });

  // Click the trash button to remove the product
  cy.get(".countBtns").find(".btn").find(".fa-trash").parent().click();
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
      cy.get(".items")
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

    cy.get(".cartPriceQty")
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
        cy.get(".total")
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
  cy.contains(".btn", "Clear Cart").click();
});

Then("the cart should be empty", () => {
  cy.contains("Check out the shop and find your style!").should("be.visible");
  cy.get(".cartRow").should("not.exist");
});
