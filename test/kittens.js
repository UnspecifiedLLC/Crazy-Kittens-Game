var chai = require('chai'),
    assert = chai.assert,
    should = chai.should(),
    expect = chai.expect,
    floor = require( 'math-floor' )


var birds = require('../js/birds.js')
var cloud = require('../js/cloud.js')
var obstacles = require('../js/obstacles.js')
var unicorn = require('../js/unicorn.js')

describe('Runicorn Tests', function(){
    describe('Page 0', function () {
        it('true should assert true', function(){
            console.log("birds", birds, birds.Birds())
            true.should.be.true
        })
    })
})