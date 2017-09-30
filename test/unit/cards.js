
suite('Crazy Kittens.Cards', function() {
    
    setup(function(done) {
        console.log("Cards", Cards)
        done()
    })

    test('regular deck should contain 46 cards', function() {
        assert.equal(46, Cards.regularDeck.length)
    })
})
