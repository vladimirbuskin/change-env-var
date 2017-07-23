var regedit = require('regedit')
var path = 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment'


function envVarRead(name, cb) {
  regedit.list(path, function(err, result) {
    if (err) cb(err)
    var vars = result[path].values
    var keys = Object.keys(vars)
    var nameLower = name.toLowerCase()
    var d = keys.find(x => x.toLowerCase() == nameLower)
    if (d) 
    {
       cb(undefined, (vars[d] || {}).value)
       return
    }
    cb()
  })
}

function envVarWrite(name, value, cb) {
    regedit.putValue({
        [path]: {
            [name]: {
                value: value,
                type: 'REG_SZ'
            }
        }
    }, cb)
}



/*envVarWrite('pm2', 'i1;i2:i3', function(err, d) {
    envVarRead('pm2', function(err, d) {
        console.log(d);
    })
})*/


module.exports = {
    envVarRead,
    envVarWrite
}
