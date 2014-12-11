chai = require('chai')
expect = chai.expect
rewire = require('rewire')
_ = require('lodash')

describe 'the markThresholds module', ->

  module = rewire('../../../tasks/util/markThresholds')
  reports = []

  beforeEach ->

    module.__set__('defaultOptions', {
      complexity : 100
      maintainability : 100
      lineNumber : 100
    })

    reports = [
      {
        complexity : 1
        maintainability : 101
        lineNumber : 1
      }
      {
        complexity : 101
        maintainability : 101
        lineNumber : 1
      }
      {
        complexity : 1
        maintainability : 99
        lineNumber : 1
      }
      {
        complexity : 1
        maintainability : 101
        lineNumber : 101
      }
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

      it 'should use defaults to set <isThresholdPassed> value', ->

        expectedReport = _.cloneDeep(reports)
        expectedReport[0].isThresholdPassed = false
        expectedReport[1].isThresholdPassed = true
        expectedReport[2].isThresholdPassed = true
        expectedReport[3].isThresholdPassed = true

        expect(markThresholds(reports)).to.deep.eql(expectedReport)


    context 'if passed option.complexity is lower than item complexity attribute', ->

      it 'should set <isThresholdPassed> value to true', ->

        markThresholds = module({complexity : 0})

        expect(
          markThresholds([{
            complexity : 1
            maintainability : 101
            lineNumber : 1
          }])[0]
        )
        .to.have.property('isThresholdPassed', true)


    context 'if passed option.maintainability is higher than item maintainability attribute', ->

      it 'should set <isThresholdPassed> value to true', ->

        markThresholds = module({maintainability : 1})

        expect(
          markThresholds([{
            complexity : 1
            maintainability : 0
            lineNumber : 1
          }])[0]
        )
        .to.have.property('isThresholdPassed', true)

    context 'if passed option.lineNumber is lower than item lineNumber attribute', ->

      it 'should set <isThresholdPassed> value to true', ->

        markThresholds = module({lineNumber : 0})

        expect(
          markThresholds([{
            complexity : 1
            maintainability : 101
            lineNumber : 1
          }])[0]
        )
        .to.have.property('isThresholdPassed', true)




