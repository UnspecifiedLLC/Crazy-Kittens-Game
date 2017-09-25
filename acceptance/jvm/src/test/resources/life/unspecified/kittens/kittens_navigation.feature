Feature: Touring the pages of the crazy kittens app

  Scenario: I load the default page of Crazy Kittens
    Given I load crazy kittens 
    And no game is started
    Then I am on the home page
    And I see a play button

  Scenario: I view instructions  
  	Given I load crazy kittens
  	When I click instructions
  	Then I am on the instructions page

  Scenario: I return to the home page after viewing instructions
  	Given I load crazy kittens
  	When I click instructions
  	And I click home
  	Then I am on the home page
  	And I see a play button

  Scenario: I start a game
  	Given I load crazy kittens
  	When I click play
  	Then I am on the game page

  Scenario: I return to the home page after starting a game
  	Given I load crazy kittens
  	When I click play
  	And I click home
  	Then I am on the home page
  	And I see a continue button

  Scenario: I continue a game
  	Given I load crazy kittens
  	When I click play
  	And I click home
  	And I click continue
  	Then I am on the game page



  