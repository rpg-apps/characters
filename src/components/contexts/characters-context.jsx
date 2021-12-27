import React, { useState, useEffect, useContext, createContext } from 'react'
import Loader from '../presentation/loader'

import { useAuth } from './auth-context'
import { useRules } from './rules-context'

const CharactersContext = createContext()

export const useCharacters = () => useContext(CharactersContext)

export function WithCharacters ({ children }) {
  const { user } = useAuth()
  const rules = useRules()
  const [characters, setCharacters] = useState(false)

  useEffect(() => {
    (async () => {
      const characterJsons = await user.callFunction('getCharacters')
      const chars = []
      for (const json of characterJsons) {
        const char = await (await rules.get(json.rulebooks)).characters.load(json)
        char.id = json._id
        chars.push(char)
      }
      setCharacters(chars)
    }) ()
  }, [user, rules])

  if (!characters) return <Loader className='home page' />

  return <CharactersContext.Provider value={characters}>{children}</CharactersContext.Provider>
}
