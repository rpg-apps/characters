import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import RulesContext from '../../contexts/rules-context'
import CharacterBuilder from '../../models/character-creation'

import '../../css/pages/character-creation.scss'

export default class CharacterCreation extends React.Component {
  constructor () {
    super()
    this.state = { rulebook: undefined, builder: undefined, about: undefined, choiceValue: undefined }
  }

  componentDidMount () {
    this.setState({ rulebook: this.context, builder: new CharacterBuilder(this.context) })
  }

  setPlaybook (playbook) {
    this.state.builder.choosePlaybook(playbook.name)
    this.forceUpdate()
  }

  chooseCharacterTrait () {
    const { builder, choiceValue } = this.state
    const { choice } = builder

    builder.chooseCharacterTrait(choice.name, choiceValue)
    this.setState({ choiceValue: undefined })
  }

  toggleAbout (playbook) {
    const about = (this.state.about === playbook.name) ? undefined : playbook.name
    this.setState({ about })
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
      case CharacterBuilder.STATUS.CHOSING_PLAYBOOK:          return this.renderPlaybookChoice()
      case CharacterBuilder.STATUS.CHOOSING_CHARACTER_TRAITS: return this.renderCharacterTraitChoice()
      case CharacterBuilder.STATUS.DONE:                      return this.done()
      default:                                                return <div>STATUS ERROR!</div>
    }
  }

  renderPlaybookChoice () {
    const { rulebook } = this.state

    return <SwipeableViews enableMouseEvents>
      {/* TODO Add index view */}
      {rulebook.playbooks.map(playbook => <div key={playbook.name} className={`playbook ${playbook.name} ${(this.state.about === playbook.name) ? 'showing-about' : 'hidden-about'}`}>
        <div className='title'>{playbook.name}</div>
        <div className='subtitle'>{playbook.fields['in a sentence']}</div>
        <div className='actions'>
          <div className='about button' onClick={() => this.toggleAbout(playbook)}>about</div>
          <div className='select button' onClick={() => this.setPlaybook(playbook)}>select</div>
        </div>
        <div className='about text'>
          {playbook.fields.introduction.split('\\n').map((line, key) => <div key={key}>{line}</div>)}
        </div>
      </div>)}
    </SwipeableViews>
  }

  renderCharacterTraitChoice () {
    const choice = this.state.builder.choice

    if (choice.type.hasOwnProperty('from')) {
      return this.renderFieldChoice(choice)
    }

    switch (choice.type.name) {
      case 'text':  return this.renderTextChoice(choice)
      case 'long text':  return this.renderLongTextChoice(choice)
    }
    return JSON.stringify(choice)
  }

  renderFieldChoice (choice) {
    const options = this.state.builder.playbook.fields[choice.type.from]

    return <div className={`${choice.name} field choice`}>
      <div className='title'>{choice.name}</div>
      {choice.free ? <input type='text' value={this.state.choiceValue} name={choice.name} onChange={event => this.setState({ choiceValue: event.target.value })} /> : ''}
      <div className='options'>
        {options.map(option => <div className={`${this.state.choiceValue === option ? 'chosen' : ''} option button`} onClick={() => this.setState({ choiceValue: option })}>
          {(option.constructor === String) ? option : Object.entries(option).map(([key, value]) => <div className={key}>{value}</div>)}
        </div>)}
      </div>
      <div className='choice button' onClick={() => this.chooseCharacterTrait()}>next</div>
    </div>
  }

  renderTextChoice (choice) {
    return <div className={`${choice.name} text choice`}>
      <div className='title'>{choice.name}</div>
      <input type='text' value={this.state.choiceValue} name={choice.name} onChange={event => this.setState({ choiceValue: event.target.value })} />
      <div className='choice button' onClick={() => this.chooseCharacterTrait()}>next</div>
    </div>
  }

  renderLongTextChoice (choice) {
    return <div className={`${choice.name} long text choice`}>
      <div className='title'>{choice.name}</div>
      <textarea name={choice.name} value={this.state.choiceValue} onChange={event => this.setState({ choiceValue: event.target.value })} />
      <div className='choice button' onClick={() => this.chooseCharacterTrait()}>next</div>
    </div>
  }
}

CharacterCreation.contextType = RulesContext
