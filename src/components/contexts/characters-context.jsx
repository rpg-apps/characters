import React, { useState, useEffect, useCallback, useContext, createContext } from 'react'
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
  const [characterJsons, setCharacterJsons] = useState(false)
  const [characters, setCharacters] = useState(false)

  const load = useCallback(async () => { setCharacterJsons(await user.callFunction('getCharacters')) }, [user])
  useEffect(() => { load() }, [user, load])

  const parseCharacter = useCallback(async rawCharacter => {
    const character = await (await rules.get(rawCharacter.rulebooks)).characters.load(rawCharacter)
    Object.assign(character, {
      id: rawCharacter._id,
      adapter: mergeAdapters(character.rulebooks.map(rulebook => rulebook.split(' ')).map(([game, rulebook]) => adapters[game][rulebook])),
      save: async () => await user.callFunction('updateCharacter', {
        id: character.id.toString(),
        character: Object.assign(character.toJson(), { settings: character.settings })
      }),
      delete: async () => {
        await user.callFunction('deleteCharacter', { id: character.id.toString() })
        await load()
      },
      setSettings: settings => {
        character.settings = settings
        character.calculatedSettings = (character.plans.find(plan => plan.name === settings)?.settings || settings)
      },
    })
    character.plans = [
      { name: 'manual',     description: 'Just like a character sheet', settings: Object.fromEntries(character.adapter.settings.map(setting => [setting.name, setting.manual]))    },
      { name: 'automatic',  description: 'Does everything for you',     settings: Object.fromEntries(character.adapter.settings.map(setting => [setting.name, setting.automatic])) }
    ]
    character.setSettings(rawCharacter.settings)
    return character
  }, [user, rules, adapters, load])

  const parseCharacters = useCallback(async rawCharacters => {
    const chars = []
    for (const rawCharacter of rawCharacters) {
      chars.push(await parseCharacter(rawCharacter))
    }
    chars.create = async character => {
      const id = (await user.callFunction('createCharacter', { character })).insertedId
      await load()
      return id
    }
    return chars
  }, [user, load, parseCharacter])

  useEffect(() => { (async () => {
    if (!characterJsons)  return
    setCharacters(await parseCharacters(characterJsons))
  })() }, [user, rules, characterJsons, parseCharacters])

  if (!characters)
    return <Loader className='home page' />

  return <CharactersContext.Provider value={characters}>{children}</CharactersContext.Provider>
}
