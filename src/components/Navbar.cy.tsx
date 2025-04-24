import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

describe("<Navbar />", () => {
  beforeEach(() => {
    // Set viewport to desktop size by default
    cy.viewport(1024, 768);
  });

  it("renders with empty cart on desktop", () => {
    // Mock function for getCartTotal
    const getCartTotal = cy.stub().returns(0);

    // Mount the component with required props
    // Note: Navbar uses NavLink which requires Router context
    cy.mount(
      <BrowserRouter>
        <Navbar getCartTotal={getCartTotal} />
      </BrowserRouter>
    );

    // Verify the brand is visible
    cy.contains("NEW YORK COLLECTION").should("be.visible");

    // Verify navigation links are present and visible on desktop
    cy.getByDataCy("navbar-links").should("be.visible");
    cy.getByDataCy("nav-link-home").should("be.visible").and("contain", "Home");
    cy.getByDataCy("nav-link-products").should("be.visible").and("contain", "Products");
    cy.getByDataCy("nav-link-about").should("be.visible").and("contain", "About");
    cy.getByDataCy("nav-link-contact").should("be.visible").and("contain", "Contact");

    // Verify cart button shows zero items
    cy.getByDataCy("nav-link-cart").should("be.visible").and("contain", "Cart (0)");
    
    // Verify the getCartTotal function was called
    cy.wrap(getCartTotal).should("have.been.called");
  });

  it("renders with items in cart", () => {
    // Mock function for getCartTotal that returns 3 items
    const getCartTotal = cy.stub().returns(3);

    // Mount the component with required props
    cy.mount(
      <BrowserRouter>
        <Navbar getCartTotal={getCartTotal} />
      </BrowserRouter>
    );

    // Verify cart button shows the correct number of items
    cy.getByDataCy("nav-link-cart").should("be.visible").and("contain", "Cart (3)");
    
    // Verify the getCartTotal function was called
    cy.wrap(getCartTotal).should("have.been.called");
  });

  it("toggles navbar collapse on mobile view", () => {
    // Set viewport to mobile size
    cy.viewport("iphone-6");
    
    const getCartTotal = cy.stub().returns(0);

    // Mount the component
    cy.mount(
      <BrowserRouter>
        <Navbar getCartTotal={getCartTotal} />
      </BrowserRouter>
    );

    // Initially, the navbar should be collapsed
    cy.get("#navbarSupportedContent").should("not.be.visible");
    
    // Brand should still be visible in mobile view
    cy.contains("NEW YORK COLLECTION").should("be.visible");
    
    // Navigation links should exist but not be visible yet
    cy.getByDataCy("navbar-links").should("exist").and("not.be.visible");
    
    // Click the toggle button
    cy.get(".navbar-toggler").should("be.visible").click();
    
    // Now the navbar should be expanded and links should be visible
    cy.get("#navbarSupportedContent").should("be.visible");
    cy.getByDataCy("navbar-links").should("be.visible");
    cy.getByDataCy("nav-link-home").should("be.visible");
    cy.getByDataCy("nav-link-products").should("be.visible");
    cy.getByDataCy("nav-link-about").should("be.visible");
    cy.getByDataCy("nav-link-contact").should("be.visible");
    cy.getByDataCy("nav-link-cart").should("be.visible").and("contain", "Cart (0)");
    
    // Click the toggle button again to collapse
    cy.get(".navbar-toggler").click();
    
    // Now the navbar should be collapsed again
    cy.get("#navbarSupportedContent").should("not.be.visible");
  });
});
