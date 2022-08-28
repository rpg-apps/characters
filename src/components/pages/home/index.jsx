import { useState, useEffect } from 'react'

import '../../../css/pages/home.scss'

import Page from '../../presentation/page'

import Header from './header'
import CharactersList from './characters-list'
import Footer from './footer'

export default function Home (props) {
  const [init, setInit] = useState(true)
  const [graveyard, setGraveyard] = useState(false)

  useEffect(() => { setTimeout(() => setInit(false), 0) }, [])

  return <Page name={`home ${init ? 'init' : ''}`}>
    <Header graveyardControl={[graveyard, setGraveyard]} />
    <CharactersList graveyard={graveyard} />
    <Footer />
  </Page>
}
