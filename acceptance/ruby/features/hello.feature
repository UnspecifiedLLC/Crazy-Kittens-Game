# feature/hello.feature
Feature: Hello
As a user
I want to know what page I am on
So that I dont get confused

Scenario: User sees the welcome message
When I go to the homepage
Then I should see the welcome message