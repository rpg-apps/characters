import React from 'react'

import { get } from '../../data/character_list'
import Stats from '../stats'

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
      <Stats stats={this.state.character.stats()}/>
    </div>
  }
}

// TODO: add loader
// TODO: add all other stuff and make them configurable