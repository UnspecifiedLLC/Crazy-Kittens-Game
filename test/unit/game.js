
suite('Crazy Kittens.Game', function() {
    
    setup(function() {
        console.log("Game", Game)
    })
    suite('Uninitialized Game', function() {
        test('regular deck should contain 46 cards', function() {
            assert.equal(Game.regularDeck.length, 46)
        })
    })
    suite('Initialized Game', function() {
        test('regular deck should contain 38 cards', function() {
            Game.setUpGame()
            assert.equal(Game.regularDeck.length, 38)
        })
        test('user deck should contain 5 cards', function() {
            assert.equal(Game.usersDeck.length, 5)
        })
        test('computer deck should contain 5 cards', function() {
            assert.equal(Game.compsDeck.length, 5)
        })
    })
})
