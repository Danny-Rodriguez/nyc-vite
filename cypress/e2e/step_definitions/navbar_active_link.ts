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
  // Find the navbar link by data-cy attribute and verify it has the active class
  const navLinkId = `nav-link-${label.toLowerCase()}`;
  cy.getByDataCy(navLinkId)
    .should("exist")
    .should("have.class", "active");
});

Then("other navbar links should not be highlighted", function() {
  // First find the active link
  cy.getByDataCy("navbar-links")
    .find(".active")
    .invoke("text")
    .then((activeLabel) => {
      // All other links should NOT have the active class
      pages
        .filter((page) => page.label !== activeLabel.trim())
        .forEach(({ label: otherLabel }) => {
          const navLinkId = `nav-link-${otherLabel.toLowerCase()}`;
          cy.getByDataCy(navLinkId)
            .should("exist")
            .should("not.have.class", "active");
        });
    });
});
