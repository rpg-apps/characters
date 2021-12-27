import React from 'react'

import { useCharacters } from '../contexts/characters-context'
import Character from '../presentation/character'

export default function CharacterPage ({ match }) {
  const character = useCharacters().find(character => character.id.toString() === match.params.id)
  return <div className='character page'>
    <Character character={character} />
  </div>
}
