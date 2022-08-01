import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBookDead } from 'react-icons/fa'

import '../../../css/pages/home.scss'

import { useCharacters } from '../../contexts/characters-context'
import Footer from './footer'
import renderCharacter from '../../presentation/character-schema'
import Loader from '../../presentation/loader'

export default function Home (props) {
  const characters = useCharacters().filter(character => character.alive)
  const [characterComponents, setCharacterComponents] = useState([])

  useEffect(() => {
    (async () => {
      const components = []
      for (let character of characters) {
        components.push(await renderCharacter(character.adapter.characterCard, character))
      }
      setCharacterComponents(components)
    }) ()
  }, [])

  if (!characterComponents) {
    return <Loader />
  }

  const content = characters.length ?
    characters.map((character, index) => <Link className='character-card' key={index} to={`/character/${character.id}`}>
      {characterComponents[index]}
    </Link>)
    :
    <div className='empty characters'>
      <div className='primary'>No one is here</div>
      <div>Maybe create a character instead of staring at an empty page?</div>
    </div>

  return <div className='home page'>
    <div className='characters'>
      {content}
    </div>
    <Footer graveyardLink={<Link className='link' to='/graveyard'><FaBookDead /> Graveyard</Link>} />
  </div>
}
