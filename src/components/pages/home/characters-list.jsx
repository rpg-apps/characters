import { Link, useHistory } from 'react-router-dom'

import { useCharacters } from '../../contexts/characters-context'
import { Character } from '../../presentation/character'

const HOME_EMPTY_MESSAGE = 'Maybe create a character instead of staring at an empty page?'
const GRAVEYARD_EMPTY_MESSAGE = 'Isn\'t it a good thing no one died?'

export default function CharactersList ({ graveyard }) {
  const characters = useCharacters()
  const history = useHistory()

  const revive = async character => {
    await character.revive()
    await character.save()
    history.push(`/character/${character.id}`)
  }

  const filteredCharacters = characters.filter(character => character.alive === !graveyard)

  return <div className='characters'>
    {filteredCharacters.length === 0 ? <Empty graveyard={graveyard} /> : <List graveyard={graveyard} characters={filteredCharacters} revive={revive} />}
  </div>
}

function Empty ({ graveyard }) {
  return <div className='empty characters'>
    <div className='primary'>No one is here</div>
    <div>{graveyard ? GRAVEYARD_EMPTY_MESSAGE : HOME_EMPTY_MESSAGE}</div>
  </div>
}

function List ({ graveyard, characters, revive }) {
  const Card = graveyard ? DeadCharacterCard : LiveCharacterCard
  return characters.map((character, index) => <Card character={character} key={index} revive={revive} />)
}

function DeadCharacterCard ({ character, revive }) {
  return <Character character={character} ui='character card' className='dead' onClick={() => revive(character)}/>
}

function LiveCharacterCard ({ character }) {
  return <Character character={character} ui='character card' Component={Link} to={`/character/${character.id}`}/>
}
