import React from 'react'

import { useAuth } from '../presentation/auth-context'
import With from '../presentation/with'
import getUserCharacters from '../../logic/data'
import { Character } from '../presentation/character'

export default function CharacterPage ({ match }) {
  const user = useAuth()

  return <With className='character page' load={async () => (await getUserCharacters(user)).find(character => character.fields.name === match.params.name)}>
    {character => <Character character={character} />}
  </With>
}
