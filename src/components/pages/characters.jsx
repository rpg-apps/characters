import React from 'react'
import { Link } from 'react-router-dom'

import { getAll } from '../../data/character_list'

export default class Characters extends React.Component {
  constructor (props) {
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
      {this.state.characters.map(character =>
        <Link className='character' to={`/character/${character.name}`}>{character.name}</Link>)}
      <Link className='add-character' to='/new'>+</Link>
    </div>
  }
}