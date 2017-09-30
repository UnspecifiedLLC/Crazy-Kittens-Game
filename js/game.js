console.log("loaded game.js");

/*



1. Remove all the exploding kittens and defuse cards from the deck.
2. Shiffle the remaining deck and deal 4 cards face down to each player.
3. Deal 1 defuse card to each player so that everyone has a hand of 5.
4. Insert 1-NumOfPeople of Exploding kittens back into the deck. So add 1.

*/

let Game = (function(){

  // let indexArray = [];
  // for(let i = 0; i < 46; i++){
  //   indexArray.push(i);
  // }

  function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function getCardIndex(inputArray){
    let rand = randomIntFromInterval(0, inputArray.length-1);
    let index = inputArray[rand];
    inputArray.splice(index, 1);

    return {
        index: index,
        shortenedArray: inputArray
      };
  }

  return{
    inPlay: 0,
    turn: 1, // represents who's turn it is. 1 -> user, 0 -> comp
    usersTradeCount: 0,
    // regularDeck: Cards.regularDeck,
    regularDeck: Cards.testDeck,
    crazyKittensDeck: Cards.crazyKittensDeck,
    defuseKittensDeck: Cards.defuseKittensDeck,
    drawPile: [],
    discardPile: [],
    usersDeck: [],
    compsDeck: [],

    test: function(){
      console.log("Hiiii");
      console.log("cards: ", this.regularDeck);
    },

    shuffleDeck: function(cards, indexArray){
      let shuffledDeck = [];
      for(let i = 0; i< cards.length; i++){
        let result = getCardIndex(indexArray);
        let index = result.index;
        indexArray = result.shortenedArray;
        shuffledDeck.push(cards[index]);
      }

      return shuffledDeck;
    },

    /*
      pops n number of cards from the originalDeck and pushes them into the
      goalDeck
    */
    dealCards: function(origialDeck, goalDeck, numOfCardsToBeDealt){
      for(let i = 0; i < numOfCardsToBeDealt; i++){
        let rand = randomIntFromInterval(0, origialDeck.length-1);
        let card = this.copyCard(origialDeck[rand]);
        card.id = i;
        goalDeck.push(card);
        origialDeck.splice(rand, 1);
      }
    },

    /*
      1st shuffles the Regular Deck (the one without defuse or crazy kittens)
      2nd deals 4 cards from the Regular Deck to the users deck
      3rd deals 4 cards from the Regular Deck to the computers deck
      4th deals 1 defuse card to the users deck
      5th deals 1 defuse card to the computers deck
      6th puts the remaining cards from the Regular Deck  and one crazy Kittens into the drawDeck
    */
    setUpGame: function(){

      console.log('Regular Deck length before shuffling: ', this.regularDeck.length);


      let indexArray = [];
      for(let i = 0; i < this.regularDeck.length; i++){
        indexArray.push(i);
      }

      //1st shuffles the Regular Deck (the one without defuse or crazy kittens)
      this.regularDeck = this.shuffleDeck(this.regularDeck, indexArray);
      // console.log('Regular Deck: ', this.regularDeck);


      // 2nd deals 4 cards from the Regular Deck to the users deck
      this.dealToUser()
      // console.log('Users Deck: ', this.usersDeck);

      // 3rd deals 4 cards from the Regular Deck to the computers deck
      this.dealToCom()
      // console.log('Users Deck: ', this.compsDeck);

      // 4th deals 1 defuse card to the users deck
      let userDefuse = this.copyCard(this.defuseKittensDeck[0]);
      userDefuse.id = 4;
      this.usersDeck.push(userDefuse);

      // 5th deals 1 defuse card to the computers deck
      let compDefuse = this.copyCard(this.defuseKittensDeck[0]);
      compDefuse.id = 4;
      this.compsDeck.push(compDefuse);

      console.log('reg deck length: (should be 38)', this.regularDeck.length);
      console.log('Users Deck: ', this.usersDeck);
      console.log('Comps Deck: ', this.compsDeck);

      //6th puts the remaining cards from the Regular Deck and the crazy Kittens into the drawDeck
      this.dealToDraw()

      // drawPile will have (38+x) 48 cards in total
      for(let i = 0; i < 10; i++){
        this.drawPile.push(this.crazyKittensDeck[0]);
      }

      indexArray = [];
      for(let i = 0; i < 48; i++){
        indexArray.push(i);
      }
      this.drawPile = this.shuffleDeck(this.drawPile, indexArray);

      console.log('Draw Pile: ', this.drawPile);

    },
    dealToDraw: function(){
      for(let i = 0; i < this.regularDeck.length; i++){
        this.drawPile.push(this.regularDeck[i]);
      }
    },
    dealToUser: function(){
      this.dealCards(this.regularDeck, this.usersDeck, 4);
    },
    dealToCom: function(){
      this.dealCards(this.regularDeck, this.compsDeck, 4);
    },
    copyCard: function(originalCard){
      let newObj = {};
      newObj.action = originalCard.action;
      newObj.face = originalCard.face;
      newObj.down = originalCard.down;
      newObj.id = originalCard.id;

      return newObj;
    }


  }
})();