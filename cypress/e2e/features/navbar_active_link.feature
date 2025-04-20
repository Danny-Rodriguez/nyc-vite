Feature: Navbar Active Link Highlighting
  As a user
  I want to see the current page highlighted in the navigation bar
  So that I can easily identify which page I'm currently on

  Scenario Outline: Highlighting active navbar links
    When I visit the "<page>" page
    Then the "<label>" link in the navbar should be highlighted
    And other navbar links should not be highlighted

    Examples:
      | page     | label    |
      | /        | Home     |
      | /products | Products |
      | /about   | About    |
      | /contact | Contact  |
