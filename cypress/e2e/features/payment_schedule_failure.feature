Feature: Payment Schedule Failures
  As a user
  I want to see appropriate error messages when payment scheduling fails
  So that I can understand what went wrong and take appropriate action

  Background:
    Given I am on the products page
    And I add a product to my cart
    And I navigate to the cart page

  Scenario: Invalid Payment Method Error for PostSchedulePayment
    When I attempt to schedule a payment with an invalid payment method
    Then I should see an error message about invalid payment method
