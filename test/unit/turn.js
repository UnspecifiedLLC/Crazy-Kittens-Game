
suite('Crazy Kittens.Turn', function() {
    
    setup(function() {
        console.log("Turn", Turn)
    })

    test('player should be user (player 1)', function() {
        assert.equal(Turn.player, 1)
    })
    test('Turn step should be 0', function() {
        assert.equal(Turn.step, 0)
    })
})
