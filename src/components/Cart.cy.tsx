import Cart from "./Cart";
import type { Product } from "../types/Product";

describe("<Cart />", () => {
  it("renders", () => {
    // Mock data and functions for the Cart component
    const mockCart: Product[] = [];

    // Define all required props including getCartTotal as a function
    const props = {
      cart: mockCart,
      addToCart: (_product: Product) => {},
      removeFromCart: (_product: Product) => {},
      clearCart: () => {},
      removeOneFromCart: (_product: Product) => {},
      getCartTotal: () => 2,
    };

    // Mount the component with all required props
    cy.mount(<Cart {...props} />);

    // Basic assertion to verify the component renders
    cy.getByDataCy("cart-title").should("exist");
  });
});
