import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

import '../../css/pages/home.scss'

import { useCharacters } from '../contexts/characters-context'
import Character from '../presentation/character'

export default function Home (props) {
  const characters = useCharacters()
  console.log(characters)

  return <div className='home page'>
    <div key='characters' className='characters'>
      {characters.map((character, index) => <Link key={index} to={`/character/${character.id}`}><Character character={character}/></Link>)}
    </div>
    <div key='footer' className='footer'>
      <Link key='new' to='/new' className='button'><FaPlus /> Create</Link>
    </div>
  </div>
}
