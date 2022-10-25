import { useEffect } from 'react'

import { useCharacters } from '../../contexts/characters-context'
import { useProdcedureUI } from '../../hooks/procedure-ui'
import Page from '../../presentation/page'
import { Character } from '../../presentation/character'

export default function CharacterPage ({ match }) {
  const character = useCharacters().find(character => character.id.toString() === match.params.id)
  const procedureUI = useProdcedureUI(() => character)

  return <Page name='character'>
    <Character character={character} ui='character sheet' procedureUI={procedureUI} />
  </Page>
}
