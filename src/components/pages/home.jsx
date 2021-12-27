import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

import '../../css/pages/home.scss'

import { useAuth } from '../presentation/auth-context'
import With from '../presentation/with'
import getUserCharacters from '../../logic/data'
import { Character } from '../presentation/character'

export default function Home (props) {
  const { user } = useAuth()

  React.useEffect(() => {
    (async () => {
      const characterJsons = await user.callFunction('getCharacters')
      console.log(characterJsons)
    }) ()
  }, [user])

  return <With className='home page' load={async () => await getUserCharacters(user) }>
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
}
