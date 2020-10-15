const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const Promise = require('bluebird')
const { camelCase, capitalCase, snakeCase } = require('change-case')

const writeFileAsync = Promise.promisify(fs.writeFile)
const readFileAsync = Promise.promisify(fs.readFile)

const CLASSIC_ROLLS = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha']

const PLAYBOOK_DIRS = {
	'race-move': 'race_moves',
	'starting-move': 'starting_moves',
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
  	if (options.condition) { procedure.push('condition') }
	if (options.stat) { procedure.push('changeStat, STATS') }
	if (options.constant) { procedure.push('CONSTANT') }
  	if (options.multiple) { procedure.push('multipleEffects') }
  	if (options.noEffect) { procedure.push('NO_EFFECT') }

	return `import Move, { Procedure } from '../move'
${(options.replaces || options.requires) ? `import ${camelCase(options.replaces || options.requires)} from '../advanced_moves_2_5/${snakeCase(options.replaces || options.requires)}'
` : ''}
const { ${procedure.join(', ')} } = Procedure

const ${camelCase(moveName)} = new Move({
	title: '${capitalCase(moveName)}',
	text: 
\`${options.text ? options.text : (options.trigger ? options.trigger : '')}\`,

	procedure: new Procedure(${options.constant ? 'CONSTANT' : `\'${options.trigger ? options.trigger : ''}\'`}, ${options.effect ? options.effect :
		(CLASSIC_ROLLS.includes(options.roll) ? `roll('roll+${options.roll}', {
		success: '${options.success || ''}',
		partialSuccess: '${options.partialSuccess || ''}',
		miss: '${options.miss || ''}'
	})` : (options.multiclass ? 'multiclass()' : ''))})${(options.replaces || options.requires) ? `,

    ${options.replaces ? 'replaces' : 'requires'}: ${camelCase(options.replaces || options.requires)}` : ''}
})

export default ${camelCase(moveName)}`
}

const PLAYBOOK_INDEX_IMPORT_HOOKS = {
	'race-move': '// race moves imports',
	'starting-move': '// starting moves imports',
	'advanced-2-5': '// advanced 2-5 moves imports',
	'advanced-6-10': '// advanced 6-10 moves imports'
}

const PLAYBOOK_INDEX_EXPORT_HOOKS = {
	'race-move': 'raceMoves: {',
	'starting-move': 'startingMoves: {',
	'advanced-2-5': 'advancedMoves2_5: {',
	'advanced-6-10': 'advancedMoves6_10: {'
}

function addMoveToPlaybookIndex (moveName, playbook, moveType) {
	const indexPath = path.resolve(process.cwd(), 'rulebook', 'moves', 'playbook_moves', playbook, 'index.js')
	readFileAsync(indexPath, 'utf8').then(indexContent => {
		const newIndexContent = indexContent
			.replace(PLAYBOOK_INDEX_IMPORT_HOOKS[moveType],
`${PLAYBOOK_INDEX_IMPORT_HOOKS[moveType]}
import ${camelCase(moveName)} from './${PLAYBOOK_DIRS[moveType]}/${snakeCase(moveName)}'`)
		.replace(PLAYBOOK_INDEX_EXPORT_HOOKS[moveType],
			`${PLAYBOOK_INDEX_EXPORT_HOOKS[moveType]}
		${camelCase(moveName)},`)

		return writeFileAsync(indexPath, newIndexContent)
	})
}

exports.createMove = function createMove (moveName, options) {
    console.log(`Building move ${capitalCase(moveName)}`)

    if (options.type == 'race') {
    	options.type = 'race-move'
    } else if (options.type === 'starting') {
    	options.type = 'starting-move'
    }

    let filePath = path.resolve(process.cwd(), 'rulebook', 'moves')
    if (Boolean(options.playbook) !== Boolean(options.type)) {
      console.error('<playbook> and <type> options must come together')
      process.exit(1)
    }
    if (options.playbook) {
      filePath = path.resolve(filePath, 'playbook_moves', options.playbook, PLAYBOOK_DIRS[options.type])

      addMoveToPlaybookIndex(moveName, options.playbook, options.type)
    }
    mkdirp(filePath)
      .then(() => writeFileAsync(path.resolve(filePath, `${snakeCase(moveName)}.js`), getMoveContent(moveName, options)))
}