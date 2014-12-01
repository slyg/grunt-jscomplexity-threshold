chai = require('chai')
expect = chai.expect
rewire = require('rewire')
describe 'the normalize module', ->

  module = rewire('../../tasks/util/normalize')

  it 'should expose a function', ->

    expect(module).to.be.a 'function'


  it 'should throw when passed argument is not an array', ->

    expect ->
      module ''
    .to.throw()


  it 'should flatten reports', ->

    scatteredReport = [
      {
        report : [
          { complexity : 1 }
          { complexity : 2 }
        ]
      }
      {
        report : [
          { complexity : 3 }
        ]
      }
    ]

    expectedScatteredReport = [
      { complexity : 1 }
      { complexity : 2 }
      { complexity : 3 }
    ]

    expect(module scatteredReport).to.deep.equal expectedScatteredReport

