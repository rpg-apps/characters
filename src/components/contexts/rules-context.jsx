import React, { useContext, createContext } from 'react'
import load from '@rpg-apps/rpg-js'
import Promise from 'bluebird'

const RulesContext = createContext()

export const useRules = () => useContext(RulesContext)

export function WithRules ({ children }) {
  const cache = {}

  const set = (rulebooks, rules) => { cache[key(rulebooks)] = rules }

  const get = rulebooks => {
    if (!cache[key(rulebooks)]) {
      const promise = Promise.resolve().then(() => load(rulebooks))
      set(rulebooks, promise)
      return promise
    }
    return cache[key(rulebooks)]
  }

  const key = rulebooks => rulebooks.join('/')

  return <RulesContext.Provider value={{ get, set }}>{children}</RulesContext.Provider>
}
