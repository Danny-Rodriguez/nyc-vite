Feature: Payment Failures
  As a user
  I want to see appropriate error messages when payment fails
  So that I can understand what went wrong and take appropriate action

  Background:
    Given I am on the products page
    And I add a product to my cart
    And I navigate to the cart page

  Scenario: Invalid Payment Method Error
    When I attempt to checkout with an invalid payment method
    Then I should see an error message about invalid payment method

  Scenario: Payment Server Error
    When I attempt to checkout and the payment server is down
    Then I should see an error message about payment server error

  Scenario: Network Connection Error
    When I attempt to checkout and there is a network connection error
    Then I should see an error message about network connection error
