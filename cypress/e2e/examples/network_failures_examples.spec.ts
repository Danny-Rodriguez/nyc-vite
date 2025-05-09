/// <reference types="cypress" />

// Import the network failures utility
import { FailureScenarios } from "../../support/network-failures";

describe('Network Failures Examples', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
    
    // Add a product to the cart
    cy.get('[data-cy="add-to-cart-button"]').first().click();
    
    // Navigate to the cart page
    cy.get('[data-cy="cart-link"]').click();
    cy.get('[data-cy="cart-title"]').should('be.visible');
  });

  it('should handle invalid payment method (422) error', () => {
    // Method 1: Using the custom command
    cy.mockNetworkFailure(
      'POST',
      'http://localhost:3000/checkout',
      FailureScenarios.INVALID_PAYMENT_METHOD,
      'invalidPaymentMethod'
    );
    
    // Click the checkout button
    cy.get('[data-cy="checkout-button"]').click();
    
    // Wait for the intercepted request to complete
    cy.wait('@invalidPaymentMethod');
    
    // Check for alert message
    cy.on('window:alert', (text) => {
      expect(text).to.include('There was an error processing your checkout');
    });
  });

  it('should handle payment server (500) error', () => {
    // Method 2: Using direct cy.intercept
    cy.intercept('POST', 'http://localhost:3000/checkout', {
      statusCode: 500,
      body: {
        error: 'Payment Server Error',
        code: 'PAYMENT_SERVER_ERROR'
      }
    }).as('paymentServerError');
    
    // Click the checkout button
    cy.get('[data-cy="checkout-button"]').click();
    
    // Wait for the intercepted request to complete
    cy.wait('@paymentServerError');
    
    // Check for alert message
    cy.on('window:alert', (text) => {
      expect(text).to.include('There was an error processing your checkout');
    });
  });

  it('should handle network connection (503) error', () => {
    // Method 3: Using predefined failure scenarios
    cy.mockNetworkFailure(
      'POST',
      'http://localhost:3000/checkout',
      FailureScenarios.SERVER_DOWN,
      'networkConnectionError'
    );
    
    // Click the checkout button
    cy.get('[data-cy="checkout-button"]').click();
    
    // Wait for the intercepted request to complete
    cy.wait('@networkConnectionError');
    
    // Check for alert message
    cy.on('window:alert', (text) => {
      expect(text).to.include('There was an error processing your checkout');
    });
  });

  // Example of the specific PostSchedulePayment 422 error from requirements
  it('should handle PostSchedulePayment 422 Invalid Payment Method error', () => {
    // Mock the specific PostSchedulePayment endpoint with a 422 error
    cy.intercept('POST', 'http://localhost:3000/checkout', {
      statusCode: 422,
      body: {
        error: 'Invalid Payment Method',
        code: 'INVALID_PAYMENT_METHOD'
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
