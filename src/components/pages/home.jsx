import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoonLoader from 'react-spinners/MoonLoader'
import { FaPlus } from 'react-icons/fa'

import '../../css/pages/home.css'

import auth from '../../logic/auth'
import getUserCharacters from '../../logic/data'

export default function Home (props) {
  const [characters, setCharacters] = useState(undefined)

  useEffect(async () => {
    const user = auth.getCurrentUser()
    const userCharaters = await getUserCharacters(user)
    setCharacters(userCharaters)
  }, [])

  if (!characters) {
    return <div className='loading home page'><MoonLoader speedMultiplier={0.3} color='#FFF' loading={true} size={150} /></div>
  }

  // TODO change this according to correct rules API
  return <div className='home page'>
    {characters.map(character => <Link to={`/character/${character.name}`} className={`character ${character.class}`}>
      <div className='name'>{character.name}</div>
      <div className='metadata'>lvl. {character.level} {character.race} {character.class}</div>
    </Link>)}
    <Link to='/new' className='button'>
      <FaPlus /> Create
    </Link>
  </div>
}
