#!/usr/bin/env node

var s = require('../envVarUtil')
var f = require('../index.core')(s.envVarRead, s.envVarWrite)

// run
f.run()
