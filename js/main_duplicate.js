console.log("loaded");
let $playButton;
let $main = $('.main-index');

let $title = $('#title');
let $gameNoteField;

let $link = $('#title-link');
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

let $modal = $('#modal');
let activeCards = [];

// $modal.on('shown.bs.modal', function(event){
//
// });

let $modalCancel = $('#modal-cancel');
$modalCancel.on('click', function() {

  if (Game.turn) {
    // it's the user's turn

    let activeCard = activeCards.pop();
    if (activeCard.action == "regular" && Game.usersTradeCount == 0) {
      $('#tradeDiv').css('visibility', 'hidden');
    }

  } else {
    //it's the computer's turn

  }

});


let $modalSubmit = $('#modal-submit');

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

$modalSubmit.on('click', function() {
  if (Turn.player) {
  // if (Game.turn) {
    // it's the user's turn

    // if we submitted a regular card AND it is already the second card
    if (activeCards[0].action == "regular" && Game.usersTradeCount == 1) {
      // now we're allowed to take a card from the computer

      if ( !areCardsEqual(activeCards[0], activeCards[1])) {
        Game.usersTradeCount = 0;
        console.log('Getting ready to steal!');
        $('#game-step').text("Steal one of your opponent's cards");

        Turn.step = 2;

        console.log(activeCards);
        $('#tradeDiv').css('visibility', 'hidden');
        // activeCards = [];

      } else {
        console.log("Can't use the same card!");
        $gameNoteField.text("..sorry, can't select the same card twice!. Try again.");

        console.log(activeCards[0].id);
        console.log(activeCards[1].id);
        activeCards.pop();
      }


      //need to remove the two regular cards from the user's deck


    } else if (activeCards[0].action == "regular" && Game.usersTradeCount != 1) {
      // we need to wait for a second regular card to be selected before we can
      // steal a card from the computer
      Game.usersTradeCount = 1;
      addGettingReadyToTradeDiv();


      console.log('Need one more regular card');

    } else {
      console.log('modal submit: EROOOOOOOOORRRR');
      console.log(activeCards);
      alert("card: ", activeCards[0].action );
      debugger;

    }

  } else {
    //the computer's turn
    if(activeCards.length == 1){
      // debugger;

      startComputersTurn(1);


    }else{
      // debugger;

      Game.usersTradeCount = 0;
      console.log('Getting ready to steal!');
      $('#game-step').text("Steal one of your opponent's cards");

      Turn.step = 2;

      console.log(activeCards);
      $('#tradeDiv').css('visibility', 'hidden');


      setTimeout(function(){

        computerStealCardFromUser();
      }, 2000);
    }



  }

});

function computerStealCardFromUser(){
  console.log("Computer is about to steal a card!");

  // represents the user's card the computer is about to steal

  let rand = (Math.floor(Math.random()*((Game.usersDeck.length-1))-0+1)+0) +1;

  let stolenCard = $(`#user-table img:nth-of-type(${rand})`);
  console.log("rand: ", rand);
  console.log(stolenCard);
  console.log(stolenCard.data());

  stolenCard.click();


}


function clearMain() {
  $main.empty();
  $main.removeClass();
}

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

function loadInstructionMain() {
  $title.text("Welcome to Crazy Kittens");
  $link.text("Home").css('margin-left', '315px');


  clearMain();
  $main.addClass('main-index');

  let $sectionSetUp = $('<section>').attr('id', 'setup');
  let p1 = $('<p>').text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

  $sectionSetUp.append(p1);
  let $sectionTurn = $('<section>').attr('id', 'turn');

  let p2 = $('<p>').text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  $sectionTurn.append(p2);

  $main.append($sectionSetUp);
  $main.append($sectionTurn);

}

function addCardSection(player, playerCards) {
  if (player == "computer") {
    // we need to display the cards facedown.
    addImages("computer-section", "computer-table", playerCards, 0);

  } else {
    // we need to display the face value
    addImages("user-section", "user-table", playerCards, 1);

  }
}

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

    }else if(Turn.step == 1){
      // need to draw from draw pile
      if(cardOwner == 2){
        $gameNoteField.text("You must draw from the draw pile!");
        return;
      }

      let newCard = playerCards.pop();
      newCard.id = Game.usersDeck.length;

      if(newCard.action == 'crazy'){
        console.log("ahhhhhhhhhh, a crazy kitten!!!");
        alert("On no, we just drew a crazy kitten");

        // display crazy kitten and check if there's a defuse card

      }
      console.log("new card: ", newCard);
      Game.usersDeck.push(newCard);

      addCardSection("player", Game.usersDeck);

      gameTurnField.text('Turn: Computer');
      gameStepField.text('Select one of your own cards, computer');

      // indicating that it is the computer's turn
      Turn.step = 0;
      Turn.player = 0;

      //trigger computer's turn
      startComputersTurn(0);

    }else if(Turn.step == 2){
      performStepTwo(cardOwner, $gameNoteField, gameStepField, $me, Game.usersDeck, Game.compsDeck);
      // want to trade in 2 of our own cards and must now steal a card from opponent
      // if(cardOwner == Turn.player){
      //   $gameNoteField.text("You must steal from your opponent");
      //   return;
      // }
      //
      // let id = $me.data('data-card-index');
      // // remove the 2 traded cards from your deck
      // moveCardFromDeckIntoDiscardPile(Game.usersDeck, activeCards);
      //
      // // add the stolen card to your deck
      // // let cardToBeRemoved = Game.compsDeck[toBeRemoved];
      // let face = $me.attr('alt');
      // let cardToBeRemoved = findCardInDeck(face, id, Game.compsDeck);
      // Game.usersDeck.push(cardToBeRemoved);
      //
      // // remove the card from the computer's deck
      // Game.compsDeck.splice(id, 1);
      //
      // addCardSection("computer", Game.compsDeck);
      // addCardSection("player", Game.usersDeck);
      //
      // activeCards = [];
      //
      //
      // Turn.step = 1;
      // gameStepField.text("Draw a card from the Draw Pile");

    }

    // this means it's the computer's turn
  }else{


    if(Turn.step == 0){
      performStepOne($gameNoteField, $me, Game.compsDeck, cardOwner);

      setTimeout(function(){
        $modalSubmit.click();
      }, 2000);

      // computer is about to steal the user's card
    }else if(Turn.step == 2){

      console.log("Need to add the steal logic to remove the card from the user's deck");
      performStepTwo(cardOwner, $gameNoteField, gameStepField, $me, Game.compsDeck, Game.usersDeck);
      // console.log("usersDeck: ", Game.usersDeck);
      // console.log("usersDeck: ", Game.compsDeck);
      //
      // let id = $me.data('data-card-index');
      // console.log("index: ",id);
      //
      // // remove the 2 traded cards from your deck
      // console.log("activeCards",activeCards);
      // moveCardFromDeckIntoDiscardPile(Game.compsDeck, activeCards);
      // console.log('discard pile: ', Game.discardPile);
      //
      // // debugger;
      //
      // // add the stolen card to your deck
      // let action = $me.data().dataAction;
      // let face = $me.attr('alt');
      // let cardToBeRemoved = findCardInDeck(face, id, Game.usersDeck);
      // let cardCopy = Game.copyCard(cardToBeRemoved);
      // Game.compsDeck.push(cardCopy);
      //
      // // remove the card from the user's deck
      // let index = getIndexOfCardInDeck(cardToBeRemoved, Game.usersDeck);
      // Game.usersDeck.splice(index, 1);
      //
      // addCardSection("computer", Game.compsDeck);
      //
      // addCardSection("player", Game.usersDeck);
      //
      // activeCards = [];
      //
      // Turn.step = 1;
      // gameStepField.text("Draw a card from the Draw Pile");

      setTimeout(function(){
        makeComputerDrawFromDrawPile(Game.drawPile, gameTurnField, gameStepField);
      }, 2000);

    }
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

  $modal.modal('show');
}

function performStepTwo(cardOwner, $gameNoteField, gameStepField, $me, ourDeck, opponentsDeck){
  if(cardOwner == Turn.player){
    $gameNoteField.text("You must steal from your opponent");
    return;
  }

  let id = $me.data('data-card-index');
  // remove the 2 traded cards from your deck
  moveCardFromDeckIntoDiscardPile(ourDeck, activeCards);

  // add the stolen card to your deck
  // let cardToBeRemoved = Game.compsDeck[toBeRemoved];
  let face = $me.attr('alt');
  let cardToBeRemoved = findCardInDeck(face, id, opponentsDeck);
  ourDeck.push(cardToBeRemoved);

  // remove the card from the computer's deck
  opponentsDeck.splice(id, 1);

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

function makeComputerDrawFromDrawPile(playerCards, gameTurnField, gameStepField){
  console.log("Comp cards: ", Game.compsDeck);
  console.log("COmputer is drawing from draw pile.");

  let newCard = playerCards.pop();
  newCard.id = Game.compsDeck.length;

  console.log("Computer drew: ", newCard);

  if(newCard.action == 'crazy'){
    console.log("ahhhhhhhhhh, a crazy kitten!!!");
    alert("Comp just drew a crazy kitten from deck");

    // display crazy kitten and check if there's a defuse card

  }
  Game.compsDeck.push(newCard);
  addCardSection("computer", Game.compsDeck);


  gameTurnField.text('Turn: User');
  gameStepField.text('Select one of your own cards, user');

  Turn.step = 0;
  Turn.player = 1;
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
        console.log("found the card: ", $(this));
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

  $drawImg.on('click', function(){
    onImageClick(Game.drawPile, $(this));
  });
  $section.append($drawImg);


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

  addGettingReadyToTradeDiv();
  $('#tradeDiv').css('visibility', 'hidden');
}

loadIndexMain();
