Feature: Product Filtering Functionality
  As a customer
  I want to filter products by category
  So that I can find products I'm interested in more easily

  Background:
    Given I am on the products page for filtering

  Scenario: Display all products initially
    When I click the "All" category filter
    Then all products should be displayed

  Scenario: Filter products by Men's Clothing category
    When I click the "Men's Clothing" category filter
    Then products in the Men's Clothing category should be displayed
    And the number of products should change when switching to Women's Clothing

  Scenario: Filter products by Women's Clothing category
    When I click the "Women's Clothing" category filter
    Then products in the Women's Clothing category should be displayed

  Scenario: Filter products by Jewelry category
    When I click the "Jewelry" category filter
    Then products in the Jewelry category should be displayed

  Scenario: Filter products by Electronics category
    When I click the "Electronics" category filter
    Then products in the Electronics category should be displayed

  Scenario: Navigate to product detail
    When I click the Buy Now button on the first product
    Then I should be navigated to the product detail page
