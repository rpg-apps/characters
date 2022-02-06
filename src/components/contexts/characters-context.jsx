import React, { useState, useEffect, useCallback, useContext, createContext } from 'react'
import Loader from '../presentation/loader'

import { useAuth } from './auth-context'
import { useRules } from './rules-context'

import { PLANS, adaptersForCharacters } from '../../games'

const CharactersContext = createContext()

export const useCharacters = () => useContext(CharactersContext)

export function WithCharacters ({ children }) {
  const { user } = useAuth()
  const rules = useRules()
  const [characterJsons, setCharacterJsons] = useState(false)
  const [characters, setCharacters] = useState(false)

  const load = useCallback(async () => {
    setCharacterJsons(await user.callFunction('getCharacters'))
  }, [user])

  useEffect(() => { load() }, [user, load])

  useEffect(() => {
    (async () => {
      if (!characterJsons)  return
      const chars = []
      for (const json of characterJsons) {
        const character = await (await rules.get(json.rulebooks)).characters.load(json)
        character.settings = json.settings
        character.adapters = adaptersForCharacters(character)
        character.plans = PLANS.map(plan => ({ ...plan, settings: character.adapters.reduce((planSettings, adapter) => ({ ...planSettings, ...adapter[plan.name] }), { }) }))
        character.id = json._id
        character.save = async () => await user.callFunction('updateCharacter', { id: character.id.toString(), character: Object.assign(character.toJson(), { settings: character.settings }) })
        character.delete = async () => {
          await user.callFunction('deleteCharacter', { id: character.id.toString() })
          await load()
        }
        character.setSettings = settings => {
          character.settings = settings
          character.calculatedSettings = (character.plans.find(plan => plan.name === settings)?.settings || settings)
        }
        character.setSettings(character.settings)
        chars.push(character)
      }
      chars.create = async character => {
        const id = (await user.callFunction('createCharacter', { character })).insertedId
        await load()
        return id
      }
      setCharacters(chars)
    }) ()
  }, [user, rules, characterJsons, load])

  if (!characters) return <Loader className='home page' />

  return <CharactersContext.Provider value={characters}>{children}</CharactersContext.Provider>
}
