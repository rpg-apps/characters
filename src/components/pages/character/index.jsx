
import { useCharacters } from '../../contexts/characters-context'

import Page from '../../presentation/page'
import { Character } from '../../presentation/character'

export default function CharacterPage ({ match }) {
  const character = useCharacters().find(character => character.id.toString() === match.params.id)

  return <Page name='character'>
    <Character character={character} ui='character-sheet' />
  </Page>
}
