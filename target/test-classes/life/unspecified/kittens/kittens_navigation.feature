Feature: Touring the pages of the crazy kittens app

  Scenario: I load the default page of Crazy Kittens
    Given I load crazy kittens 
    Then I am on the home page
    And no game is started
    And I see a play button

  Scenario: Instructions are available on home page 
  	Given I load crazy kittens
  	When I click instructions
  	Then the instructions are displayed

  Scenario: Instructions can be reviewed before starting a game
  	Given I load crazy kittens
    When I see an instructions link
  	And I click instructions
  	And I click home
  	Then I am on the home page
  	And I see a play button

  Scenario: Clicking Play starts the game
  	Given I load crazy kittens
  	When I click play
  	Then I am on the game page

  Scenario: Instructions can be reviewed after starting a game
  	Given I load crazy kittens
  	When I click play
  	And I click home
  	Then I am on the home page
    And I see an instructions link
  	And I see a continue button

  Scenario: Clicking continue resumes a game in progress
  	Given I load crazy kittens
  	When I click play
  	And I click home
  	And I click continue
  	Then I am on the game page



  