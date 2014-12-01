chai = require('chai')
expect = chai.expect
rewire = require('rewire')
describe 'the hasPassedThreshold module', ->

  module = rewire('../../tasks/lib/hasPassedThreshold')

  it 'should expose a function', ->

    expect(module).to.be.a 'function'


  it 'should throw if passed argument is not an array', ->

    expect(->
      module('oups')
    ).to.throw()


  it 'should return false if passed argument is an empty array', ->

    expect(module([])).to.eql(false)


  it 'should return true if one of the items has a truthy property isThresholdPassed', ->

    expect(module([
      { isThresholdPassed : false }
      { isThresholdPassed : true }
    ])).to.eql(true)


  it 'should return false if none of the items has a truthy property isThresholdPassed', ->

    expect(module([
      { isThresholdPassed : false }
      { isThresholdPassed : false }
    ])).to.eql(false)
