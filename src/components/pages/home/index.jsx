import React from 'react'
import { Link } from 'react-router-dom'

import '../../../css/pages/home.scss'

import { useCharacters } from '../../contexts/characters-context'
import Footer from './footer'
import Character from '../../presentation/character'

export default function Home (props) {
  const characters = useCharacters()

  const content = characters.length ? characters.map((character, index) => <Link key={index} to={`/character/${character.id}`}>
    <Character character={character}/>
  </Link>) : <div className='empty characters'><div className='primary'>No one is here</div><div>Maybe create a character instead of staring at an empty page?</div></div>

  return <div className='home page'>
    <div className='characters'>
      {content}
    </div>
    <Footer />
  </div>
}
