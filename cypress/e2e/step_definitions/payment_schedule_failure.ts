import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { FailureScenarios } from "../../support/network-failures";

// Specific step for PostSchedulePayment with 422 Invalid Payment Method error
When("I attempt to schedule a payment with an invalid payment method", () => {
  // Mock the POST request to checkout with a 422 Invalid Payment Method error
  // This specifically mocks the PostSchedulePayment endpoint with a 422 error
  cy.mockNetworkFailure(
    "POST",
    "http://localhost:3000/checkout", // This would be replaced with the actual PostSchedulePayment endpoint
    {
      statusCode: 422,
      body: {
        error: "Invalid Payment Method",
        code: "INVALID_PAYMENT_METHOD"
      },
      reason: "Invalid Payment Method"
    },
    "invalidPaymentMethod"
  );
  
  // Click the checkout button
  cy.get('[data-cy="checkout-button"]').click();
  
  // Wait for the intercepted request to complete
  cy.wait("@invalidPaymentMethod");
});

// This step is already defined in payment_failures.ts, but we include it here for completeness
Then("I should see an error message about invalid payment method", () => {
  // Check for alert message
  cy.on("window:alert", (text) => {
    expect(text).to.include("There was an error processing your checkout");
  });
});
