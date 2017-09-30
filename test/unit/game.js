
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
        setup(function() {
            Game.setUpGame()
        })
        test('regular deck should contain 38 cards', function() {
            assert.equal(Game.regularDeck.length, 38)
        })
    })
})
