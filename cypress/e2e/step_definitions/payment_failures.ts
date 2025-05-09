import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { mockNetworkFailure, FailureScenarios } from "../../support/network-failures";

// Common steps are now in common_steps.ts

// Payment failure scenarios
When("I attempt to checkout with an invalid payment method", () => {
  // Mock the POST request to checkout with a 422 Invalid Payment Method error
  mockNetworkFailure(
    "POST",
    "http://localhost:3000/checkout",
    FailureScenarios.INVALID_PAYMENT_METHOD,
    "invalidPaymentMethod"
  );
  
  // Click the checkout button
  cy.get('[data-cy="checkout-button"]').click();
  
  // Wait for the intercepted request to complete
  cy.wait("@invalidPaymentMethod");
});

When("I attempt to checkout and the payment server is down", () => {
  // Mock the POST request to checkout with a 500 Server Error
  mockNetworkFailure(
    "POST",
    "http://localhost:3000/checkout",
    FailureScenarios.PAYMENT_SERVER_ERROR,
    "paymentServerError"
  );
  
  // Click the checkout button
  cy.get('[data-cy="checkout-button"]').click();
  
  // Wait for the intercepted request to complete
  cy.wait("@paymentServerError");
});

When("I attempt to checkout and there is a network connection error", () => {
  // Mock the POST request to checkout with a 503 Service Unavailable error
  mockNetworkFailure(
    "POST",
    "http://localhost:3000/checkout",
    FailureScenarios.SERVER_DOWN,
    "networkConnectionError"
  );
  
  // Click the checkout button
  cy.get('[data-cy="checkout-button"]').click();
  
  // Wait for the intercepted request to complete
  cy.wait("@networkConnectionError");
});

// Assertions for error messages
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
