import Character from '../../presentation/character'
import { useCharacters } from '../../contexts/characters-context'

export default function CharacterPage ({ match }) {
  const character = useCharacters().find(character => character.id.toString() === match.params.id)

  return <Character character={character} ui='character-sheet' />
}
