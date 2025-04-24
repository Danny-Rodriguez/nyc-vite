import Cart from "./Cart";
import type { Product } from "../types/Product";

describe("<Cart />", () => {
  it("renders empty cart", () => {
    // Mock data and functions for the Cart component
    const mockCart: Product[] = [];

    // Define all required props including getCartTotal as a function
    const props = {
      cart: mockCart,
      addToCart: (_product: Product) => {},
      removeFromCart: (_product: Product) => {},
      clearCart: () => {},
      removeOneFromCart: (_product: Product) => {},
      getCartTotal: () => 0,
    };

    // Mount the component with all required props
    cy.mount(<Cart {...props} />);

    // Basic assertion to verify the component renders
    cy.getByDataCy("cart-title").should("exist");
    
    // Verify empty cart message is displayed
    cy.contains("Check out the shop and find your style!").should("be.visible");
  });

  it("renders cart with products", () => {
    // Mock product data
    const mockProduct: Product = {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack",
      price: 109.99,
      description: "Your perfect pack for everyday use and walks in the forest.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      quantity: 1,
      rating: {
        rate: 3.9,
        count: 120
      }
    };
    
    const mockCart: Product[] = [mockProduct];

    // Define all required props including getCartTotal as a function
    const props = {
      cart: mockCart,
      addToCart: (_product: Product) => {},
      removeFromCart: (_product: Product) => {},
      clearCart: () => {},
      removeOneFromCart: (_product: Product) => {},
      getCartTotal: () => mockCart.length,
    };

    // Mount the component with all required props
    cy.mount(<Cart {...props} />);

    // Verify cart title shows correct item count
    cy.getByDataCy("cart-title").should("contain", "Cart").and("contain", "(1) items");
    
    // Verify product details are displayed
    cy.getByDataCy("cart-image").should("be.visible");
    cy.getByDataCy("cart-title").should("contain", "Fjallraven");
    cy.getByDataCy("cart-price-qty").should("contain", "Price: 109.99").and("contain", "Quantity: 1");
    cy.getByDataCy("cart-total").should("contain", "$109.99");
    
    // Verify buttons are present
    cy.getByDataCy("increase-quantity-button").should("be.visible");
    cy.getByDataCy("decrease-quantity-button").should("be.visible");
    cy.getByDataCy("remove-product-button").should("be.visible");
    cy.getByDataCy("checkout-button").should("be.visible");
    cy.getByDataCy("clear-cart-button").should("be.visible");
  });
});
