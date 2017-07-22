var assert = require('assert')

var execValue = null
var exec = function (v, cb) {
	execValue = v
	setTimeout(function() {
		cb(null, 'text')
	})
}

var f = require('./index.core')(exec)
var addVariable = f.addVariable
var removeVariable = f.removeVariable

describe("", function() {

	beforeEach(function() {
		execValue = null
	})

	it('add existing', function () {
		var res = addVariable({
			"a": "i1"
		}, "a", 'i1')
		assert(!res)
		assert(execValue == null)
	})

	it('add new', function () {
		var res = addVariable({
			"a": "i1"
		}, "a", 'i2')
		assert(res)
		assert(execValue == 'setx a "i1;i2" /M')
	})

	it('remove existing', function () {
		var res = removeVariable({
			"a": "i1"
		}, "a", 'i1')
		assert(res)
		assert(execValue == 'setx a "" /M')
	})

	it('remove nonexisting', function () {
		var res = removeVariable({
			"a": "i1"
		}, "a", 'i2')
		assert(!res)
		assert(execValue == null)
	})

	it('add nonexisting', function () {
		var res = addVariable({
		}, "a", 'i1')
		assert(res)
		console.log(execValue)
		assert(execValue == 'setx a "i1" /M')
	})

	it('remove nonexisting', function () {
		var res = removeVariable({
		}, "a", 'i1')
		assert(!res)
		assert(execValue == null)
	})

})