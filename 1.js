debugger;

var s = require('./envVarUtil')
var changeEnvVar = require('./index.core')(s.envVarRead, s.envVarWrite)

changeEnvVar.addVariable('pm2', 'i1', function() {
  console.log('success')
})

