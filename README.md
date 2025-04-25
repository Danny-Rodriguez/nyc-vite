# NYC Vite - React + TypeScript + Vite with Cypress/Cucumber Testing

## Project Overview

This project demonstrates a React application built with Vite and TypeScript, featuring comprehensive end-to-end testing using Cypress with Cucumber integration. It serves as a learning resource for teams looking to implement Behavior-Driven Development (BDD) testing practices.

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run Cypress tests in interactive mode
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

## Cypress/Cucumber Best Practices

### 1. Project Structure

We follow a well-organized structure for our Cypress/Cucumber implementation:

```
cypress/
  e2e/
    features/           # Gherkin feature files
      cart.feature
      navbar_active_link.feature
      product_detail.feature
    step_definitions/   # Step implementation files
      cart.ts
      common.ts         # Reusable steps across features
      navbar_active_link.ts
      product_detail.ts
  support/
    commands.ts         # Custom Cypress commands
    helpers.ts          # Helper functions
    e2e.ts              # Configuration and global hooks
  fixtures/
    example.json        # Test data
```

### 2. Feature File Best Practices

- **Use descriptive feature titles**: Each feature should clearly describe the functionality being tested
- **Include user stories**: Start with "As a [role], I want [feature] so that [benefit]"
- **Keep scenarios focused**: Each scenario should test one specific behavior
- **Use Background for common steps**: Avoid repetition by using Background for setup steps
- **Use Scenario Outline for data-driven tests**: Test multiple variations with Examples tables

Example:

```gherkin
Feature: Shopping Cart Functionality
  As a customer
  I want to manage items in my shopping cart
  So that I can purchase the products I want

  Background:
    Given I am on the products page
    When I add a product to my cart

  Scenario: Display added products in the cart
    Then the cart should contain the product

  Scenario Outline: Calculate correct price for different quantities
    When I set the quantity to <quantity>
    Then the total price should be <price>

    Examples:
      | quantity | price |
      | 1        | 19.99 |
      | 2        | 39.98 |
```

### 3. Step Definition Best Practices

- **Keep steps reusable**: Write steps that can be reused across scenarios
- **Use parameterization**: Leverage Cucumber's parameter passing for flexible steps
- **Maintain single responsibility**: Each step should do one thing well
- **Use descriptive step names**: Steps should clearly describe the action or assertion
- **Organize by feature**: Group step definitions by feature or functional area
- **Share common steps**: Use a common.ts file for steps used across multiple features

Example:

```typescript
// In common.ts - reusable steps
Given("I am on the products page", () => {
  cy.visit("/products");
  cy.getByDataCy("product-list").should("be.visible");
});

// In cart.ts - feature-specific steps
When("I add a product to my cart", () => {
  cy.getByDataCy("add-to-cart-button").first().click();
  cy.getByDataCy("cart-count").should("not.have.text", "0");
});
```

### 4. Configuration Best Practices

#### cypress-cucumber-preprocessor.config.js

Two main approaches for organizing step definitions:

```javascript
// Option 1: Global step definitions (recommended for smaller projects)
export default {
  nonGlobalStepDefinitions: false,
  stepDefinitions: [
    "cypress/e2e/step_definitions/**/*.{js,ts}",
  ]
}

// Option 2: Feature-specific step definitions
export default {
  nonGlobalStepDefinitions: true,
  stepDefinitions: [
    "cypress/e2e/features/**/*.{js,ts}",
    "cypress/e2e/features/**/*.feature",
  ]
}
```

### 5. Browser Compatibility

For this project, we've found that using Edge browser instead of the default Electron browser provides better connectivity to the local development server at http://localhost:5173.

### 6. Custom Commands and Selectors

- **Use data-cy attributes**: Always use dedicated test attributes instead of CSS classes or IDs
- **Create custom commands**: Encapsulate common test operations in custom commands

Example:

```typescript
// In commands.ts
Cypress.Commands.add("getByDataCy", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

// In tests
cy.getByDataCy("product-card").should("have.length.at.least", 1);
```

### 7. Testing Best Practices

- **Test user flows, not implementation**: Focus on user behaviors rather than implementation details
- **Avoid flaky tests**: Use proper waiting and assertions to handle asynchronous operations
- **Keep tests independent**: Each test should be able to run in isolation
- **Use meaningful assertions**: Assertions should clearly indicate what's being tested
- **Leverage Cypress's retry-ability**: Use assertions that automatically retry until they pass or timeout

## Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)

## Component Testing

### 1. Project Structure

We follow a well-organized structure for our component testing:

```
cypress/
  support/
    component.ts          # Component testing setup
  component/
    Cart.cy.tsx         # Cart component test
    Footer.cy.tsx       # Footer component test
```

### 2. Component Testing Best Practices

- **Isolate components**: Test components in isolation from the application
- **Use custom commands**: Leverage Cypress commands to mount components
- **Test component behavior**: Focus on component behavior rather than implementation
- **Use meaningful assertions**: Assertions should clearly indicate what's being tested
- **Leverage Cypress's retry-ability**: Use assertions that automatically retry until they pass or timeout

Example:

```typescript
// In commands.ts
Cypress.Commands.add("mount", mount);

// In Cart.cy.tsx
it("renders", () => {
  cy.mount(<Cart />);
  cy.getByDataCy("cart-count").should("have.text", "0");
});
```

### 3. Incorporating Styles in Component Tests

- **Import application styles**: All of your application's styles need to be imported in Cypress for components to render correctly
- **Configure styles using Cypress hooks**: Cypress provides two hooks for configuring styles:

  1. An HTML file: `cypress/support/component-index.html`
  2. A JavaScript support file: `cypress/support/component.ts`

- **Mimic your application's setup**: When creating a test environment, always mirror your application's setup:

  - If your app uses `<link>` tags in the `<head>` for fonts or stylesheets, ensure the same tags are in `component-index.html`
  - For styles loaded in your application's `main.ts/js` file, import them in `cypress/support/component.ts`

- **Create a shared setup file**: Consider creating a `src/setup.ts` file that can be reused in both your main application entrypoint and test setup

**Example project structure:**

```
/cypress
  /support
    /component.ts
/src
  /main.ts
  /main.css
  /setup.ts
```

**Example implementation:**

In `cypress/support/component.ts`:

```typescript
// Import application styles
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import "../../src/index.css";

// Import mount function
import { mount } from "cypress/react";

// Register mount command
Cypress.Commands.add("mount", mount);
```

### 4. Troubleshooting

- You may need to restart Cypress when switching from E2E to Component Testing or vice-versa.
