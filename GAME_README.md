# Crazy-Kittens

## Technologies Used

I created a Single Page Application using the following technologies: HTML, CSS,
Bootstrap's modal, Google Fonts, Vanilla JS, and jQuery. I used Git and GitHub
throughout the entire process to version control my web game.

## User Stories in Trello
[Trello](https://trello.com/b/TVMcydaw/crazy-kittens)

## Docker 

### Build
```
docker build . --tag kittens
```

### Run
```
docker run -it -p 8080:8080 kittens
```
```
Starting up http-server, serving .
Available on:
  http://127.0.0.1:8080
  http://172.17.0.2:8080
```

## Crazy-Kittens - The Game

Crazy-Kittens is a turn-based card game where the goal of the game is to stay in
the game: A player leaves the game when he or she draws a Crazy Kitten card but
does not have a Defuse Kitten card to counter the Crazy Kitten.

The actions associated with every card increase the difficulty of the game. For
example, playing two non-action cards simultaneously allows the player to steal
a card, hopefully the Defuse card, from the opponent. Another powerful card is
the Nope card which allows the player to 'Nope' or cancel an action card played
by the opponent. For instance, your opponent has played two non-action cards and
is now trying to steal on of your cards. You can use the Nope card to prevent
that.

## Crazy-Kittens - The Rules

At the beginning of the game, every player receives a total of 5 cards: 4 action
cards and 1 defuse card. The Crazy Kitten cards and the remaining cards are
going to be shuffled to create the Draw Pile. So the only way for a player to
get a Crazy Kitten is by drawing it from the Draw Pile.

Then the first player begins their turn. Every turn consists of 2 phases:
During the first phase the player chooses which card to play from their hand.
After the player has played from their hand, the player places the played cards
onto the Discard Pile and finishes their turn by drawing one card from the Draw
Pile which concludes the second phase of their turn.

Because every player has to draw a new card at the end of their turn, the game
continues until all but one player get terminated by having drawn, and failed to
defuse, a Crazy Kitten.

## Process of Creating the Web Game

I started the process by thinking about what I wanted my Web Game to have and
offer in general. Because I only had a short timeframe to create the game, I
decided to simplify the game rules by reducing the types of actions available
to only the 'use two of your cards to steal one of your opponents'
action. I also decided to make the game a "1-Player vs Computer" game.

Then I drew Wireframes to sketch the outline of my "pages".
Once I had the general outline of what the user should be able to interact with,
I started writing User Stories to pin-point exactly which components and
functionalities my game needs. Once I had the basic User Stories, I actually
went back and refined my Wireframes to better reflect what I discovered while
writing the User Stories.

Then I worked on the Code-Design process: I considered what type of Classes my
game needs and what type of functionality and state each class should have.

I actually started coding the project by creating the general HTML/css frame and
then I started implementing the game functionality.

Throughout the entire process, I went back and refined and changed my user stories.


## The Coding Process

I tried to focus on modularizing my code and functionality and also tried to
follow the Don't Repeat Yourself and Keep it Super Simple principles.

After I had figured out what my MVP has to provide, I sat down and mapped out
how best to organize my code to keep related functionality in one place. For
example, I knew I had to work with cards and decks of cards, so I decided to
create Card and Game IIFEs to ensure scope and organization.

## Future Features

Because all action cards are being considered equal at the moment, I want to add
the remaining actions to the game. The actual game has 7 different actions
available.

I also want to work on providing a better User Experience, i.g. making it more
obvious whose turn it is and what the computer is doing on its turn.

## Bugs

Because I wanted the Computer to go through the exact same motions/functions as
my User, I attached event listeners not only on the User's cards and on the
Draw Pile, but also on the Computer's cards. To ensure that the user can't play
the Computer's cards, I used Boolean Flags to check the identity of the player
on the card-click event.

However, I have not found a way to prevent the User from making a move while the
Computer is moving. This unfortunately results in bugs.

For example, during the computer's turn, the User can click on their own cards
which incorrectly affects the cards being played.


## Biggest Wins And Challenges

My biggest win was being able to have the Computer 'click' on the cards and on
the Display-Cards-Modal to choose the action the Computer has made.

My biggest challenges were code organization: my modules started off small but
as my project progressed, my main.js exploded and I found it challenging to
decide how to manage the state of the game while further splitting my code down
into separate modules.

## Cucumber and Selenium acceptance testing

### Technologies Used
Git
Docker
Maven 
Cucumber

### Setup
  * Install a Git client.
  * Install docker https://docs.docker.com/engine/installation/.
  * Check out the Crazy-Kittens-Game project:<br/>
  `git clone git@github.com:UnspecifiedLLC/Crazy-Kittens-Game.git`
  * Switch to branch acc-test-framework

### Start the application and the Selenium server
Open a terminal session. Navigate to the project root. Run:

`docker-compose -f kittens-compose.yml up`

This will start two containers: 

#### Crazy Kittens
Crazy Kittens should be running locally in a docker container. It's a web application, you should be able to inspect it 
at http://localhost:8080/

#### Selenium Standalone
There should be a Selenium standalone instance also running locaally. Selenium standalone provides a web browser (in this case,
Chrome) that our test implementation can use to interact with Crazy Kittens. You can access the console at 
http://localhost:4444/wd/hub

This terminal session will now show the output of the Selenium server. When you're ready to stop, use ctrl-c to kill the process.

### Run Tests
Open a terminal session. Navigate to the project root. Run:

`docker-compose up`

A transient container instance that will run Maven targets will be started. It will run tests (via Maven targets defined in 
the pom.xml file).  

#### Viewing Results
Results from the last test run are put into `/Crazy-Kittens-Game/acceptance/jvm/target/surefire-reports`. 

### Issues
  * some crufty example code should be cleaned out 
  * could use more tests of the actual gameplay, development of the KittensPage class
  * Acceptance test impl is on a branch, not master; do we want to use branches to implement the 'choices' in the adventure?

