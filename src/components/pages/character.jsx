import React from 'react'
import { Link } from 'react-router-dom'

import { get } from '../../data/character_list'
import Gear from './gear'
import Moves from './moves'
import Stats from '../stats'
import CharacterInfo from '../character-info'
import CharacterStatus from '../character-status'

export default class Character extends React.Component {
  constructor (props) {
    super()
    this.state = { name: props.match.params.name }
    console.log(props)
  }

  async componentDidMount () {
    console.log(this.state.name)
    const character = await get(this.state.name)
    this.setState({character})
  }

  render () {
    if (!this.state.character) {
      return <div className='loader'/>
    }
    return <div id='character'>
      <CharacterInfo {...this.state.character.info()}/>
      <CharacterStatus {...this.state.character.status()}/>
      <Stats stats={this.state.character.stats()}/>
      <Link className='gear' to={`/character/${this.state.character.name}/gear`}>Gear</Link>
      <Link className='moves' to={`/character/${this.state.character.name}/moves`}>Moves</Link>
    </div>
  }
}

// TODO: add loader
// TODO: add all other stuff and make them configurable
// TODO: add functions info(), status(), stats()