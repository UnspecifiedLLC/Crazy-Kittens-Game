Feature: Basic gameplay of crazy kittens 

Background: 
	Given I load crazy kittens 
	And I click play 
	
Scenario: Both players are dealt a complete starting hand 
	Then I have 5 cards 
	And the computer has 5 cards 
	
Scenario: Selecting a card shows a card dialog 
	When I select my first card 
	Then I see a card dialog 
	And the dialog includes play instructions 
	And the dialog includes a do action button 
	And the dialog includes a cancel button 
	
Scenario: Cancelling a card play 
	Given I select my first card 
	When I click the cancel button 
	Then the dialog is closed 
	And I can select any card 
	
Scenario: Cancelling a move 
	Given I select my first card 
	And I click the do button 
	When I click cancel move 
	Then I can select any card 
	
Scenario: Trading a card 
	Given I select my first card 
	And I click the do button 
	When I select my second card 
	And I click the do button 
	And I select the opponents first card to steal 
	Then I have 4 cards
	And 	my second card is in the discard pile 
	And the computer has 4 cards 
	And I am prompted to draw a card 
	
Scenario: Drawing a card 
	Given I select my first card 
	And I click the do button 
	And I select my second card 
	And I click the do button 
	And I select the opponents first card to steal
	When I draw a card 
	Then I have 5 cards 
	
#Scenario: Trading the played card is not allowed 
#Scenario: I am dealt a crazy kitten 
#Scenario: I draw a crazy kitten 
