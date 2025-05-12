Feature: API Network Failure Testing

  Scenario: Handle API network failure gracefully
    Given I am on the home page
    When the API endpoint fails with a network error
    Then I should see an error message
    And the application should not crash
