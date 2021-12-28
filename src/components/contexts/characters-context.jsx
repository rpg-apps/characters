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
  }, [])

  useEffect(() => {
    (async () => {
      if (!characterJsons)  return
      const chars = []
      for (const json of characterJsons) {
        const char = await (await rules.get(json.rulebooks)).characters.load(json)
        char.id = json._id
        chars.push(char)
      }
      setCharacters(chars)
    }) ()
  }, [user, rules, characterJsons])

  if (!characters) return <Loader className='home page' />

  return <CharactersContext.Provider value={characters}>{children}</CharactersContext.Provider>
}
