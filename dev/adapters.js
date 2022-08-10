const fs = require('fs')
const path = require('path')
const mkdir = require('mkdir')
const caporal = require('caporal')
const promptPassword = require('password-prompt')
const { headerCase, pascalCase } = require('change-case')
const Realm = require('realm')

const DEVELOPMENT_REALM_APP_ID = 'rpg-apps-test-zyzfm'
const ADAPTERS_FOLDER = path.join(__dirname, '..', 'src', 'adapters')
const INDEX_FILE = path.join(ADAPTERS_FOLDER, 'index.js')
const GAME_FOLDER = game => path.join(ADAPTERS_FOLDER, game)
const GAME_FILE = game => path.join(ADAPTERS_FOLDER, game, 'index.js')
const RULEBOOK_FILE = (game, rulebook) => path.join(ADAPTERS_FOLDER, game, `${rulebook}.js`)
const ADMIN = 'idanstark42@gmail.com'

const ADAPTER_TEMPLATE = (game, rulebook) => `export default ${JSON.stringify({ game, rulebook, 'character-sheet': {}, 'character-card': {}, css: {}, settings: [] })}`
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

// file system

const validateDirExistance = path => {
  if (!fs.existsSync(path)) fs.mkdirSync(path)
}

const validateFile = (path, fallback) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, fallback)
}

const updateFile = (path, callback, fallback='') => {
  fs.writeFileSync(path, callback(fs.existsSync(path) ? fs.readFileSync(path).toString() : fallback, path))
}

function addRulebookToGame (game, rulebook) {
  if (fs.existsSync(RULEBOOK_FILE(game, rulebook))) throw new Error('Rulebook exists, please clear cache before creating a new one')

  updateFile(GAME_FILE(game),
    content => `import ${pascalCase(rulebook)} from './${headerCase(rulebook).toLowerCase()}'; ${content.replace('// assignment', `game.push(${pascalCase(rulebook)}); // assignment`)}`,
    GAME_FILE_TEMPLATE)
}

function addGameToIndex (game) {
  if (fs.readFileSync(INDEX_FILE).toString().includes(pascalCase(game)))  return

  updateFile(INDEX_FILE,
    content => `import ${pascalCase(game)} from './${headerCase(game).toLowerCase()}';${content.replace('// assignment', `adapters = adapters.concat(${pascalCase(game)}); // assignment`)}`,
    INDEX_FILE_TEMPLATE)
}

// realm

function realmApp () {
  const app = new Realm.App({ id: DEVELOPMENT_REALM_APP_ID })
  return promptPassword('password: ').then(password => {
    app.logIn(Realm.Credentials.emailPassword(ADMIN, password))
    return app.currentUser
  })
}

// actions

function prepare () {
  validateDirExistance(ADAPTERS_FOLDER)
  validateFile(INDEX_FILE, INDEX_FILE_TEMPLATE)
}

function create ({ game, rulebook }) {
  validateDirExistance(ADAPTERS_FOLDER)
  validateDirExistance(GAME_FOLDER(game))

  addRulebookToGame(game, rulebook)
  addGameToIndex(game)
  fs.writeFileSync(RULEBOOK_FILE(game, rulebook), ADAPTER_TEMPLATE(game, rulebook))
}

function destroy ({ game, rulebook }) {
  return realmApp()
    .then(user => user.callFunction('deleteAdapter', [{ game, rulebook }]))
    .then(() => process.exit(0))
}

function clearCache () {
  validateDirExistance(ADAPTERS_FOLDER)
  fs.readdirSync(ADAPTERS_FOLDER).filter(file => file !== 'index.js').forEach(folder => {
    fs.rmdirSync(path.join(ADAPTERS_FOLDER, folder), { recursive: true })
  })
  fs.writeFileSync(INDEX_FILE, INDEX_FILE_TEMPLATE)
}

function pull ({ game, rulebook }) {
  validateDirExistance(ADAPTERS_FOLDER)
  validateDirExistance(GAME_FOLDER(game))

  addRulebookToGame(game, rulebook)
  addGameToIndex(game)
  return realmApp()
    .then(user => user.callFunction('pullAdapter', [{ game, rulebook }]))
    .then(([adapter]) => {
      if (!adapter) throw new Error('Rulebook not found')
      return fs.writeFileSync(RULEBOOK_FILE(game, rulebook), `export default ${JSON.stringify(adapter, null, 2).replace(/"_id":.+?,/, '')}`)
    }).then(() => process.exit(0))
}

function push ({ game, rulebook }) {
  if (!fs.existsSync(RULEBOOK_FILE(game, rulebook))) throw new Error('Rulebook not found')

  const adapter = JSON.parse(fs.readFileSync(RULEBOOK_FILE(game, rulebook)).toString().replace('export default ', ''))
  return realmApp()
    .then(user => user.callFunction('pushAdapter', [{ adapter }]))
    .then(() => process.exit(0))
}

caporal.name('adapters').version('v1').description('manage game UI adapters')
  .command('prepare', 'Make sure everything needed to run is ready')
  .action(prepare)
  .command('new', 'Create a new adapter in the dev folder')
  .argument('<game>', 'The name of the adapter game')
  .argument('<rulebook>', 'The name of the adapter rulebook in the game (default is core)', /.*/, 'core')
  .action(create)
  .command('delete', 'Delete an adapter from DB.')
  .argument('<game>', 'The name of the adapter game')
  .argument('<rulebook>', 'The name of the adapter rulebook in the game (default is core)', /.*/, 'core')
  .action(destroy)
  .command('clear', 'Clears the local cache of adapters.')
  .action(clearCache)
  .command('pull', 'Load an adapter from the DB to the local cache.')
  .argument('<game>', 'The name of the adapter game')
  .argument('<rulebook>', 'The name of the adapter rulebook in the game (default is core)', /.*/, 'core')
  .action(pull)
  .command('push', 'Save an adapter to the DB')
  .argument('<game>', 'The name of the adapter game')
  .argument('<rulebook>', 'The name of the adapter rulebook in the game (default is core)', /.*/, 'core')
  .action(push)

caporal.parse(process.argv)
