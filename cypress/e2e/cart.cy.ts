/// <reference types="cypress" />

describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    // Visit the products page to add items to cart
    cy.visit('/products');
    
    // Wait for products to load
    cy.contains('Latest Products').should('be.visible');
    cy.get('.card').should('have.length.at.least', 1);
    
    // Add first product to cart
    cy.get('.card').first().within(() => {
      cy.contains('Add to Cart').click();
    });
    
    // Navigate to cart page
    cy.visit('/cart');
    
    // Verify we're on the cart page
    cy.contains('Cart').should('be.visible');
  });
  
  it('displays added products in the cart', () => {
    // Check that the cart contains at least one product
    cy.get('.cartRow').should('have.length.at.least', 1);
    
    // Verify product details are displayed
    cy.get('.cartImg').should('be.visible');
    cy.get('.cartTitle').should('be.visible');
    cy.get('.cartPriceQty').should('contain', 'Price:');
    cy.get('.cartPriceQty').should('contain', 'Quantity:');
  });
  
  it('allows increasing product quantity', () => {
    // Get initial quantity
    let initialQuantity;
    cy.get('.cartPriceQty').contains('Quantity:').invoke('text').then((text) => {
      initialQuantity = parseInt(text.replace('Quantity: ', ''));
      
      // Click the plus button to increase quantity
      cy.get('.countBtns').contains('.btn', '+').click();
      
      // Verify quantity increased
      cy.get('.cartPriceQty').contains('Quantity:').invoke('text').should((newText) => {
        const newQuantity = parseInt(newText.replace('Quantity: ', ''));
        expect(newQuantity).to.equal(initialQuantity + 1);
      });
    });
  });
  
  it('allows decreasing product quantity', () => {
    // First add one more to ensure we have at least 2 items
    cy.get('.countBtns').contains('.btn', '+').click();
    
    // Get quantity after adding one more
    let startingQuantity;
    cy.get('.cartPriceQty').contains('Quantity:').invoke('text').then((text) => {
      startingQuantity = parseInt(text.replace('Quantity: ', ''));
      
      // Click the minus button to decrease quantity
      cy.get('.countBtns').contains('.btn', '-').click();
      
      // Verify quantity decreased
      cy.get('.cartPriceQty').contains('Quantity:').invoke('text').should((newText) => {
        const newQuantity = parseInt(newText.replace('Quantity: ', ''));
        expect(newQuantity).to.equal(startingQuantity - 1);
      });
    });
  });
  
  it('allows removing a product from cart', () => {
    // Get initial number of items in cart
    cy.get('.items').invoke('text').then((text) => {
      const initialItems = parseInt(text.replace('Items: ', ''));
      
      // Click the trash button to remove the product
      cy.get('.countBtns').contains('.btn', 'trash').click();
      
      // If this was the only item, check for empty cart message
      if (initialItems === 1) {
        cy.contains('Check out the shop and find your style!').should('be.visible');
      } else {
        // Otherwise verify item count decreased
        cy.get('.items').invoke('text').should((newText) => {
          const newItems = parseInt(newText.replace('Items: ', ''));
          expect(newItems).to.equal(initialItems - 1);
        });
      }
    });
  });
  
  it('calculates correct total price', () => {
    // Get price and quantity of the product
    let price;
    let quantity;
    
    cy.get('.cartPriceQty').within(() => {
      cy.contains('Price:').invoke('text').then((text) => {
        price = parseFloat(text.replace('Price: ', ''));
      });
      
      cy.contains('Quantity:').invoke('text').then((text) => {
        quantity = parseInt(text.replace('Quantity: ', ''));
      });
    });
    
    // Verify the total matches price * quantity
    cy.get('.total').invoke('text').then((text) => {
      const totalText = text.trim();
      const total = parseFloat(totalText.replace('Total: $', ''));
      
      // Use approximately equal due to potential floating point issues
      expect(total).to.be.closeTo(price * quantity, 0.01);
    });
  });
  
  it('allows clearing the entire cart', () => {
    // Click the clear cart button
    cy.contains('.btn', 'Clear Cart').click();
    
    // Verify cart is empty
    cy.contains('Check out the shop and find your style!').should('be.visible');
    cy.get('.cartRow').should('not.exist');
  });
});
