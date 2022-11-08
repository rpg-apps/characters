import { useState, useEffect, useContext, createContext } from 'react'
import Loader from '../../presentation/loader'

import { useAuth } from '../auth-context'
import { useRules } from '../rules-context'
import { useAdapters } from '../game-adapters-context'

import CharactersAPI from './characters-api'

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
