Feature: Page title should change based on whose turn it is

  Scenario: On user turn, title shows user
    Given a game is being played
    When it is the User's Turn
    Then the content area displays Turn: Player
  	And the page title displays Turn: Player
    
  Scenario: On computer turn, title shows computer
    Given a game is being played
    When the user finishes their turn
    Then it is the Computer's Turn
    And the content area displays Turn: Computer
    And the page title displays Turn: Computer