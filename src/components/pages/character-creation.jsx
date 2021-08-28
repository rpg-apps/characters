import React from 'react'

import RulesContext from '../../contexts/rules-context'
import CharacterBuilder from '../../models/character-creation'

import PlaybookChoice from '../playbook-choice'
import CharacterTraitChoice from '../character-trait-choice'

import '../../css/pages/character-creation.scss'

export default class CharacterCreation extends React.Component {
  constructor () {
    super()
    this.state = { rulebook: undefined, builder: undefined }
  }

  componentDidMount () {
    this.setState({ rulebook: this.context, builder: new CharacterBuilder(this.context) })
  }

  setPlaybook (playbook) {
    this.state.builder.choosePlaybook(playbook.name)
    this.forceUpdate()
  }

  render () {
    return <div id='new'>
      {this.content()}
    </div>
  }

  content () {
    const { builder } = this.state

    if (!builder) {
      return <div className='loader'></div>
    }

    switch (builder.status) {
      case CharacterBuilder.STATUS.CHOSING_PLAYBOOK:
        return <PlaybookChoice rulebook={this.state.rulebook} set={playbook => this.setPlaybook(playbook)} />
      case CharacterBuilder.STATUS.CHOOSING_CHARACTER_TRAITS:
        return <CharacterTraitChoice characterBuilder={this.state.builder}/>
      case CharacterBuilder.STATUS.DONE:
        return this.done()
      default:
        return <div>STATUS ERROR!</div>
    }
  }
}

CharacterCreation.contextType = RulesContext
