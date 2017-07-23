var assert = require('assert')
var execValue = null

var exec = function (v, cb) {
	execValue = v
	setTimeout(function() {
		cb(null, 'text')
	})
}

var inVarValue = null;
var getVar = function (name, cb) {
	cb(undefined, inVarValue)
}

var outVarValue = null;
var setVar = function (varName, value, cb) {
	outVarValue = value
	cb()
}


var f = require('./index.core')(getVar, setVar)
var addVariable = f.addVariable
var removeVariable = f.removeVariable

describe("", function() {

	beforeEach(function() {
        inVarValue = null
		outVarValue = null
	})

	it('add existing', function () {
		inVarValue = 'i1'
		var res = addVariable("a", 'i1', function(res) {
			assert(!res)
			assert(execValue == null)
		})
	})

	it('add new', function () {
		inVarValue = 'i1'
		addVariable("a", 'i2', function(res) {
			assert(res==true)
			assert(outVarValue == "i1;i2")
		})
	})

	it('remove existing', function () {
		inVarValue = 'i1'
		removeVariable("a", 'i1', function(res) {
			assert(res)
			assert(outVarValue == "")
		})
	})

	it('remove nonexisting', function () {
		inVarValue = 'i1'
		var v = outVarValue = {}
		removeVariable("a", 'i2', function(res) {
			assert(!res)
			// no assignment, the same value
			assert(outVarValue == v)
		})
	})

	it('add nonexisting', function () {
		inVarValue = null
		addVariable("a", 'i1', function(res) {
			assert(res)
			assert(outVarValue == "i1")
		})
	})

	it('remove nonexisting', function () {
		inVarValue = null
		removeVariable("a", 'i1', function(res) {
			assert(!res)
			assert(outVarValue == null)
		})
	})

})