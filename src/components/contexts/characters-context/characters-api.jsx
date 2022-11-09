import mapObject, { mapObjectSkip } from 'map-obj'
import { mergeAdapters } from '../game-adapters-context'

export default class CharactersAPI {
  constructor ({ user, rules, adapters }) {
    Object.assign(this, { user, rules, adapters })
    this.STATUS = { ONLINE: 'online', OFFLINE: 'offline', SYNCING: 'syncing' }
  }

  async load () {
    const chars = []
    const raws = (await this.user.callFunction('getCharacters'))
    for (let raw of raws) chars.push(await this.parse(raw))
    return chars
  }

  async parse (raw) {
    const character = await (await this.rules.get(raw.rulebooks)).characters.load(raw)
    character.id = raw._id

    character.adapter = mergeAdapters(character.rulebooks.map(rulebook => rulebook.split(' ')).map(([game, rulebook]) => this.adapters[game][rulebook]))

    character.save = async () => this.save(character)
    character.delete = async () => this.delete(character)

    character.settings = new CharacterSettings(raw.settings, character.adapter)
    await character.settings.init(character)

    character.STATUS = this.STATUS
    character.status = this.STATUS.ONLINE
    character.requests = 0

    return character
  }

  async create (character, { user }) {
    return (await user.callFunction('createCharacter', { character: { ...character.toJson(), settings: { plan: 'manual' } } })).insertedId
  }

  async save (character) {
    character.requests += 1
    character.status = this.STATUS.SYNCING
    await this.user.callFunction('updateCharacter', {
      id: character.id.toString(),
      character: { ...character.toJson(), settings: character.settings.raw }
    })
    character.requests -= 1
    character.status = (character.requests === 0) ? this.STATUS.ONLINE : this.STATUS.SYNCING
  }

  async delete (character) {
    await this.user.callFunction('deleteCharacter', { id: character.id.toString() })
    return true
  }
}

class CharacterSettings {
  constructor (settings, adapter) {
    this.rawSettings = settings
    this.adapter = adapter
  }

  async init (character) {
    for (let key in this.adapter.settings) {
      const setting = this.adapter.settings[key]
      if (setting.universal && !this.rawSettings.hasOwnProperty(key)) {
        this.rawSettings[key] = setting.defaultValue || await character.get(setting.initializationFormula)
      }
    }
  }

  get raw () {
    return this.rawSettings
  }

  get calculated () {
    return { ...this.rawSettings, ...this._planValues() }
  }

  get (field) {
    return this.calculated[field]
  }

  set (field, value) {
    this.rawSettings[field] = value
  }

  setPlan (plan) {
    this.rawSettings.plan = plan
  }

  setMultiple (settings) {
    Object.entries(settings).forEach(([field, value]) => this.set(field, value))
  }

  _planValues () {
    if (!this.rawSettings.plan) return {}
    return mapObject(this.adapter.settings, (name, setting) => setting[this.rawSettings.plan] ? [name, setting[this.rawSettings.plan]] : mapObjectSkip)
  }

  static PLANS = [{ name: 'manual', description: 'Just like a character sheet' }, { name: 'automatic', description: 'Does everything for you' }]
}
