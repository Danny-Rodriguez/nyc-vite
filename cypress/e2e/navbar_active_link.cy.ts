/// <reference types="cypress" />

describe("Navbar active link highlighting", () => {
  const pages = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  // Make sure the dev server is running before running these tests
  // You can start it with 'npm run dev' in a separate terminal

  pages.forEach(({ path, label }) => {
    it(`highlights "${label}" when on ${path}`, () => {
      // Visit the path - Cypress will use the baseUrl from cypress.config.ts
      cy.visit(path);

      // Find the navbar link by its text
      cy.contains(".nav-link", label)
        .should("exist")
        .should("have.class", "active");

      // All other links should NOT have the active class
      pages
        .filter((page) => page.label !== label)
        .forEach(({ label: otherLabel }) => {
          cy.contains(".nav-link", otherLabel)
            .should("exist")
            .should("not.have.class", "active");
        });
    });
  });
});
