
suite('Crazy Kittens.Game', function() {
    
    setup(function() {
        console.log("Game", Game)
    })
    suite('Uninitialized Game', function() {
        test('regular deck should contain 46 cards', function() {
            assert.equal(Game.regularDeck.length, 46)
        })
    })
    
    
        suite('Deal', function(){
            test('deal to user should give user 4 cards', function(){
                Game.dealToUser()
                assert.equal(Game.usersDeck.length, 4)
            })
            test('deal to computer should give user 4 cards', function(){
                Game.dealToCom()
                assert.equal(Game.compsDeck.length, 4)
            })        
            test('regular deck should contain 38 cards', function() {
                assert.equal(Game.regularDeck.length, 38)
            })
        })
        suite('Draw Pile', function(){
            test('draw pile should equal regular deck', function() {
                Game.dealToDraw()
                assert.equal(Game.regularDeck.length, Game.drawPile.length)
            })
        })
 
}) 
