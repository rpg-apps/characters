import React from 'react'

export default class CharacterCreation extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  async componentDidMount () {
  }

  render () {
    console.log(this.state.characters)
    return <div id='new'>
    </div>
  }
}