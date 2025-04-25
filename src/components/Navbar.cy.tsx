import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

describe("<Navbar />", () => {
  // Common function to mount the Navbar component with the given cart count
  const mountNavbar = (cartCount = 0) => {
    const getCartTotal = cy.stub().returns(cartCount);
    cy.mount(
      <BrowserRouter>
        <Navbar getCartTotal={getCartTotal} />
      </BrowserRouter>
    );
    return getCartTotal;
  };

  // Common function to verify navigation links are visible
  const verifyNavLinksVisible = () => {
    cy.getByDataCy("navbar-links").should("be.visible");
    cy.getByDataCy("nav-link-home").should("be.visible").and("contain", "Home");
    cy.getByDataCy("nav-link-products").should("be.visible").and("contain", "Products");
    cy.getByDataCy("nav-link-about").should("be.visible").and("contain", "About");
    cy.getByDataCy("nav-link-contact").should("be.visible").and("contain", "Contact");
  };

  // Common function to verify brand is visible
  const verifyBrandVisible = () => {
    cy.contains("NEW YORK COLLECTION").should("be.visible");
  };

  beforeEach(() => {
    // Set viewport to desktop size by default
    cy.viewport(1024, 768);
  });

  it("renders with empty cart on desktop", () => {
    const getCartTotal = mountNavbar(0);
    
    // Verify common elements
    verifyBrandVisible();
    verifyNavLinksVisible();

    // Verify cart button shows zero items
    cy.getByDataCy("nav-link-cart").should("be.visible").and("contain", "Cart (0)");
    
    // Verify the getCartTotal function was called
    cy.wrap(getCartTotal).should("have.been.called");
  });

  it("renders with items in cart", () => {
    const getCartTotal = mountNavbar(3);

    // Verify cart button shows the correct number of items
    cy.getByDataCy("nav-link-cart").should("be.visible").and("contain", "Cart (3)");
    
    // Verify the getCartTotal function was called
    cy.wrap(getCartTotal).should("have.been.called");
  });

  it("toggles navbar collapse on mobile view", () => {
    // Set viewport to mobile size
    cy.viewport("iphone-6");
    
    mountNavbar(0);

    // Initially, the navbar should be collapsed
    cy.getByDataCy("navbar-content").should("not.be.visible");
    
    // Brand should still be visible in mobile view
    verifyBrandVisible();
    
    // Navigation links should exist but not be visible yet
    cy.getByDataCy("navbar-links").should("exist").and("not.be.visible");
    
    // Click the toggle button
    cy.getByDataCy("navbar-toggler").should("be.visible").click();
    
    // Now the navbar should be expanded and links should be visible
    cy.getByDataCy("navbar-content").should("be.visible");
    verifyNavLinksVisible();
    cy.getByDataCy("nav-link-cart").should("be.visible").and("contain", "Cart (0)");
    
    // Click the toggle button again to collapse
    cy.getByDataCy("navbar-toggler").click();
    
    // Now the navbar should be collapsed again
    cy.getByDataCy("navbar-content").should("not.be.visible");
  });
});
