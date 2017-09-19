Feature: I start a game of crazy kittens

  Scenario: Starting a game
    Given I am on the home page
    And no game is started
    When I click play
    Then a game should be started