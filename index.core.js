var yargs = require('yargs')


module.exports = function(getVar, setVar) {


	function exists(array, it) {
		it = (it+'').toLowerCase().trim()
		return (array || []).find(x => (x + '').toLowerCase().trim() == it)!=null
	}

	function filter(array, it) {
		it = (it+'').toLowerCase().trim()
		return (array || []).filter(x => (x + '').toLowerCase().trim() != it)
	}

	function varItems(a) {
		var a = (a||'').trim()
		if (a === '') return []
		return a.trim().split(';').map(x=>x.trim())
	}

	function addVariable(v, it, cb) {
        cb = cb || (()=>{})
		getVar(v, function(err, vv) {
			var curItems = varItems(vv)
			if (!exists(curItems, it)) {
				curItems.push(it)
				setVar(v, curItems.join(';'), function(res) {
					console.log('SUCCESS! Env var changes will be available after console restart');
                    console.log(`${v}="${curItems.join(';')}"`)
				})
				cb(true)
			}
			else {
				console.log(`WARN! ${it} already exists in ${v}`)
				cb(false)
                console.log(`${v}="${curItems.join(';')}"`)
			}
		})
	}

	function removeVariable(v, it, cb) {
        cb = cb || (()=>{})
		getVar(v, function(err, vv) {
			var curItems = varItems(vv)
			var newCurItems = filter(curItems, it);
			if (newCurItems.length != curItems.length) {
				setVar(v, newCurItems.join(';'), function(res) {
					console.log('SUCCESS! Env var changes will be available after console restart');
                    console.log(`${v}="${newCurItems.join(';')}"`)
				})
				cb(true)
			}
			else {
				console.log(`WARN! "${it}" is not found in "${v}" env variable`)
				cb(false)
                console.log(`${v}="${newCurItems.join(';')}"`)
			}
		})
	}

	function run() {
		var a = yargs
		.usage('Usage: change-env-var <add|remove> <envVariable> <itemValue>')
		.command({
			command: 'add <envVariable> <itemValue>',
			desc: 'adds itemValue to envVariable',
			handler: (argv) => {
				// parse
				var v = argv.envVariable
				var it = argv.itemValue
				console.log(`adding "${argv.itemValue}" to "${argv.envVariable}"`)
				
				addVariable(v, it)
			}
		})
		.command({
			command: 'remove <envVariable> <itemValue>',
			desc: 'removes itemValue from envVariable',
			handler: (argv) => {
				// parse
				var v = argv.envVariable
				var it = argv.itemValue
				console.log(`removing "${argv.itemValue}" from "${argv.envVariable}"`)

				removeVariable(v, it)
			}
		})
		// provide a minimum demand and a minimum demand message
		.demandCommand(1, 'You need at least one command before moving on')
		.example('add', 'change-env-var add Path c:\PM2')
		.example('remove', 'change-env-var remove Path c:\PM2')
		.help()
		.argv

	}

	return {
		addVariable,
		removeVariable,
		run
	}


}