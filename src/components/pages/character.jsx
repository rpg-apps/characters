import React from 'react'

import { get } from '../../data/character_list'
import CharacterStats from '../character-stats'
import CharacterInfo from '../character-info'
import CharacterStatus from '../character-status'
import CharacterTitle from '../character-title'
import CharacterProgress from '../character-progress'
import CharacterCollections from '../character-collections'

import '../../css/pages/character.scss'

export default class Character extends React.Component {
  constructor (props) {
    super()
    this.state = { name: props.match.params.name }
  }

  async componentDidMount () {
    const character = await get(this.state.name)
    this.setState({character})
  }

  render () {
    if (!this.state.character) {
      return <div className='loader'/>
    }
    return <div id='character'>
      <div className='head'>
        <CharacterTitle {...this.state.character}/>
        <CharacterProgress {...this.state.character}/>
      </div>
      <div className='body'>
        <div className='content'>
          <CharacterInfo {...this.state.character}/>
          <CharacterStatus {...this.state.character}/>
          <CharacterCollections {...this.state.character}/>
        </div>
        <div className='sidebar'>
          <CharacterStats stats={this.state.character.stats()}/>
          <div className='settings'></div>
        </div>
      </div>
    </div>
  }
}

// TODO: add loader
// TODO: add all other stuff and make them configurable
// TODO: add functions info(), status(), stats()
      // <CharacterInfo {...this.state.character.info()}/>
      // <CharacterStatus {...this.state.character.status()}/>
      // <Stats stats={this.state.character.stats()}/>