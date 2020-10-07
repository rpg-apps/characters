const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const Promise = require('bluebird')
const writeFileAsync = Promise.promisify(fs.writeFile)
const { camelCase, capitalCase, snakeCase } = require('change-case')

const CLASSIC_ROLLS = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha']

const PLAYBOOK_DIRS = {
	'race-move': 'race_moves',
	'starting-move': 'starting_moves_2_5',
	'advanced-2-5': 'advanced_moves_2_5',
	'advanced-6-10': 'advanced_moves_6_10'
}

function getMoveContent (moveName, options) {
	const procedure = []
	if (options.roll) { procedure.push('roll') }
	if (options.choice) { procedure.push('choice') }
	if (options.modifier) { procedure.push('modifier') }
	if (options.hold) { procedure.push('hold') }
  if (options.multiclass) { procedure.push('multiclass') }
	if (options.stat) { procedure.push('changeStat, STATS') }
	if (options.constant) { procedure.push('CONSTANT') }
  if (options.multiple) { procedure.push('multipleEffects') }

	return `import Move, { Procedure } from '../move'
${options.replaces ? `import ${camelCase(options.replaces)} from '../advanced_moves_2_5/${snakeCase(options.replaces)}'
` : ''}
const { ${procedure.join(', ')} } = Procedure

const ${camelCase(moveName)} = new Move({
	title: '${capitalCase(moveName)}',
	text: 
\`${options.trigger ? options.trigger : ''}\`,

	procedure: new Procedure(${options.constant ? 'CONSTANT' : `\'${options.trigger ? options.trigger : ''}\'`}, ${CLASSIC_ROLLS.includes(options.roll) ? `roll('roll+${options.roll}', {
		success: '',
		partialSuccess: '',
		miss: ''
	})` : (options.multiclass ? 'multiclass()' : '')})${options.replaces ? `,

    replaces: ${camelCase(options.replaces)}` : ''}
})

export default ${camelCase(moveName)}`
}

exports.createMove = function createMove (moveName, options) {
    console.log(`Building move ${capitalCase(moveName)}`)
    let filePath = path.resolve(process.cwd(), 'rulebook', 'moves')
    if (Boolean(options.playbook) !== Boolean(options.type)) {
      console.error('<playbook> and <type> options must come together')
      process.exit(1)
    }
    if (options.playbook) {
      filePath = path.resolve(filePath, 'playbook_moves', options.playbook, PLAYBOOK_DIRS[options.type])
    }
    mkdirp(filePath)
      .then(() => writeFileAsync(path.resolve(filePath, `${snakeCase(moveName)}.js`), getMoveContent(moveName, options)))
}