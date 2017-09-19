Feature: External Page

  Scenario: a Google search
    Given I open website http://google.com
    When I search for kittens
    Then I should see search results for kittens