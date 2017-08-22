console.log("loaded game.js");

/*

cattermelon: 4
tacocat: 4
beardcat: 4
hairy potato: 4
rainbow: 4

attack: 4
nope: 5
future: 5
shuffle: 4
favor: 4
skip: 4


defuse: 6
exploding: 4

1. Remove all the exploding kittens and defuse cards from the deck.
2. Shiffle the remaining deck and deal 4 cards face down to each player.
3. Deal 1 defuse card to each player so that everyone has a hand of 5.
4. Insert 1-NumOfPeople of Exploding kittens back into the deck. So add 1.

*/

var Game = (function(){

  let indexArray = [];
  for(let i = 0; i < 46; i++){
    indexArray.push(i);
  }

  function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function getCardIndex(inputArray){
    let rand = randomIntFromInterval(0, inputArray.length-1);
    let index = inputArray[rand];
    inputArray = inputArray.splic(index, 1);

    return index;
  }
  // deck = for (... cards[getCardIndex]... );

  return{
    cards:[
      {
        face: 'images/cattermelon.png',
        action: 'regular'
      },
    ],
    test: function(){
      console.log("Hiiii");
    },


  }
})();
