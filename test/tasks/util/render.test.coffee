chai = require('chai')
expect = chai.expect
rewire = require('rewire')
describe 'the render module', ->

  ReporterMock = undefined
  module = rewire('../../../tasks/util/render')

  VALID_SINGLE_PARAMETERS = [
    path: '/some/path/to/file.js'
    complexity: 100
    isThresholdPassed: false
  ]

  VALID_MULTIPLE_PARAMETERS = [
    {
      path: '/some/path/to/file.js'
      complexity: 100
      isThresholdPassed: false
    }
    {
      path: '/some/path/to/other/file.js'
      complexity: 150
      isThresholdPassed: true
    }
    {
      path: '/some/path/to/yet/another/file.js'
      complexity: 120
      isThresholdPassed: true
    }
  ]

  INVALID_PARAMETERS = [
    {
      path: '/some/path/to/file.js'
    }
    {
      path: '/some/path/to/yet/another/file.js'
      complexity: 120
      isThresholdPassed: true
    }
  ]

  beforeEach ->

    ReporterMock = ->

    ReporterMock::add = ->

    ReporterMock::render = ->

    module.__set__ 'Reporter', ReporterMock


  it 'should expose a function', ->

    expect(module).to.be.a 'function'

  it 'should instanciate a new reporter', (done) ->

    ReporterMock = -> done()
    ReporterMock::add = ->
    ReporterMock::render = ->

    module.__set__ 'Reporter', ReporterMock
    module []

  it 'should add <path>, <complexity> and <isThresholdPassed> properties to reporter from passed array', (done) ->

    ReporterMock::add = (path, complexity, isThresholdPassed) ->
      expect(path).to.eql VALID_SINGLE_PARAMETERS[0].path
      expect(complexity).to.eql VALID_SINGLE_PARAMETERS[0].complexity
      expect(isThresholdPassed).to.eql VALID_SINGLE_PARAMETERS[0].isThresholdPassed
      done()

    module VALID_SINGLE_PARAMETERS

  it 'should pass and ordered by complexity decreasing array to reporter', (done) ->

    complexityOrder = []

    ReporterMock::add = (path, complexity, isThresholdPassed) ->
      complexityOrder.push complexity

    ReporterMock::render = ->
      expect(complexityOrder).to.deep.eql [
        150
        120
        100
      ]
      done()

    module VALID_MULTIPLE_PARAMETERS

  it 'should exclude incomplete items passed in array', (done) ->

    complexityOrder = []

    ReporterMock::add = (path, complexity, isThresholdPassed) ->
      complexityOrder.push complexity

    ReporterMock::render = ->
      expect(complexityOrder).to.deep.eql [120]
      done()

    module INVALID_PARAMETERS

  it 'should return the rendered output', ->

      ReporterMock::render = ->
        'output'

      expect(module []).to.exist.and.to.be.a 'string'

  it 'should throw if passed parameter is not an array', ->

    expect ->
      module 'oups'
    .to.throw()

