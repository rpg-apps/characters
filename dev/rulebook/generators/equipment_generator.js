const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const Promise = require('bluebird')
const { camelCase, capitalCase, snakeCase, constantCase } = require('change-case')

const writeFileAsync = Promise.promisify(fs.writeFile)
const readFileAsync = Promise.promisify(fs.readFile)

function getEquipmentContent (equipmentName, options) {
	const tags = Object.entries(options)
		.map(([key, value]) => {
			if (value === true) {
				return constantCase(key)
			} else if (value !== false && value !== undefined) {
				return `${constantCase(key)}('${value}')`
			}
		})
		.filter(Boolean)

	return `import Equipment, { TAGS } from './equipment'

const ${camelCase(equipmentName)} = new Equipment({
	name: '${capitalCase(equipmentName)}',
	tags: [${tags.map(tag => `TAGS.${tag}`).join(', ')}]
})

export default ${camelCase(equipmentName)}`
}

exports.createEquipment = function createEquipment (eqipmentName, options) {
    console.log(`Building equipment ${capitalCase(eqipmentName)}`)

    let filePath = path.resolve(process.cwd(), 'rulebook', 'equipment')
    return mkdirp(filePath)
      .then(() => writeFileAsync(path.resolve(filePath, `${snakeCase(eqipmentName)}.js`), getEquipmentContent(eqipmentName, options)))
}