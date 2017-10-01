Feature: Page title should change based on whose turn it is

  Scenario: On user turn, title shows user
    Given a game is being played
    When it is the User's Turn
    Then the page title displays Turn: Player
    And the content area also displays Turn: Player
  
  Scenario: On computer turn, title shows computer
    Given a game is being played
    When it is the Computer's Turn
    Then the page title displays Turn: Computer
    And the content area also displays Turn: Computer