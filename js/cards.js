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
*/
var Cards = (function(){

  return{
    actions: {
      action: "you've selected an action card!",
      crazy: "you've selected a crazy kitten card!",
      defuse: "you've selected a defuse card!",
      regular: "You've selected a non-action card. Pick a second non-action card to steal one of your opponent's cards!",
      nope: "you've selected a nope card!",
      future: "you've selected a future card!",
      shuffle: "you've selected a shuffle card!",
      favor: "you've selected a favor card!",
      skip: "you've selected a skip card!",
    },
    crazyKittensDeck: [
      {
        face: 'images/crazy.png',
        down: 'images/back.png',
        action: 'crazy'
      }
    ],

    defuseKittensDeck: [
      {
        face: 'images/defuse.png',
        down: 'images/back.png',
        action: 'defuse'
      }
    ],

    regularDeck: [

      // the 4 cattermelon cards
      {
        face: 'images/cattermelon.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        down: 'images/back.png',
        face: 'images/cattermelon.png',
        action: 'regular'
      },
      {
        down: 'images/back.png',
        face: 'images/cattermelon.png',
        action: 'regular'
      },
      {
        down: 'images/back.png',
        face: 'images/cattermelon.png',
        action: 'regular'
      },

      // the 4 taco cards
      {
        face: 'images/taco.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/taco.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/taco.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/taco.png',
        down: 'images/back.png',
        action: 'regular'
      },

      // the 4 beardcat cards
      {
        face: 'images/beard.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/beard.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/beard.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/beard.png',
        down: 'images/back.png',
        action: 'regular'
      },

      // the 4 potato cards
      {
        face: 'images/potato.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/potato.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/potato.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/potato.png',
        down: 'images/back.png',
        action: 'regular'
      },

      // the 4 rainbow cards
      {
        face: 'images/rainbow.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/rainbow.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/rainbow.png',
        down: 'images/back.png',
        action: 'regular'
      },
      {
        face: 'images/rainbow.png',
        down: 'images/back.png',
        action: 'regular'
      },

      // the 4 attack cards
      {
        face: 'images/attack.png',
        down: 'images/back.png',
        action: 'attack'
      },
      {
        face: 'images/attack.png',
        down: 'images/back.png',
        action: 'attack'
      },
      {
        face: 'images/attack.png',
        down: 'images/back.png',
        action: 'attack'
      },
      {
        face: 'images/attack.png',
        down: 'images/back.png',
        action: 'attack'
      },

      // the 5 nope cards
      {
        face: 'images/nope.png',
        down: 'images/back.png',
        action: 'nope'
      },
      {
        face: 'images/nope.png',
        down: 'images/back.png',
        action: 'nope'
      },
      {
        face: 'images/nope.png',
        down: 'images/back.png',
        action: 'nope'
      },
      {
        face: 'images/nope.png',
        down: 'images/back.png',
        action: 'nope'
      },
      {
        face: 'images/nope.png',
        down: 'images/back.png',
        action: 'nope'
      },

      // the 5 future cards
      {
        face: 'images/future.png',
        down: 'images/back.png',
        action: 'future'
      },
      {
        face: 'images/future.png',
        down: 'images/back.png',
        action: 'future'
      },
      {
        face: 'images/future.png',
        down: 'images/back.png',
        action: 'future'
      },
      {
        face: 'images/future.png',
        down: 'images/back.png',
        action: 'future'
      },
      {
        face: 'images/future.png',
        down: 'images/back.png',
        action: 'future'
      },

      // the 4 shuffle cards
      {
        face: 'images/shuffle.png',
        down: 'images/back.png',
        action: 'shuffle'
      },
      {
        face: 'images/shuffle.png',
        down: 'images/back.png',
        action: 'shuffle'
      },
      {
        face: 'images/shuffle.png',
        down: 'images/back.png',
        action: 'shuffle'
      },
      {
        face: 'images/shuffle.png',
        down: 'images/back.png',
        action: 'shuffle'
      },

      // the 4 favor cards
      {
        face: 'images/favor.png',
        down: 'images/back.png',
        action: 'favor'
      },
      {
        face: 'images/favor.png',
        down: 'images/back.png',
        action: 'favor'
      },
      {
        face: 'images/favor.png',
        down: 'images/back.png',
        action: 'favor'
      },
      {
        face: 'images/favor.png',
        down: 'images/back.png',
        action: 'favor'
      },

      // the 4 skip cards
      {
        face: 'images/skip.png',
        down: 'images/back.png',
        action: 'skip'
      },
      {
        face: 'images/skip.png',
        down: 'images/back.png',
        action: 'skip'
      },
      {
        face: 'images/skip.png',
        down: 'images/back.png',
        action: 'skip'
      },
      {
        face: 'images/skip.png',
        down: 'images/back.png',
        action: 'skip'
      }

    ]
  }
})();
