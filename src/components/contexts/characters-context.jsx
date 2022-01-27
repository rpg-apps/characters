import React, { useState, useEffect, useContext, createContext } from 'react'
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

  const load = async () => {
    setCharacterJsons(await user.callFunction('getCharacters'))
  }

  useEffect(() => { load() }, [user])

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
        character.save = async () => await user.callFunction('updateCharacter', { id: character.id.toString(), character: character.toJson() })
        character.delete = async () => {
          await user.callFunction('deleteCharacter', { id: character.id.toString() })
          await load()
        }
        chars.push(character)
      }
      chars.create = async character => {
        const id = (await user.callFunction('createCharacter', { character })).insertedId
        await load()
        return id
      }
      setCharacters(chars)
    }) ()
  }, [user, rules, characterJsons])

  if (!characters) return <Loader className='home page' />

  return <CharactersContext.Provider value={characters}>{children}</CharactersContext.Provider>
}
