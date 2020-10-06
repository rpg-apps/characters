const fs = require('fs')
const path = require('path')
const caporal = require('caporal')
const mkdirp = require('mkdirp')
const { camelCase, capitalCase, snakeCase } = require('change-case')

const CLASSIC_ROLLS = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha']

function getMoveContent (moveName, options) {
	const procedure = []
	if (options.roll) { procedure.push('roll') }
	if (options.choice) { procedure.push('choice') }
	if (options.modifier) { procedure.push('modifier') }
	if (options.hold) { procedure.push('hold') }
	if (options.stat) { procedure.push('changeStat, STATS') }
	if (options.constant) { procedure.push('CONSTANT') }
	if (options.multiple) { procedure.push('multipleEffects') }

	return `import Move, { Procedure } from '../move'

const { ${procedure.join(', ')} } = Procedure

const ${camelCase(moveName)} = new Move({
	title: '${capitalCase(moveName)}',
	text: 
\`\`,

	procedure: new Procedure(${options.constant ? 'CONSTANT' : '\'\''}, ${CLASSIC_ROLLS.includes(options.roll) ? `roll('roll+${options.roll}', {
		success: '',
		partialSuccess: '',
		miss: ''
	})` : ''})
})

export default ${camelCase(moveName)}`
}

const PLAYBOOK_DIRS = {
	'race-move': 'race_moves',
	'starting-move': 'starting_moves_2_5',
	'advanced-2-5': 'advanced_moves_2_5',
	'advanced-6-10': 'advanced_moves_6_10'
}

caporal
  .name('rulebook')
  .version('v1')
  .description('Manages the rulbook')
  .command('make-move', 'Creates a move')
  .argument('<name>', 'Name of the move')
  .option('--playbook <playbook>', 'Save under specific playbook')
  .option('--type <type>', 'The part of the playbook its from: race-move, starting-move, advanced-2-5, advanced-6-10',
  	['race-move', 'starting-move', 'advanced-2-5', 'advanced-6-10'])
  .option('--roll <roll>', 'Indicates the move contains a roll, and may indicate what roll it is, if it\'s a classig roll')
  .option('--choice', 'Indicates the move contains a choice')
  .option('--modifier', 'Indicates the move contains a modifier')
  .option('--hold', 'Indicates the move contains a hold')
  .option('--stat', 'Indicates the move contains a stat change (including HP, XP, Level, Armor and Damage)')
  .option('--constant', 'Indicates the move is constant, with no written trigger')
  .option('--multiple', 'Indicates the move can end on multiple effects happening at once')
  .action((args, options) => {
  	console.log(`Building move ${capitalCase(args.name)}`)
  	console.log(process.cwd())

  	let filePath = path.resolve(process.cwd(), 'rulebook', 'moves')

  	if (Boolean(options.playbook) !== Boolean(options.type)) {
  		console.error('<playbook> and <type> options must come together')
  		process.exit(1)
  	}

  	if (options.playbook) {
  		filePath = path.resolve(filePath, 'playbook_moves', options.playbook, PLAYBOOK_DIRS[options.type])
  	}

  	mkdirp(filePath)
  	fs.writeFile(path.resolve(filePath, `${snakeCase(args.name)}.js`), getMoveContent(args.name, options), err => {
  		if (err) {
  			console.error(err)
  		}
  	})
  })

// Make global options
const defaultCmd = caporal._commands[0]
for (const cmd of caporal._commands.slice(1)) {
  cmd._options.unshift(...defaultCmd._options)
}

caporal.parse(process.argv)