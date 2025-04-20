Feature: Product Detail Page
  As a customer
  I want to view product details
  So that I can make informed purchasing decisions

  Background:
    Given I am on the product detail page for product ID 1

  Scenario: Display product details correctly
    Then the product title should be visible
    And the product price should be visible
    And the product description should be visible
    And the product image should be visible
    And the product rating should be visible

  Scenario: Add product to cart
    When I click the Add to Cart button
    Then the cart count should increase by 1

  Scenario: Navigate to cart page
    When I click the Go to Cart button
    Then I should be redirected to the cart page

  Scenario: Display reviews section
    Then the reviews section should be visible
    And the star ratings should be visible

  Scenario: Handle non-existent product
    When I visit the product detail page for a non-existent product ID 9999
    Then I should see an error message or 404 page
