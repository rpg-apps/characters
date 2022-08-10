const fs = require('fs')
const path = require('path')
const mkdir = require('mkdir')
const caporal = require('caporal')
const { headerCase, pascalCase } = require('change-case')

const ADAPTERS_FOLDER = path.join(__dirname, '..', 'src', 'adapters')
const INDEX_FILE = path.join(ADAPTERS_FOLDER, 'index.js')
const GAME_FOLDER = game => path.join(ADAPTERS_FOLDER, game)
const GAME_FILE = game => path.join(ADAPTERS_FOLDER, game, 'index.js')
const RULEBOOK_FILE = (game, rulebook) => path.join(ADAPTERS_FOLDER, game, `${rulebook}.js`)

const ADAPTER_TEMPLATE = (game, rulebook) => `export default ${JSON.stringify({ game, rulebook, 'character-sheet': {}, 'character-card': {}, css: {}, assets: [], settings: [] })}`
const INDEX_FILE_TEMPLATE = `
let adapters = []
// assignment
export default adapters
`
const GAME_FILE_TEMPLATE = `
const game = []
// assignment
export default game
`

const validateDirExistance = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}

const updateFile = (path, callback, fallback='') => {
  fs.writeFileSync(path, callback(fs.existsSync(path) ? fs.readFileSync(path) : fallback, path))
}

caporal.name('adapters').version('v1').description('manage game UI adapters')
  .command('new', 'Create a new adapter in the dev folder')
  .argument('<game>', 'The name of the adapter game')
  .argument('<rulebook>', 'The name of the adapter rulebook in the game (default is core)', /.*/, 'core')
  .action(({ game, rulebook }) => {
    validateDirExistance(ADAPTERS_FOLDER)
    validateDirExistance(GAME_FOLDER(game))

    if (fs.existsSync(RULEBOOK_FILE(game, rulebook))) {
      throw new Error('Rulebook exists, please delete before creating a new one')
    }

    updateFile(INDEX_FILE, content =>
      `import ${pascalCase(game)} from './${headerCase(game).toLowerCase()}';
      ${content.replace('// assignment', `adapters = adapters.concat(${pascalCase(game)});
      // assignment`)}`, INDEX_FILE_TEMPLATE)

    updateFile(GAME_FILE(game), content =>
      `import ${pascalCase(rulebook)} from './${headerCase(rulebook).toLowerCase()}';
      ${content.replace('// assignment', `game.push(${pascalCase(rulebook)});
      // assignment`)}`, GAME_FILE_TEMPLATE)

    fs.writeFileSync(RULEBOOK_FILE(game, rulebook), ADAPTER_TEMPLATE(game, rulebook))
  })
  .command('delete', 'Delete an adapter from DB.')
  .command('clear', 'Clears the local cache of adapters.')
  .command('pull', 'Load an adapter from the DB to the local cache.')
  .command('push', 'Save an adapter to the DB')
  .command('assets', 'Manage assets such as images and icons')

caporal.parse(process.argv)
