import React from 'react'

import { getAll } from '../../data/character_list'

export default class Characters extends React.Component {
  constructor () {
    super()
    this.state = { characters: [
      {name: 'Ver'},
      {name: 'Melorf'},
      {name: 'Corie'}
    ] }
  }

  async componentDidMount () {
    // const characters = await getAll()
    // this.setState({ characters })
  }

  render () {
    console.log(this.state.characters)
    return <div id='characters'>
      {this.state.characters.map(character => <div className='character'>{character.name}</div>)}
      <button className='add-character'>+</button>
    </div>
  }
}