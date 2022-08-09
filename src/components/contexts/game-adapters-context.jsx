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
  return adapters.reduce((result, adapter) => {
    result.characterSheet = merge(result.characterSheet, adapter.characterSheet)
    result.characterCard = merge(result.characterCard, adapter.characterCard)
    result.css = result.css + adapter.css
    result.assets = result.assets.concat(adapter.assets)
    result.settings = result.settings.concat(adapter.settings)
    return result
  }, { characterSheet: {}, characterCard: {}, css: '', assets: [], settings: [] })
}

export function WithAdapters ({ children }) {
  const { user } = useAuth()
  const [adapters, setAdapters] = useState(false)

  const load = useCallback(async () => {
    const adaptersArray = await user.callFunction('getAdapters')
    setAdapters(adaptersArray.reduce((all, adapter) => {
      if (!all[adapter.game]) { all[adapter.game] = { } }
      all[adapter.game][adapter.rulebook] = adapter
      return all
    }, { }))
  }, [user])

  useEffect(() => { load() }, [user, load])

  if (!adapters) return <Loader className='home page' />

  return <GameAdaptersContext.Provider value={merge(localAdapters, adapters)}>{children}</GameAdaptersContext.Provider>
}
