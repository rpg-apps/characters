import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../../css/pages/home.scss'

import { useCharacters } from '../../contexts/characters-context'
import Footer from './footer'
import Character from '../../presentation/character'

export default function Home (props) {
  const characters = useCharacters()

  return <div className='home page'>
    <div className='characters'>
      {characters.map((character, index) => <Link key={index} to={`/character/${character.id}`}>
        <Character character={character}/>
      </Link>)}
    </div>
    <Footer />
  </div>
}
