import React, { useState, useContext, createContext } from 'react'
import load from '@rpg-apps/rpg-js'

import { useAuth } from './auth-context'

const RulesContext = createContext()

export const useRules = () => useContext(RulesContext)

export function WithRules ({ children }) {
  const { user } = useAuth()
  const [cache, setCache] = useState({})

  const set = async (rulebooks, rules) => await setCache({ ...cache, [key(rulebooks)]: rules })

  const get = async rulebooks => {
    if (!cache[key(rulebooks)]) {
      const rules = await load(rulebooks)
      rules.characters.builder.afterFinish = async () => await user.callFunction('createCharacter', { character: rules.characters.builder.character.toJson() })
      await set(rulebooks, rules)
      return rules
    }
    return cache[key(rulebooks)]
  }

  const key = rulebooks => rulebooks.join('/')

  return <RulesContext.Provider value={{ get, set }}>{children}</RulesContext.Provider>
}
