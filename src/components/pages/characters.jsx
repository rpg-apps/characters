import React from 'react'
import { Link } from 'react-router-dom'
import { paramCase as classCase } from 'change-case'

import '../../css/pages/characters.scss'

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
        <Link className={`character ${classCase(character.characterClass)} ${character.active ? 'active' : ''}`} to={`/character/${character.name}`} key={character.name}>
          <div className='name'>{character.name}</div>
          <div className='meta'>Lvl. {character.level} {character.race} {character.characterClass}</div>
          <div className='meta'>{character.adventure}</div>
        </Link>)}
      <Link className='add-character' to='/new'>
        <svg width="100%" height="100%">
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(22,23,67,1)" strokeWidth="5px"></line>
          <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(22,23,67,1)" strokeWidth="5px"></line>
          </svg>
      </Link>
    </div>
  }
}