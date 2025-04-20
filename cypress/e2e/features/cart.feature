Feature: Shopping Cart Functionality
  As a customer
  I want to manage items in my shopping cart
  So that I can purchase the products I want

  Background:
    Given I am on the products page
    When I add the first product to my cart
    And I navigate to the cart page

  Scenario: Display added products in the cart
    Then the cart should contain at least one product
    And product details should be displayed correctly

  Scenario: Increase product quantity
    When I click the plus button to increase quantity
    Then the product quantity should increase by 1

  Scenario: Decrease product quantity
    Given I have increased the product quantity
    When I click the minus button to decrease quantity
    Then the product quantity should decrease by 1

  Scenario: Remove a product from cart
    When I click the trash button to remove the product
    Then the product should be removed from the cart

  Scenario: Calculate correct total price
    Then the total price should match the product price multiplied by quantity

  Scenario: Clear the entire cart
    When I click the clear cart button
    Then the cart should be empty
