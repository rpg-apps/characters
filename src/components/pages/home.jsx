import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

import '../../css/pages/home.scss'

import AuthContext from '../presentation/auth-context'
import With from '../presentation/with'
import getUserCharacters from '../../logic/data'
import { Character } from '../presentation/character'

export default function Home (props) {
  // TODO change this according to correct rules API
  return <AuthContext.Consumer>{user =>
    <With className='home page' load={async () => await getUserCharacters(user) }>
      {characters =>
        [<div key='characters' className='characters'>
          {characters.map(character => <Link key={character.fields.name} to={`/character/${character.fields.name}`}>
            <Character character={character}/>
          </Link>)}
        </div>,
        <div key='footer' className='footer'>
          <Link key='new' to='/new' className='button'><FaPlus /> Create</Link>
        </div>]
      }
    </With>
  }</AuthContext.Consumer>
}
