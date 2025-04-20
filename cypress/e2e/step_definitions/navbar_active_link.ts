import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Define the pages for reuse in the step definitions
const pages = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

When("I visit the {string} page", (path: string) => {
  // Visit the path - Cypress will use the baseUrl from cypress.config.ts
  cy.visit(path);
});

Then("the {string} link in the navbar should be highlighted", (label: string) => {
  // Find the navbar link by its text and verify it has the active class
  cy.contains(".nav-link", label)
    .should("exist")
    .should("have.class", "active");
});

Then("other navbar links should not be highlighted", function() {
  // Get the current page label from the active link
  cy.get(".nav-link.active").invoke("text").then((activeLabel) => {
    // All other links should NOT have the active class
    pages
      .filter((page) => page.label !== activeLabel.trim())
      .forEach(({ label: otherLabel }) => {
        cy.contains(".nav-link", otherLabel)
          .should("exist")
          .should("not.have.class", "active");
      });
  });
});
