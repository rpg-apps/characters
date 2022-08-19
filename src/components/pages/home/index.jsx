import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import '../../../css/pages/home.scss'

import { useCharacters } from '../../contexts/characters-context'
import Footer from './footer'
import Header from './header'
import Character from '../../presentation/character'
import Logo from '../../presentation/logo'

const HOME_EMPTY_MESSAGE = 'Maybe create a character instead of staring at an empty page?'
const GRAVEYARD_EMPTY_MESSAGE = 'Isn\'t it a good thing no one died?'

export default function Home (props) {
  const [init, setInit] = useState(true)
  const [graveyard, setGraveyard] = useState(false)
  const characters = useCharacters()
  const history = useHistory()

  useEffect(() => { setTimeout(() => setInit(false), 0) }, [])

  const toggleGraveyard = () => setGraveyard(!graveyard)

  const revive = async character => {
    await character.revive()
    await character.save()
    history.push(`/character/${character.id}`)
  }

  const filteredCharacters = characters.filter(character => character.alive === !graveyard)
  const content = filteredCharacters.length ?
    filteredCharacters.map((character, index) => graveyard ? <Character character={character} ui='character-card' className='dead' key={index} to={`/character/${character.id}`}/> : <Character character={character} ui='character-card' Component={Link} key={index} to={`/character/${character.id}`}/>)
    :
    <div className='empty characters'>
      <div className='primary'>No one is here</div>
      <div>{graveyard ? GRAVEYARD_EMPTY_MESSAGE : HOME_EMPTY_MESSAGE}</div>
    </div>

  return <div className={`home page ${init ? 'init' : ''}`}>
    <Header graveyardControl={[graveyard, setGraveyard]} />
    <div className='characters'>
      {content}
    </div>
    <Footer />
  </div>
}
