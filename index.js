var cp = require('child_process')

var f = require('./index.core')(cp.exec)

// run
f.run()
