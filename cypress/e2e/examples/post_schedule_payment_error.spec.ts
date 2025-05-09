/// <reference types="cypress" />

// This example demonstrates how to mock a PostSchedulePayment 422 Invalid Payment Method error
// as specified in the requirements

describe('PostSchedulePayment Error Example', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('/');
    
    // Add a product to the cart
    cy.get('[data-cy="add-to-cart-button"]').first().click();
    
    // Navigate to the cart page
    cy.get('[data-cy="cart-link"]').click();
    cy.get('[data-cy="cart-title"]').should('be.visible');
  });

  it('should handle PostSchedulePayment 422 Invalid Payment Method error', () => {
    // Mock the specific PostSchedulePayment endpoint with a 422 error
    // This is the specific scenario mentioned in the requirements:
    // PostSchedulePayment 422 Invalid Payment Method
    cy.intercept('POST', 'http://localhost:3000/checkout', {
      statusCode: 422,
      body: {
        error: 'Invalid Payment Method',
        code: 'INVALID_PAYMENT_METHOD',
        endpoint: 'PostSchedulePayment'
      }
    }).as('postSchedulePaymentError');
    
    // Click the checkout button
    cy.get('[data-cy="checkout-button"]').click();
    
    // Wait for the intercepted request to complete
    cy.wait('@postSchedulePaymentError');
    
    // Check for alert message
    cy.on('window:alert', (text) => {
      expect(text).to.include('There was an error processing your checkout');
    });
  });
});
