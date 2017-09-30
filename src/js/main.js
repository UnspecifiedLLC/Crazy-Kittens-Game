console.log("loaded");

// Global Variables:
let $playButton;
let $main = $('.main-index');
let $title = $('#title');
let $modalSubmit = $('#modal-submit');
let $gameNoteField;
let $modal = $('#modal');
let activeCards = [];
let $modalCancel = $('#modal-cancel');
let $link = $('#title-link');


// on-click listener for navigation bar link
$link.on('click', function() {
  if ($(this).text() == "Instructions") {
    console.log("Need to open the Instructions");
    loadInstructionMain();
  } else {
    $title.text("Welcome to Crazy Kittens");
    $(this).text("Instructions").css('margin-left', '575px');
    loadIndexMain();
  }
});

// on-click listener for cancel-modal button
$modalCancel.on('click', function() {
  if (Turn.player) {
    // it's the user's turn
    let activeCard = activeCards.pop();
    if (activeCard.action == "regular" && Game.usersTradeCount == 0) {
      $('#tradeDiv').css('visibility', 'hidden');
    }

  }
});

/*
  on-click listener for submit-modal button
  The modal displays the currently selected card. By clicking the submit button,
  the player indicates that they want to perform the action indicated on the card

  This event listener determines, depending on the current player's step, which
  action to perform
*/
$modalSubmit.on('click', function() {
  if (Turn.player) {
    // it's the user's turn

    // if we submitted a regular card or a defuse card AND it is already the second card
        if ((activeCards[0].action == "regular" || activeCards[0].action == "defuse") && Game.usersTradeCount == 1) {
          // now we're allowed to take a card from the computer

              // the user cannot reuse the same card to perform the action
              if ( !areCardsEqual(activeCards[0], activeCards[1]) ) {
                Game.usersTradeCount = 0;
                $('#game-step').text("Steal one of your opponent's cards");

                // this allows the user to advance to the steal-oppenents card step
                Turn.step = 2;

                // hiding the cancel-trade-div button since the user is about to
                // steal a card from the opponent
                $('#tradeDiv').css('visibility', 'hidden');

              } else {
                // if the user tried to reuse the same card to perform the action,
                // we need to remove the last card-submission from
                // the history / activeCards array
                $gameNoteField.text("..sorry, can't select the same card twice!. Try again.");
                activeCards.pop();
              }

        } else if ( (activeCards[0].action == "regular" || activeCards[0].action == "defuse")  && Game.usersTradeCount != 1) {
                // we need to wait for a second regular card to be selected before we can
                // steal a card from the computer
                Game.usersTradeCount = 1;

                // this div allows the user to cancel the current card-action selection
                addGettingReadyToTradeDiv();

        } else {
                console.log(activeCards);
                alert("Error, in modal submit. card: ", activeCards[0].action );
        }

    //the computer's turn
  }else{
        if(activeCards.length == 1){
          // if the computer has only selected one card so far, the computer needs
          // to select another card before the computer can perform the action


          startComputersTurn(1);
        }else{
          // here the computer has just submitted a second card and is ready
          // to steal a card from the user

          Game.usersTradeCount = 0;
          $('#game-step').text("Steal one of your opponent's cards");

          // advances the player to the 'steal a card from opponent step'
          Turn.step = 2;

          $('#tradeDiv').css('visibility', 'hidden');

          setTimeout(function(){
            console.log("Computer is about to call computerPickCardToBeStolen");
            computerPickCardToBeStolen();
          }, 2000);
        }
  }

});

function onImageClick(playerCards, $me){
  // need to make sure it's our turn

  let cardOwner = $me.data('data-player');
  let gameTurnField = $('#game-turn');
  let gameStepField = $('#game-step');

  $gameNoteField.text("");
  $('#modal-instructions').text("");

  if(Turn.player){
    // this means it's the user's turn
    if(Turn.step == 0){
      performStepOne($gameNoteField, $me, Game.usersDeck, cardOwner);

    }else if(Turn.step == 1 || Turn.step == 3){
      // need to draw from draw pile
      if(cardOwner != 2){
        $gameNoteField.text("You must draw from the draw pile!");
        return;
      }

      let newCard = playerCards.pop();
      newCard.id = Game.usersDeck.length;

      let hadADefuse = 0;
      if(newCard.action == 'crazy'){
        hadADefuse = lookForDefuseCard(Game.usersDeck, Turn.player);

        if(hadADefuse){
          // we're still in the game
          if(Game.compsDeck.length < 2){
            /*
              The user's turn is about to start: if the user has less than 2 cards,
              the user can only draw a card during their turn
            */
            determineIfPlayerNeedsToFinishTurnByDrawing(Turn.player, Game.compsDeck, gameStepField, gameTurnField);
          }else{
            //trigger computer's turn
            gameTurnField.text('Turn: Computer');
            gameStepField.text('Select one of your own cards, computer');

            // indicating that it is the computer's turn
            Turn.step = 0;
            Turn.player = 0;
            startComputersTurn(0);
          }
        }else{
          // we've lost
          buildGameOverScreen(Turn.player);
        }
      }else{
        // the new card was not a Crazy Kitten
        console.log("new card: ", newCard);
        Game.usersDeck.push(newCard);
        addCardSection("player", Game.usersDeck);
        if(Game.compsDeck.length < 2){
          /*
            The user's turn is about to start: if the user has less than 2 cards,
            the user can only draw a card during their turn
          */
          determineIfPlayerNeedsToFinishTurnByDrawing(Turn.player, Game.compsDeck, gameStepField, gameTurnField);
        }else{
          gameTurnField.text('Turn: Computer');
          gameStepField.text('Select one of your own cards, computer');

          // indicating that it is the computer's turn
          Turn.step = 0;
          Turn.player = 0;

          //trigger computer's turn
          startComputersTurn(0);
        }
      }
    }else if(Turn.step == 2){
      performStepTwo(cardOwner, $gameNoteField, gameStepField, $me, Game.usersDeck, Game.compsDeck);
    }


    // this means it's the computer's turn
  }else{
    if(Turn.step == 0){
      // loads the clicked card into the modal and adds the chosen to activeCards
      performStepOne($gameNoteField, $me, Game.compsDeck, cardOwner);

      setTimeout(function(){
        $modalSubmit.click();
      }, 2000);

      // computer is about to steal the user's card
    }else if(Turn.step == 2){

      console.log("The computer is about to call performStepTwo");
      performStepTwo(cardOwner, $gameNoteField, gameStepField, $me, Game.compsDeck, Game.usersDeck);

      setTimeout(function(){
        makeComputerDrawFromDrawPile(Game.drawPile, gameTurnField, gameStepField);
      }, 2000);

    }
  }
}

/*
  Removes the html content from the main section
*/
function clearMain() {
  $main.empty();
  $main.removeClass();
}

/*
  Adds the basic html for the home page.
*/
function loadIndexMain() {
  clearMain();
  $main.addClass('main-index');

  let div = $('<div>').addClass('info');
  let section = $('<section>');
  let h2 = $('<h2>').text('In a nutshell');
  let h3 = $('<h3>').text('If the Crazy Kitten gets you, you lose.');
  let h3_2 = $('<h3>').text('If you can avert the Crazy Kitten, you win.');
  let h3_3 = $('<h3>').text('Increase your chance of winning by using the other Kitten cards wisely.');

  section.append(h2).append(h3).append(h3_2).append(h3_3);
  div.append(section);

  let img = $('<img>').attr('src', 'images/crazy.png');
  div.append(img);

  $main.append(div);

  if(Game.inPlay){
    $playButton = $('<button>').attr('id', 'play').text('Continue');
  }else{
    $playButton = $('<button>').attr('id', 'play').text('Play');
  }
  $main.append($playButton);

  $playButton.on('click', function() {
    console.log(`clicked the play button`);
    loadGameMain();
  });
}

/*
  Adds the basic html for the game 'page'
  This first removes everything from the main section and then adds
  the computer's card table, the draw and discard piles, and lastly the
  user's cards table.
*/
function loadGameMain() {
  $title.text("Crazy Kittens");

  $link.text("Home").css('margin-left', '315px');

  clearMain();
  $main.addClass('main-game');

  // we only want to set up the game and dispense the initial cards once
  if(!Game.inPlay){
    Game.setUpGame();
  }
  Game.inPlay++;

  addCardSection("computer", Game.compsDeck);
  addDrawDiscardPiles();
  addCardSection("user", Game.usersDeck);
}

/*
  Adds the basic html for the instructions 'page'
*/
function loadInstructionMain() {
  $title.text("Welcome to Crazy Kittens");
  $link.text("Home").css('margin-left', '657px');
  // $link.text("Home").css('margin-left', '315px');

  clearMain();
  $main.addClass('main-index');

  let $sectionSetUp = $('<section>').attr('id', 'setup');
  let h2 = $('<h2>').text("Setup");
  let p1 = $('<p>').text("At the beginning of the game, every player receives a total of 5 cards: 4 action cards and 1 defuse card. The Crazy Kitten cards and the remaining cards are going to be shuffled to create the Draw Pile. So the only way for a player to get a Crazy Kitten is by drawing it from the Draw Pile.");

  $sectionSetUp.append(h2).append(p1);
  let $sectionTurn = $('<section>').attr('id', 'turn');
  let turnH2 = $('<h2>').text("Turn");

  let p2 = $('<p>').text("Every turn consists of 2 phases: During the first phase the player chooses which card to play from their hand. After the player has played from their hand, the player places the played cards onto the Discard Pile and finishes their turn by drawing one card from the Draw Pile which concludes the second phase of their turn.");
  $sectionTurn.append(turnH2).append(p2);

  $main.append($sectionSetUp);
  $main.append($sectionTurn);

}



/*
  adds images for the given player
*/
function addCardSection(player, playerCards) {
  if (player == "computer") {
    // we need to display the cards facedown.
    addImages("computer-section", "computer-table", playerCards, 0);

  } else {
    // we need to display the face value
    addImages("user-section", "user-table", playerCards, 1);

  }
}

/*
  For every card inside the playerCards array, we create an image and add it
  to the provided section.
*/
function addImages(section, table, playerCards, player){
  let $section = $('<section>');
  let $div = $('<div>');

  $(`#${section}`).remove();

  $section.addClass('game-section').attr('id', `${section}`);
  $div.attr('id', `${table}`);

  for (let i = 0; i < playerCards.length; i++) {
    let $img = $('<img>');
    if(!player){
      $img.attr('src', playerCards[i].down);
    }else{
      $img.attr('src', playerCards[i].face);
    }
      $img.attr('alt', playerCards[i].face)
        .attr('title', "")
        .data('data-action', playerCards[i].action);
      $img.data('data-card-index', playerCards[i].id);

      $img.data('data-player', player);

    $img.on('click', function(){
      onImageClick(playerCards, $(this));
    });
    $div.append($img);
  }

  $section.append($div);
  if(!player){
    $main.prepend($section);
  }else{
    $main.append($section);
  }
}

/*
  Creates the
  Passes in the current player value
    If player == 1, then it means the user has lost
    If player == 0, then it means the user has won
*/
function buildGameOverScreen(user){
  clearMain();

  $main.addClass('main-game-over');

  let $img = $('<img>').attr('src', 'images/crazyKittenLogo.jpeg');
  let $p = $('<p>');
  if(user){
    $p.text("You lose").addClass('lose');
  }else{
    $p.text("You win").addClass('win');
  }

  let $div = $('<div>').append($img).append($p);

  $main.append($div);
}

/*
  This div with its button will allow the user to cancel their card/action submission
*/
function addGettingReadyToTradeDiv() {
  if ($('#tradeDiv').length == 0) {
    let tradeDiv = $('<div>').attr('id', 'tradeDiv');
    let button = $('<button>').text("Cancel Move");

    button.on('click', function() {
      //need to cancel the regular action move and remove this div

      // indicating that the user has not already selected a regular card for trade
      activeCards = [];
      Game.usersTradeCount = 0;
      $gameNoteField.text("");
      $('#tradeDiv').css('visibility', 'hidden');

    });
    let p = $('<p>').text("..getting ready to trade");
    tradeDiv.append(button).append(p);
    $('#drawPileDiv').append(tradeDiv);
  } else {
    $('#tradeDiv').css('visibility', '');
  }
}

/*
  Adds the Draw Pile and Discard Pile images to our game-main.
  Also adds the click-listeners for the Draw Pile images
*/
function addDrawDiscardPiles() {

  let $mainDiv = $('<div>').attr('id', 'drawPileDiv').addClass('drawPile');
  let $div = $('<div>').attr('id', 'game-status-instructions');

  let $turn = null;


  if(Game.turn){
    $turn = $('<p>').attr('id', 'game-turn').text("Turn: You");
  }else{
    $turn = $('<p>').attr('id', 'game-turn').text("Turn: Computer");
  }
  let $step = $('<p>').attr('id', 'game-step').text("Select a card to play!");
  $gameNoteField = $('<p>').attr('id', 'game-note').text("");

  $div.append($turn).append($step).append($gameNoteField);

  let $section = $('<section>');
  $section.addClass('game-section').attr('id', 'draw-discard');

  let $drawImg = $('<img>').attr('src', 'images/draw_back.png')
    .attr('alt', "")
    .attr('title', "")
    .attr('id', 'draw-pile');

    $drawImg.data('data-player', 2);

  $drawImg.on('click', function(){
    onImageClick(Game.drawPile, $(this));

  });
  $section.append($drawImg);


  // If the discard pile doesn't already have cards, we recreate it
  if(!Game.discardPile.length){
    let $discardImg = $('<img>').attr('src', 'images/discard_back.png')
      .attr('alt', "")
      .attr('title', "")
      .attr('id', 'discard-pile');
      $section.append($discardImg);
  }else{
    let $discardImg = $('<img>').attr('src', Game.discardPile[Game.discardPile.length-1].face)
      .attr('alt', "")
      .attr('title', "")
      .attr('id', 'discard-pile');
      $section.append($discardImg);
  }

  $mainDiv.append($div);
  $mainDiv.append($section);
  $main.append($mainDiv);

  // adds placeholder so that page formatting is not messed up
  addGettingReadyToTradeDiv();
  $('#tradeDiv').css('visibility', 'hidden');
}

///////////////////////////////////////////////// Utlity Section //////////////////////////////////////////////////////
/*
Returns the index of the first defuse card
If none was found, we return -1;
*/
function findIndexOfOurDefuse(deck){
  let index = -1;
  for(let i = 0; i < deck.length; i++){
    if(deck[i].action == "defuse"){
      index = i;
      break;
    }
  }

  return index;
}


function haveEnoughCardsToPlay(playersDeck){
  if(players.length > 1){
    return true;
  }else{
    return false;
  }
}

/*
  We get here if we just drew a Crazy Kitten from the Draw Pile.

  This function returns 1 if we had a Defuse card and returns 0 if we didn't

  Once we drew a Crazy Kitten, we need to check whether we have a Defuse Kitten
    If we do have a Defuse Kitten, we must 'play' the Defuse card immediately
      - this means that we have to remove the Defuse card from our deck and then
        place both the Defuse card and the Crazy Kitten card onto the Discard Pile
    If we don't have a Defuse card, then we lost and the game is over
*/
function lookForDefuseCard(playersDeck, player){
  if(player){
    alert("On no, we just drew a crazy kitten");
  }else{
    alert("The computer just drew a crazy kitten");
  }
  let defuseIndex = findIndexOfOurDefuse(playersDeck);
  if(defuseIndex > -1){

    if(player){
      alert("You're lucky, you had a defuse card.");
      // removes the used defuse card from our deck;
      playersDeck.splice(defuseIndex, 1);
      addCardSection("player", playersDeck);
    }else{
      alert("The computer had a defuse card.");
      playersDeck.splice(defuseIndex, 1);
      addCardSection("computer", playersDeck);
    }
    return 1;
  }else{

    if(player){
      console.log("You are out of defuse cards... YOU LOST!.");
      alert("You are out of defuse cards... YOU LOST!.");
    }else{
      console.log("The computer is out of defuse cards... YOU WON!.");
      alert("The computer is out of defuse cards... YOU WON!.");
    }
    return 0;

  }
}

function getIndexOfCardInDeck(card, deck){
  let index = null;
  for(let i = 0; i < deck.length; i++){
    if(card.face == deck[i].face && card.id == deck[i].id){
      index = i;
    }
  }
  return index;
}

function findCardInDeck(face, id, deck){
  let card = {};
  for(let i = 0; i < deck.length; i++){
    if(deck[i].face == face && deck[i].id == id ){
      card.action = deck[i].action;
      card.face = deck[i].face;
      card.down = deck[i].down;
      card.id = deck[i].id;
    }
  }
  return card;
}

/*
  Returns true if the two cards are equal, false otherwise
*/
function areCardsEqual(cardOne, cardTwo){
  let equal = true;
  for(let key in cardOne){
    if (cardOne.hasOwnProperty(key)) {
      if(cardOne[key] != cardTwo[key]){
        equal = false;
        return equal;
      }
  }
  }
}


////////////////////////////////////////// Computer Action Section /////////////////////////

function performStepOne(noteField, $me, deck, cardOwner){
  if(cardOwner != Turn.player){
    noteField.text("You must choose from your own cards");
    return;
  }

  let id = $me.data('data-card-index');
  let face = $me.attr('alt');
  let cardAction = $me.data().dataAction;

  let activeCard = findCardInDeck(face, id, deck);
  console.log("active card: ", activeCard);
  activeCards.push(activeCard);

  $('#modal-card').attr('src', $me.attr('alt')).addClass($me.attr('class'));
  let action = Cards.actions[$me.data('data-action')];

  if ($me.data('data-action') == "regular") {
    $('#modal-instructions').text(action);
  }else{
    $('#modal-instructions').text(action);
  }

  $modalSubmit.removeClass('computers-button');


  $modal.modal('show');

  if(Turn.player == 0){
    setTimeout(function(){
      $modalSubmit.addClass('computers-button');
    }, 1000);
  }
}

// here the player is stealing a card
function performStepTwo(cardOwner, $gameNoteField, gameStepField, $me, ourDeck, opponentsDeck){
  if(cardOwner == Turn.player || cardOwner == 2){
    $gameNoteField.text("You must steal from your opponent");
    return;
  }

  let id = $me.data('data-card-index');
  console.log("In performStepTwo, id:", id);

  // remove the 2 traded cards from your deck
  moveCardFromDeckIntoDiscardPile(ourDeck, activeCards);

  // add the stolen card to your deck
  let face = $me.attr('alt');
  let cardToBeRemoved = findCardInDeck(face, id, opponentsDeck);
  console.log("Trying to steal: ", cardToBeRemoved);
  ourDeck.push(cardToBeRemoved);

  let indOfCardToBeRemoved = getIndexOfCardInDeck(cardToBeRemoved, opponentsDeck);
  // remove the card from the computer's deck

  if(indOfCardToBeRemoved < 0){
   console.log("%%%%%%%%%%%%%%%%%   couldn't find the card: ", cardToBeRemoved);
  }
  opponentsDeck.splice(indOfCardToBeRemoved, 1);

  if(Turn.player){
    addCardSection("computer", opponentsDeck);
    addCardSection("player", ourDeck);
  }else{
    addCardSection("computer", ourDeck);
    addCardSection("player", opponentsDeck);
  }

  activeCards = [];

  Turn.step = 1;
  gameStepField.text("Draw a card from the Draw Pile");
}

/*
  This function determines which of the user's cards the computer is about to
  steal. Since we're immitating the actual clicking of an image, we're calling
  the .click() on the selected image
*/
function computerPickCardToBeStolen(){
  // represents the user's card the computer is about to steal
  if(Game.usersDeck.length < 1){
    buildGameOverScreen(0);
    return;
  }
  let rand = (Math.floor(Math.random()*((Game.usersDeck.length-1))-0+1)+0) +1;

  let stolenCard = $(`#user-table img:nth-of-type(${rand})`);
  console.log("rand: ", rand);
  console.log("computer has picked the following card to be stolen: ", stolenCard);
  console.log(stolenCard.data());

  stolenCard.click();
}

/*
  This function provides the logic for the computer to draw a card from the draw
  pile
*/
function makeComputerDrawFromDrawPile(playerCards, gameTurnField, gameStepField){
  console.log("Comp cards: ", Game.compsDeck);
  console.log("Computer is drawing from draw pile.");

  let temp = playerCards.pop();
  let newCard = {
    action: temp.action,
    face: temp.face,
    id: temp.id,
    down: temp.down
  };

  newCard.id = Game.compsDeck.length;

  console.log("Computer drew from drawPile: ", newCard);

  if(newCard.action == 'crazy'){

    // display crazy kitten and check if there's a defuse card
    // if there's a defuse card, it will be removed from the compsDeck
    hadADefuse = lookForDefuseCard(Game.compsDeck, Turn.player);

    if(hadADefuse){
      // we're still in the game

      /*
        The user's turn is about to start: if the user has less than 2 cards,
        the user can only draw a card during their turn
      */
      determineIfPlayerNeedsToFinishTurnByDrawing(Turn.player, Game.usersDeck, gameStepField, gameTurnField);

      return;
    }else{
      // we've lost
      buildGameOverScreen(Turn.player);
      return;
    }
  }

  Game.compsDeck.push(newCard);
  addCardSection("computer", Game.compsDeck);

  /*
    The user's turn is about to start: if the user has less than 2 cards,
    the user can only draw a card during their turn
  */
  determineIfPlayerNeedsToFinishTurnByDrawing(Turn.player, Game.usersDeck, gameStepField, gameTurnField);
}

function determineIfPlayerNeedsToFinishTurnByDrawing(user, playersDeck, stepField, turnField){

  // alert("determining if player needs to finish turn by drawing");

  if(playersDeck.length < 2){
    Turn.step = 3;
    stepField.text('Because you only have one card, you can only draw from the Draw Pile this turn.');
  }else{
    Turn.step = 0;
    stepField.text('Select one of your own cards');
  }

  if(!user){
    turnField.text('Turn: User');
    Turn.player = 1;
  }else{
    turnField.text('Turn: Computer');
    Turn.player = 0;


    if(playersDeck.length < 2){
      setTimeout(function(){
        makeComputerDrawFromDrawPile(Game.drawPile, turnField, stepField);
      }, 2000);
    }
  }
}



/*
  Chooses and activates the computer's first card
*/
function startComputersTurn(ind){

  setTimeout(function(){
    let card = Game.copyCard(Game.compsDeck[ind]);
    console.log("Looking for: ", card);

    let images = $('#computer-table img');
    let image = null;
    $.each(images, function(index, value){
      if($(this).data().dataCardIndex == card.id && $(this).attr('alt') == card.face){
        image = $(this);
      }
    });
    image.click();

  }, 2000);

}

function moveCardFromDeckIntoDiscardPile(deck, activeCards){
  for(let i = 0; i < activeCards.length; i++){
    let face = activeCards[i].face;

    let index = null;
    let card = null;
     for(let j = 0; j < deck.length; j++){
       if(deck[j].face == face){
         card = deck[j];
         index = j;
         break;
       }
     }

     if(card == null){
       debugger
     }

     card.id = Game.discardPile.length;
     $('#discard-pile').attr('src', card.face);
     Game.discardPile.push(card);
     deck.splice(index, 1);

  }
}



// loads the index page into our main div
loadIndexMain();
