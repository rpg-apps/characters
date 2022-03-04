import React, { useContext, createContext } from 'react'
import load from '@rpg-apps/rpg-js'
import { useMemoryCache } from '../hooks/cache.jsx'

const RulesContext = createContext()

export const useRules = () => useContext(RulesContext)

export function WithRules ({ children }) {
  const cache = useMemoryCache(load, rulebooks => rulebooks.join('/'))
  return <RulesContext.Provider value={cache}>{children}</RulesContext.Provider>
}
