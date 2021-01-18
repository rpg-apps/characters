const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const Promise = require('bluebird')
const writeFileAsync = Promise.promisify(fs.writeFile)
const { camelCase, capitalCase, snakeCase } = require('change-case')

const MOVES_INDEX_STARTING_CONTENT = `
// race moves imports

// starting moves imports

// advanced 2-5 moves imports

// advanced 6-10 moves imports

export default {
	raceMoves: {
	},
	startingMoves: {
	},
	advancedMoves2_5: {
	},
	advancedMoves6_10: {
	}
}`

const ALIGNMENTS = ['good', 'evil', 'chaotic', 'lawful', 'neutral']

function getPlaybookContent (playbookName, options) {
	if (!Array.isArray(options.race)) {
		options.race = options.race ? [options.race] : []
	}

	if (!Array.isArray(options.look)) {
		options.look = options.look ? [options.look] : []
	}

	if (!Array.isArray(options.bond)) {
		options.bond = options.bond ? [options.bond] : []
	}

	['eyes', 'hair', 'clothes', 'build', 'skin', 'voice'].filter(lookOptionKey => Boolean(options[lookOptionKey])).forEach(lookOptionKey => {
		options.look.push(`${lookOptionKey}: ${options[lookOptionKey]}`)
	})

	return `import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/${snakeCase(playbookName)}'

const ${camelCase(playbookName)} = new Playbook({
	optionalNames: {
		${options.race.map(race => 
		`${race.split(':')[0].trim()}: [${race.split(':')[1].replace('or ', '').split(',').map(nameOption => 
			`'${nameOption.trim()}'`).join(', ')}]`).join(`,
		`)}
	},
	${Boolean(options.titles) ? `optionalTitles: [${options.titles.split(',').map(titleOption => `'${titleOption.trim()}'`).join(', ')}],
	` : ''}
	optionalLook: {
		${options.look.map(lookChoice => 
		`${lookChoice.split(':')[0].trim()}: [${lookChoice.split(':')[1].split(',').map(lookOption => 
			`'${lookOption.trim()}'`).join(', ')}]`).join(`,
		`)}
	},
	maxHP: '${options.hp}',
	baseDamage: '${options.damage}',
	load: '${options.load}',
	alignmentOptions: [
		${ALIGNMENTS.map(alignment => Boolean(options[alignment]) ? `new Playbook.Alignment('${alignment}', '${options[alignment]}')` : undefined)
		.filter(x => Boolean(x)).join(`,
		`)}
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		${options.bond.map(bond => `new Playbook.BondOption('${bond}')`).join(`,
		`)}
	],
	characterBuildingChoices: [
	]
})

export default ${camelCase(playbookName)}
`
}

exports.createPlaybook = function createPlaybook (playbookName, options) {
    console.log(`Building playbook ${capitalCase(playbookName)}`)
    let filePath = path.resolve(process.cwd(), 'rulebook', 'playbooks')
    let movesDir = path.resolve(process.cwd(), 'rulebook', 'moves', 'playbook_moves', snakeCase(playbookName))
    return mkdirp(filePath)
      .then(() => writeFileAsync(path.resolve(filePath, `${snakeCase(playbookName)}.js`), getPlaybookContent(playbookName, options)))
      .then(() => mkdirp(movesDir))
      .then(() => Promise.all([
      	mkdirp(path.resolve(movesDir, 'starting_moves')),
      	mkdirp(path.resolve(movesDir, 'advanced_moves_2_5')),
      	mkdirp(path.resolve(movesDir, 'advanced_moves_6_10')),
      	mkdirp(path.resolve(movesDir, 'race_moves')),
      	writeFileAsync(path.resolve(movesDir, 'index.js'), MOVES_INDEX_STARTING_CONTENT)
      ]))
}