const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')

const writeFileAsync = Promise.promisify(fs.writeFile)
const readFileAsync = Promise.promisify(fs.readFile)

const filePath = path.resolve(process.cwd(), 'rulebook-tmp.json')

exports.load = () => {
    console.log('Loading constants')
    return (fs.existsSync(filePath) ? Promise.resolve() : writeFileAsync(filePath, '{}'))
        .then(() => readFileAsync(filePath, 'utf-8'))
        .then(content => JSON.parse(content))
}

exports.set = (key, value) => {
    return exports.load().then(constants => {
        constants[key] = value
        console.log('Writing constant')
        return writeFileAsync(filePath, JSON.stringify(constants))
    })
}

exports.merge = options => {
	options = Object.entries(options)
		.filter(([key, value]) => value !== undefined)
		.reduce((obj, [key, value]) => Object.assign(obj, { [key]: value }), {})
	return exports.load().then(constants => {
		return Object.assign({}, options, constants)
	})
}