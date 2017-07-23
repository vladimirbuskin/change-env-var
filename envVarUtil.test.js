var u = require('./envVarUtil')
var assert = require('assert')
var envVarRead = u.envVarRead
var envVarWrite = u.envVarWrite

describe('envVarUtil', function() {
    it('is working', function() {
        envVarWrite('_test_envVarUtil_', 'i11', function(err, v) {
            envVarRead('_test_envVarUtil_', function(err, r) {
                assert(r === 'i11')
            }) 
        })
    })
})