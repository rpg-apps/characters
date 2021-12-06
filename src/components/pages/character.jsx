import React from 'react'

import AuthContext from '../presentation/auth-context'
import With from '../presentation/with'
import getUserCharacters from '../../logic/data'
import { Character } from '../presentation/character'

export default function CharacterPage ({ name }) {
  return <AuthContext>{user =>
    <With className='character page' load={async () => ((await getUserCharacters(user)).find(character => character.fields.name === name))}>
      {character => <Character character={character} />}
    </With>
  }</AuthContext>
}
