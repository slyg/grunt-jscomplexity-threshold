chai = require('chai')
expect = chai.expect
rewire = require('rewire')
describe 'the markThresholds module', ->

  module = rewire('../../tasks/util/markThresholds')

  reports = [
    { complexity : 1 }
    { complexity : 2 }
  ]

  it 'should expose a function', ->

    expect(module).to.be.a 'function'


  it 'should return a function', ->

      expect(module([])).to.be.a 'function'


  it 'should throw if option parameter is undefined', ->

    expect(->
      return module(undefined)
    ).not.to.throw()


  describe '1rst order function', ->

    it 'should throw when passed argument is not an array', ->

      expect(->
        return module()('oups')
      ).to.throw /no report array provided/


    context 'if passed option.complexity is undefined', ->

      markThresholds = module()

      it 'should set <isThresholdPassed> false', ->

        expect(markThresholds(reports)).to.deep.eql([
          { complexity : 1, isThresholdPassed : false }
          { complexity : 2, isThresholdPassed : false }
        ])


    context 'if passed option.complexity is greater than item complexity attribute', ->

      markThresholds = module({complexity : 0})

      it 'should set <isThresholdPassed> true', ->

        expect(markThresholds(reports)).to.deep.eql([
          { complexity : 1, isThresholdPassed : true }
          { complexity : 2, isThresholdPassed : true }
        ])


    context 'if passed option.complexity is lower than item complexity attribute', ->

      markThresholds = module({complexity : 2})

      it 'should set <isThresholdPassed> false', ->

        expect(markThresholds(reports)).to.deep.eql([
          { complexity : 1, isThresholdPassed : false }
          { complexity : 2, isThresholdPassed : false }
        ])




