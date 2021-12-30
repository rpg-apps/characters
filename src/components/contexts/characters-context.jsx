import React, { useState, useEffect, useContext, createContext } from 'react'
import Loader from '../presentation/loader'

import { useAuth } from './auth-context'
import { useRules } from './rules-context'

const CharactersContext = createContext()

export const useCharacters = () => useContext(CharactersContext)

export function WithCharacters ({ children }) {
  const { user } = useAuth()
  const rules = useRules()
  const [characterJsons, setCharacterJsons] = useState(false)
  const [characters, setCharacters] = useState(false)

  useEffect(() => {
    (async () => setCharacterJsons(await user.callFunction('getCharacters'))) ()
  }, [user])

  useEffect(() => {
    (async () => {
      if (!characterJsons)  return
      const chars = []
      for (const json of characterJsons) {
        const character = await (await rules.get(json.rulebooks)).characters.load(json)
        character.id = json._id
        character.save = async () => await user.callFunction('updateCharacter', { id: character.id.toString(), character: character.toJson() })
        chars.push(character)
      }
      setCharacters(chars)
    }) ()
  }, [user, rules, characterJsons])

  if (!characters) return <Loader className='home page' />

  return <CharactersContext.Provider value={characters}>{children}</CharactersContext.Provider>
}
