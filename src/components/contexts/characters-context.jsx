import React, { useState, useEffect, useContext, createContext } from 'react'
import Loader from '../presentation/loader'

import { useAuth } from './auth-context'
import { useRules } from './rules-context'
import { useAdapters, mergeAdapters } from './game-adapters-context'

const CharactersContext = createContext()

export const useCharacters = () => useContext(CharactersContext)

export function WithCharacters ({ children }) {
  const { user } = useAuth()
  const rules = useRules()
  const adapters = useAdapters()
  const [characters, setCharacters] = useState(false)

  useEffect(() => {
    const load = async () => {
      const api = new CharactersAPI({ user, rules, adapters })
      const newCharacters = await api.load()
      newCharacters.create = async raw => {
        const id = await api.create(raw, { user, rules, adapters })
        await load()
        return id
      }
      await setCharacters(newCharacters)
    }

    load ()
  }, [user, rules, adapters])

  if (!characters)
    return <Loader className='home page' />

  return <CharactersContext.Provider value={characters}>{children}</CharactersContext.Provider>
}

class CharactersAPI {
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
    character.plans = [
      { name: 'manual',     description: 'Just like a character sheet', settings: Object.fromEntries(character.adapter.settings.map(setting => [setting.name, setting.manual]))    },
      { name: 'automatic',  description: 'Does everything for you',     settings: Object.fromEntries(character.adapter.settings.map(setting => [setting.name, setting.automatic])) }
    ]

    character.save = async () => this.save(character)
    character.delete = async () => this.delete(character)
    character.setSettings = async settings => this.setSettings(character, settings)

    character.STATUS = this.STATUS
    character.status = this.STATUS.ONLINE

    character.on('change:start', () => { character.status = this.STATUS.SYNCING })
    character.on('change:over', async () => {
      await character.save()
      character.status = this.STATUS.ONLINE
    })

    character.setSettings(raw.settings || {})
    return character
  }

  async create (character, { user }) {
    return (await user.callFunction('createCharacter', { character })).insertedId
  }

  async save (character) {
    await this.user.callFunction('updateCharacter', {
      id: character.id.toString(),
      character: Object.assign(character.toJson(), { settings: character.settings })
    })
  }

  async delete (character) {
    await this.user.callFunction('deleteCharacter', { id: character.id.toString() })
    return true
  }

  async setSettings (character, settings) {
    character.universalSettinsg = Object.fromEntries(character.adapter.settings.filter(setting => setting.universal).map(setting => ([setting.name, settings[setting.name] || setting.value])))
    character.settings = settings
    character.calculatedSettings = { ...(character.plans.find(plan => plan.name === settings)?.settings || settings), ...character.universalSettinsg }
  }
}

