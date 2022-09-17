import React, { useState, useEffect, useCallback, useContext, createContext } from 'react'
import { Global } from '@emotion/react'
import merge from 'deepmerge'
import uniq from 'uniq'
import mapObject from 'map-obj'

import { useAuth } from './auth-context'

import Loader from '../presentation/loader'
import localAdapters from '../../adapters'

const GameAdaptersContext = createContext()

export const useAdapters = () => useContext(GameAdaptersContext)

export const useSupportedRulebooks = () => {
  const adapters = useContext(GameAdaptersContext)
  return Object.entries(adapters).reduce((rulebooks, [game, gameRulebooks]) => rulebooks.concat(Object.keys(gameRulebooks).map(rulebook => `${game} ${rulebook}`)), [])
}

export const mergeAdapters = adapters => {
  return adapters.reduce((result, adapter) => ({
    components:     merge(result.components, adapter.components),
    assets:         result.assets.concat(adapter.assets),
    settings:       result.settings.concat(adapter.settings)
  }), { components: {}, css: {}, assets: [], settings: [] })
}

const adapterCSS = (game, rulebook, cssObject, fonts) => mapObject(cssObject, (selector, rules) => [`.character.${game}.${rulebook}${selector}`, rules])

export function WithAdapters ({ children }) {
  const { user } = useAuth()
  const [adapters, setAdapters] = useState(null)
  const [styles, setStyles] = useState({})
  const [fonts, setFonts] = useState([])

  const load = useCallback(async () => {
    const adaptersArray = uniq(localAdapters.concat(await user.callFunction('getAdapters')).filter(adapter => Boolean(adapter.game)), (adapter1, adapter2) => (adapter1.game === adapter2.game && adapter1.rulebook === adapter2.rulebook) ? 0 : 1)
    setAdapters(adaptersArray.reduce((all, adapter) => {
      if (!all[adapter.game]) { all[adapter.game] = { } }
      all[adapter.game][adapter.rulebook] = adapter
      return all
    }, { }))

    setStyles(adaptersArray.map(adapter => adapterCSS(adapter.game, adapter.rulebook, adapter.css, adapter.fonts)).reduce((styles, gameStyle) => ({ ...styles, ...gameStyle }), { }))
    setFonts(adaptersArray.reduce((allFonts, adapter) => allFonts.concat(adapter.fonts), []))
  }, [user])

  useEffect(() => { load() }, [user, load])

  if (!adapters) return <Loader className='home page' />

  console.log(styles)

  return <GameAdaptersContext.Provider value={adapters}>
    {fonts ? fonts.map(font => <Global styles={`@import url('${font}');`} />) : ''}
    {styles ? <Global styles={styles} /> : ''}
    {children}
  </GameAdaptersContext.Provider>
}
