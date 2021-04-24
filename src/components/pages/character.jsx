import React from 'react'

import { get } from '../../data/character_list'
import Stats from './components/stats'

export default class Character extends React.Component {
  constructor (props) {
    super()
    this.state = { name: props.name }
  }

  async componentDidMount () {
    character = await get(this.state.name)
    this.setState({character})
  }

  render () {
    if (!this.state.character) {
      return <div className='loader'/>
    }
    return <div id='character'>
      <Stats stats={this.state.character.stats()}/>
    </div>
  }
}

// TODO: add loader