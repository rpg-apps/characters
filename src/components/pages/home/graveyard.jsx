import React from 'react'
import { useHistory } from 'react-router'

import '../../../css/pages/home.scss'

import { useCharacters } from '../../contexts/characters-context'
import Footer from './footer'
import Character from '../../presentation/character'

export default function Graveyard (props) {
  const characters = useCharacters().filter(character => !character.alive)
  const history = useHistory()

  const revive = async character => {
    await character.revive()
    await character.save()
    history.push(`/character/${character.id}`)
  }

  const content = characters.length ?
    characters.map((character, index) => <div key={index} className='dead' onClick={() => revive(character)}><Character character={character}/></div>)
    :
    <div className='empty characters'>
      <div className='primary'>No one is here</div>
      <div>Isn't it a good thing no one died?</div>
    </div>

  return <div className='graveyard home page'>
    <div className='characters'>
      {content}
    </div>
    <Footer graveyard={true} />
  </div>
}
