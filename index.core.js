var yargs = require('yargs')


module.exports = function(exec) {


	function exists(array, it) {
		it = (it+'').toLowerCase().trim()
		return (array || []).find(x => (x + '').toLowerCase().trim() == it)!=null
	}

	function filter(array, it) {
		it = (it+'').toLowerCase().trim()
		return (array || []).filter(x => (x + '').toLowerCase().trim() != it)
	}

	function setVar(envVar, value, cb) {
		exec(`setx ${envVar} "${value}" /M`, (err, res) => {
			if (err) throw err
			cb(res)
		})
	}

	function getVarItems(vars, v) {
		var a = (vars[v]||'').trim()
		if (a === '') return []
		return a.trim().split(';').map(x=>x.trim())
	}

	function addVariable(vars, v, it) {
		var curItems = getVarItems(vars, v);
		if (!exists(curItems, it)) {
			curItems.push(it)
			setVar(v, curItems.join(';'), function(res) {
				console.log('successfully added');
				console.log('will be available only after console restart');
			})
			return true
		}
		else {
			console.log(`${it} already exists in ${v}`)
		}
		return false
	}

	function removeVariable(vars, v, it) {
		var curItems = getVarItems(vars, v);
		var newCurItems = filter(curItems, it);
		if (newCurItems.length != curItems.length) {
			setVar(v, newCurItems.join(';'), function(res) {
				console.log('successfully removed');
				console.log('changes will be available only after console restart');
			})
			return true
		}
		else {
			console.log(`${it} is not found in ${v} env variable`)
		}
		return false
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
				console.log(`adding ${argv.itemValue} to ${argv.envVariable}`)
				
				addVariable(process.env, v, it)
			}
		})
		.command({
			command: 'remove <envVariable> <itemValue>',
			desc: 'removes itemValue from envVariable',
			handler: (argv) => {
				// parse
				var v = argv.envVariable
				var it = argv.itemValue
				console.log(`removing ${argv.itemValue} from ${argv.envVariable}`)

				removeVariable(process.env, v, it)
			}
		})
		// provide a minimum demand and a minimum demand message
		.demandCommand(1, 'You need at least one command before moving on')
		.example('add', 'change-env-var add Path c:\PM2')
		.example('remove', 'change-env-var remove Path c:\PM2')
		.help()
		.argv

		console.log(a)
	}

	return {
		addVariable,
		removeVariable,
		run
	}


}