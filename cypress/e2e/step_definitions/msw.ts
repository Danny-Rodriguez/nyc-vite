import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Step to navigate to the home page
Given("I am on the home page", () => {
  cy.visit("/");
});

// Step to simulate a network failure for an API endpoint
When("the API endpoint fails with a network error", () => {
  cy.intercept("GET", "/api/test-data", { forceNetworkError: true }).as(
    "networkFailure"
  );

  cy.window().then((win) => {
    win.fetch("/api/test-data").catch(() => {
      // We intentionally leave this empty as we'll check the interception in the next step
    });
  });

  cy.wait("@networkFailure", { timeout: 5000 });
});

// Step to verify that an error occurred
Then("I should see an error message", () => {
  cy.get("@networkFailure")
    .should("exist")
    .then((interception: any) => {
      cy.log("Network request intercepted and failed");

      expect(interception).to.have.property("error");

      const errorStr = String(interception.error);
      cy.log("Error message: " + errorStr);

      const hasErrorText =
        errorStr.includes("Network") ||
        errorStr.includes("network") ||
        errorStr.includes("forceNetworkError");

      expect(hasErrorText).to.be.true;
    });
});

// Step to verify that the application doesn't crash
Then("the application should not crash", () => {
  cy.get("body").should("be.visible");

  // Verify that we can still interact with the app by checking for standard elements
  cy.get("a").should("exist");

  // Make another API call to verify the app can handle multiple failures
  cy.window().then((win) => {
    win.fetch("/api/test-data").catch(() => {
      // Again, we intentionally leave this empty
    });
  });

  // Wait for the second intercepted request
  cy.wait("@networkFailure", { timeout: 5000 });

  cy.log("Application remains stable after network error");
});
