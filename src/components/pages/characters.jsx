import React from 'react'
import { Link } from 'react-router-dom'

import '../../css/pages/characters.css'

import { getAll } from '../../data/character_list'

export default class Characters extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  async componentDidMount () {
    const characters = getAll()
    this.setState({ characters })
  }

  render () {
    if (!this.state.characters) {
      return <div className='loader' />
    }

    return <div id='characters'>
      {this.state.characters.map(character =>
        <Link className={`character ${character.characterClass} ${character.active ? 'active' : ''}`} to={`/character/${character.name}`} key={character.name}>
          <div className='name'>{character.name}</div>
          <div className='adventure'>{character.adventure}</div>
          <div className='race'>{character.race} {character.characterClass}</div>
        </Link>)}
      <Link className='add-character' to='/new'>
        <svg width="100%" height="100%">
          <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="darkgray" strokeWidth="3px"></line>
          <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="darkgray" strokeWidth="3px"></line>
        </svg>
      </Link>
    </div>
  }
}