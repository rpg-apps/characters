import React, { useState, useEffect, useCallback, useContext, createContext } from 'react'
import merge from 'deepmerge'

import { useAuth } from './auth-context'

import Loader from '../presentation/loader'
import localAdapters from '../../adapters'

const GameAdaptersContext = createContext()

export const useAdapters = () => useContext(GameAdaptersContext)

export const useSupportedRulebooks = () => {
  const adapters = useContext(GameAdaptersContext)
  return adapters.map(adapter => `${adapter.game} ${adapter.rulebook}`)
}

export const mergeAdapters = adapters => {
  return adapters.reduce((result, adapter) => ({
    characterSheet: merge(result.characterSheet, adapter['character-sheet']),
    characterCard:  merge(result.characterCard, adapter['character-card']),
    assets:         result.assets.concat(adapter.assets),
    settings:       result.settings.concat(adapter.settings)
  }), { characterSheet: {}, characterCard: {}, css: {}, assets: [], settings: [] })
}

const addCSS = (game, rulebook, cssObject) => {
  const css = Object.entries(cssObject)
    .map(([selector, attributes]) => `.character.${game}.${rulebook}${selector}{${Object.entries(attributes).map(([key, val]) => `${key}:${val};`).join('')}}`)
    .join('')
  document.head.innerHTML += `<style>${css}</style>`
}

export function WithAdapters ({ children }) {
  const { user } = useAuth()
  const [adapters, setAdapters] = useState(null)

  const load = useCallback(async () => {
    const adaptersArray = (await user.callFunction('getAdapters')).concat(localAdapters).filter(adapter => Boolean(adapter.game))
    setAdapters(adaptersArray.reduce((all, adapter) => {
      if (!all[adapter.game]) { all[adapter.game] = { } }
      all[adapter.game][adapter.rulebook] = adapter
      return all
    }, { }))

    adaptersArray.forEach(adapter => addCSS(adapter.game, adapter.rulebook, adapter.css))
    console.log(adaptersArray)
  }, [user])

  useEffect(() => { load() }, [user, load])

  if (!adapters) return <Loader className='home page' />

  return <GameAdaptersContext.Provider value={adapters}>{children}</GameAdaptersContext.Provider>
}
